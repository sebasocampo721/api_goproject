const Brevo = require("@getbrevo/brevo");

const apiInstance = new Brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const sendEmail = async ({ to, subject, text, html }) => {
  const emailData = {
    sender: { name: "GoProject", email: process.env.EMAIL_FROM },
    to: [{ email: to }],
    subject,
    textContent: text,
    htmlContent: html,
  };

  try {
    const response = await apiInstance.sendTransacEmail(emailData);
    console.log("✅ Correo enviado:", response);
    return response;
  } catch (error) {
    console.error("❌ Error al enviar correo:", error);
    throw error;
  }
};

module.exports = sendEmail;
