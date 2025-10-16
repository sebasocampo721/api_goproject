'use strict';
const bcrypt = require("bcryptjs");
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      user.belongsTo(models.userType, {
        foreignKey: 'userTypeId',
        as: 'userType'
      });

      user.hasOne(models.administrador, {
        foreignKey: 'userId',
        as: 'administrador'
      });

      user.hasOne(models.instructor, {
        foreignKey: 'userId',
        as: 'instructor'
      });

      user.hasOne(models.researcher, {
        foreignKey: 'userId',
        as: 'investigador'
      });

      user.hasOne(models.learner, {
        foreignKey: 'userId',
        as: 'aprendiz'
      });
    }

    // Método de instancia para validar contraseña
    async authenticatePassword(password) {
      try {
        return await bcrypt.compare(password, this.password);
      } catch (error) {
        return false;
      }
    }

    // Método estático para login
    // Método estático para login
static async login(email, password) {
  try {
    const { userType } = sequelize.models; // ✅ Trae el modelo directamente del sequelize global

    if (!userType) {
      console.error("❌ userType model no está registrado en Sequelize.");
      return { status: 500, message: "Modelo userType no encontrado" };
    }

    const user = await this.findOne({
      where: {
        email,
        state: 'Activo'
      },
      include: [{
        model: userType, // ✅ usa el modelo directamente
        as: 'userType'
      }]
    });

    if (!user) return { status: 404, message: 'Usuario no encontrado o inactivo' };

    const valid = await user.authenticatePassword(password);
    return valid
      ? { status: 200, user }
      : { status: 401, message: 'Usuario y/o contraseña inválidos' };

  } catch (error) {
    console.error("❌ Error en login:", error);
    return { status: 500, message: "Error interno del servidor", error: error.message };
  }
}


    // Método estático para actualizar contraseña
    static async updatePassword(id, newPassword) {
      const foundUser = await this.findByPk(id);
      if (!foundUser) return { status: 404, message: "Usuario no encontrado" };

      foundUser.password = await bcrypt.hash(newPassword, 10);
      await foundUser.save();

      return { status: 200, message: "Contraseña actualizada", user: foundUser };
    }
  }

  user.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gender: DataTypes.INTEGER,
    age: DataTypes.INTEGER,
    userTypeId: DataTypes.INTEGER,
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Activo"
    },
    passwordResetToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    passwordResetExpires: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'user',
  });

  // Hook para encriptar contraseña al crear
  user.beforeCreate(async (user, options) => {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });

  // Hook para encriptar contraseña al actualizar (opcional pero recomendado)
  user.beforeUpdate(async (user, options) => {
    if (user.changed('password')) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });

  return user;
};
