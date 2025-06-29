import { useState } from 'react';
import { Button } from '@chakra-ui/react';
import RegisterForm from '@/components/RegisterForm'

export default function RegisterComplete() {

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow" style={{ padding: '10%' }}>
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Registro de Usuario</h2>

                    <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
