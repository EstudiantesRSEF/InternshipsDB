import path from 'path'
import fs from 'fs'
import formidable from 'formidable'
import db from '@/utils/db/firebase-admin'
import {verifyToken} from '@/lib/auth'

export const config = {
  api: {
    bodyParser: false,
  },
}

const ALLOWED_EXTENSIONS = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.webp',
  '.svg',
  '.mp4',
])

const parseForm = (req, options) =>
  new Promise((resolve, reject) => {
    const form = formidable(options)
    form.parse(req, (err, fields, files) => {
      if (err) reject(err)
      else resolve({fields, files})
    })
  })

export default async function handler(req, res) {
  const token = req.cookies?.token
  const decoded = token ? verifyToken(token) : null
  if (!decoded || decoded.role !== 'admin') {
    return res.status(403).json({error: 'acceso denegado'})
  }

  const options = {
    uploadDir: path.join(process.cwd(), '/public/uploads'),
    keepExtensions: true,
  }

  try {
    const {files} = await parseForm(req, options)
    const file = Array.isArray(files.file) ? files.file[0] : files.file

    const ext = path
      .extname(file.originalFilename || file.newFilename)
      .toLowerCase()

    if (!ALLOWED_EXTENSIONS.has(ext)) {
      fs.unlinkSync(file.filepath)
      return res.status(400).json({error: 'tipo de archivo no permitido'})
    }

    const safeName = path.basename(file.originalFilename || file.newFilename)
    const newPath = path.join(process.cwd(), '/public/uploads', safeName)

    fs.renameSync(file.filepath, newPath)

    const fieldToUpdate = ext === '.mp4' ? 'videoUrl' : 'logoUrl'

    await db
      .collection('page')
      .doc('landingPage')
      .set({[fieldToUpdate]: safeName}, {merge: true})

    return res.status(200).json({success: true, filename: safeName})
  } catch (error) {
    console.error('Upload error:', error)
    return res.status(500).json({error: 'Error al procesar el archivo'})
  }
}
