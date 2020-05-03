import mongoose from "mongoose";

const TaskSchema: mongoose.Schema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  content: { type: String },
  status: { type: Number },
  created: { type: Date },
  deleted: { type: Date },
  priority: { type: String },
});

export default TaskSchema;
