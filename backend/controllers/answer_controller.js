const { Answer, Subject } = require("../models");
const crypto = require("crypto");
const subject = require("../models/subject");

/**
 * @module controller/answer_controller
 * @description This module contains the controller functions for managing answers
 */

const MAX_REVIEW_LENGTH = 200;
const MAX_FILE_LOCATION_LENGTH = 100;

/**
 * Generate Hex key
 * @function generateHexKey
 * @returns random 8bytes hex key
 */
function generateHexKey() {
  return crypto.randomBytes(8).toString("hex");
}

/**
 * @route POST /
 * @description Creates a new answer and associates it with a subject.
 * @param {string} req.body.file_location - The location of the answer file.
 * @param {number} req.body.duration - The time taken to answer.
 * @param {string} req.body.idSubject - The ID of the subject the answer belongs to.
 * @param {string} [req.body.review] - Optional review text.
 * @returns {Object} 201 - Created answer object.
 * @returns {Object} 400 - Request body is incomplete.
 * @returns {Object} 404 - The specified subject does not exist.
 * @returns {Object} 500 - Internal server error.
 */

exports.createAnswer = async (req, res) => {
  try {
    const { file_location, duration, idSubject, review } = req.body;

    console.log(req.body);

    if (!file_location || !duration || !idSubject) {
      return res.status(400).json({ error: "Request body incomplete" });
    }

    const subject = await Subject.findByPk(idSubject);
    if (!subject) {
      return res
        .status(404)
        .json({ error: "The subject defined by idSubject doesn't exist" });
    }

    if (review && review.length > MAX_REVIEW_LENGTH) {
      return res.status(422).json({ error: "Review is too long" });
    }

    if (file_location.length > MAX_FILE_LOCATION_LENGTH) {
      return res.status(422).json({ error: "File location path is too long" });
    }

    const idAnswer = req.body.idAnswer || generateHexKey();

    const answerToCreate = {
      idAnswer: idAnswer,
      file_location: file_location,
      duration: duration,
      idSubject: idSubject,
      review: review,
    };

    const answer = await Answer.create(answerToCreate);
    return res.status(201).json({ answer: answer, subject: subject });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

/**
 * @route DELETE /:idAnswer
 * @description Deletes an answer by its ID.
 * @param {string} req.body.idAnswer - The ID of the answer to delete.
 * @returns {Object} 200 - Confirmation message after deletion.
 * @returns {Object} 400 - Request body is incomplete.
 * @returns {Object} 404 - Answer not found.
 * @returns {Object} 500 - Internal server error.
 */
exports.deleteAnswer = async (req, res) => {
  try {
    const { idAnswer } = req.params;

    if (!idAnswer) {
      return res.status(400).json({ error: "Request body is incomplete" });
    }

    const answer = await Answer.findByPk(idAnswer);

    if (!answer) {
      return res.status(404).json({ error: "Answer doesn't exist" });
    }

    await answer.destroy();
    return res
      .status(200)
      .json({ message: `Answer ${idAnswer} has been deleted successfully` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

/**
 * @route PATCH /
 * @description Update an answer's review, file location, or answer time
 * @param {string} req.body.idAnswer - The ID of the answer to update (required)
 * @param {string} [req.body.review] - The updated review (optional)
 * @param {string} [req.body.file_location] - The updated file location (optional)
 * @param {number} [req.body.duration] - The updated answer time (optional)
 * @returns {Object} 400 - Request body is incomplete
 * @returns {Object} 404 - Answer not found
 * @returns {Object} 304 - No changes detected
 * @returns {Object} 200 - Answer updated successfully
 * @returns {Object} 500 - Internal server error
 */
exports.updateAnswer = async (req, res) => {
  try {
    const { idAnswer, review, file_location, duration } = req.body;

    if (!idAnswer) {
      return res.status(400).json({ error: "Request body is incomplete" });
    }

    const answer = await Answer.findByPk(idAnswer);
    if (!answer) {
      return res.status(404).json({ error: "Answer not found" });
    }

    if (
      (review === undefined || review === answer.review) &&
      (file_location === undefined || file_location === answer.file_location) &&
      (duration === undefined || duration === answer.duration)
    ) {
      return res
        .status(304)
        .json({ message: "No changes detected, answer remains the same." });
    }

    if (review !== undefined) {
      if (review.length > MAX_REVIEW_LENGTH) {
        return res.status(422).json({ error: "Review is too long" });
      }
      answer.review = review;
    }

    if (file_location !== undefined) {
      if (file_location.length > MAX_FILE_LOCATION_LENGTH) {
        return res
          .status(422)
          .json({ error: "File location path is too long" });
      }
      answer.file_location = file_location;
    }
    if (duration !== undefined) answer.duration = duration;

    await answer.save();

    return res
      .status(200)
      .json({ message: "Answer updated successfully", answer });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

/**
 * @route GET /:idAnswer
 * @description Retrieve an answer by its ID
 * @param {string} req.params.idAnswer - The ID of the answer to retrieve
 * @returns {Object} 400 - Request doesn't have the correct argument
 * @returns {Object} 404 - Answer not found
 * @returns {Object} 200 - Answer retrieved successfully
 * @returns {Object} 500 - Internal server error
 */
exports.getAnswerById = async (req, res) => {
  try {
    const { idAnswer } = req.params;
    if (!idAnswer) {
      return res
        .status(400)
        .json({ error: "Request doesn't have the correct argument" });
    }

    let answer = await Answer.findByPk(idAnswer, {
      include: {
        model: subject,
        as: "subject",
      },
    });
    if (!answer) {
      return res.status(404).json({ error: "Answer not found" });
    }

    return res.status(200).json({ answer });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

/**
 * @route GET /
 * @description Retrieve all answers
 * @returns {Object} 200 - List of all answers
 * @returns {Object} 404 - No answers found
 * @returns {Object} 500 - Internal server error
 */
exports.getAllAnswers = async (req, res) => {
  try {
    const answers = await Answer.findAll({
      include: {
        model: Subject,
        as: "subject",
      },
    });

    if (!answers || answers.length === 0) {
      return res.status(404).json({ error: "No answers found" });
    }

    for (let answer in answers) {
      const subject = Subject.findByPk(answer.subject);
      answer.subject = subject;
    }

    return res.status(200).json({ answers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
