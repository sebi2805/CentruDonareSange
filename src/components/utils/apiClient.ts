import axios from "axios";

export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export const apiClient = axios.create({
  baseURL: BASE_URL,
});
