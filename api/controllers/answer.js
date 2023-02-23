const AnswerSchema = require("../models/answerModel");
const QuestionSchema = require("../models/questionModel");

module.exports.POST_ANSWER = async (req, res) => {
  try {
    // date
    const date = new Date().toLocaleString("en-GB", { timeZone: "UTC" });

    const answer = new AnswerSchema({
      author: req.body.author,
      answer: req.body.answer,
      date: date,
      questionId: req.params.id,
    });

    answer.save().then(async (result) => {
      await QuestionSchema.updateOne(
        { _id: req.params.id },
        {
          $push: { answers: result._id },
        }
      );

      return res.status(200).json({ answer: result });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.DELETE_ANSWER = async (req, res) => {
  try {
    const id = req.params.id;

    const deleted = await AnswerSchema.findByIdAndDelete(id);

    await QuestionSchema.findByIdAndUpdate(
      { _id: deleted.questionId },
      { $pull: { answers: deleted._id } }
    );

    return res.status(200).json({ message: "Deleted", deleted });
  } catch (error) {
    console.log(error);
  }
};

module.exports.RATE_ANSWER = async (req, res) => {
  const userName = req.body.userName;
  const rate = req.body.rate;

  const answer = await AnswerSchema.findOne({ _id: req.params.id });

  const foundLiked = answer.liked.includes(userName);
  const foundDisliked = answer.disliked.includes(userName);

  console.log("foundLiked", foundLiked);
  console.log("foundDisliked", foundDisliked);

  try {
    if (rate === true) {
      if (!foundLiked && !foundDisliked) {
        await AnswerSchema.findByIdAndUpdate(req.params.id, {
          $push: { liked: userName },

          $inc: { rating: 1 },
        }).exec();

        const answer = await AnswerSchema.findById(req.params.id);

        return res.status(200).json({ answer });
      } else if (!foundLiked && foundDisliked) {
        await AnswerSchema.findByIdAndUpdate(req.params.id, {
          $push: { liked: userName },

          $pull: { disliked: userName },
          $inc: { rating: 2 },
        }).exec();

        const answer = await AnswerSchema.findById(req.params.id);

        return res.status(200).json({ answer });
      } else {
        await AnswerSchema.findByIdAndUpdate(req.params.id, {
          $pull: { liked: userName },
          $inc: { rating: -1 },
        }).exec();

        const answer = await AnswerSchema.findById(req.params.id);

        return res.status(200).json({ answer });
      }
    } else {
      if (!foundLiked && !foundDisliked) {
        await AnswerSchema.findByIdAndUpdate(req.params.id, {
          $push: { disliked: userName },
          $inc: { rating: -1 },
        }).exec();

        const answer = await AnswerSchema.findById(req.params.id);

        return res.status(200).json({ answer });
      } else if (foundLiked && !foundDisliked) {
        await AnswerSchema.findByIdAndUpdate(req.params.id, {
          $push: { disliked: userName },

          $pull: { liked: userName },
          $inc: { rating: -2 },
        }).exec();

        const answer = await AnswerSchema.findById(req.params.id);

        return res.status(200).json({ answer });
      } else {
        await AnswerSchema.findByIdAndUpdate(req.params.id, {
          $pull: { disliked: userName },
          $inc: { rating: +1 },
        }).exec();

        const answer = await AnswerSchema.findById(req.params.id);

        return res.status(200).json({ answer });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
