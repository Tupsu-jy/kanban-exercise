import { useContext } from "react";
import { BoardContext } from "../contexts/boardContext";
import { createTaskApi, updateTaskApi, deleteTaskApi } from "../api/task";
import _ from "lodash";

const useManageTasks = () => {
  const { tasks, setTasks, columns, setColumns } = useContext(BoardContext);

  const revertState = (originalTasks, originalColumns) => {
    setTasks(originalTasks);
    setColumns(originalColumns);
  };

  /**
   * Add a new task to the board. In both frontend and backend. Revert frontend state if backend fails.
   *
   * @param {Object} newTask - The task to add.
   * @param {string} columnId - The ID of the column to add the task to.
   * @returns {Promise<void>}
   */
  const addTask = async (newTask, columnId) => {
    // Make deep copies of the original state so that we can revert to it if the backend call fails
    const originalTasks = _.cloneDeep(tasks);
    const originalColumns = _.cloneDeep(columns);

    const updatedTasks = [...tasks, newTask];
    const updatedColumns = columns.map((col) =>
      col.id === columnId
        ? { ...col, task_ids: [...col.task_ids, newTask.id] }
        : col
    );

    setTasks(updatedTasks);
    setColumns(updatedColumns);

    try {
      await createTaskApi(newTask, columnId);
    } catch (error) {
      revertState(originalTasks, originalColumns);
      // TODO: Show an error message to the user
    }
  };

  /**
   * Update an existing task on the board. In both frontend and backend. Revert frontend state if backend fails.
   *
   * @param {Object} updatedTask - The task to update.
   */
  const updateTask = async (updatedTask) => {
    // Make deep copies of the original state so that we can revert to it if the backend call fails
    const originalTasks = _.cloneDeep(tasks);

    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );

    setTasks(updatedTasks);

    try {
      await updateTaskApi(updatedTask.id, updatedTask);
    } catch (error) {
      revertState(originalTasks, columns);
      // TODO: Show an error message to the user
    }
  };

  /**
   * Remove a task from the board both on the frontend and the backend.
   * If the backend call fails, it will revert the frontend state.
   *
   * @param {string} taskId - The ID of the task to remove.
   * @returns {Promise<void>}
   */
  const removeTask = async (taskId) => {
    // Make deep copies of the original state so that we can revert to it if the backend call fails
    const originalTasks = _.cloneDeep(tasks);
    const originalColumns = _.cloneDeep(columns);

    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    const updatedColumns = columns.map((col) => ({
      ...col,
      task_ids: col.task_ids.filter((id) => id !== taskId),
    }));

    setTasks(updatedTasks);
    setColumns(updatedColumns);

    try {
      await deleteTaskApi(taskId);
    } catch (error) {
      revertState(originalTasks, originalColumns);
      // TODO: Show an error message to the user
    }
  };

  return { addTask, updateTask, removeTask };
};

export default useManageTasks;
