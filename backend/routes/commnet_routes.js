const express = require('express');
const router = express.Router();

const commentController = require('../controllers/comment_controller');

/**
 * @description Create a new comment
 * @route POST /
 */
router.post('/', commentController.createComment);

/**
 * @description Get all comments
 * @route GET /all
 */
router.get('/', commentController.getAllComments);

/**
 * @description Get a single comment by ID
 * @route GET /:idComment
 */
router.get('/:idComment', commentController.getCommentById);

/**
 * @description Update a comment by ID
 * @route PUT /:idComment
 */
router.patch('/:idComment', commentController.updateComment);

/**
 * @description Delete a comment by ID
 * @route DELETE /:idComment
 */
router.delete('/:idComment', commentController.deleteComment);

module.exports = router;
