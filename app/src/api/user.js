import axiosInstance from './axiosInstance';

export const fetchUsers = () => axiosInstance.get('/user');

// ... Additional user operations if they're added in the future
