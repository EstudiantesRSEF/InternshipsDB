// components/BulkUploadUsers.js
import { useState } from 'react';
import * as XLSX from 'xlsx';

const BulkUploadUsers = ({ handleBulkUpload }) => {
  const [file, setFile] = useState(null);
  const [previewUsers, setPreviewUsers] = useState([]);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleUpload = () => {
    if (!file) {
      alert("Por favor, selecciona un archivo primero.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      setPreviewUsers(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleConfirmUpload = () => {
    handleBulkUpload(previewUsers);
    setPreviewUsers([]);
    setFile(null);
  };

  return (
    <div className="my-4">
      <a href="/uploads/Libro1.xlsx" download className="btn">
        Descargar plantilla de ejemplo (Excel)
      </a>

      <div className="my-2">
        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
        <button className="btn btn-primary" onClick={handleUpload} disabled={!file}>
          Cargar Usuarios desde Excel
        </button>
      </div>

      {previewUsers.length > 0 && (
        <div>
          <h3>Usuarios que se cargarán:</h3>
          <table className="table table-striped mt-4">
            <thead>
              <tr>
                <th>Rol</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Segundo Apellido</th>
                <th>Correo</th>
              </tr>
            </thead>
            <tbody>
              {previewUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.role || 'No asignado'}</td>
                  <td>{user.name}</td>
                  <td>{user.firstsurname}</td>
                  <td>{user.secondsurname}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-success" onClick={handleConfirmUpload}>
            Confirmar Carga
          </button>
        </div>
      )}
    </div>
  );
};

export default BulkUploadUsers;
