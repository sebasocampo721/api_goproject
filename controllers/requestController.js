const { request, project } = require('../models');

module.exports = {
  async getAll(req, res) {
    try {
      const requests = await request.findAll({
        include: {
          model: project,
          as: 'project'
        }
      });
      res.json(requests);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getOne(req, res) {
    try {
      const oneRequest = await request.findByPk(req.params.id, {
        include: {
          model: project,
          as: 'project'
        }
      });
      if (!oneRequest) return res.status(404).json({ error: "Request not found" });
      res.json(oneRequest);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const newRequest = await request.create(req.body);
      res.status(201).json(newRequest);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await request.update(req.body, {
        where: { id: req.params.id },
      });
      if (!updated) return res.status(404).json({ error: "Request not found" });
      const updatedRequest = await request.findByPk(req.params.id, {
        include: {
          model: project,
          as: 'project'
        }
      });
      res.json(updatedRequest);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await request.destroy({ where: { id: req.params.id } });
      if (!deleted) return res.status(404).json({ error: "Request not found" });
      res.json({ message: "Request deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
