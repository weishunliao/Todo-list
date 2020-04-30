import Task from "../../../../models/task";
import logger from "../../../../utils/logger";
import errors from "../../../../utils/errors";
import { Request, Response, NextFunction } from "express";

const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await Task.find({});
    return res.status(200).json({ success: true, tasks: tasks });
  } catch (err) {
    logger.error("Error: ", err);
    return errors.internalError(next);
  }
};

const createTask = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body.content);
  const count = await Task.count({ userId: 123 });
  const task = new Task({
    userId: 123,
    content: req.body.content,
    created: new Date(),
    priority: "high",
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

export default {
  getAllTasks,
  createTask,
  deleteTask,
};
