const { researcherProject, researcher, project } = require('../models');

module.exports = {
  async getAll(req, res) {
    try {
      const researcherProjects = await researcherProject.findAll({
        include: [
          { model: researcher, as: 'researcher' },
          { model: project, as: 'project' }
        ]
      });
      res.json(researcherProjects);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getOne(req, res) {
    try {
      const oneResearcherProject = await researcherProject.findByPk(req.params.id, {
        include: [
          { model: researcher, as: 'researcher' },
          { model: project, as: 'project' }
        ]
      });
      if (!oneResearcherProject) return res.status(404).json({ error: "ResearcherProject not found" });
      res.json(oneResearcherProject);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const newResearcherProject = await researcherProject.create(req.body);
      res.status(201).json(newResearcherProject);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await researcherProject.update(req.body, {
        where: { id: req.params.id },
      });
      if (!updated) return res.status(404).json({ error: "ResearcherProject not found" });
      const updatedResearcherProject = await researcherProject.findByPk(req.params.id, {
        include: [
          { model: researcher, as: 'researcher' },
          { model: project, as: 'project' }
        ]
      });
      res.json(updatedResearcherProject);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await researcherProject.destroy({ where: { id: req.params.id } });
      if (!deleted) return res.status(404).json({ error: "ResearcherProject not found" });
      res.json({ message: "ResearcherProject deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
