import useAuth from '@/hooks/useAuth';
import Link from 'next/link';
import Container from '@/components/Container'; // <--- Corrección aquí

export default function AdminPage() {
  const auth = useAuth();

  if (auth === null) return <div>Cargando...</div>; // Mientras se valida la autenticación

  if (!auth) {
    return <div>No estás autorizado. Redirigiendo...</div>;
  }

  return (

    <Container>
      {/* Contenido principal */}
      <div style={{ padding: '1rem' }}>
        <h1>Bienvenido al Panel de Administración</h1>
        {/* Aquí va el contenido exclusivo para administradores */}
      </div>
    </Container>

  );
}