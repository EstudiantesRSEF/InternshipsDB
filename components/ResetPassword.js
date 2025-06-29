import { useState } from 'react';
import { Button } from '@chakra-ui/react';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); // Nueva variable para controlar el estado de la solicitud

  const handleReset = async () => {
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMessage(data.message);
      setError('');
      setIsSubmitted(true); // Marcamos que la solicitud ha sido exitosa
    } catch (err) {
      setError(err.message);
      setMessage('');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Cambio de contraseña</h2>

              <div className="container mt-5">
                {isSubmitted ? (
                  // Si ya fue enviado, mostrar el mensaje
                  <div className="alert alert-success">{message}</div>
                ) : (
                  <>
                    <h2>Si tu correo está en nuestra base de datos te enviaremos una nueva contraseña</h2>
                    {message && <div className="alert alert-success">{message}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}
                    <input
                      type="email"
                      className="form-control mb-2"
                      placeholder="Correo electrónico"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button colorscheme="green" onClick={handleReset}>
                      Enviar nueva contraseña
                    </button>
                  </>
                )}

                <div className="text-center mt-4">
                  <a href="/internships">Login</a>
                  <br />
                  <a href="/LetEmailPage">¿Necesitas información? Solicítala</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
