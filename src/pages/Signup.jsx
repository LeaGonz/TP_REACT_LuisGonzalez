import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css'
import Button from '../components/Button';

export default function Signup() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    setErrors([]);

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Validar os dados do formulário
    const newErrors = [];

    if (!data.password) {
      newErrors.push('Palavra-passe é obrigatória');
    } else if (data.password.length < 6) {
      newErrors.push('A palavra-passe deve ter pelo menos 6 caracteres');
    }

    if (data.password !== data.confirmPassword) {
      newErrors.push('As palavra-passes não coincidem');
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    // Preparamos os dados para enviar
    const user = {
      firstName: data["first-name"],
      lastName: data["last-name"],
      email: data.email,
      password: data.password,
      role: data.role,
    };

    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    navigate("/", { state: { message: `Conta criada com sucesso! Bem-vindo ${user?.firstName?.toUpperCase() || ''}` } });

  }

  return (
    <form className="form-signup" onSubmit={handleSubmit}>
      <div className="text-center mb-4">
        <h2>Junte-se ao Lamasan</h2>
      </div>

      {/* NOME */}
      <div className="control-row">
        <div className="control mb-3">
          <label htmlFor="first-name">Nome</label>
          <input
            type="text"
            id="first-name"
            name="first-name"
            placeholder="Seu nome"
            required
          />
        </div>

        {/* APELIDO */}
        <div className="control mb-3">
          <label htmlFor="last-name">Sobrenome</label>
          <input
            type="text"
            id="last-name"
            name="last-name"
            placeholder="Seu sobrenome"
            required
          />
        </div>
      </div>

      {/* EMAIL */}
      <div className="control mb-3">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="seu@email.com"
          required
        />
      </div>

      {/* PALAVRA-PASSE */}
      <div className="control-row">
        <div className="control mb-3">
          <label htmlFor="password">Palavra-passe</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Mínimo 6 caracteres"
            required
          />
        </div>
        <div className="control mb-3">
          <label htmlFor="confirm-password">Confirmar palavra-passe</label>
          <input
            id="confirm-password"
            type="password"
            name="confirmPassword"
            placeholder="Repita sua senha"
            required
          />
        </div>
      </div>

      {/* ROLES */}
      <div className="control mb-3">
        <label className='mb-2'>Como você deseja utilizar nossa app?</label>
        <select
          id="role"
          name="role"
          className="form-select form-select-sm"
          required>
          <option value="gestor">Gestor</option>
          <option value="consumidor">Consumidor</option>
          <option value="cozinha">Cozinha</option>
        </select>
      </div>

      {/* BOTÃO CRIAR CONTA */}
      <div className="text-center pt-3 mb-4">
        <Button
          color="dark"
          type="submit"
        >
          Criar Conta
        </Button>
      </div>


      {/* MOSTRAMOS ERRORES (já não tinha tempo para deixa-lo mais bonito, =( sorry Sara) */}
      {errors.length > 0 && (
        errors.map((error, index) => (
          <div key={index} className="alert alert-danger p-1">{error}</div>
        ))
      )}

      <div className="form-footer text-center">
        <p>Já tem uma conta? <a href="/login">Faça login</a></p>
      </div>

    </form>
  );
}