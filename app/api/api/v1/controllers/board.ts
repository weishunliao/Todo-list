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

const getTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await Task.findOne({ _id: req.params.taskId });
    return res.status(200).json({ success: true, task: task });
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
    created: formatDate(new Date()),
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

const formatDate = (now: Date): String => {
  const date =
    now.getDate() +
    "-" +
    (now.getMonth() + 1) +
    "-" +
    now.getFullYear() +
    " " +
    addZero(now.getHours()) +
    ":" +
    addZero(now.getMinutes());
  return date;
};

const addZero = (i) => {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
};

export default {
  getAllTasks,
  getTask,
  createTask,
  deleteTask,
  updateTaskStatus,
  updateTaskPriority,
};
