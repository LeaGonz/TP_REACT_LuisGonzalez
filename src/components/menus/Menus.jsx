import '../menus/Menus.css';

export default function Menus({ menu = null, selectedMenu, showStatus = false }) {
    return (
        <div className="menu-item col-md-4 mb-4">
            <button onClick={() => selectedMenu(menu)}>
                <div className="menu-card">
                    <div className="menu-card-header">
                        <h5>Menu #{menu.id}</h5>
                        {showStatus && (
                            <div className="alert alert-success p-0 mb-0">
                                {menu.status.charAt(0).toUpperCase() + menu.status.slice(1).toLowerCase()}
                            </div>
                        )}
                    </div>

                    <div className="menu-card-body">
                        <ul className="menu-list-group">
                            <li className="menu-list-item">
                                <strong>Entrada:</strong>
                                <span>{menu?.entrada || 'Não especificada'}</span>
                            </li>
                            <li className="menu-list-item">
                                <strong>Prato Principal:</strong>
                                <span>{menu?.prato || 'Não especificado'}</span>
                            </li>
                            <li className="menu-list-item">
                                <strong>Sobremesa:</strong>
                                <span>{menu?.sobremesa || 'Não especificada'}</span>
                            </li>
                            <li className="menu-list-item">
                                <strong>Valor:</strong>
                                <span className="menu-price">
                                    {menu?.valor ? `${menu.valor}€` : '--'}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </button>
        </div>
    );
}