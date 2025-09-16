const { project, productType, program } = require('../models');

module.exports = {
  async getAll(req, res) {
    try {
      const projects = await project.findAll({
        include: [
          { model: productType, as: 'productType' },
          { model: program, as: 'program' }
        ]
      });
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getOne(req, res) {
    try {
      const oneProject = await project.findByPk(req.params.id, {
        include: [
          { model: productType, as: 'productType' },
          { model: program, as: 'program' }
        ]
      });
      if (!oneProject) return res.status(404).json({ error: "Project not found" });
      res.json(oneProject);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const newProject = await project.create(req.body);
      res.status(201).json(newProject);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await project.update(req.body, {
        where: { id: req.params.id },
      });
      if (!updated) return res.status(404).json({ error: "Project not found" });
      const updatedProject = await project.findByPk(req.params.id, {
        include: [
          { model: productType, as: 'productType' },
          { model: program, as: 'program' }
        ]
      });
      res.json(updatedProject);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await project.destroy({ where: { id: req.params.id } });
      if (!deleted) return res.status(404).json({ error: "Project not found" });
      res.json({ message: "Project deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
