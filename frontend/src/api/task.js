import axiosInstance from "./axiosInstance";

// Manages both fetching all tasks and fetching a single task
export const fetchTasksApi = (taskId = null) => {
  if (taskId) {
    return axiosInstance.get(`/task/${taskId}`);
  }
  return axiosInstance.get("/task");
};

// Requires columnId to be included so that reference to tasks can be added to column
export const createTaskApi = (data, columnId) => {
  data.column_id = columnId;
  axiosInstance.post("/task", data);
};

export const updateTaskApi = (taskId, data) =>
  axiosInstance.put(`/task/${taskId}`, data);

export const deleteTaskApi = (taskId) =>
  axiosInstance.delete(`/task/${taskId}`);
