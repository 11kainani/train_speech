const express = require('express');
const router = express.Router();


const subjectController = require('../controllers/subject_controller');



router.post('/create',subjectController.createSubject);
router.post('/assign',subjectController.assignSubject);
router.get('/check/:idSubject',subjectController.getSubjectMode);
router.get('/read/:idSubject',subjectController.readSubject)

module.exports = router;