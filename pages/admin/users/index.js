import Container from '@/components/Container';
import UserModal from './UserModal';
import UsersTable from './UsersTable';
import { useUserActions } from '@/hooks/useUserActions';
import { useState, useEffect } from 'react';
import BulkUploadUsers from '@/components/BulkUploadUsers';

const Users = () => {
  const {
    users, message, messageType, editingUser, setEditingUser,
    handleApprove, handleDelete, handleCreateUser, handleUpdateUser, toggleUserRole, handleBulkUpload
  } = useUserActions();

  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (data, isEdit) => {
    const success = isEdit ? await handleUpdateUser(data) : await handleCreateUser(data);
    if (success) {
      setShowModal(false);
      setEditingUser(null);
    }
  };

  return (
    <Container>
      {message && <div className={`alert ${messageType === 'success' ? 'alert-success' : 'alert-danger'} text-center`}>{message}</div>}
      <UsersTable
        users={users}
        onApprove={handleApprove}
        onDelete={handleDelete}
        onEdit={(user) => { setEditingUser(user); setShowModal(true); }}
        toggleRole={toggleUserRole}
       handleBulkUpload={handleBulkUpload}
      />
      <div className="row my-4">
        <div className="col-md-4 mb-3">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Crear nuevo usuario</h5>
              <p className="card-text">Agrega un nuevo usuario manualmente al sistema.</p>
              <button className="btn btn-primary" onClick={() => { setEditingUser(null); setShowModal(true); }}>
                Crear Usuario
              </button>
              <UserModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                editingUser={editingUser}
                onSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>

        <div className="col-md-8 mb-3">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Carga masiva desde Excel</h5>
              <p className="card-text">Carga múltiples usuarios utilizando un archivo Excel.</p>
              <BulkUploadUsers handleBulkUpload={handleBulkUpload} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Users;
