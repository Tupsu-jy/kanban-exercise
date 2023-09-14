import axiosInstance from "./axiosInstance";
import { insideMoveSchema, crossMoveSchema } from '../schemas/payloads';

export const fetchColumns = () => axiosInstance.get("/column");

export const moveTaskInsideColumn = async (payload) => {
  try {
    await insideMoveSchema.validate(payload);
    return axiosInstance.put(`/columns/move_task/inside`, payload);
  } catch (error) {
    // Handle validation error
    console.log(error);
    throw error;
  }
};

export const moveTaskBetweenColumns = async (payload) => {
  try {
    await crossMoveSchema.validate(payload);
    return axiosInstance.put(`/columns/move_task/across`, payload);
  } catch (error) {
    // Handle validation error
    console.log(error);
    throw error;
  }
};
