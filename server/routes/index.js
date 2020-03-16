const express = require("express");
const testController = require("../controllers/testController");

const router = express.Router();

router.get('/api/testGet', testController.testGet);
router.post('/api/testPost', testController.testPost);

module.exports = router;
