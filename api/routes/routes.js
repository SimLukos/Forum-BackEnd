const express = require("express");
const router = express.Router();
const auth = require("../middleware/authentication");
const {
  ASK_QUESTION,
  GET_QUESTIONS,
  GET_QUESTION_BY_ID,
  DELETE_QUESTION,
} = require("../controllers/question");

const {
  POST_ANSWER,
  DELETE_ANSWER,
  RATE_ANSWER,
} = require("../controllers/answer");

const { REGISTER, LOGIN } = require("../controllers/user");

router.post("/question", auth, ASK_QUESTION);
router.get("/questions", auth, GET_QUESTIONS);
router.get("/question/:id", auth, GET_QUESTION_BY_ID);
router.delete("/question/:id", auth, DELETE_QUESTION);

router.post("/question/:id/answer", auth, POST_ANSWER);
router.delete("/answer/:id", auth, DELETE_ANSWER);
router.post("/answer/:id", RATE_ANSWER);

router.post("/register", REGISTER);
router.post("/login", LOGIN);

module.exports = router;
