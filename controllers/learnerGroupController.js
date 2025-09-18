const { learnerGroup, learner, group } = require('../models');

module.exports = {
  async getAll(req, res) {
    try {
      const learnerGroups = await learnerGroup.findAll({
        include: [
          { model: learner, as: 'learner' },
          { model: group, as: 'group' }
        ]
      });
      res.json(learnerGroups);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getOne(req, res) {
    try {
      const oneLearnerGroup = await learnerGroup.findByPk(req.params.id, {
        include: [
          { model: learner, as: 'learner' },
          { model: group, as: 'group' }
        ]
      });
      if (!oneLearnerGroup) return res.status(404).json({ error: "LearnerGroup not found" });
      res.json(oneLearnerGroup);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const newLearnerGroup = await learnerGroup.create(req.body);
      res.status(201).json(newLearnerGroup);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await learnerGroup.update(req.body, {
        where: { id: req.params.id },
      });
      if (!updated) return res.status(404).json({ error: "LearnerGroup not found" });
      const updatedLearnerGroup = await learnerGroup.findByPk(req.params.id, {
        include: [
          { model: learner, as: 'learner' },
          { model: group, as: 'group' }
        ]
      });
      res.json(updatedLearnerGroup);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await learnerGroup.destroy({ where: { id: req.params.id } });
      if (!deleted) return res.status(404).json({ error: "LearnerGroup not found" });
      res.json({ message: "LearnerGroup deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
