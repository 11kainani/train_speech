const { Subject, Question, Prompt } = require("../models");
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
 * Assign a subject as a prompt or a question.
 *
 * @async
 * @function assignSubject
 * @route {POST} /assign
 * @param {Object} req - Express request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.idSubject - The id associated to the subject.
 * @param {string} req.body.mode - The mode of the subject : It can either be a "question"  or "prompt". CASE_SENSITIVE
 * @param {Object} res - Express response object.
 * @returns {Promise<Response>} - Sends a JSON response with the result of the operation.
 * @throws {Error} - Sends a 500 status if there is a server error.
 */
exports.assignSubject = async (req, res) => {
  try {
    const { idSubject, mode } = req.body;

    if (!idSubject || !mode) {
      return res.status(400).json({ error: "Request body incomplete" });
    }

    if (mode !== "question" && mode !== "prompt") {
      return res.status(400).json({
        error: 'Mode not correct, it should only be "prompt" or "question"',
      });
    }

    // Check if the subject exists
    const subject = await Subject.findByPk(idSubject);
    if (!subject) {
      return res.status(400).json({ error: "Subject isn't referenced" });
    }

    // Check if the subject is already assigned
    const isIdInQuestionTable = await Question.findOne({ where: { idQuestion: idSubject } });
    const isIdInPromptTable = await Prompt.findOne({ where: { idPrompt: idSubject } });

    if (
      (mode === "question" && isIdInPromptTable) ||
      (mode === "prompt" && isIdInQuestionTable)
    ) {
      return res.status(400).json({
        error: `Subject is already assigned to the other table instead of ${mode}`,
      });
    }

    if (isIdInQuestionTable || isIdInPromptTable) {
      return res.status(409).json({ error: `Subject already exists in ${mode}` });
    }

    // Assign the subject to the correct table
    if (mode === "question") {
      await Question.create({ idQuestion: idSubject });
      return res.status(201).json({ message: "Subject correctly assigned to question" });
    }

    if (mode === "prompt") {
      await Prompt.create({ idPrompt: idSubject });
      return res.status(201).json({ message: "Subject correctly assigned to prompt" });
    }

    return res.status(400).json({ error: "Mode not correctly selected" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};


/**
 * Get the mode the subject: either prompt or question.
 * @async
 * @function getSubjectMode
 * @route {GET}/mode/:idSubject
 * @param {Object} req.params.idSubject - The subject for which the information is necessary.
 * @param {Object} res - Express response object.
 * @returns  {Promise<Response>} - Sends a JSON response with the result of the operation.
 * @throws {Error} - Sends a 500 status if there is a server error.
 */
exports.getSubjectMode = async (req, res) => {
  try {
    const { idSubject } = req.params;

    if (!idSubject) {
      return res.status(400).json({ error: "Request doesn't have the correct argument" });
    }

    // Find the subject by ID
    const subject = await Subject.findByPk(idSubject);
    if (!subject) {
      return res.status(404).json({ error: "Subject not found" }); 
    }

    // Check if the subject exists in either the Prompt or Question tables
    const prompt_item = await Prompt.findByPk(idSubject);
    const question_item = await Question.findByPk(idSubject);

    if (!prompt_item && !question_item) {
      return res.status(404).json({ error: "The item hasn't been assigned" }); 
    }

    // Determine the mode based on which table the subject is in
    const mode = prompt_item ? "prompt" : "question";

    return res.status(200).json({ mode: mode });

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
 * @route {PATCH} /updateDescription
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
 * @route {GET} /all
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
 * @route {DELETE} /delete
 * @param {Object} req - Express request object.
 * @param {Object} req.query - The request query
 * @param {Object} req.query.idSubject - The id associated to the subject.
 * @param {Object} res - Espress response object
 * @returns {Promise<Response>} - Sends a JSON response with the result of the operation.
 * @throws {Error} - Sends a 500 status if there is a server error.
 */
exports.deleteSubject = async (req, res) => {
  const idSubject = req.query.idSubject;

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
 * Get all prompt
 * @async
 * @function getAllPrompts
 * @route {GET} /prompts
 * @param {Object} req - Express request object.
 * @param {Object} req.body - The request body
 * @param {Object} res - Espress response object
 * @returns {Promise<Response>}   - Sends a JSON response with the result of the operation.
 * @throws {Error} - Sends a 500 status if there is a server error.
 */
exports.getAllPrompts = async (req, res) => {
  try {
    const prompts = await Prompt.findAll({
      include: [
        {
          model: Subject,
          as: "subject",
        },
      ],
    });


    return res.status(200).json({ prompts: prompts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

/**
 * @description Get all prompt
 * @async
 * @function getAllQuestions
 * @route {GET} /questions
 * @param {Object} req - Express request object.
 * @param {Object} req.body - The request body
 * @param {Object} res - Espress response object
 * @returns {Promise<Response>} - Sends a JSON response with the result of the operation.
 * @throws {Error} - Sends a 500 status if there is a server error.
 */
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.findAll({
      include: [
        {
          model: Subject,
          as: "subject",
        },
      ],
    });

 
    return res.status(200).json({ questions: questions });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

/**
 * @async
 * @function createPrompt
 * @route /prompt/create
 * @param {Object} req - Express request object
 * @param {Object} req.body.description - Get the description of the prompt
 * @param {Object} res - Express response object
 * @returns {Promise<Response>} - Sends a JSON response with the result of the operation
 * @throws {Error}
 */
exports.createPrompt = async (req, res) => {
  try {
    const description = req.body.description;
    if (!description) {
      return res.status(400).json({ error: "Description is not defined" }); 
    }

    if (description.length > maxSizeDescription) {
      return res.status(422).json({ error: "Description too long" });
    }

    const subject = await Subject.findOne({
      where: { description: description },
    });
    if (subject) {
      return res.status(409).json({ error: "Subject already exists" }); 
    }

    const subjectToCreate = {
      idSubject: generateHexKey(),
      description: description,
    };

    const newSubject = await Subject.create(subjectToCreate);

    const newPrompt = await Prompt.create({ idPrompt: newSubject.idSubject });

    return res.status(201).json({ prompt: newPrompt, subject: newSubject }); 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};


/**
 * @async
 * @function createQuestion
 * @route /question/create
 * @param {Object} req - Express request object
 * @param {Object} req.body.description - Get the description of the question
 * @param {Object} res - Express response object
 * @returns {Promise<Response>} - Sends a JSON response with the result of the operation
 * @throws {Error}
 */
exports.createQuestion = async (req, res) => {
  try {
    const description = req.body.description;
    if (!description) {
      return res.status(404).json({ error: "Description is not defined" });
    }

    if (description.length > maxSizeDescription) {
      return res.status(422).json({ error: "Description too long" });
    }

    const subject = await Subject.findOne({
      where: { description: description },
    });
    if (subject) {
      return res.status(409).json({ error: "Subject already exists" });
    }

    const subjectToCreate = {
      idSubject: generateHexKey(),
      description: description,
    };

    const newSubject = await Subject.create(subjectToCreate);

    const newQuestion = await Question.create({
      idQuestion: newSubject.idSubject,
    });

    return res.status(201).json({ question: newQuestion, subject: newSubject });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
