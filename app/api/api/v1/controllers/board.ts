import Task from "../../../../models/task";
import logger from "../../../../utils/logger";
import errors from "../../../../utils/errors";
import { Request, Response, NextFunction } from "express";

// const statusTable = {
//   1: "not start",
//   2: "in progess",
//   3: "completed",
//   4: "cancell",
// };

const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const { email } = req.payload;
    const tasks = await Task.find({ userEmail: email });
    return res.status(200).json({ success: true, tasks: tasks });
  } catch (err) {
    logger.error("Error: ", err);
    return errors.internalError(next);
  }
};

const createTask = async (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const { email } = req.payload;
  const task = new Task({
    userEmail: email,
    content: req.body.content,
    created: new Date(),
    status: 1,
    priority: "Normal",
  });
  try {
    const savedTask = await task.save();
    res.json(savedTask);
  } catch (err) {
    res.json({ message: err });
  }
};

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskId = req.params.taskId;
    await Task.deleteOne({ _id: taskId });
    res.sendStatus(200);
  } catch (err) {
    res.json({ message: err });
  }
};

const updateTaskStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await Task.findByIdAndUpdate(
      { _id: req.params.taskId },
      { status: req.body.status },
    );
    res.sendStatus(200);
  } catch (err) {
    res.json({ message: err });
  }
};

const updateTaskPriority = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await Task.findByIdAndUpdate(
      { _id: req.params.taskId },
      { priority: req.body.priority },
    );
    res.sendStatus(200);
  } catch (err) {
    res.json({ message: err });
  }
};

export default {
  getAllTasks,
  createTask,
  deleteTask,
  updateTaskStatus,
  updateTaskPriority,
};
