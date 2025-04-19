import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Menus from '../components/menus/Menus';

export default function Consumidor() {
    const { user } = useContext(AuthContext);
    const [menus, setMenus] = useState([]);

    // Alimentamos o menus desde a API
    useEffect(() => {
        fetch("http://localhost:3000/menu")
            .then((response) => response.json())
            .then((data) => {
                setMenus(data.menu);
            });
    }, []);
    // console.log(menus);
    console.log(user);

    return (
        <>
            {menus.length === 0 ? (
                <div className="alert alert-info">
                    Não há menus disponíveis no momento.
                </div>
            ) : (
                <div className="row">
                    {menus.map((menu, index) => (
                        < Menus
                            key={index}
                            index={index}
                            menu={menu}
                        />
                    )
                    )}
                </div >
            )
            }
        </>
    )
}