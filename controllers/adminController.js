const { admin, user } = require('../models');

module.exports = {
  // Obtener todos los admins
  async getAll(req, res) {
    try {
      const admins = await admin.findAll({
        include: {
          model: user,
          as: 'user',
        },
      });
      res.json(admins);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Obtener un admin por ID
  async getOne(req, res) {
    try {
      const foundAdmin = await admin.findByPk(req.params.id, {
        include: {
          model: user,
          as: 'user',
        },
      });
      if (!foundAdmin) {
        return res.status(404).json({ error: 'Admin no encontrado' });
      }
      res.json(foundAdmin);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Crear nuevo admin
  async create(req, res) {
    try {
      const newAdmin = await admin.create(req.body);
      res.status(201).json(newAdmin);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Actualizar admin
  async update(req, res) {
    try {
      const [updated] = await admin.update(req.body, {
        where: { id: req.params.id },
      });
      if (!updated) {
        return res.status(404).json({ error: 'Admin no encontrado' });
      }
      const updatedAdmin = await admin.findByPk(req.params.id);
      res.json(updatedAdmin);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Eliminar admin
  async delete(req, res) {
    try {
      const deleted = await admin.destroy({
        where: { id: req.params.id },
      });
      if (!deleted) {
        return res.status(404).json({ error: 'Admin no encontrado' });
      }
      res.json({ message: 'Admin eliminado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
