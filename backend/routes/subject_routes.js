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
 * @route POST /create
 * @access Public
 */
router.post('/create', subjectController.createSubject);

/**
 * Assign a subject to a user or entity.
 * @route POST /assign
 * @access Public
 */
router.post('/assign', subjectController.assignSubject);

/**
 * Check the mode of a subject (e.g., prompt or question).
 * @route GET /check/:idSubject
 * @param {string} idSubject - The ID of the subject to check.
 * @access Public
 */
router.get('/check/:idSubject', subjectController.getSubjectMode);

/**
 * Read detailed information about a specific subject.
 * @route GET /read/:idSubject
 * @param {string} idSubject - The ID of the subject to read.
 * @access Public
 */
router.get('/read/:idSubject', subjectController.readSubject);

/**
 * Retrieve all subjects.
 * @route GET /all
 * @access Public
 */
router.get('/all', subjectController.readAllSubjects);

/**
 * Update the description of a subject.
 * @route PATCH /updateDescription
 * @param {string} idSubject - The ID of the subject to update.
 * @param {string} description - The new description for the subject.
 * @access Public
 */
router.patch('/updateDescription', subjectController.changeDescription);

/**
 * Delete a subject.
 * @route DELETE /delete
 * @param {string} idSubject - The ID of the subject to delete.
 * @access Public
 */
router.delete('/delete', subjectController.deleteSubject);

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

module.exports = router;