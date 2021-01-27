import axios from "axios";
import {ROOT_URL} from "./index";

export function getOccupiedToday(req) {
  return axios({
    method: 'GET',
    url: `${ROOT_URL}/schedule/getScheduleByPeriod?startAt=${req.today} 10:00:00.00&endAt=${req.today} 19:00:00.00&timeWindow=1`, 
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  })
}
