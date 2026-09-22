import mongoose from "mongoose";
import User from "./models/User.js";
import Question from "./models/Question.js";
import Answer from "./models/Answer.js";
import dotenv from "dotenv";

async function query1() {
  //Create a user with name Robin, email robin@example.com, password hashed_password_7, 
  // andcreatedAt set to 2025-06-25T101500Z
  // Write code for Query 1 here
  await User.create({
    name: "Robin",
    email: "robin@example.com",
    password: "hashed_password_7",
    createdAt: new Date("2025-06-25T10:15:00Z")
  });
}

async function query2() {
  //Fetch the user with email alice@example.com.
  // Write code for Query 2 here
  const user = await User.findOne({ email: "alice@example.com" });
  console.log(user);
}

  async function query3() {
    //Fetch question with the title 'How can I improve the performance of a react app?'
    // Write code for Query 3 here
    const question = await Question.findOne({ title: "How can I improve the performance of a react app?" });
    console.log(question);
  }

async function query4() {
  //Find all questions tagged with 'javascript'.
  // Write code for Query 4 here
  const questions = await Question.find({ tags: "javascript" });
  console.log(questions);
}

async function query5() {
  //Retrieve all questions posted after April 1, 2023.
  // Write code for Query 5 here
  const questions = await Question.find({ createdAt: { $gt: new Date("2023-04-01") } });
  console.log(questions);
}

async function query6() {
  //Find all questions tagged with javascript or react.
  // Write code for Query 6 here
  const questions = await Question.find({ tags: { $in: ["javascript", "react"] } });
  console.log(questions);
}

async function query7() {
  //Find all the distinct tags used in questions.
  // Write code for Query 7 here
  const tags = await Question.distinct("tags");
  console.log(tags);
}

async function query8() {
  //Retrieve all questions with at least 50 views
  const questions = await Question.find({ views: { $gte: 50 } });
  console.log(questions);
  // Write code for Query 8 here
}

async function query9() {
  //List all answers with a vote count of 0
  const answers = await Answer.find({ voteCount: 0 });
  console.log(answers);
  // Write code for Query 9 here
}

async function query10() {
  //Retrieve all answers with a voteCount greater than 0
  const answers = await Answer.find({ voteCount: { $gt: 0 } });
  console.log(answers);
  // Write code for Query 10 here
}

async function query11() {
  //Retrieve all users whose account was created between January 1, 2023 (inclusive) and May 1, 2023 (exclusive)
  const users = await User.find({
    createdAt: {
      $gte: new Date("2023-01-01"),
      $lt: new Date("2023-05-01")
    }
  });
  console.log(users);
  // Write code for Query 11 here
}

async function query12() {
  //Fetch the answer text and author id of all answers for the question "How do I set up routing with react router v6?"
  const question = await Question.findOne({ title: "How do I set up routing with react router v6?" });
  const answers = await Answer.find({ questionId: question._id }, { answerText: 1, author: 1 });
  console.log(answers);
  // Write code for Query 12 here
}

async function query13() {
  //Find all users who have not posted any answers
  // Write code for Query 13 here
  const users = await User.find({ _id: { $nin: await Answer.distinct("author") } });
  console.log(users);
}

async function query14() {
  //Find the top two most upvoted questions
  const questions = await Question.find().sort({ voteCount: -1 }).limit(2);
  console.log(questions);
  // Write code for Query 14 here
}

async function query15() {
  //Retrieve the ids of all users who have posted answers, along with the number of answers they have posted
  const users = await Answer.aggregate([
    { $group: { _id: "$author", answerCount: { $sum: 1 } } }
  ]);
  console.log(users);
  // Write code for Query 15 here
}

async function query16() {
  //Identify the top two users who posted the most answers
  const topUsers = await Answer.aggregate([
    { $group: { _id: "$author", answerCount: { $sum: 1 } } },
    { $sort: { answerCount: -1 } },
    { $limit: 2 }
  ]);
  console.log(topUsers);
  // Write code for Query 16 here
}

async function query17() {
  //Update the tags of the question 'Why is my async function returning a promise instead of the actual value?' to ['javascript', 'async']
  // Write code for Query 17 here
  await Question.updateOne(
    { title: "Why is my async function returning a promise instead of the actual value?" },
    { $set: { tags: ["javascript", "async"] } }
  );
}

async function query18() {
  // Update the name of the user with email 'alice@example.com' to 'Alice Smith'
  // Write code for Query 18 here
  await User.updateOne(
    { email: "alice@example.com" },
    { $set: { name: "Alice Smith" } }
  );
}

async function query19() {
  //Delete the user with email 'jhonny@example.com'.
  // Write code for Query 19 here
  await User.deleteOne({ email: "jhonny@example.com" });
}

async function query20() {
  //Delete all answers of the user with email 'alice@example.com'
  // Write code for Query 20 here
  const user = await User.findOne({ email: "alice@example.com" });
  if (user) {
    await Answer.deleteMany({ author: user._id });
  }
}

async function runQueries() {
  printHeader(
    1,
    "Create a user with name Robin, email robin@example.com, password hashed_password_7, and createdAt set to 2025-06-25T10:15:00Z",
  );
  await query1();
  printHeader(2, "Fetch the user with email alice@example.com");
  await query2();
  printHeader(
    3,
    'Fetch question with the title "How can I improve the performance of a react app?"',
  );
  await query3();
  printHeader(4, 'Find all questions tagged with "javascript"');
  await query4();
  printHeader(5, "Retrieve all questions posted after April 1, 2023");
  await query5();
  printHeader(6, "Find all questions tagged with javascript or react");
  await query6();
  printHeader(7, "Find all the distinct tags used in questions");
  await query7();
  printHeader(8, "Retrieve all questions with at least 50 views");
  await query8();
  printHeader(9, "List all answers with a vote count of 0");
  await query9();
  printHeader(10, "Retrieve all answers with a voteCount greater than 0");
  await query10();
  printHeader(
    11,
    "Retrieve all users whose account was created between January 1, 2023 (inclusive) and May 1, 2023 (exclusive)",
  );
  await query11();
  printHeader(
    12,
    'Fetch the answer text and author id of all answers for the question "How do I set up routing with react router v6?"',
  );
  await query12();
  printHeader(13, "Find all users who have not posted any answers");
  await query13();
  printHeader(14, "Find the top two most upvoted questions");
  await query14();
  printHeader(
    15,
    "Retrieve the ids of all users who have posted answers, along with the number of answers they have posted",
  );
  await query15();
  printHeader(16, "Identify the top two users who posted the most answers");
  await query16();
  printHeader(
    17,
    "Update the tags of the question 'Why is my async function returning a promise instead of the actual value?' to ['javascript', 'async']",
  );
  await query17();
  printHeader(
    18,
    "Update the name of the user with email 'alice@example.com' to 'Alice Smith'",
  );
  await query18();
  printHeader(19, "Delete the user with email 'jhonny@example.com'");
  await query19();
  printHeader(
    20,
    "Delete all answers of the user with email 'alice@example.com'",
  );
  await query20();
}

const printHeader = (num, title) => {
  console.log("\n" + "─".repeat(60));
  console.log(`Q${num}. ${title}`);
  console.log("─".repeat(60));
};

async function main() {
  try {
    dotenv.config();
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected successfully to database");
    await runQueries();
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from database");
  }
}

main();
