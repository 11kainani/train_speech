const { Comment, Answer  } = require("../models");
const crypto = require("crypto");


const MAX_REVIEW_LENGTH = 100;

/**
 * Generate Hex key
 * @function generateHexKey
 * @returns random 8bytes hex key
 */
function generateHexKey() {
  return crypto.randomBytes(8).toString("hex");
}
/**
 * @description Create a new comment with review text and a time signature (HH:mm or HH:mm:ss)
 * @route POST /
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Response} JSON response with the created comment or error
 */
exports.createComment = async (req, res) => {
    try {
      const { review, time_signature, idAnswer } = req.body;
  
      if (!review || !time_signature || !idAnswer) {
        return res.status(400).json({ error: "Request body is incomplete" });
      }

      if(review > MAX_REVIEW_LENGTH)
      {
        return res.status(400).json({error: "Length of the review is too long"});
      }
  
      const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/;
      if (!timeRegex.test(time_signature)) {
        return res.status(400).json({ error: "Invalid time format for time_signature" });
      }
  
      const answer = await Answer.findByPk(idAnswer);
      if (!answer) {
        return res.status(400).json({ error: "Answer not found" });
      }
  
      const comment = await Comment.create({
        idComment: generateHexKey(),
        review,
        time_signature,
        idAnswer,
      });
  
      return res.status(201).json({ comment });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  };

  /**
 * @description Get all comments
 * @route GET /
 * @param {Request} req
 * @param {Response} res
 * @returns {Response}
 */
exports.getAllComments = async (req, res) => {
    try {
      const comments = await Comment.findAll();
      return res.status(200).json({ comments });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  };

  
  /**
 * @description Get a single comment by ID
 * @route GET /:idComment
 * @param {Request} req
 * @param {Response} res
 * @returns {Response}
 */
exports.getCommentById = async (req, res) => {
    try {
      const { idComment } = req.params;
      const comment = await Comment.findByPk(idComment);
  
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }
  
      return res.status(200).json({ comment });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  };

  
  /**
 * @description Update a comment's review or time_signature
 * @route PATCH /:idComment
 * @param {Request} req
 * @param {Response} res
 * @returns {Response}
 */
exports.updateComment = async (req, res) => {
    try {
      const { idComment } = req.params;
      const { review, time_signature } = req.body;
  
      const comment = await Comment.findByPk(idComment);
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }
  
      if (time_signature) {
        const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/;
        if (!timeRegex.test(time_signature)) {
          return res.status(400).json({ error: "Invalid time format" });
        }
      }
  
      comment.review = review ?? comment.review;
      comment.time_signature = time_signature ?? comment.time_signature;
  
      await comment.save();
  
      return res.status(200).json({ comment });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  };

  /**
 * @description Delete a comment by ID
 * @route DELETE /:idComment
 * @param {Request} req
 * @param {Response} res
 * @returns {Response}
 */
exports.deleteComment = async (req, res) => {
    try {
      const { idComment } = req.params;
      const comment = await Comment.findByPk(idComment);
  
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }
  
      await comment.destroy();
      return res.status(200).json({ message: "Comment deleted" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  };
  