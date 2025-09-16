const { program, group, project } = require('../models');

module.exports = {
  async getAll(req, res) {
    try {
      const programs = await program.findAll({
        include: [
          { model: group, as: 'groups' },
          { model: project, as: 'projects' }
        ]
      });
      res.json(programs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getOne(req, res) {
    try {
      const oneProgram = await program.findByPk(req.params.id, {
        include: [
          { model: group, as: 'groups' },
          { model: project, as: 'projects' }
        ]
      });
      if (!oneProgram) return res.status(404).json({ error: "Program not found" });
      res.json(oneProgram);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const newProgram = await program.create(req.body);
      res.status(201).json(newProgram);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await program.update(req.body, {
        where: { id: req.params.id },
      });
      if (!updated) return res.status(404).json({ error: "Program not found" });
      const updatedProgram = await program.findByPk(req.params.id, {
        include: [
          { model: group, as: 'groups' },
          { model: project, as: 'projects' }
        ]
      });
      res.json(updatedProgram);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await program.destroy({ where: { id: req.params.id } });
      if (!deleted) return res.status(404).json({ error: "Program not found" });
      res.json({ message: "Program deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
