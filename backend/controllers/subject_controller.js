const {Subject, Question, Prompt} = require('../models');
const crypto = require("crypto");


/**
 * @module controllers/subject_controller
 * @description This module contains the controller functions for managing subjects, including creating, updating, retrieving, and deleting subjects.
 */

/**
 * Maximum size of a description
 */
const maxSizeDescription = 400;

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
 * @returns {Promise<void>} - Sends a JSON response with the result of the operation.
 * @throws {Error} - Sends a 500 status if there is a server error.
 */
exports.createSubject = async (req, res) => {
  try {
    const description = req.body.description;
    if (!description) {
      return res.status(400).json({ error: "Request body incomplete" });
    }

    if (description.length >= maxSizeDescription) {
      return res
        .status(400)
        .json({ error: "Length of the description is too long" });
    }
    const idSubject = generateHexKey();
    const subject_to_create = {
      idSubject: idSubject,
      description: description,
    };
    Subject.findOne({
      where: { description: subject_to_create.description },
    }).then((subject) => {
      if (subject) {
        return res.status(400).json({ error: "Subject already exists" });
      } else {
        Subject.create(subject_to_create).then((created_subject) => {
          return res.status(201).json({ Subject: created_subject });
        });
      }
    });
  } catch (error) {
    console.log(error);
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
 * @returns {Promise<void>} - Sends a JSON response with the result of the operation.
 * @throws {Error} - Sends a 500 status if there is a server error.
 */
exports.assignSubject = async (req, res) => {
  try {
    const idSubject = req.body.idSubject;
    const mode =  req.body.mode;

    if (!idSubject || !mode) {
      return res.status(400).json({ error: "Request body incomplete" });
    }

    if (mode !== "question" && mode !== "prompt") {
      return res
        .status(400)
        .json({
          error: "Mode not correct, it should only be \"prompt\" or \"question\"",
        });
    }

    Subject.findByPk(idSubject).then(async (subject) => {
      if (!subject) {
        return res.status(400).json({ error: "Subject isn't referenced" });
      } else {
        const isIdInQuestionTable = await Question.findOne({
          where: { idQuestion: idSubject },
        });
        const isIdInPromptTable = await Prompt.findOne({
          where: { idPrompt: idSubject },
        });

        if (
          (mode === "question" && isIdInPromptTable) ||
          (mode === "prompt" && isIdInQuestionTable)
        ) {
          return res
            .status(400)
            .json({
              error: `Subject is already assigned to the other table other than ${mode}`,
            });
        } else if (isIdInQuestionTable || isIdInPromptTable) {
          return res
            .status(400)
            .json({ error: `Subject already exists in  ${mode}` });
        } else {
          if (mode === "question") {
            const question_to_create = { idQuestion: idSubject };
            Question.create(question_to_create).then(() => {
              return res
                .status(201)
                .json({ message: "Subject correctly assigned to question" });
            });
          } else if (mode === "prompt") {
            const prompt_to_create = { idPrompt: idSubject };
            Prompt.create(prompt_to_create).then(() => {
              return res
                .status(201)
                .json({ message: "Subject ${create_prompt} correctly assigned to prompt" });
            });
          } else {
            return res
              .status(400)
              .json({ message: "Mode not correctly selected" });
          }
        }
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

/**
 * Get the mode the subject: either prompt or question.
 * @async
 * @function getSubjectMode 
 * @route {GET}/check/:idSubject
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Express the params of the request 
 * @param {Object} req.params.idSubject - The subject for which the information is necessary.
 * @param {Object} res - Express response object.
 * @returns  {Promise<void>} - Sends a JSON response with the result of the operation.
 * @throws {Error} - Sends a 500 status if there is a server error.
 */
exports.getSubjectMode = async (req, res) => {
  try {
    let prompt_item;
    let question_item;
    const idSubject = req.params.idSubject;

    if (!idSubject) {
      return res
        .status(400)
        .json({ error: "Request doesn't have the correct argument" });
    } else {
      Subject.findByPk(idSubject).then(async (subject) => {
        if (!subject) {
          return res
            .status(400)
            .json({ error: "ID isn't referenced in subject" });
        } else {
          prompt_item = await Prompt.findByPk(idSubject);
          question_item = await Question.findByPk(idSubject);

          if (!prompt_item && !question_item) {
            return res
              .status(400)
              .json({ error: "The item hasn't been assigned" });
          }

          const mode = prompt_item ? "prompt" : "question";

          return res.status(200).json({ mode: mode });
        }
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

/**
 * Get the mode the subject: either prompt or question.
 * @async
 * @function readSubject 
 * @route {GET} /read/:idSubject
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Express the params of the request 
 * @param {Object} req.params.idSubject - The subject for which the information is necessary.
 * @param {Object} res - Express response object.
 * @returns  {Promise<void>} - Sends a JSON response with the result of the operation.
 * @throws {Error} - Sends a 500 status if there is a server error.
 */
exports.readSubject = (req, res) => {
  try {
    const idSubject = req.params.idSubject;
    if (!idSubject) {
      return res
        .status(400)
        .json({ error: "Request doesn't have the correct argument" });
    } else {
      Subject.findByPk(idSubject).then((subject) => {
        if (!subject) {
          return res.status(400).json({ error: "Subject isn't referenced" });
        } else {
          return res.status(200).json({ subject: subject });
        }
      });
    }
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
 * @returns - Sends a JSON response with the result of the operation.
 * @throws {Error} - Sends a 500 status if there is a server error.
 */
exports.changeDescription = async (req, res) => {
  try {
    const idSubject = req.body.idSubject;
    if (!idSubject) {
      return res.status(400).json({ error: "idSubject not defined" });
    }

    const subject = await Subject.findByPk(idSubject);

    if (!subject) {
      return res
        .status(400)
        .json({ error: "idSubject not assigned to a subject" });
    }

    const description = req.body.description;
    if (!description) {
      return res
        .status(400)
        .json({ error: "Request doesn't have the correct argument" });
    }
    if (description.length >= maxSizeDescription) {
      return res
        .status(400)
        .json({ error: "Length of your description is too much" });
    }

    subject.description = description;
    await subject.save();
    return res
      .status(200)
      .json({ message: "Reccord updated successfully", subject: subject });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

/**
 * Read all the subjects
 * @async 
 * @function readAllSubjects 
 * @route {GET} /all
 * @param {Object} req - Express request object. 
 * @param {Object} res - Espress response object
 * @returns - Sends a JSON response with the result of the operation.
 * @throws {Error} - Sends a 500 status if there is a server error.
 */
exports.readAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.findAll();
    if (!subjects) {
      return res.status(400).json({ error: "There aren't any subjects" });
    }

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
 * @returns - Sends a JSON response with the result of the operation.
 * @throws {Error} - Sends a 500 status if there is a server error.
 */
exports.deleteSubject = async (req, res) => {
  const idSubject = req.query.idSubject;

  try {
    if (!idSubject) {
      return res.status(400).json({ error: "IdSubject not defined" });
    }

    const subject = await  Subject.findByPk(idSubject);
    if(!subject)
    {
      return res.status(400).json({error: `Subject ${idSubject} doesn't exist.`})
    }
    await subject.destroy()
    return res.status(200).json({ message: `Subject ${idSubject} has been deleted` });
    
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
 * @returns - Sends a JSON response with the result of the operation.
 * @throws {Error} - Sends a 500 status if there is a server error.
 */
exports.getAllPrompts = async (req,res) => {

  try {
    const subjects = await Prompt.findAll({include : [{
      model: Subject,
      as: 'subject'
    }]});
    if (!subjects) {
      return res.status(400).json({ error: "There aren't any subjects" });
    }


    return res.status(200).json({ prompts: subjects });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
}

/**
 * Get all prompt 
 * @async
 * @function getAllQuestions
 * @route {GET} /questions
 * @param {Object} req - Express request object. 
 * @param {Object} req.body - The request body
 * @param {Object} res - Espress response object
 * @returns - Sends a JSON response with the result of the operation.
 * @throws {Error} - Sends a 500 status if there is a server error.
 */
exports.getAllQuestions = async (req,res) => {

  try {
    const subjects = await Question.findAll({include : [{
      model: Subject,
      as: 'subject'
    }]});
    if (!subjects) {
      return res.status(400).json({ error: "There aren't any subjects" });
    }


    return res.status(200).json({ questions: subjects });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
}