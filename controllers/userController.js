const { user, userType, admin, instructor, researcher, learner } = require('../models');

module.exports = {
  async getAll(req, res) {
    try {
      const users = await user.findAll({
        include: [
          { model: userType, as: 'userType' },
          { model: admin, as: 'admin' },
          { model: instructor, as: 'instructor' },
          { model: researcher, as: 'researcher' },
          { model: learner, as: 'learner' }
        ]
      });
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getOne(req, res) {
    try {
      const oneUser = await user.findByPk(req.params.id, {
        include: [
          { model: userType, as: 'userType' },
          { model: admin, as: 'admin' },
          { model: instructor, as: 'instructor' },
          { model: researcher, as: 'researcher' },
          { model: learner, as: 'learner' }
        ]
      });
      if (!oneUser) return res.status(404).json({ error: "User not found" });
      res.json(oneUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const newUser = await user.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await user.update(req.body, {
        where: { id: req.params.id }
      });
      if (!updated) return res.status(404).json({ error: "User not found" });
      const updatedUser = await user.findByPk(req.params.id, {
        include: [
          { model: userType, as: 'userType' },
          { model: admin, as: 'admin' },
          { model: instructor, as: 'instructor' },
          { model: researcher, as: 'researcher' },
          { model: learner, as: 'learner' }
        ]
      });
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await user.destroy({ where: { id: req.params.id } });
      if (!deleted) return res.status(404).json({ error: "User not found" });
      res.json({ message: "User deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
