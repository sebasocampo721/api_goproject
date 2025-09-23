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
        subject: "Recuperación de contraseña - MiBienestar",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
            <h2 style="color: #008550;">MiBienestar</h2>
            <p>Hola <strong>${user.name}</strong>,</p>
            <p>Recibimos una solicitud para restablecer tu contraseña. Si no realizaste esta solicitud, puedes ignorar este mensaje.</p>
            <p>Para restablecer tu contraseña, haz clic en el siguiente botón:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" style="background-color: #008550; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Restablecer Contraseña
              </a>
            </div>
            <p>O copia y pega este enlace en tu navegador:</p>
            <p style="word-break: break-all; color: #555;">${resetLink}</p>
            <p>Este enlace expirará en <strong>1 hora</strong>.</p>
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
