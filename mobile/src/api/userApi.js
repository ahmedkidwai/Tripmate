import axios from 'axios';
import {url} from '../utils/globalVars';

export function addNewUser(username) {
  axios
    .post(url + ':5000/user/add', {
      username: username,
    })
    .then(response => {
      if (response.data.status) {
        console.log(response);
      }
    })
    .catch(error => {
      console.log(error);
    });
}
