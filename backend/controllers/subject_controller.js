const { Subject, Answer} = require("../models");
const crypto = require("crypto");

/**
 * @module controllers/subject_controller
 * @description This module contains the controller functions for managing subjects, including creating, updating, retrieving, and deleting subjects.
 */

/**
 * Maximum size of a description
 */
const maxSizeDescription = 200;

/**
 * Generate Hex key
 * @function generateHexKey
 * @returns random 8bytes hex key
 */
function generateHexKey() {
  return crypto.randomBytes(8).toString("hex");
}

/**
 *
 * Creates a new subject in the database.
 *
 * @async
 * @function createSubject
 * @route {POST} /create
 * @param {Object} req - Express request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.description - The description of the subject to be created.
 * @param {Object} res - Express response object.
 * @returns {Promise<Response>} - Sends a JSON response with the result of the operation.
 * @throws {Error} - Sends a 500 status if there is a server error.
 */
exports.createSubject = async (req, res) => {
  try {
    const description = req.body.description;
    if (!description) {
      return res.status(400).json({ error: "Request body incomplete" });
    }

    if (description.length >= maxSizeDescription) {
      return res.status(422).json({ error: "Length of the description is too long" });
    }

    const idSubject = generateHexKey();
    const subject_to_create = { idSubject, description };

    // Check if the subject already exists
    const existingSubject = await Subject.findOne({ where: { description } });
    if (existingSubject) {
      return res.status(409).json({ error: "Subject already exists" });
    }

    // Create the new subject
    const created_subject = await Subject.create(subject_to_create);
    return res.status(201).json({ subject: created_subject });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};



/**
 * Get the mode the subject: either prompt or question.
 *  @async
 * @function readSubject
 * @route {GET} /:idSubject
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Express the params of the request
 * @param {Object} req.params.idSubject - The subject for which the information is necessary.
 * @param {Object} res - Express response object.
 * @returns  {Promise<Response>} - Sends a JSON response with the result of the operation.
 * @throws {Error} - Sends a 500 status if there is a server error.
 */
exports.readSubject = async (req, res) => {
  try {
    const { idSubject } = req.params;

    // Validate the idSubject parameter
    if (!idSubject) {
      return res.status(400).json({ error: "Request doesn't have the correct argument" }); 
    }

    // Find the subject by ID
    const subject = await Subject.findByPk(idSubject);
    if (!subject) {
      return res.status(404).json({ error: "Subject not found" }); 
    }

    return res.status(200).json({ subject: subject }); 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};


/**
 * Change the description of a subject
 * @async
 * @function changeDescription
 * @route {PATCH} /update
 * @param {Object} req - Express request object.
 * @param {Object} req.body - The request body
 * @param {Object} req.body.idSubject - The id associated to the subject.
 * @param {Object} res - Espress response object
 * @returns {Promise<Response>} - Sends a JSON response with the result of the operation.
 * @throws {Error} - Sends a 500 status if there is a server error.
 */
exports.changeDescription = async (req, res) => {
  try {
    const { idSubject, description } = req.body;

    // Validate the idSubject
    if (!idSubject) {
      return res.status(400).json({ error: "idSubject not defined" }); // 400: Bad Request
    }

    // Find the subject by ID
    const subject = await Subject.findByPk(idSubject);
    if (!subject) {
      return res.status(404).json({ error: "Subject not found" }); // 404: Not Found
    }

    // Validate the description
    if (!description) {
      return res.status(400).json({ error: "Description is required" }); // 400: Bad Request
    }

    if (description.length >= maxSizeDescription) {
      return res.status(422).json({ error: "Description is too long" }); // 422: Unprocessable Entity
    }

    // Update the subject's description
    subject.description = description;
    await subject.save();

    return res.status(200).json({ message: "Record updated successfully", subject }); // 200: OK
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" }); // 500: Internal Server Error
  }
};

/**
 * Read all the subjects
 * @async
 * @function readAllSubjects
 * @route {GET} /
 * @param {Object} req - Express request object.
 * @param {Object} res - Espress response object
 * @returns {Promise<Response>} - Sends a JSON response with the result of the operation.
 * @throws {Error} - Sends a 500 status if there is a server error.
 */
exports.readAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.findAll();
    console.log(subjects);

    return res.status(200).json({ subjects: subjects }); 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" }); 
  }
};


/**
 * Delete a subject
 * @async
 * @function deleteSubject
 * @route {DELETE} /:idSubject
 * @param {Object} req - Express request object.
 * @param {Object} req.query - The request query
 * @param {Object} req.query.idSubject - The id associated to the subject.
 * @param {Object} res - Espress response object
 * @returns {Promise<Response>} - Sends a JSON response with the result of the operation.
 * @throws {Error} - Sends a 500 status if there is a server error.
 */
exports.deleteSubject = async (req, res) => {
  const idSubject = req.params.idSubject;

  try {
    if (!idSubject) {
      return res.status(400).json({ error: "idSubject not defined" }); 
    }

    const subject = await Subject.findByPk(idSubject);
    if (!subject) {
      return res
        .status(404)
        .json({ error: `Subject with id ${idSubject} doesn't exist` }); 
    }

    await subject.destroy();
    return res
      .status(200)
      .json({ message: `Subject ${idSubject} has been deleted successfully` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" }); 
  }
};

/**
 * @route GET /subject/with-answers
 * @description Get all subjects that have at least one answer
 * @returns {Object[]} 200 - Array of subjects with answers
 * @returns {Object} 500 - Internal server error
 */
exports.getSubjectsWithAnswers = async (req, res) => {
  try {
    const subjects = await Subject.findAll({
      include: [
        {
          model: Answer,
          as: 'answers',
          required: true, // INNER JOIN to filter only subjects with answers
          attributes: [],
        },
      ],
    });
    return res.status(200).json({ subjects });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

/**
 * @route GET /subject/without-answers
 * @description Get all subjects that have no answers
 * @returns {Object[]} 200 - Array of subjects without answers
 * @returns {Object} 500 - Internal server error
 */
exports.getSubjectsWithoutAnswers = async (req, res) => {
  try {
    const subjects = await Subject.findAll({
      include: [
        {
          model: Answer,
          as: 'answers',
          required: false, // LEFT OUTER JOIN
          attributes: [],
        },
      ],
      where: {
        '$Answers.idAnswer$': null, // Sequelize alias path
      },
    });
    return res.status(200).json({ subjects });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};