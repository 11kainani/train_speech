const express = require('express');
const router = express.Router();


const subjectController = require('../controllers/subject_controller');



router.post('/create',subjectController.createSubject);
router.post('/assign',subjectController.assignSubject);
router.get('/check/:idSubject',subjectController.getSubjectMode);
router.get('/read/:idSubject',subjectController.readSubject)
router.get('/all', subjectController.readAllSubjects);
router.patch('/updateDescription', subjectController.changeDescription);
router.delete('/delete',subjectController.deleteSubject );

module.exports = router;