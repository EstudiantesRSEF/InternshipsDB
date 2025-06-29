import { useState } from 'react';
import { Button } from '@chakra-ui/react';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [firstsurname, setFirstSurname] = useState('');
  const [secondsurname, setSecondSurname] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [registered, setRegistered] = useState(false); // Nuevo estado

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const res = await fetch('/api/users/createUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, firstsurname, secondsurname }),
      });

      const data = await res.json();

      if (res.status === 201) {
        setRegistered(true);
        setMessage(data.message);
        setEmail('');
        setPassword('');
        setName('');
        setFirstSurname('');
        setSecondSurname('');
      } else {
        throw new Error(data.error || 'Error desconocido');
      }

    } catch (err) {
      setError(err.message);
    }
  };

return (
  <>
    {message && (
      <div className="alert alert-success" role="alert">
        {message}
      </div>
    )}
    {error && (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    )}

    {!registered && (
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre completo</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="firstsurname" className="form-label">Apellido</label>
          <input
            type="text"
            className="form-control"
            id="firstsurname"
            value={firstsurname}
            onChange={(e) => setFirstSurname(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="secondsurname" className="form-label">Segundo Apellido</label>
          <input
            type="text"
            className="form-control"
            id="secondsurname"
            value={secondsurname}
            onChange={(e) => setSecondSurname(e.target.value)}
            required
          />
        </div>

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
          <Button type="submit" colorScheme="green">Registrarse</Button>
        </div>
      </form>
    )}
  </>
);
}
