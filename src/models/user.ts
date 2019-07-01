import { createModel } from '@rematch/core';

const asyncDelay = (ms: number) => new Promise(r => setTimeout(r, ms));
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
    async asyncLogin(mobile, state) {
      await asyncDelay(3000);
      this.login({
        mobile: mobile,
        token: 'asdasd1231231as1d561as1d65a',
      });
    },
  },
});
