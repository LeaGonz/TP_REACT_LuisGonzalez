import { useState, useEffect, useContext, useCallback, useRef } from 'react';
import Menus from '../components/menus/Menus';
import updateMenus from '../contexts/updateMenus';

export default function Consumidor() {
    const [menus, setMenus] = useState([]);
    const [userMenus, setUserMenus] = useState([]);
    const selectedMenu = useRef(null);
    const email = localStorage.getItem("email");
    const [erros, setErros] = useState(null);

    // Calcular o total
    const total = userMenus.reduce((sum, menu) => {
        return sum + Number(menu.valor);
    }, 0);

    // Alimentamos os menus desde a API
    useEffect(() => {
        fetch("http://localhost:3000/menu")
            .then((response) => response.json())
            .then((data) => {
                setMenus(data.menu);
            });
    }, []);

    // Alimentamos os pedidos do utilizador
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:3000/user-menu?email=${email}`)
                .then((response) => response.json())
                .then((data) => {
                    setUserMenus(data.menus || []);
                });
        }
    }, [email]);

    // Função para criar pedido do utilizador
    function handleSelectMenu(selectedMenu) {
        const menuStatus = {
            ...selectedMenu,
            status: "pendente",
            tempId: Date.now()
        };

        setUserMenus(prevPickedMenu => {
            const newMenus = [...prevPickedMenu, menuStatus];
            updateMenus(newMenus);
            return newMenus;
        });
    }

    // Função para remover menu do pedido
    const handleRemoveMenu = useCallback(
        async function handleRemoveMenu() {

            if (selectedMenu.current.status !== "pendente") {
                // Se o status do menu não for "pendente", não é possível removê-lo
                setErros(`Não é possível remover um pedido que já está ${selectedMenu.current.status}.`);

                const timer = setTimeout(() => {
                    setErros('');
                }, 3000);
                return () => clearTimeout(timer);
            }

            setUserMenus(prevPickedMenus => {
                const newMenus = prevPickedMenus.filter(menu => menu.tempId !== selectedMenu.current.tempId);
                updateMenus(newMenus);
                return newMenus;
            });
        },
        []
    );

    function handleStartRemoveMenu(menu) {
        selectedMenu.current = menu;
        handleRemoveMenu();
    }

    return (
        <>
            {menus.length === 0 ? (
                <div className="alert alert-info">
                    Não há menus disponíveis no momento.
                </div>
            ) : (
                <>
                    {/* MENU DO PEDIDO DO USER */}
                    {userMenus.length > 0 && (
                        <div className="row">
                            <h4 className="text-center alert alert-success" role="alert">
                                Seu Pedido - Total: {total.toFixed(2)}€</h4>
                            {/* Exibe mensagem de erro da ação remover */}
                            {erros && (
                                <div className="alert alert-danger p-2" role="alert">
                                    {erros}
                                </div>
                            )}

                            {userMenus.map((menu) => (
                                <Menus
                                    key={menu.tempId}
                                    menu={menu}
                                    selectedMenu={handleStartRemoveMenu}
                                    showStatus={true}
                                />
                            ))}
                        </div>
                    )}

                    {/* MENU DISPONIVEIS */}
                    {menus.length > 0 && (
                        <div className="row">
                            <h4 className="text-center alert alert-secondary" role="alert">Menus Disponíveis</h4>
                            {menus.map((menu) => (
                                <Menus
                                    key={menu.id}
                                    menu={menu}
                                    selectedMenu={handleSelectMenu}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
        </>
    );
}