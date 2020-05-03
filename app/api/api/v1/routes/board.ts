import express from "express";
import boardController from "../controllers/board";
import { auth } from "../routes/admin";

const router = express.Router();

// router.get("/tasks/all", boardController.getAllTasks);
router.get("/tasks/all", auth.required, boardController.getAllTasks);
router.post("/task", auth.required, boardController.createTask);
router.delete("/task/:taskId", auth.required, boardController.deleteTask);
router.patch(
  "/task/:taskId/status",
  auth.required,
  boardController.updateTaskStatus,
);

router.patch(
  "/task/:taskId/priority",
  auth.required,
  boardController.updateTaskPriority,
);

export default router;
