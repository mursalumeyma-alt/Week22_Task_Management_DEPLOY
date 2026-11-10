
import express from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  createSubtask,
  updateSubtask,
  deleteSubtask,
  getSubtaskById,
  getSubtasksByTaskId,
} from "../services/taskServices.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Protect all task routes
router.use(authenticateToken);

// Helper for handling errors
function handleError(res, error) {
  console.error(error);

  if (
    error.message === "Task not found" ||
    error.message === "Task not found or access denied" ||
    error.message === "Subtask not found or access denied"
  ) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}

// GET all tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await getAllTasks(req.user.id);

    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    return handleError(res, error);
  }
});

// GET one task
router.get("/tasks/:id", async (req, res) => {
  try {
    const task = await getTaskById(req.params.id, req.user.id);

    return res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    return handleError(res, error);
  }
});

// CREATE a task
router.post("/tasks", async (req, res) => {
  try {
    const task = await createTask(req.body, req.user.id);

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    return handleError(res, error);
  }
});

// UPDATE a task
router.put("/tasks/:id", async (req, res) => {
  try {
    const task = await updateTask(
      req.params.id,
      req.body,
      req.user.id
    );

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    return handleError(res, error);
  }
});

// DELETE a task
router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await deleteTask(req.params.id, req.user.id);

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: task,
    });
  } catch (error) {
    return handleError(res, error);
  }
});

// GET all subtasks for a task
router.get("/tasks/:taskId/subtasks", async (req, res) => {
  try {
    const subtasks = await getSubtasksByTaskId(
      req.params.taskId,
      req.user.id
    );

    return res.status(200).json({
      success: true,
      count: subtasks.length,
      data: subtasks,
    });
  } catch (error) {
    return handleError(res, error);
  }
});

// GET one subtask
router.get("/subtasks/:id", async (req, res) => {
  try {
    const subtask = await getSubtaskById(req.params.id, req.user.id);

    return res.status(200).json({
      success: true,
      data: subtask,
    });
  } catch (error) {
    return handleError(res, error);
  }
});

// CREATE a subtask
router.post("/tasks/:taskId/subtasks", async (req, res) => {
  try {
    const subtask = await createSubtask(
      req.params.taskId,
      req.body,
      req.user.id
    );

    return res.status(201).json({
      success: true,
      message: "Subtask created successfully",
      data: subtask,
    });
  } catch (error) {
    return handleError(res, error);
  }
});

// UPDATE a subtask
router.put("/subtasks/:id", async (req, res) => {
  try {
    const subtask = await updateSubtask(
      req.params.id,
      req.body,
      req.user.id
    );

    return res.status(200).json({
      success: true,
      message: "Subtask updated successfully",
      data: subtask,
    });
  } catch (error) {
    return handleError(res, error);
  }
});

// DELETE a subtask
router.delete("/subtasks/:id", async (req, res) => {
  try {
    const subtask = await deleteSubtask(req.params.id, req.user.id);

    return res.status(200).json({
      success: true,
      message: "Subtask deleted successfully",
      data: subtask,
    });
  } catch (error) {
    return handleError(res, error);
  }
});

export default router;
