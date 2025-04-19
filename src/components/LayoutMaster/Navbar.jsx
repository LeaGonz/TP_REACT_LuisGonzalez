import { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Button from "../Button";

export default function Navbar() {
    const [currentLocation, setcurrentLocation] = useState(location.pathname);
    const { user, logout } = useContext(AuthContext);
    const fullName = ((localStorage.getItem("firstName") || "") + " " + (localStorage.getItem("lastName") || "")).trim()

    useEffect(() => {
        setcurrentLocation(location.pathname);
    }, [useLocation()]);

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
                    <ul className="navbar-nav ms-auto d-flex align-items-center">
                        <li className="nav-item ">
                            <Link className={`nav-link ${currentLocation === '/' ? 'active' : ''}`} to="/">Início</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${currentLocation === '/gestor' ? 'active' : ''}`} to="/gestor">Gestão de Menu</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${currentLocation === '/consumidor' ? 'active' : ''}`} to="/consumidor">Fazer Pedido</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${currentLocation === '/cozinha' ? 'active' : ''}`} to="/cozinha">Cozinha</Link>
                        </li>
                        {!user ? (
                            <>
                                {/* LOGIN */}
                                <li className="nav-item">
                                    <Link className={`nav-link ${currentLocation === '/login' ? 'active' : ''}`} to="/login">Log in</Link>
                                </li>

                                {/* SIGNUP */}
                                <li className="nav-item">
                                    <Link className={`nav-link ${currentLocation === '/register' ? 'active' : ''}`} to="/register">Registar-se</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                {/* LOGOUT */}
                                <li className="nav-item mx-2">
                                    <div className="alert alert-dark d-flex align-items-center" >
                                        Olá, {fullName}
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <Button color="red" onClick={logout}>Logout</Button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div >
        </nav >
    )
}