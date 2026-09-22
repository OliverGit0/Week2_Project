  import mongoose from "mongoose";

  const answerSchema = new mongoose.Schema({
    questionId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Question' },
    answerText: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'User' }],
    downvotes: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'User' }],
    voteCount: { type: Number, required: false, default: 0 },
    createdAt: { type: Date, required: false, default: Date.now }
  });

  const Answer = mongoose.model("Answer", answerSchema);
  export default Answer;