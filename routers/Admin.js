const express  = require('express');
const AdminControllers = require('../controllers/Admin')
const router = express.Router();

router.get('/login',AdminControllers.GetLogin)

router.post('/login',AdminControllers.PostLogin)

router.get('/CreateAdmin',AdminControllers.GetCreateAdmin);

router.post('/CreateAdmin',AdminControllers.PostCreateAdmin);

module.exports = router;