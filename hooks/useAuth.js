import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { doc, getDoc } from 'firebase/firestore';
import db from '@/utils/db/firebase-client'

const useAuth = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get('token');

      if (!token) {
        setUser(false);
        return;
      }

      try {
        const decoded = jwtDecode(token);

        if (decoded.exp * 1000 < Date.now()) {
          Cookies.remove('token');
          setUser(false);
          return;
        }

        // Leer el usuario actualizado desde Firebase
        const docRef = doc(db, 'users', decoded.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const dbUser = docSnap.data();
          setUser({
            ...dbUser,
            email: decoded.email, // en caso de que no venga en Firebase
          });
        } else {
          setUser(false);
        }

      } catch (err) {
        console.error('Error decoding token or fetching user:', err);
        Cookies.remove('token');
        setUser(false);
      }
    };

    checkAuth();
  }, [router]);

  return user;
};

export default useAuth;
