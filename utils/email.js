const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp-relay.brevo.com",
  port: process.env.EMAIL_PORT || 587,
  secure: false, // debe ser false para puerto 587
  auth: {
    user: process.env.EMAIL_USER, // cambia: antes usabas EMAIL_FROM
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Envía un correo electrónico con opciones dinámicas.
 * @param {Object} options - Opciones del correo.
 * @param {string} options.to - Destinatario.
 * @param {string} options.subject - Asunto del correo.
 * @param {string} [options.text] - Texto plano del mensaje.
 * @param {string} [options.html] - Contenido HTML del mensaje.
 * @returns {Promise}
 */
const sendEmail = async ({ to, subject, text, html }) => {
  const mailOptions = {
    from: `"GoProject" <${process.env.EMAIL_FROM}>`, // nombre visible en el correo
    to,
    subject,
    text,
    html,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("❌ Error al enviar el correo:", error);
        return reject(error);
      }
      console.log("✅ Correo enviado:", info.response);
      resolve(info);
    });
  });
};

module.exports = sendEmail;
