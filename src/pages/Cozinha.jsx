import { useState, useEffect } from 'react';
import Button from '../components/Button';

export default function Cozinha() {
    const [orders, setOrders] = useState([]);

    // Alimentamos os pedidos do utilizador
    useEffect(() => {
        fetch('http://localhost:3000/user-menu')
            .then((response) => response.json())
            .then((data) => {
                setOrders(data.menus || [])
            });
    }, []);

    // Atualizar estado de um pedido
    const updateStatusOrder = async (email, tempId, newStatus) => {
        const updatedOrders = orders.map(user => {
            // Procuramos o user
            if (user.email === email) {
                const updatedMenus = user.menus.map(menu =>
                    // Procuramos o pedido
                    menu.tempId === tempId ? { ...menu, status: newStatus } : menu
                );
                return { ...user, menus: updatedMenus };
            }
            return user;
        });

        // Encontrar o user específico para enviar à API
        const userToUpdate = updatedOrders.find(user => user.email === email);
        await fetch('http://localhost:3000/user-menu', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userToUpdate)
        });

        setOrders(updatedOrders);
    };

    // Apagar os pedidos entregue
    const deleteOrder = async (email, tempId) => {
        const updatedOrders = orders.map(user => {
            // Procuramos o user
            if (user.email === email) {
                // Filtramos o pedido que queremos eliminar
                const updatedMenus = user.menus.filter(menu => menu.tempId !== tempId);
                return { ...user, menus: updatedMenus };
            }
            return user;
        });

        // Encontrar o user específico para enviar à API
        const userToUpdate = updatedOrders.find(user => user.email === email);
        if (userToUpdate && userToUpdate.menus.length === 0) {
            const ordersWithoutEmptyUser = updatedOrders.filter(user => user.email !== email);

            await fetch('http://localhost:3000/user-menu/remove', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    name: userToUpdate.name,
                    menus: [] 
                })
            });

            setOrders(ordersWithoutEmptyUser);
        } else {
            await fetch('http://localhost:3000/user-menu', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userToUpdate)
            });

            setOrders(updatedOrders);
        }
    };

    return (
        <div className="container">
            <h1 className="alert alert-success text-center p-2">Gestão da Cozinha</h1>

            {orders.length === 0 ? (
                <div className="alert alert-info">Não há orders no momento</div>
            ) : (
                <div className="row">
                    {orders.map((user) => (
                        <div key={user.email} className="col-md-6 mb-4">
                            <div className="card">
                                <div className="card-header bg-dark text-white">
                                    <h5>{user.name}</h5>
                                    <small>{user.email}</small>
                                </div>
                                <div className="card-body">
                                    {user.menus.map((menu) => (
                                        <div key={menu.tempId} className="mb-3 p-3 border rounded">
                                            <div className="d-flex justify-content-between">
                                                <h6>Menu #{menu.id}</h6>
                                                <span className={`badge ${menu.status === 'pendente' ? 'bg-warning' :
                                                    menu.status === 'em confecção' ? 'bg-dark' : 'bg-success'
                                                    }`}>
                                                    {menu.status}
                                                </span>
                                            </div>
                                            <p><strong>Entrada:</strong> {menu.entrada}</p>
                                            <p><strong>Prato:</strong> {menu.prato}</p>
                                            <p><strong>Valor:</strong> {menu.valor}€</p>

                                            <div className="mt-2">
                                                {menu.status === 'pendente' && (
                                                    <Button
                                                        onClick={() => updateStatusOrder(user.email, menu.tempId, 'em confecção')}
                                                        color='yellow'
                                                    >
                                                        Em Confecção
                                                    </Button>
                                                )}
                                                {menu.status === 'em confecção' && (
                                                    <Button
                                                        onClick={() => updateStatusOrder(user.email, menu.tempId, 'entregue')}
                                                        color='red'
                                                    >
                                                        Marcar como Entregue
                                                    </Button>
                                                )}
                                                {menu.status === 'entregue' && (
                                                    <Button
                                                        onClick={() => deleteOrder(user.email, menu.tempId)}
                                                        color='red'
                                                    >
                                                        Apagar
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}