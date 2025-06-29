import { useState } from 'react';
import { Button } from '@chakra-ui/react';

export default function LetEmailForInfoForm() {
  const [email, setEmail] = useState('');

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [registered, setRegistered] = useState(false); // Nuevo estado

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const subject = "Petición de información desde la web."
      const body = "El usuario "+ email + " solicitó información desde la web"

      const res = await fetch('/api/users/sendEmailToAdmins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, body }),
      });

      const data = await res.json();

      if (res.status === 200) {
        setRegistered(true);
        setMessage(data.message);
        setEmail('');
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
  <p>Si nos dejas tu email, te enviamos toda la información.</p>
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

        <div className="d-grid">
          <Button type="submit" colorScheme="green">Enviar</Button>
        </div>
      </form>
    )}
  <p>Nota: tu correo electrónico no se almacenará en ningún caso, sólo lo utilizaremos para mandarte información sobre el Grupo de Estudiantes de la Real Sociedad Española de Física.</p>
  </>
);
}
