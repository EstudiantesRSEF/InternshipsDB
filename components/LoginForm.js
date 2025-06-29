import { useState } from 'react';
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode'; 
import Cookies from 'js-cookie';
import { Button } from '@chakra-ui/react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Error desconocido');

      Cookies.set('token', data.token, { expires: 1 });

      router.push('/');

      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.message);
    }
  };

return (
  <>
    {message && <div className="alert alert-success">{message}</div>}
    {error && <div className="alert alert-danger">{error}</div>}

    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Correo electrónico</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="form-label">Contraseña</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="d-grid">
        <Button type="submit" colorScheme="green">Iniciar sesión</Button>
      </div>
    </form>

    <div className="text-center mt-4">
      <a href="/reset-password">¿Olvidaste tu contraseña?</a>
      <br />
      <a href="/LetEmailPage">¿Necesitas información? Solicítala</a>
    </div>
  </>
);

}
