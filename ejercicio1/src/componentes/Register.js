import React, { useState } from 'react';
import '../App.css';  // No olvides importar el CSS

function Register({ onChangeView }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost/mi_api/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage('¡Registro exitoso!');
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
        <h2>Registro</h2>
        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ padding: '10px', borderRadius: '5px', border: 'none' }}
          />
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
            Registrarse
          </button>
        </form>

        <button 
          onClick={onChangeView} 
          style={{ marginTop: '15px', padding: '10px', borderRadius: '5px', backgroundColor: '#61dafb', border: 'none', cursor: 'pointer' }}
        >
          ¿Ya tienes cuenta? Inicia sesión aquí
        </button>

        {message && <p>{message}</p>}
      </header>
    </div>
  );
}

export default Register;
