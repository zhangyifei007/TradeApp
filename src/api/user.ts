import { Post } from '../utils/request';

export const login = (params: any) => {
  return Post('/login', params);
};
