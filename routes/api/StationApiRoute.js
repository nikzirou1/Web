const express = require('express');
const router = express.Router();

const stationApiController = require('../../api/StationAPI');

router.get('/', stationApiController.getStations);
router.get('/:stationId', stationApiController.getStationById);
router.post('/',stationApiController.createStation);
router.put('/:stationId', stationApiController.updateStation);
router.delete('/:stationId', stationApiController.deleteStation);

module.exports = router;

