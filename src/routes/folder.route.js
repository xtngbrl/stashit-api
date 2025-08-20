const folderController = require('../controllers/folder.controller');
const router = express.Router();

router.get('/folder/:id', folderController.getFolder);
router.post('/create-folder', folderController.createFolder);
router.delete('/delete-folder/:id', folderController.deleteFolder);

module.exports = router;