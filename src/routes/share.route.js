const shareController = require('../controllers/share.controller');
const router = express.Router();

router.get('/get-share/:token', shareController.getShare);
router.post('/create-share', shareController.createShare);
router.delete('/revoke-share/:token', shareController.revokeShare);

module.exports = router;