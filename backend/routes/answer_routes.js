const express = require('express');
const router = express.Router();

/**
 * Answer Routes
 * This files defines the endpoints for managing subjects. 
 * Each route corresponds to a controller function in 'answerController'
 * @module routes/subject
 */

const answerController = require('../controllers/answer_controller');

/**
 * @description Creates a new answer and associates it with a subject.
 * @route POST /create
 * @access Public
 */
router.post('/create', answerController.createAnswer);

/**
 * @description Delete a answer
 * @route DELETE /delete
 */
router.delete('/delete',answerController.deleteAnswer);

/**
 * @description Update a field for an answer
 * @route PATCH /update
 */
router.patch('/update', answerController.updateAnswer);
/**
 * @description Retrieve an answer by its ID
 * @route GET /:idAnswer
 */
router.get('/:idAnswer', answerController.getAnswerById);
/**
 * @description Retrieve all answers
 * @route GET /all
 */
router.get('/all',answerController.getAllAnswers);

module.exports = router;