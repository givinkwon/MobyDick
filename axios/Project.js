import axios from "axios";
import { ROOT_URL } from "./index";

export function getNextPage(req) {
  return axios({
    method: 'GET',
    url: req.nextUrl,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  })
}

export function getProjects(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/project/`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  })
}



export function getProjectDetail(req) {
  return axios({
    method: 'GET',
    url: `${ROOT_URL}/project/${req.id}/`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  })
}
