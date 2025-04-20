import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Home.css';

export default function HomePage() {
    console.log(localStorage);

    const location = useLocation();
    const [successMessage, setSuccessMessage] = useState('');

    // Verifica se há uma mensagem de sucesso na localização
    useEffect(() => {
        if (location.state?.message) {
            setSuccessMessage(location.state.message);

            // Limpa a mensagem após 3 segundos
            const timer = setTimeout(() => {
                setSuccessMessage('');
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [location.state]);

    return (
        <>
            {successMessage && (
                <div className="alert alert-success alert-dismissible fade show mt-3" role="alert">
                    {successMessage}
                </div>
            )}

            <div className="container-fluid bg-dark text-white text-center up-section">
                <div className="container py-5">
                    <h1 className="display-3 fw-bold mb-4 restaurant-title">
                        Lamasan <span className="text-danger">ラマサン</span>
                    </h1>
                    <p className="lead mb-4">Bem-vindo ao sistema de gestão do Restaurante Japonês Lamasan</p>
                </div>
            </div>

            {/* Sobre o Sistema */}
            <div className="container my-5">
                <div className="row">
                    <div className="col-lg-8 mx-auto text-center">
                        <h2 className="mb-4">Sobre o Sistema</h2>
                        <p className="lead">
                            O nosso sistema de gestão foi desenvolvido para proporcionar uma experiência eficiente tanto para os clientes como para a equipa do restaurante.
                        </p>
                        <p>
                            Com funcionalidades específicas para cada tipo de utilizador, garantimos que todos os processos, desde a criação do menu até à entrega dos pratos, sejam realizados com excelência.
                        </p>
                    </div>
                </div>
            </div>

            {/* Funcionalidades */}
            <div className="container my-5">
                <h2 className="text-center mb-3">Funcionalidades do Sistema</h2>

                <div className="row g-4">
                    {/* Gestão de Menu */}
                    <div className="col-md-6 col-lg-3">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body text-center p-4">
                                <div className="feature-icon">
                                    <i className="bi bi-journal-text"></i>
                                </div>
                                <h4 className="card-title mb-3">Gestão de Menu</h4>
                                <p className="card-text">
                                    Permite ao gestor criar e gerir os menus do restaurante, incluindo entradas, pratos principais e sobremesas.
                                </p>
                                <div className="mt-3">
                                    <span className="badge bg-danger">Acesso: Gestor</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Fazer Pedido */}
                    <div className="col-md-6 col-lg-3">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body text-center p-4">
                                <div className="feature-icon">
                                    <i className="bi bi-cart-plus"></i>
                                </div>
                                <h4 className="card-title mb-3">Fazer Pedido</h4>
                                <p className="card-text">
                                    Permite aos clientes visualizar o menu e selecionar os pratos desejados para criar o seu pedido.
                                </p>
                                <div className="mt-3">
                                    <span className="badge bg-warning">Acesso: Consumidor</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cozinha */}
                    <div className="col-md-6 col-lg-3">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body text-center p-4">
                                <div className="feature-icon">
                                    <i className="bi bi-fire"></i>
                                </div>
                                <h4 className="card-title mb-3">Cozinha</h4>
                                <p className="card-text">
                                    Permite à equipa da cozinha visualizar os pedidos e atualizar o seu estado durante a preparação.
                                </p>
                                <div className="mt-3">
                                    <span className="badge bg-success">Acesso: Cozinha</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Autenticação */}
                    <div className="col-md-6 col-lg-3">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body text-center p-4">
                                <div className="feature-icon">
                                    <i className="bi bi-person-circle"></i>
                                </div>
                                <h4 className="card-title mb-3">Autenticação</h4>
                                <p className="card-text">
                                    Sistema de login e registo que permite aos utilizadores aceder às funcionalidades de acordo com o seu perfil.
                                </p>
                                <div className="mt-3">
                                    <span className="badge bg-secondary">Acesso: Todos</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fluxo de Trabalho */}
            <div className="container my-5 py-5 bg-light rounded-3">
                <h2 className="text-center mb-5">Fluxo de Trabalho</h2>

                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="timeline-container">
                            {/* Linha de tempo */}
                            <div className="timeline-line"></div>

                            {/* Etapa 1 */}
                            <div className="row mb-5 position-relative">
                                <div className="col-md-6 text-md-end pe-md-5">
                                    <div className="bg-white p-4 rounded shadow-sm">
                                        <h4 className="text-danger">1. Criação do Menu</h4>
                                        <p>O gestor cria os menus com entradas, pratos principais e sobremesas, definindo os preços e disponibilidade.</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="timeline-dot"></div>
                                </div>
                            </div>

                            {/* Etapa 2 */}
                            <div className="row mb-5 position-relative">
                                <div className="col-md-6">
                                    <div className="timeline-dot"></div>
                                </div>
                                <div className="col-md-6 text-md-start ps-md-5">
                                    <div className="bg-white p-4 rounded shadow-sm">
                                        <h4 className="text-warning">2. Realização do Pedido</h4>
                                        <p>O consumidor visualiza o menu disponível, seleciona os itens desejados e cria o seu pedido.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Etapa 3 */}
                            <div className="row mb-5 position-relative">
                                <div className="col-md-6 text-md-end pe-md-5">
                                    <div className="bg-white p-4 rounded shadow-sm">
                                        <h4 className="text-success">3. Preparação na Cozinha</h4>
                                        <p>A equipa da cozinha recebe o pedido, atualiza o estado para "em confecção" e inicia a preparação dos pratos.</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="timeline-dot"></div>
                                </div>
                            </div>

                            {/* Etapa 4 */}
                            <div className="row position-relative">
                                <div className="col-md-6">
                                    <div className="timeline-dot"></div>
                                </div>
                                <div className="col-md-6 text-md-start ps-md-5">
                                    <div className="bg-white p-4 rounded shadow-sm">
                                        <h4 className="text-secondary">4. Entrega do Pedido</h4>
                                        <p>Após a conclusão, o estado é atualizado para "entregue" e o cliente pode acompanhar o progresso do seu pedido.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Perfis de Utilizador */}
            <div className="container my-5">
                <h2 className="text-center mb-5">Perfis de Utilizador</h2>

                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-header bg-danger text-white text-center py-3">
                                <h4 className="mb-0">Gestor</h4>
                            </div>
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex align-items-center">
                                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                                        Criar menus
                                    </li>
                                    <li className="list-group-item d-flex align-items-center">
                                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                                        Definir preços
                                    </li>
                                    <li className="list-group-item d-flex align-items-center">
                                        <i className="bi bi-x-circle-fill text-danger me-2"></i>
                                        Não pode fazer pedidos
                                    </li>
                                    <li className="list-group-item d-flex align-items-center">
                                        <i className="bi bi-x-circle-fill text-danger me-2"></i>
                                        Não pode aceder à cozinha
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-header bg-warning text-white text-center py-3">
                                <h4 className="mb-0">Consumidor</h4>
                            </div>
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex align-items-center">
                                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                                        Visualizar menus disponíveis
                                    </li>
                                    <li className="list-group-item d-flex align-items-center">
                                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                                        Fazer pedidos
                                    </li>
                                    <li className="list-group-item d-flex align-items-center">
                                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                                        Remover itens (se pendentes)
                                    </li>
                                    <li className="list-group-item d-flex align-items-center">
                                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                                        Acompanhar estado dos pedidos
                                    </li>
                                    <li className="list-group-item d-flex align-items-center">
                                        <i className="bi bi-x-circle-fill text-danger me-2"></i>
                                        Não pode gerir menus
                                    </li>
                                    <li className="list-group-item d-flex align-items-center">
                                        <i className="bi bi-x-circle-fill text-danger me-2"></i>
                                        Não pode aceder à cozinha
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-header bg-success text-white text-center py-3">
                                <h4 className="mb-0">Cozinha</h4>
                            </div>
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex align-items-center">
                                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                                        Ver todos os pedidos
                                    </li>
                                    <li className="list-group-item d-flex align-items-center">
                                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                                        Atualizar estado para "em confecção"
                                    </li>
                                    <li className="list-group-item d-flex align-items-center">
                                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                                        Atualizar estado para "entregue"
                                    </li>
                                    <li className="list-group-item d-flex align-items-center">
                                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                                        Eliminar pedidos entregues
                                    </li>
                                    <li className="list-group-item d-flex align-items-center">
                                        <i className="bi bi-x-circle-fill text-danger me-2"></i>
                                        Não pode gerir menus
                                    </li>
                                    <li className="list-group-item d-flex align-items-center">
                                        <i className="bi bi-x-circle-fill text-danger me-2"></i>
                                        Não pode fazer pedidos
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tecnologias Utilizadas */}
            <div className="container my-5 py-5 bg-dark text-white rounded-3">
                <h2 className="text-center mb-5">Tecnologias Utilizadas</h2>

                <div className="row justify-content-center text-center g-4">
                    <div className="col-6 col-md-3">
                        <div className="p-3">
                            <i className="bi bi-filetype-jsx tech-icon"></i>
                            <h5 className="mt-3">React</h5>
                        </div>
                    </div>
                    <div className="col-6 col-md-3">
                        <div className="p-3">
                            <i className="bi bi-bootstrap tech-icon"></i>
                            <h5 className="mt-3">Bootstrap</h5>
                        </div>
                    </div>
                    <div className="col-6 col-md-3">
                        <div className="p-3">
                            <i className="bi bi-database tech-icon"></i>
                            <h5 className="mt-3">JSON Server</h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}