const express = require('express');
const router = express.Router();

const engineApiController = require('../../api/EngineAPI');

router.get('/', engineApiController.getEngines);
router.get('/:engineId', engineApiController.getEngineById);
router.post('/',engineApiController.createEngine);
router.put('/:engineId', engineApiController.updateEngine);
router.delete('/:engineId', engineApiController.deleteEngine);

module.exports = router;