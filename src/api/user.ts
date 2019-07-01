import {Post} from "../utils/request";

export const login = (userName: string, password: string) => {
  const options = {
    body: {
      userName,
      password
    }
  }
  // return Post('/login', options);
  return Promise.resolve({code: 1})
}