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
 * @route POST /
 * @access Public
 */
router.post('/', answerController.createAnswer);



/**
 * @description Update a field for an answer
 * @route PATCH /
 */
router.patch('/', answerController.updateAnswer);

/**
 * @description Retrieve all answers
 * @route GET /
 */
router.get('/',answerController.getAllAnswers);

router.get('/days/:days',answerController.getAllAnswersFromXDays);
/**
 * @description Delete a answer
 * @route DELETE /delete
 */
router.delete('/:idAnswer',answerController.deleteAnswer);

/**
 * @description Retrieve an answer by its ID
 * @route GET /:idAnswer
 */
router.get('/:idAnswer', answerController.getAnswerById);
module.exports = router;