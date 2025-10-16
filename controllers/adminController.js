const { administrador, user } = require('../models');

module.exports = {
  async getAll(req, res) {
    try {
      const admins = await administrador.findAll({
        include: { model: user, as: 'user' }
      });
      res.json(admins);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getOne(req, res) {
    try {
      const foundAdmin = await administrador.findByPk(req.params.id, {
        include: { model: user, as: 'user' }
      });
      if (!foundAdmin) return res.status(404).json({ error: 'Admin no encontrado' });
      res.json(foundAdmin);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const newAdmin = await administrador.create(req.body);
      res.status(201).json(newAdmin);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await administrador.update(req.body, { where: { id: req.params.id } });
      if (!updated) return res.status(404).json({ error: 'Admin no encontrado' });
      const updatedAdmin = await administrador.findByPk(req.params.id, { include: { model: user, as: 'user' } });
      res.json(updatedAdmin);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await administrador.destroy({ where: { id: req.params.id } });
      if (!deleted) return res.status(404).json({ error: 'Admin no encontrado' });
      res.json({ message: 'Admin eliminado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
