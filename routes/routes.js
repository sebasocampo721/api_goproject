const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.originalUrl}`);
  next();
});


// Importar controladores
const userTypeController = require('../controllers/userTypeController');
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');
const instructorController = require('../controllers/instructorController');
const learnerController = require('../controllers/learnerController');
const learnerGroupController = require('../controllers/learnerGroupController');
const learnerProjectController = require('../controllers/learnerProjectController');
const productTypeController = require('../controllers/productTypeController');
const programController = require('../controllers/programController');
const projectController = require('../controllers/projectController');
const requestController = require('../controllers/requestController');
const researcherController = require('../controllers/researcherController');
const researcherProjectController = require('../controllers/researcherProjectController');
const tagController = require('../controllers/tagController');
const tagProjectController = require('../controllers/tagProjectController');
const groupController = require('../controllers/groupController');

const documentController = require('../controllers/documentController');

const authRoutes = require('./auth.routes');




console.log('userTypeController.getAll:', typeof userTypeController.getAll);
console.log('userController.getAll:', typeof userController.getAll);
console.log('adminController.getAll:', typeof adminController.getAll);



// Rutas para userTypes
router.get('/userTypes', userTypeController.getAll);
router.get('/userTypes/:id', userTypeController.getOne);
router.post('/userTypes', userTypeController.create);
router.put('/userTypes/:id', userTypeController.update);
router.delete('/userTypes/:id', userTypeController.delete);

// Rutas para users
router.get('/users', userController.getAll);
router.get('/users/:id', userController.getOne);
router.post('/users', userController.create);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.delete);

// Rutas para admins
router.get('/admins', adminController.getAll);
router.get('/admins/:id', adminController.getOne);
router.post('/admins', adminController.create);
router.put('/admins/:id', adminController.update);
router.delete('/admins/:id', adminController.delete);


// Rutas para instructors
router.get('/instructors', instructorController.getAll);
router.get('/instructors/:id', instructorController.getOne);
router.post('/instructors', instructorController.create);
router.put('/instructors/:id', instructorController.update);
router.delete('/instructors/:id', instructorController.delete);

// Rutas para learners
router.get('/learners', learnerController.getAll);
router.get('/learners/:id', learnerController.getOne);
router.post('/learners', learnerController.create);
router.put('/learners/:id', learnerController.update);
router.delete('/learners/:id', learnerController.delete);

// Rutas para learnerGroups
router.get('/learnerGroups', learnerGroupController.getAll);
router.get('/learnerGroups/:id', learnerGroupController.getOne);
router.post('/learnerGroups', learnerGroupController.create);
router.put('/learnerGroups/:id', learnerGroupController.update);
router.delete('/learnerGroups/:id', learnerGroupController.delete);

// Rutas para learnerProjects
router.get('/learnerProjects', learnerProjectController.getAll);
router.get('/learnerProjects/:id', learnerProjectController.getOne);
router.post('/learnerProjects', learnerProjectController.create);
router.put('/learnerProjects/:id', learnerProjectController.update);
router.delete('/learnerProjects/:id', learnerProjectController.delete);

// Rutas para productTypes
router.get('/productTypes', productTypeController.getAll);
router.get('/productTypes/:id', productTypeController.getOne);
router.post('/productTypes', productTypeController.create);
router.put('/productTypes/:id', productTypeController.update);
router.delete('/productTypes/:id', productTypeController.delete);

// Rutas para programs
router.get('/programs', programController.getAll);
router.get('/programs/:id', programController.getOne);
router.post('/programs', programController.create);
router.put('/programs/:id', programController.update);
router.delete('/programs/:id', programController.delete);

// Rutas para projects
router.get('/projects', projectController.getAll);
router.get('/projects/:id', projectController.getOne);
router.post('/projects', projectController.create);
router.put('/projects/:id', projectController.update);
router.delete('/projects/:id', projectController.delete);

// Rutas para requests
router.get('/requests', requestController.getAll);
router.get('/requests/:id', requestController.getOne);
router.post('/requests', requestController.create);
router.put('/requests/:id', requestController.update);
router.delete('/requests/:id', requestController.delete);

// Rutas para researchers
router.get('/researchers', researcherController.getAll);
router.get('/researchers/:id', researcherController.getOne);
router.post('/researchers', researcherController.create);
router.put('/researchers/:id', researcherController.update);
router.delete('/researchers/:id', researcherController.delete);

// Rutas para researcherProjects
router.get('/researcherProjects', researcherProjectController.getAll);
router.get('/researcherProjects/:id', researcherProjectController.getOne);
router.post('/researcherProjects', researcherProjectController.create);
router.put('/researcherProjects/:id', researcherProjectController.update);
router.delete('/researcherProjects/:id', researcherProjectController.delete);

// Rutas para tags
router.get('/tags', tagController.getAll);
router.get('/tags/:id', tagController.getOne);
router.post('/tags', tagController.create);
router.put('/tags/:id', tagController.update);
router.delete('/tags/:id', tagController.delete);

// Rutas para tagProjects
router.get('/tagProjects', tagProjectController.getAll);
router.get('/tagProjects/:id', tagProjectController.getOne);
router.post('/tagProjects', tagProjectController.create);
router.put('/tagProjects/:id', tagProjectController.update);
router.delete('/tagProjects/:id', tagProjectController.delete);

// Rutas para groups
router.get('/groups', groupController.getAll);
router.get('/groups/:id', groupController.getOne);
router.post('/groups', groupController.create);
router.put('/groups/:id', groupController.update);
router.delete('/groups/:id', groupController.delete);


// Rutas para documents
router.get('/documents', documentController.getAll);
router.get('/documents/:id', documentController.getOne);
router.post('/documents', documentController.create);
router.put('/documents/:id', documentController.update);
router.delete('/documents/:id', documentController.delete);



router.use('/auth', authRoutes);
module.exports = router;
