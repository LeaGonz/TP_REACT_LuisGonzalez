import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

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
            <h1>Lamasan Restaurante Japonês</h1>

        </>
    )
}