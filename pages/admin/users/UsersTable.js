import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Checkbox, RadioGroup, Radio, Stack, Text } from '@chakra-ui/react';
import * as XLSX from 'xlsx';
import { useState } from 'react';


const UsersTable = ({ users, onApprove, onDelete, onEdit, toggleRole, handleBulkUpload }) => {
  const [file, setFile] = useState(null);
  const [previewUsers, setPreviewUsers] = useState([]);
  const [selectedApprove, setSelectedApprove] = useState({});
  const [selectedDeny, setSelectedDeny] = useState({});
  const [selectedDelete, setSelectedDelete] = useState({});



  const toggleCheckbox = (type, email) => {
    const updater = {
      approve: [selectedApprove, setSelectedApprove],
      deny: [selectedDeny, setSelectedDeny],
      delete: [selectedDelete, setSelectedDelete]
    };

    const [state, setState] = updater[type];
    setState(prev => ({ ...prev, [email]: !prev[email] }));
  };

  const toggleSelectAll = (type, checked) => {
    const updater = {
      approve: setSelectedApprove,
      deny: setSelectedDeny,
      delete: setSelectedDelete
    };

    const newState = {};
    users.forEach(user => {
      newState[user.email] = checked;
    });

    updater[type](newState);
  };
  const ArproveAll = () => {
    const emails = Object.keys(selectedApprove).filter(email => selectedApprove[email]);
    console.log('aprobar:', emails);
    emails.forEach(email => {
        onApprove(email, true)
      });
      console.log(Object.keys(selectedApprove).length)
      setSelectedApprove({});
      console.log(Object.keys(selectedApprove).length)

  };

  const DenyAll = () => {
    const emails = Object.keys(selectedDeny).filter(email => selectedDeny[email]);
     console.log('Denegar:', emails);
      emails.forEach(email => {
        onApprove(email, false)
      });

       setSelectedDeny({});
  };

  const DeleteAll = () => {
    const emails = Object.keys(selectedDelete).filter(email => selectedDelete[email]);
    
    const string = emails.join(','); 

    if (!window.confirm(`¿Eliminar usuarios ${string}?`)) return;
     
      emails.forEach(email => {
         onDelete(email)
      });
       setSelectedDelete({});
  };

  return (
    <>

      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>Rol</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Segundo Apellido</th>
            <th>Correo</th>
            <th>Creación</th>
            <th>Aprobación</th>
            <th>

              <Checkbox isChecked={Object.keys(selectedApprove).length > 0}
               onChange={(e) => toggleSelectAll('approve', e.target.checked)}> </Checkbox>
              <button onClick={ArproveAll} className="btn btn-success btn-sm me-1">Aprobar todos</button>
            </th>
            <th>
              <Checkbox isChecked={Object.keys(selectedDeny).length > 0}
               onChange={(e) => toggleSelectAll('deny', e.target.checked)}> </Checkbox>
              <button onClick={DenyAll} className="btn btn-warning btn-sm me-1">Denegar todos</button>
            </th>
            <th>
              <Checkbox isChecked={Object.keys(selectedDelete).length > 0}
               onChange={(e) => toggleSelectAll('delete', e.target.checked)}> </Checkbox>
              <button onClick={DeleteAll} className="btn btn-danger btn-sm me-1">Eliminar todos</button>
            </th>
         <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.email}>
            <td>
              <RadioGroup
                onChange={(value) => toggleRole(user, value)} // Nuevo valor seleccionado
                value={user.role}
              >
                <Stack direction="row">
                  <Radio value="user">User</Radio>
                  <Radio value="editor">Editor</Radio>
                  <Radio value="admin">Admin</Radio>
                </Stack>
              </RadioGroup>
              <Text fontSize="sm" color="gray.500">Rol actual: {user.role}</Text>
            </td>
              <td>{user.name}</td>
              <td>{user.firstsurname}</td>
              <td>{user.secondsurname}</td>
              <td>{user.email}</td>
              <td>  {user.createdAt && user.createdAt._seconds
                    ? new Date(user.createdAt._seconds * 1000).toLocaleDateString()
                    : 'N/A'}</td>
              <td>{user.approved ? <FaCheckCircle color="green" /> : <FaTimesCircle color="red" />}</td>
              <td>
                <Checkbox
                  name="approve"
                  isChecked={!!selectedApprove[user.email]}
                  onChange={() => toggleCheckbox('approve', user.email)}
                />
              </td>
              <td>
                <Checkbox
                  name="deny"
                  isChecked={!!selectedDeny[user.email]}
                  onChange={() => toggleCheckbox('deny', user.email)}
                />
              </td>
              <td>
                <Checkbox
                  name="delete"
                  isChecked={!!selectedDelete[user.email]}
                  onChange={() => toggleCheckbox('delete', user.email)}
                />
              </td>
              <td><button onClick={() => onEdit(user)} className="btn btn-info btn-sm">Editar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UsersTable;
