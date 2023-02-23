const QuestionSchema = require("../models/questionModel");
const AnswerSchema = require("../models/answerModel");

module.exports.ASK_QUESTION = (req, res) => {
  try {
    // date
    const date = new Date().toLocaleString("en-GB", { timeZone: "UTC" });

    const question = new QuestionSchema({
      author: req.body.author,
      date: date,
      topic: req.body.topic,
    });

    question.save().then((result) => {
      return res
        .status(200)
        .json({ message: "Question asked", question: result });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.GET_QUESTIONS = async (req, res) => {
  try {
    const questions = await QuestionSchema.aggregate([
      {
        $lookup: {
          from: "answers",
          localField: "answers",
          foreignField: "_id",
          as: "question_answers",
        },
      },
    ]).exec();

    return res.status(200).json({ allQuestions: questions });
  } catch (error) {
    console.log(error);
  }
};

// module.exports.FILTER_QUESTIONS = async (req, res) => {
//   try {
//     const filter = req.body.filter;

//     if (filter === "answered") {
//       const questions = await QuestionSchema.find({
//         answers: { $exists: true, $ne: [] },
//       });

//       return res.status(200).json({ answered: questions });
//     } else if (filter === "unanswered") {
//       const questions = await QuestionSchema.find({
//         answers: { $exists: true, $eq: [] },
//       });

//       return res.status(200).json({ answered: questions });
//     }

//   } catch (error) {
//     console.log(error);
//   }
// };

module.exports.GET_QUESTION_BY_ID = async (req, res) => {
  try {
    const question = await QuestionSchema.findById(req.params.id);

    const answersByQuestion = await AnswerSchema.find({
      questionId: question._id,
    });

    return res
      .status(200)
      .json({ question: question, answers: answersByQuestion });
  } catch (error) {
    console.log(error);
  }
};

module.exports.DELETE_QUESTION = async (req, res) => {
  try {
    const id = req.params.id;

    const deleted = await QuestionSchema.findByIdAndDelete(id);

    return res.status(200).json({ message: "Deleted", deleted });
  } catch (error) {
    console.log(error);
  }
};
