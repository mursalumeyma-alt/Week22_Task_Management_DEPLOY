
import prisma from "../lib/prisma.js";

// Get all tasks belonging to a user
export async function getAllTasks(userId) {
  return await prisma.task.findMany({
    where: { userId },
    include: { subtasks: true },
    orderBy: { createdAt: "desc" },
  });
}

// Get task by ID
export async function getTaskById(id, userId) {
  const task = await prisma.task.findFirst({
    where: {
      id,
      userId,
    },
    include: { subtasks: true },
  });

  if (!task) {
    throw new Error("Task not found");
  }

  return task;
}

// Create a new task
export async function createTask(taskData, userId) {
  const status =
    taskData.status === "in-progress"
      ? "in_progress"
      : taskData.status;

  return await prisma.task.create({
    data: {
      title: taskData.title,
      description: taskData.description,
      status,
      priority: taskData.priority,
      dueDate: taskData.dueDate
        ? new Date(taskData.dueDate)
        : null,
      assignedTo: taskData.assignedTo,
      userId,
      subtasks: {
        create: taskData.subtasks || [],
      },
    },
    include: {
      subtasks: true,
    },
  });
}

// Update a task
export async function updateTask(id, updateData, userId) {
  const existingTask = await prisma.task.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!existingTask) {
    throw new Error("Task not found");
  }

  const data = { ...updateData };

  // Prevent changing task ownership
  delete data.id;
  delete data.userId;
  delete data.createdAt;
  delete data.updatedAt;
  delete data.subtasks;

  // Convert status for Prisma enum
  if (data.status === "in-progress") {
    data.status = "in_progress";
  }

  // Handle due date conversion
  if (data.dueDate !== undefined && data.dueDate !== null) {
    data.dueDate = new Date(data.dueDate);
  }

  return await prisma.task.update({
    where: { id },
    data,
    include: {
      subtasks: true,
    },
  });
}

// Delete a task
export async function deleteTask(id, userId) {
  const existingTask = await prisma.task.findFirst({
    where: {
      id,
      userId,
    },
    include: {
      subtasks: true,
    },
  });

  if (!existingTask) {
    throw new Error("Task not found");
  }

  await prisma.task.delete({
    where: { id },
  });

  return existingTask;
}

// Create a subtask
export async function createSubtask(taskId, subtaskData, userId) {
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      userId,
    },
  });

  if (!task) {
    throw new Error("Task not found or access denied");
  }

  return await prisma.subtask.create({
    data: {
      title: subtaskData.title,
      description: subtaskData.description,
      completed: subtaskData.completed ?? false,
      taskId,
    },
  });
}

// Update a subtask
export async function updateSubtask(id, updateData, userId) {
  const subtask = await prisma.subtask.findFirst({
    where: {
      id,
      task: {
        userId,
      },
    },
  });

  if (!subtask) {
    throw new Error("Subtask not found or access denied");
  }

  const data = { ...updateData };

  // Prevent changing subtask ownership or identifiers
  delete data.id;
  delete data.taskId;
  delete data.createdAt;
  delete data.updatedAt;

  return await prisma.subtask.update({
    where: { id },
    data,
  });
}

// Delete a subtask
export async function deleteSubtask(id, userId) {
  const subtask = await prisma.subtask.findFirst({
    where: {
      id,
      task: {
        userId,
      },
    },
  });

  if (!subtask) {
    throw new Error("Subtask not found or access denied");
  }

  return await prisma.subtask.delete({
    where: { id },
  });
}

// Get a subtask by ID
export async function getSubtaskById(id, userId) {
  const subtask = await prisma.subtask.findFirst({
    where: {
      id,
      task: {
        userId,
      },
    },
    include: {
      task: true,
    },
  });

  if (!subtask) {
    throw new Error("Subtask not found or access denied");
  }

  return subtask;
}

// Get all subtasks for a specific task
export async function getSubtasksByTaskId(taskId, userId) {
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      userId,
    },
  });

  if (!task) {
    throw new Error("Task not found or access denied");
  }

  return await prisma.subtask.findMany({
    where: { taskId },
    orderBy: { createdAt: "asc" },
  });
}
