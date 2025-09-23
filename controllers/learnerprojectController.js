const { learnerProject, learner, project } = require('../models');

module.exports = {
  async getAll(req, res) {
    try {
      const learnerProjects = await learnerProject.findAll({
        include: [
          { model: learner, as: 'learner' },
          { model: project, as: 'project' }
        ]
      });
      res.json(learnerProjects);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getOne(req, res) {
    try {
      const oneLearnerProject = await learnerProject.findByPk(req.params.id, {
        include: [
          { model: learner, as: 'learner' },
          { model: project, as: 'project' }
        ]
      });
      if (!oneLearnerProject) return res.status(404).json({ error: "LearnerProject not found" });
      res.json(oneLearnerProject);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const newLearnerProject = await learnerProject.create(req.body);
      res.status(201).json(newLearnerProject);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await learnerProject.update(req.body, {
        where: { id: req.params.id },
      });
      if (!updated) return res.status(404).json({ error: "LearnerProject not found" });
      const updatedLearnerProject = await learnerProject.findByPk(req.params.id, {
        include: [
          { model: learner, as: 'learner' },
          { model: project, as: 'project' }
        ]
      });
      res.json(updatedLearnerProject);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await learnerProject.destroy({ where: { id: req.params.id } });
      if (!deleted) return res.status(404).json({ error: "LearnerProject not found" });
      res.json({ message: "LearnerProject deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
