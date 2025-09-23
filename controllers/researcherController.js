const { researcher, user } = require('../models');

module.exports = {
  async getAll(req, res) {
    try {
      const researchers = await researcher.findAll({
        include: {
          model: user,
          as: 'user'
        }
      });
      res.json(researchers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getOne(req, res) {
    try {
      const oneResearcher = await researcher.findByPk(req.params.id, {
        include: {
          model: user,
          as: 'user'
        }
      });
      if (!oneResearcher) return res.status(404).json({ error: "Researcher not found" });
      res.json(oneResearcher);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const newResearcher = await researcher.create(req.body);
      res.status(201).json(newResearcher);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await researcher.update(req.body, {
        where: { id: req.params.id },
      });
      if (!updated) return res.status(404).json({ error: "Researcher not found" });
      const updatedResearcher = await researcher.findByPk(req.params.id, {
        include: {
          model: user,
          as: 'user'
        }
      });
      res.json(updatedResearcher);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await researcher.destroy({ where: { id: req.params.id } });
      if (!deleted) return res.status(404).json({ error: "Researcher not found" });
      res.json({ message: "Researcher deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
