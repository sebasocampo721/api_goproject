const User = require("../models").user;
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/email");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");



module.exports = {
  authenticate: async function (req, res) {
    try {


      const data = await User.login(req.body.email, req.body.password);
      if (data.user) {
        const token = jwt.sign({ user: data.user }, process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 24, // 24 horas
        });

        return res.status(200).json({
          token,
          user: {
            uId: data.user.id,
            name: data.user.name,
            gender: data.user.gender,
            userTypeId: data.user.userTypeId,
            userType: data.user.userType?.name || null,
          },
        });
      }

      return res.status(data.status).json({ message: data.message });
    } catch (error) {
      console.error("Error en authenticate:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  getUserAuthenticated: async function (req, res) {
    try {
      const data = req.headers.authorization?.split(" ");
      if (data && data[0] === "Bearer") {
        const isValidToken = jwt.verify(data[1], process.env.JWT_SECRET);
        if (isValidToken) {
          return res.status(200).json({ user: isValidToken.user });
        }
        return res.status(401).json({ message: "Token inválido" });
      } else {
        return res.status(400).json({
          message: "El token debe ser enviado junto a Bearer",
        });
      }
    } catch (error) {
      console.error("Error en getUserAuthenticated:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  forgotPassword: async function (req, res) {
    try {
      const { email } = req.body;
      const user = await User.findOne({
        where: { email, state: "Activo" },
      });

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      const token = crypto.randomBytes(32).toString("hex");
      const expires = Date.now() + 1000 * 60 * 60; // 1 hora
      user.passwordResetToken = token;
      user.passwordResetExpires = new Date(expires);
      await user.save();

      const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;





    await sendEmail({
  to: user.email,
  subject: "🔐 Recuperación de contraseña - GoProject",
  html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background-color: #f8f9fa;">
      <!-- Header con logo -->
      <div style="background: linear-gradient(135deg, #008550 0%, #00a366 100%); padding: 30px 20px; text-align: center; border-radius: 15px 15px 0 0;">
        <!-- Aquí puedes agregar tu logo -->
        <img src="./logo.png" alt="GoProject Logo" style="max-height: 60px; margin-bottom: 15px;" />
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 300; letter-spacing: 1px;">GoProject</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 16px;">Tu bienestar es nuestra prioridad</p>
      </div>
      
      <!-- Contenido principal -->
      <div style="background-color: white; padding: 40px 35px; border-radius: 0 0 15px 15px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
        <!-- Icono de seguridad -->
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="display: inline-block; background: linear-gradient(135deg, #ff6b6b, #ffa726); width: 80px; height: 80px; border-radius: 50%; position: relative;">
            <span style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 35px;">🔒</span>
          </div>
        </div>
        
        <h2 style="color: #2c3e50; text-align: center; margin-bottom: 25px; font-size: 24px; font-weight: 600;">
          Solicitud de Recuperación de Contraseña
        </h2>
        
        <p style="color: #34495e; font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
          Hola <strong style="color: #008550;">${user.name}</strong>,
        </p>
        
        <p style="color: #34495e; font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
          Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en <strong>GoProject</strong>. 
          Si no fuiste tú quien realizó esta solicitud, puedes ignorar este mensaje de forma segura.
        </p>
        
        <p style="color: #34495e; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
          Para restablecer tu contraseña de forma segura, haz clic en el siguiente botón:
        </p>
        
        <!-- Botón principal mejorado -->
        <div style="text-align: center; margin: 40px 0;">
          <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
            <tr>
              <td style="background: linear-gradient(135deg, #008550 0%, #00a366 100%); border-radius: 30px; padding: 0;">
                <a href="${resetLink}" 
                   style="display: inline-block; 
                          background: linear-gradient(135deg, #008550 0%, #00a366 100%); 
                          color: white; 
                          padding: 16px 40px; 
                          text-decoration: none; 
                          border-radius: 30px; 
                          font-weight: 600; 
                          font-size: 16px;
                          box-shadow: 0 4px 15px rgba(0, 133, 80, 0.3);
                          transition: all 0.3s ease;
                          border: none;
                          letter-spacing: 0.5px;">
                  🔐 Restablecer mi Contraseña
                </a>
              </td>
            </tr>
          </table>
        </div>
        
        <!-- Línea divisoria -->
        <div style="border-top: 1px solid #e9ecef; margin: 35px 0; opacity: 0.5;"></div>
        
        <p style="color: #6c757d; font-size: 14px; line-height: 1.5; margin-bottom: 10px;">
          <strong>¿No funciona el botón?</strong> Copia y pega este enlace en tu navegador:
        </p>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #008550; margin-bottom: 25px;">
          <p style="word-break: break-all; color: #495057; font-size: 13px; font-family: monospace; margin: 0; line-height: 1.4;">
            ${resetLink}
          </p>
        </div>
        
        <!-- Información importante -->
        <div style="background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%); border: 1px solid #ffeaa7; border-radius: 10px; padding: 20px; margin: 25px 0;">
          <p style="color: #856404; font-size: 14px; margin: 0; line-height: 1.5;">
            ⏰ <strong>Importante:</strong> Este enlace expirará automáticamente en <strong>1 hora</strong> por tu seguridad. 
            Si necesitas un nuevo enlace, vuelve a solicitar la recuperación de contraseña.
          </p>
        </div>
        
        <!-- Consejos de seguridad -->
        <div style="background-color: #e8f5e8; border: 1px solid #c3e6c3; border-radius: 10px; padding: 20px; margin: 25px 0;">
          <h3 style="color: #008550; font-size: 16px; margin: 0 0 12px 0; font-weight: 600;">
            💡 Consejos de seguridad:
          </h3>
          <ul style="color: #2d5a3d; font-size: 14px; margin: 0; padding-left: 20px; line-height: 1.5;">
            <li>Nunca compartas tu contraseña con nadie</li>
            <li>Usa una contraseña única y segura</li>
            <li>Cierra sesión desde dispositivos compartidos</li>
          </ul>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="text-align: center; padding: 25px 20px; color: #6c757d; font-size: 12px; line-height: 1.4;">
        <p style="margin: 0 0 8px 0;">
          Este es un mensaje automático de <strong>GoProject</strong>. Por favor, no respondas a este correo.
        </p>
        <p style="margin: 0 0 15px 0;">
          Si tienes dudas, contáctanos en: 
          <a href="mailto:soporte@GoProject.com" style="color: #008550; text-decoration: none;">soporte@GoProject.com</a>
        </p>
        
        <!-- Redes sociales (opcional) -->
        <div style="margin-top: 20px;">
          <a href="#" style="display: inline-block; margin: 0 8px; text-decoration: none; color: #6c757d;">📘</a>
          <a href="#" style="display: inline-block; margin: 0 8px; text-decoration: none; color: #6c757d;">📷</a>
          <a href="#" style="display: inline-block; margin: 0 8px; text-decoration: none; color: #6c757d;">🐦</a>
        </div>
        
        <p style="margin: 20px 0 0 0; color: #adb5bd; font-size: 11px;">
          © 2024 GoProject. Todos los derechos reservados.
        </p>
      </div>
    </div>
  `,
});













      return res.status(200).json({
        message: "Se ha enviado un correo para recuperar la contraseña",
      });
    } catch (error) {
      console.error("Error al enviar el correo de recuperación:", error);
      return res.status(500).json({
        message: "Error al enviar el correo de recuperación",
      });
    }
  },

  resetPassword: async (req, res) => {
    const { newPassword, token } = req.body;
    try {
      const user = await User.findOne({
        where: {
          state: "Activo",
          passwordResetToken: token,
          passwordResetExpires: {
            [Op.and]: {
              [Op.ne]: null,
              [Op.gt]: new Date(),
            },
          },
        },
      });

      if (!user) {
        return res
          .status(404)
          .json({ message: "El token de restablecimiento es inválido o ha expirado" });
      }

      user.passwordResetToken = null;
      user.passwordResetExpires = null;
      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();

      return res.status(200).json({
        status: "OK",
        message: "Contraseña actualizada con éxito. Por favor, inicia sesión.",
      });
    } catch (error) {
      console.error("Error al restablecer la contraseña:", error);
      return res.status(500).json({
        status: "FAILED",
        message: "Error al cambiar la contraseña",
      });
    }
  },
};
