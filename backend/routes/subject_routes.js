const express = require('express');
const router = express.Router();

/**
 * Subject Routes
 * This file defines the endpoints for managing subjects.
 * Each route corresponds to a controller function in `subjectController`.
 * 
 * @module routes/subject
 */

const subjectController = require('../controllers/subject_controller');



/**
 * Create a new subject.
 * @route POST /
 * @access Public
 */
router.post('/', subjectController.createSubject);

/**
 * Assign a subject to a user or entity.
 * @route POST /assign
 * @access Public
 */
router.post('/assign', subjectController.assignSubject);

/**
 * Check the mode of a subject (e.g., prompt or question).
 * @route GET /type/:idSubject
 * @param {string} idSubject - The ID of the subject to check.
 * @access Public
 */
router.get('/type/:idSubject', subjectController.getSubjectType);

/**
 * Retrieve all subjects.
 * @route GET /
 * @access Public
 */
router.get('/', subjectController.readAllSubjects);

/**
 * Update the description of a subject.
 * @route PATCH /updateDescription
 * @param {string} idSubject - The ID of the subject to update.
 * @param {string} description - The new description for the subject.
 * @access Public
 */
router.patch('/update', subjectController.changeDescription);

/**
 * Get all unassigned subject ids
 * @route GET /getAllUnassignedSubject
 * @acces Public
 */
router.get('/unassigned', subjectController.getAllUnassignedSubjectId);
/**
 * Delete a subject.
 * @route DELETE /delete
 * @param {string} idSubject - The ID of the subject to delete.
 * @access Public
 */
router.delete('/:idSubject', subjectController.deleteSubject);

/**
 * Get all prompts
 * @route GET /prompts
 * @access Public
 */
router.get('/prompts',subjectController.getAllPrompts);

/**
 * Get all questions 
 * @route GET /questions
 * @access Public
 */
router.get('/questions',subjectController.getAllQuestions);

/**
 * @route GET /subject/with-answers
 * @description Route to fetch all subjects that have at least one answer
 */
router.get('/with-answers', subjectController.getSubjectsWithAnswers);

/**
 * @route GET /subject/without-answers
 * @description Route to fetch all subjects that have no answers
 */
router.get('/without-answers', subjectController.getSubjectsWithoutAnswers);

/**
 * Read detailed information about a specific subject.
 * @route GET /:idSubject
 * @param {string} idSubject - The ID of the subject to read.
 * @access Public
 */
router.get('/:idSubject', subjectController.readSubject);

/**
 * Create a prompt
 * @route POST /prompt/create
 * @access Public
 */
router.post('/prompts',subjectController.createPrompt);

/**
 * Create a Question
 * @route POST /prompt/create
 * @access Public
 */
router.post('/questions',subjectController.createQuestion);

module.exports = router;