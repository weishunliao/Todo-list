import mongoose from "mongoose";
import TaskSchema from "../schemas/task";

const Task = mongoose.model("task", TaskSchema);

export default Task;
