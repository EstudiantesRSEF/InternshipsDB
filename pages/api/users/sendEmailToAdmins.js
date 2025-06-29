import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { subject, body } = req.body; // El correo del usuario que ha sido aprobado

    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        cc: ['rqvaquero@gmail.com', 'estudiantes@rsef.es'], 
        subject: subject ,
        text: body ,
      };

      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: "Notificación enviada correctamente" });
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      return res.status(500).json({ error: "Error al enviar el correo" });
    }
  } else {
    return res.status(405).json({ error: "Método no permitido" });
  }
}