export default function Footer() {
    return (
        <footer className="bg-dark text-white py-4 w-100">
            <div className="container text-center">
                <p className="mb-0">© {new Date().getFullYear()} Sistema de Gestão do Restaurante</p>
                <p className="mb-0 small">Luis Gonzalez - Todos os direitos reservados</p>
            </div>
        </footer>
    )
}