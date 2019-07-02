import { createModel } from '@rematch/core';
import { login } from '../api/user';
import { save } from '../lib/storage';

export const user = createModel({
  state: {
    token: null,
    userName: null,
    users: {},
  },
  reducers: {
    login(state: any, { publicInfo, mobile, token }) {
      if (publicInfo) {
        return {
          ...state,
          token: token,
          users: {
            ...state.users,
            [mobile]: {
              ...state.users[mobile],
              ...publicInfo,
            },
          },
          userName: mobile,
        };
      }
      return {
        ...state,
        token: token,
        userName: mobile,
      };
    },
    logout(state, id) {
      return {
        ...state,
        token: null,
        users: state.users,
      };
    },
  },
  effects: {
    async asyncLogin(params: any, state) {
      const res = await login(params)
      console.log(res)
      save('token', '123123')
      return 1
    },
  },
});
