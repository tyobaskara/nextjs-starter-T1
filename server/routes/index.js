const express = require("express");
const testController = require("../controllers/testController");

// to use .env on server ( /.env )
console.log('this is from .env:', process.env.intro); // this is from .env: this_is_env_intro

const router = express.Router();

router.get('/api/testGet', testController.testGet);
router.post('/api/testPost', testController.testPost);

module.exports = router;
