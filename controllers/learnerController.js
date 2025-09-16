const { learner, user } = require('../models');

module.exports = {
  async getAll(req, res) {
    try {
      const learners = await learner.findAll({
        include: {
          model: user,
          as: 'user'
        }
      });
      res.json(learners);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getOne(req, res) {
    try {
      const oneLearner = await learner.findByPk(req.params.id, {
        include: {
          model: user,
          as: 'user'
        }
      });
      if (!oneLearner) return res.status(404).json({ error: "Learner not found" });
      res.json(oneLearner);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const newLearner = await learner.create(req.body);
      res.status(201).json(newLearner);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await learner.update(req.body, {
        where: { id: req.params.id },
      });
      if (!updated) return res.status(404).json({ error: "Learner not found" });
      const updatedLearner = await learner.findByPk(req.params.id, {
        include: { model: user, as: 'user' }
      });
      res.json(updatedLearner);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await learner.destroy({ where: { id: req.params.id } });
      if (!deleted) return res.status(404).json({ error: "Learner not found" });
      res.json({ message: "Learner deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
