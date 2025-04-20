import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import '../styles/App.css';

export default function Gestor() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    async function handleSubmit(event) {
        event.preventDefault();
        setErrors([]);

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        // Validar os dados do formulário
        const newErrors = [];

        if (!data.entrada) newErrors.push('Entrada é obrigatória');
        if (!data.prato) newErrors.push('Prato é obrigatório');
        if (!data.sobremesa) newErrors.push('Sobremesa é obrigatória');
        if (!data.valor || isNaN(parseFloat(data.valor))) newErrors.push('Valor do menu é obrigatório e deve ser um número');

        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }

        // Verificamos o ID a seguir
        const responseId = await fetch("http://localhost:3000/menu");
        const existingMenu = await responseId.json();
        const nextId = existingMenu.menu?.length > 0 ? Math.max(...existingMenu.menu.map(m => m.id)) + 1 : 1;

        // Preparamos os dados para enviar
        const menu = {
            id: nextId,
            entrada: data.entrada,
            prato: data.prato,
            sobremesa: data.sobremesa,
            valor: data.valor,
        };

        const response = await fetch("http://localhost:3000/menu", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(menu),
        });

        if (!response.ok) {
            alert("Erro ao criar o menu!");
            return;
        }

        navigate("/", { state: { message: `Menu criado com sucesso!` } });

    }
    return (
        <>

            <form className="form-signup" onSubmit={handleSubmit}>
                <div className="text-center mb-4">
                    <h2>Gestão Lamasan</h2>
                </div>

                {/* ENTRADA */}
                <div className="control-row">
                    <div className="control mb-3">
                        <label>Entrada</label>
                        <input
                            type="text"
                            id="entrada"
                            name="entrada"
                            placeholder="Nome da entrada"
                        />
                    </div>

                    {/* PRATO */}
                    <div className="control mb-3">
                        <label>Prato Principal</label>
                        <input
                            type="text"
                            id="prato"
                            name="prato"
                            placeholder="Nome do prato Principal"
                        />
                    </div>
                </div>

                {/* SOBREMESA */}
                <div className="control mb-3">
                    <label>Sobremesa</label>
                    <input
                        type="text"
                        id="sobremesa"
                        name="sobremesa"
                        placeholder="Nome da sobremesa"
                    />
                </div>

                {/* VALOR DO MENU */}
                <div className="control mb-3">
                    <label htmlFor="valor">Valor do Menu (€)</label>
                    <input
                        type="number"
                        id="valor"
                        name="valor"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                    />
                </div>

                {/* BOTÃO CRIAR CONTA */}
                <div className="text-center pt-3 mb-4">
                    <Button
                        color="yellow"
                        type="submit"
                    >
                        Criar Menu
                    </Button>
                </div>

                {/* MOSTRAMOS ERRORES (já não tinha tempo para deixa-lo mais bonito, =( sorry Sara) */}
                {errors.length > 0 && (
                    errors.map((error, index) => (
                        <div key={index} className="alert alert-danger p-1">{error}</div>
                    ))
                )}

            </form>
        </>
    )
}