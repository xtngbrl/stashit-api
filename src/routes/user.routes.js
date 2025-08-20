const userController = require('../controllers/user.controller');
const router = expression.Router();

router.get('/users', userController.listUsers);
router.get('/user/:id', userController.getUser);
router.post('/create-user', userController.createUser);
router.put('/update-user/:id', userController.updateUser);
router.delete('/delete-user/:id', userController.deleteUser);

module.exports = router; 