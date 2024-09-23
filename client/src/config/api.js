import axios from "axios";
import { SERVER_DOMAIN } from "./config";

export const AxiosClient = axios.create({
  baseURL: SERVER_DOMAIN + "apis",
});
