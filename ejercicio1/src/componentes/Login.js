import React, { useState } from 'react';
import '../App.css';  // Asegúrate de importar el CSS

function Login({ onSuccess, onChangeView }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost/mi_api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage(`Bienvenido, ${data.username}`);
        onSuccess();
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Error de conexión con el servidor');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '10px', borderRadius: '5px', border: 'none' }}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '10px', borderRadius: '5px', border: 'none' }}
          />
          <button type="submit" style={{ padding: '10px', borderRadius: '5px', backgroundColor: '#61dafb', border: 'none', cursor: 'pointer' }}>
            Iniciar sesión
          </button>
        </form>

        <button 
          onClick={onChangeView} 
          style={{ marginTop: '15px', padding: '10px', borderRadius: '5px', backgroundColor: '#61dafb', border: 'none', cursor: 'pointer' }}
        >
          ¿No tienes cuenta? Regístrate aquí
        </button>

        {message && <p>{message}</p>}
      </header>
    </div>
  );
}

export default Login;
