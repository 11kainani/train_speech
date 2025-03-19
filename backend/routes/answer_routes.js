const express = require('express');
const router = express.Router();

/**
 * Answer Routes
 * This files defines the endpoints for managing subjects. 
 * Each route corresponds to a controller function in 'answerController'
 * @module routes/subject
 */

const answerController = require('../controllers/answer_controller');


router.post('/create', answerController.createAnswer);

module.exports = router;