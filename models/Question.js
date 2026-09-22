import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  tags: {type: [String], required: false, default: []},
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'User' }],
  downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  voteCount: {type: Number, required: false, default: 0},
  views: {type: Number, required: false, default: 0},
  author: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'User' },
  createdAt: {type: Date, required: false, default: Date.now}
  // TODO: Define schema fields
});

const Question = mongoose.model("Question", questionSchema);
export default Question;