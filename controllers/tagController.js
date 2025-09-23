const { tag, project } = require('../models');

module.exports = {
  async getAll(req, res) {
    try {
      const tags = await tag.findAll({
        include: {
          model: project,
          as: 'projects'
        }
      });
      res.json(tags);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getOne(req, res) {
    try {
      const oneTag = await tag.findByPk(req.params.id, {
        include: {
          model: project,
          as: 'projects'
        }
      });
      if (!oneTag) return res.status(404).json({ error: "Tag not found" });
      res.json(oneTag);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const newTag = await tag.create(req.body);
      res.status(201).json(newTag);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await tag.update(req.body, {
        where: { id: req.params.id },
      });
      if (!updated) return res.status(404).json({ error: "Tag not found" });
      const updatedTag = await tag.findByPk(req.params.id, {
        include: {
          model: project,
          as: 'projects'
        }
      });
      res.json(updatedTag);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await tag.destroy({ where: { id: req.params.id } });
      if (!deleted) return res.status(404).json({ error: "Tag not found" });
      res.json({ message: "Tag deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
