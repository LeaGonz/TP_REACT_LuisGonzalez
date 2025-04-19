import { useContext } from 'react';
import '../styles/App.css'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../components/Button';

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();
    setErrors([]);

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const user = {
      email: data.email,
      password: data.password,
    };

    // Validar os dados do formulário
    const newErrors = [];

    if (!user.email) {
      newErrors.push('Email é obrigatório!');
    }

    if (!user.password) {
      newErrors.push('Palavra-passe é obrigatória!');
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    let sucess = await login(user);

    if (sucess) {
      navigate('/');
    } else {
      setErrors(['Credenciais inválidas. Por favor, verifique seu email e senha.']);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>

      <div className="text-center mb-4">
        <h2>Bem-vindo</h2>
      </div>

      <div>
        <div className="control mb-3">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            type="email"
            placeholder="seu@email.com"
          />
          {/* Mostrar erro se o email não for fornecido */}
          {errors.some(e => e.includes('Email')) && (
            <div className="alert alert-danger p-1">Email é obrigatório!</div>
          )}
        </div>

        <div className="control mb-3">
          <label htmlFor="password">Palavra-passe</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Palavra-passe"
          />
          {/* Mostrar erro se a palavra-passe não for fornecida */}
          {errors.some(e => e.includes('Palavra-passe')) && (
            <div className="alert alert-danger p-1">Palavra-passe é obrigatória!</div>
          )}
        </div>
      </div>

      {/* BOTÃO */}
      <div className="text-center pt-3 mb-4">
        <Button
          color="yellow"
          type="submit"
        >
          Entrar
        </Button>
      </div>

      {/* Mostrar erro se as credenciais são inválidas */}
      {errors.some(e => e.includes('Credenciais')) && (
        <div className="alert alert-danger p-1">Credenciais inválidas. Por favor, verifique seu email e senha.</div>
      )}

      <div className="form-footer text-center">
        <p>Não tem uma conta? <a href="/register">Registre-se</a></p>
      </div>

    </form>
  );
}