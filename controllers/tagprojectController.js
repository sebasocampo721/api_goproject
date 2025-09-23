const { tagProject, tag, project } = require('../models');

module.exports = {
  async getAll(req, res) {
    try {
      const tagProjects = await tagProject.findAll({
        include: [
          { model: tag, as: 'tag' },
          { model: project, as: 'project' }
        ]
      });
      res.json(tagProjects);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getOne(req, res) {
    try {
      const oneTagProject = await tagProject.findByPk(req.params.id, {
        include: [
          { model: tag, as: 'tag' },
          { model: project, as: 'project' }
        ]
      });
      if (!oneTagProject) return res.status(404).json({ error: "TagProject not found" });
      res.json(oneTagProject);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      // Espera tagId y projectId en el body
      const { tagId, projectId } = req.body;
      const newTagProject = await tagProject.create({ tagId, projectId });
      res.status(201).json(newTagProject);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { tagId, projectId } = req.body;
      const [updated] = await tagProject.update({ tagId, projectId }, {
        where: { id: req.params.id },
      });
      if (!updated) return res.status(404).json({ error: "TagProject not found" });
      const updatedTagProject = await tagProject.findByPk(req.params.id, {
        include: [
          { model: tag, as: 'tag' },
          { model: project, as: 'project' }
        ]
      });
      res.json(updatedTagProject);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await tagProject.destroy({ where: { id: req.params.id } });
      if (!deleted) return res.status(404).json({ error: "TagProject not found" });
      res.json({ message: "TagProject deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
