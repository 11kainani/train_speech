const {Answer, Subject} = require('../models');
const crypto = require("crypto");

/**
 * @module controller/answer_controller
 * @description This module contains the controller functions for managing answers
 */

/**
 * Generate Hex key
 * @function generateHexKey
 * @returns random 8bytes hex key
 */
function generateHexKey() {
  return crypto.randomBytes(8).toString("hex");
}


exports.createAnswer = async (req, res) => {
    try{

     const {file_location, answer_time, idSubject, review} = req.body; 
     
     if(!(file_location && answer_time && idSubject))
     {
        return res.status(400).json({error: "Request body incomplet"});
     }

     const subject = await Subject.findByPk(idSubject);
     if(!subject)
     {
      return res.status(400).json({error:"The subject defined by the idSubject doesn't exist"});
     }

     
     const idAnswer = generateHexKey();

     const answerToCreate = {
        idAnswer: idAnswer,
        file_location: file_location, 
        answer_time: answer_time, 
        idSubject: idSubject,
        review: review,
     }

     await Answer.create(answerToCreate);


     

    }catch(error){
        console.log(error);
        return res.status(500).json({ error: "Server error" });
    }
}