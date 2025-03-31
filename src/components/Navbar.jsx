export default function Navbar() {

    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <div className="container">
                {/* Logo e Título do Site */}
                <a className="navbar-brand" href="index.html">
                    <img src="./src/assets/logo.png" width="50" alt="Logo" />Lamasan</a>
                {/*  Botão Toggler para Dispositivos Móveis */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/* Menu de Navegação */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link active" href="index.html">Início</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="index.html#sobre">Gestão de Menu</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="menu.html">Fazer Pedido</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="reservas.html">Cozinha</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}