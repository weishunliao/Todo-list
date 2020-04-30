import express from "express";
import boardController from "../controllers/board";

const router = express.Router();

router.get("/tasks/all", boardController.getAllTasks);
router.post("/task", boardController.createTask);
router.post("/task/:taskId", boardController.deleteTask);

export default router;
