import { Modal } from 'react-bootstrap';

const UserModal = ({ show, handleClose, editingUser, onSubmit }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{editingUser ? 'Editar Usuario' : 'Crear Usuario'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = {
              name: e.target.name.value,
              firstsurname: e.target.firstsurname.value,
              secondsurname: e.target.secondsurname.value,
              email: e.target.email.value,
              password: e.target.password.value,
            };
            onSubmit(formData, !!editingUser);
          }}
        >
          {['name', 'firstsurname', 'secondsurname', 'email', 'password'].map(field => (
            <div className="mb-3" key={field}>
              <label htmlFor={field} className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type={field === 'password' ? 'password' : 'text'}
                className="form-control"
                id={field}
                defaultValue={editingUser?.[field] || ''}
                required={field !== 'password' || !editingUser}
              />
            </div>
          ))}
          <button type="submit" className="btn btn-primary">
            {editingUser ? 'Actualizar' : 'Crear'}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default UserModal;
