import mongoose from "mongoose";

const newsLetterSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter your email"],
  },
});

const NewsLetter = mongoose.model("NewsLetter", newsLetterSchema);

export default NewsLetter;
