import mongoose from "mongoose";

const TaskSchema: mongoose.Schema = new mongoose.Schema({
  userId: { type: Number, required: true },
  content: { type: String },
  status: { type: String },
  created: { type: Date },
  deleted: { type: Date },
  priority: { type: String },
});

export default TaskSchema;
