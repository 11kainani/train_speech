const Subject = require('../models/subject')
const Question = require('../models/question'); 
const Prompt = require('../models/prompt')
const crypto = require("crypto");
const Sequelize = require('../config');

const maxSizeDescription = 400

function generateHexKey()
{
    return crypto.randomBytes(8).toString("hex");
}

exports.createSubject= async (req,res) =>
{ 
    try {

        const description = req.body.description;
        if(!description)
        {
            return res.status(400).json({error : 'Request body incomplete'});
        }

        if(description.length >= maxSizeDescription) 
        {
            return res.status(400).json({error : "Length of the description is too long"});
        }
        const idSubject = generateHexKey();
        subject_to_create = {
            idSubject: idSubject,
            description: description 
        }
        Subject.findOne({where:{ description: subject_to_create.description }}).then(
            (subject) => {
            if(subject)
            {
                return res.status(400).json({ error : "Subject already exists" });
            }else
            {
                
                Subject.create(subject_to_create).then((created_subject) => {
                    return res.status(201).json({ Subject: created_subject });
                }
                    
                )
                
            } }
        )   
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Server error" });
    }    
}
exports.assignSubject = async (req, res) => {
    try {
        const idSubject = req.body.idSubject;
        const mode = req.body.mode;

        if (!idSubject || !mode) {
            return res.status(400).json({ error: 'Request body incomplete' });
        }

        if (mode !== "question" && mode !== "prompt") {
            return res.status(400).json({ error: 'Mode not correct, it should only be prompt or question' });
        }

        Subject.findByPk(idSubject).then(async (subject) => {
            if (!subject) {
                return res.status(400).json({ error: 'Subject isn\'t referenced' });
            } else {
                const isIdInQuestionTable = await Question.findOne({ where: { idQuestion: idSubject } });
                const isIdInPromptTable = await Prompt.findOne({ where: { idPrompt: idSubject } });

                if ((mode === 'question' && isIdInPromptTable) || (mode === 'prompt' && isIdInQuestionTable)) {
                    return res.status(400).json({ error: `Subject is already assigned to the other table other than ${mode}` });
                } else if (isIdInQuestionTable || isIdInPromptTable) {
                    return res.status(400).json({ error: `Subject already exists in  ${mode}`});
                } else {
                    if (mode === "question") {
                        const question_to_create = { idQuestion: idSubject };
                        Question.create(question_to_create).then((create_question) => {
                            return res.status(201).json({ message: "Subject correctly assigned to question" });
                        });
                    } else if (mode === "prompt") {
                        const prompt_to_create = { idPrompt: idSubject };
                        Prompt.create(prompt_to_create).then((create_prompt) => {
                            return res.status(201).json({ message: "Subject correctly assigned to prompt" });
                        });
                    } else {
                        return res.status(400).json({ message: "Mode not correctly selected" });
                    }
                }
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error" });
    }
}
exports.getSubjectMode = async (req, res) => {
    try {
        let prompt_item;
        let question_item;
        const idSubject = req.params.idSubject;

        if (!idSubject) {
            return res.status(400).json({ error: "Request doesn't have the correct argument" });
        } else {
            Subject.findByPk(idSubject).then(async (subject) => {
                if (!subject) {
                    return res.status(400).json({ error: "ID isn't referenced in subject" });
                } else {
                    prompt_item = await Prompt.findByPk(idSubject);
                    question_item = await Question.findByPk(idSubject);

                    if (!prompt_item && !question_item) {
                        return res.status(400).json({ error: "The item hasn't been assigned" });
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


exports.readSubject = (req,res) => 
{
    

    
    try {
        const idSubject= req.params.idSubject;
        if(!idSubject)
        {
            return res.status(400).json({error: "Request doesn't have the correct argument"})
        }else
        {
            Subject.findByPk(idSubject).then((subject) => 
            {
                if(!subject)
                {
                    return res.status(400).json({error: "Subject isn't referenced"})
                }else
                {
                    return res.status(200).json({subject: subject})
                }
            }
            
            )
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
}

exports.changeDescription = (req,res) => {

    try {
        const description = req.body.description; 
        if(!description)
        {
            return res.status(400).json({error: "Request doesn't have the correct argument"})
        }
        if(description.length >= maxSizeDescription)
        {
            return res.status(400).json({error: "Length of your description is too much"})
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
}