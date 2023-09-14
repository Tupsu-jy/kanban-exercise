import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchColumns } from "../api/column";
import { fetchUsers } from "../api/user";
import { fetchTasksApi } from "../api/task";

// Create a context for the board to be used across the app
export const BoardContext = createContext();

// Provider component which wraps around parts of the app that need board context
export function BoardProvider({ children }) {
  // State for columns, tasks, and users
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  // On initial mount, fetch columns, tasks, and users data from API
  // TODO: Add error handling, loading state, remove console logs
  useEffect(() => {
    // Fetch column data
    fetchColumns().then((response) => {
      console.log("Fetched Columns:", response.data);
      setColumns(response.data);
    });

    // Fetch task data
    fetchTasksApi().then((response) => {
      console.log("Fetched Tasks:", response.data);
      setTasks(response.data);
    });

    // Fetch user data
    fetchUsers().then((response) => {
      console.log("Fetched Users:", response.data);
      setUsers(response.data);
    });
  }, []);

  // Utility function to get a task by its ID
  const getTaskById = (taskId) => tasks.find((task) => task.id === taskId);

  // Utility function to remove a task from the tasks array by ID
  const removeFromTasksArray = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  // Utility function to add a task ID to a column's task ID list
  const addColumnTaskId = (columnId, taskId) => {
    const column = columns.find((col) => col.id === columnId);
    if (column) {
      column.task_ids.push(taskId);
    }
  };

  // Utility function to remove a task ID from a column's task ID list
  const removeColumnTaskId = (columnId, taskId) => {
    const column = columns.find((col) => col.id === columnId);
    if (column) {
      column.task_ids = column.task_ids.filter((id) => id !== taskId);
    }
  };

  // Utility function to update a task in the tasks array
  const updateTasksArray = (updatedTask) => {
    setTasks((prevTasks) => {
      const taskIndex = prevTasks.findIndex(
        (task) => task.id === updatedTask.id
      );
      if (taskIndex === -1) {
        // Task not found, do nothing
        return prevTasks;
      }

      // Replace the old task with the updated one
      const updatedTasks = [...prevTasks];
      updatedTasks[taskIndex] = updatedTask;
      return updatedTasks;
    });
  };

  // Utility function to get the column ID by a task ID
  const getColumnIdByTaskId = (taskId) => {
    const foundColumn = columns.find((column) =>
      column.task_ids.includes(taskId)
    );
    return foundColumn ? foundColumn.id : null;
  };

  // Render the provider with the provided value for children components to consume
  return (
    <BoardContext.Provider
      value={{
        columns,
        setColumns,
        tasks,
        setTasks,
        users,
        setUsers,
        updateTasksArray,
        getColumnIdByTaskId,
        getTaskById,
        removeFromTasksArray,
        addColumnTaskId,
        removeColumnTaskId,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}

// Prop types validation for the BoardProvider
BoardProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
