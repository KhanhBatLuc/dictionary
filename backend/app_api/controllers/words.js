const mongoose = require('mongoose');
const WordModel = mongoose.model('Word');

const wordsByRegex = (req, res) => {
  WordModel
    .find({word: new RegExp('^' + req.params.word, 'i')},'word')
    .lean()
    .limit(10)
    .sort({word: 1})
    .exec((err, words) => {
      if (!words) {
        return res
          .status(404)
          .json({
            success: false,
            message: "words not found"
          });
      } else if (err) {
        return res
          .status(404)
          .json({
            success: false,
            message: err
          });
      } else {
        return res
          .status(200)
          .json({
            success: true,
            data: words
          });
      }
    });
};

const wordByName = (req, res) => {
  WordModel
    .findOne({word: new RegExp('^' + req.params.wordName + '$', 'i')})
    .exec((err, words) => {
      if (!words) {
        return res
          .status(404)
          .json({
            success: false,
            message: "words not found"
          });
      } else if (err) {
        return res
          .status(404)
          .json({
            success: false,
            message: err
          });
      } else {
        return res
          .status(200)
          .json({
            success: true,
            data: words
          });
      }
    });
};

const wordById = (req, res) => {
  WordModel
    .findbyId(req.params.wordId)
    .exec((err, words) => {
      if (!words) {
        return res
          .status(404)
          .json({
            success: false,
            message: "words not found"
          });
      } else if (err) {
        return res
          .status(404)
          .json({
            success: false,
            message: err
          });
      } else {
        return res
          .status(200)
          .json({
            success: true,
            data: words
          });
      }
    });
};

module.exports = {
  wordsByRegex,
  wordByName,
  wordById
};
