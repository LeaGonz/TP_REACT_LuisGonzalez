import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

// Função para verificar se o usuário está autenticado
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {

    if (localStorage.getItem("role") && localStorage.getItem("email")) {
      setUser({
        firstName: localStorage.getItem("firstName"),
        lastName: localStorage.getItem("lastName"),
        email: localStorage.getItem("email"),
        role: localStorage.getItem("role")
      });
    }
  }, []);

  // Funcão para autenticar o usuário e adicionar o role ao localStorage
  const login = async (authData) => {

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();

    localStorage.setItem("firstName", data.firstName);
    localStorage.setItem("lastName", data.lastName);
    localStorage.setItem("email", data.email);
    localStorage.setItem("role", data.role);

    setUser({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: data.role
    });

    return true;
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};