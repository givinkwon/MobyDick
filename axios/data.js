import axios from "axios";
import { ROOT_URL } from "./index";

export function data() {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/data/data/`,
  });
}