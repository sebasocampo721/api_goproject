const { userType, user } = require('../models');

module.exports = {
  async getAll(req, res) {
    try {
      const userTypes = await userType.findAll({
        include: {
          model: user,
          as: 'users'
        }
      });
      res.json(userTypes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getOne(req, res) {
    try {
      const oneUserType = await userType.findByPk(req.params.id, {
        include: {
          model: user,
          as: 'users'
        }
      });
      if (!oneUserType) return res.status(404).json({ error: "UserType not found" });
      res.json(oneUserType);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const newUserType = await userType.create(req.body);
      res.status(201).json(newUserType);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await userType.update(req.body, {
        where: { id: req.params.id }
      });
      if (!updated) return res.status(404).json({ error: "UserType not found" });
      const updatedUserType = await userType.findByPk(req.params.id, {
        include: {
          model: user,
          as: 'users'
        }
      });
      res.json(updatedUserType);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await userType.destroy({ where: { id: req.params.id } });
      if (!deleted) return res.status(404).json({ error: "UserType not found" });
      res.json({ message: "UserType deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
