import path from 'path';
import fs from 'fs';
import formidable from 'formidable';
import db from '@/utils/db/firebase-admin';

export const config = {
  api: {
    bodyParser: false,
  },
};

const parseForm = (req, options) =>
  new Promise((resolve, reject) => {
    const form = formidable(options);
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });

export default async function handler(req, res) {
  const options = {
    uploadDir: path.join(process.cwd(), '/public/uploads'),
    keepExtensions: true,
  };

  try {
    const { fields, files } = await parseForm(req, options);
    const file = Array.isArray(files.file) ? files.file[0] : files.file;

    const ext = path.extname(file.originalFilename || file.newFilename);
    const thename = file.originalFilename;
    const newPath = path.join(process.cwd(), '/public/uploads', thename);

    fs.renameSync(file.filepath, newPath);

    const extension = ext.toLowerCase();
    const fieldToUpdate = extension === '.mp4' ? 'videoUrl' : 'logoUrl';

    await db
      .collection('page')
      .doc('landingPage')
      .set({ [fieldToUpdate]: thename }, { merge: true }); // ✅ Admin SDK

    return res.status(200).json({ success: true, filename: thename });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Error al procesar el archivo' });
  }
}