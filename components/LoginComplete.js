import { useState } from 'react';
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode'; 
import Cookies from 'js-cookie';
import { Button } from '@chakra-ui/react';
import LoginForm from '@/components/LoginForm'

export default function LoginComplete() {

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow" style={{ padding: '10%' }}>
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Registro de Usuario</h2>
                 <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
