import { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

const BulkUploadInternships = () => {
  const [file, setFile] = useState(null);
  const [previewEntries, setPreviewEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
	const uploadedFile = e.target.files?.[0];
	if (uploadedFile) setFile(uploadedFile);
  };
   
  const toISODate = (date) => {
    if (!date) return '';
    if (date instanceof Date) return date.toISOString().slice(0, 10);
    // Intentar parsear cadenas tipo dd/mm/yyyy o yyyy-mm-dd:
    const m = String(date).match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (m) return `${m[1]}-${m[2]}-${m[3]}`;
    return String(date); // fallback
  };

  const normalizeRow = (row) => {
    // Si tu plantilla tiene encabezados distintos (p.ej. “Título”), mapea aquí
    return {
      title: row.title,
      description: row.description,
      educationLevel: row.educationLevel,
      modality: row.modality,
      discipline: row.discipline,
      location: row.location,
      hasAllowance: row.hasAllowance,
      allowanceAmount: row.allowanceAmount ?? null,
      language: row.language,
      duration: row.duration,
      season: row.season,
      startDate: toISODate(row.startDate),
      endDate: toISODate(row.endDate),
      url: row.url,
      promotionalImage: row.promotionalImage,
    };
  };

  const handleUpload = () => {
    if (!file) {
      alert('Selecciona un archivo primero.');
      return;
    }
    const ext = file.name.split('.').pop().toLowerCase();
    const reader = new FileReader();
    reader.onload = (e) => {
      let workbook;
      if (ext === 'csv') {
        const text = e.target.result;
        workbook = XLSX.read(text, { type: 'string' });
      } else {
        const data = new Uint8Array(e.target.result);
        workbook = XLSX.read(data, { type: 'array', cellDates: true });
      }
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rawRows = XLSX.utils.sheet_to_json(sheet, { defval: '' });
      const normalized = rawRows.map(normalizeRow);
      setPreviewEntries(normalized);
    };
    if (ext === 'csv') reader.readAsText(file);
    else reader.readAsArrayBuffer(file);
  };

  const handleConfirmUpload = async () => {
    if (!previewEntries.length) return;
    // Opción A: endpoint de bulk (ver punto 2)
    setLoading(true);
    try {
      await axios.post('/api/entry/bulk', { entries: previewEntries });
      alert('Internships enviadas correctamente (pendientes de aprobación).');
      setPreviewEntries([]);
      setFile(null);
    } catch (err) {
      alert('Error enviando internships: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <a href="/api/templates/internships-xlsx" download>Descargar plantilla (Excel)</a>
      <div>
        <input type="file" accept=".xlsx,.xls,.csv" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={!file}>Cargar</button>
      </div>
      {previewEntries.length > 0 && (
        <div>
          <h3>Previsualización</h3>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Educación</th>
                <th>Modalidad</th>
                <th>Localización</th>
                <th>URL</th>
                <th>Apertura</th>
                <th>Cierre</th>
              </tr>
            </thead>
            <tbody>
              {previewEntries.map((r, i) => (
                <tr key={i}>
                  <td>{r.title}</td>
                  <td>{r.educationLevel}</td>
                  <td>{r.modality}</td>
                  <td>{r.location}</td>
                  <td>{r.url}</td>
                  <td>{r.startDate}</td>
                  <td>{r.endDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleConfirmUpload} disabled={loading}>
            {loading ? 'Enviando...' : 'Confirmar envío'}
          </button>
        </div>
      )}
    </div>
  );
};

export default BulkUploadInternships;