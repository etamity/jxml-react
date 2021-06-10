export const counter = {
  name: 'app',
  state: {
    user: {
      id: 'some id',
      name: 'joey',
    },
    list: [
      {
        label: 'list 1',
      },
      {
        label: 'list 2',
      },
      {
        label: 'list 3',
      },
    ],
  }, // initial state
  reducers: {
    // handle state changes with pure functions
    setUser: (state, payload) => {
      state.user = payload;
    },
  },
  effects: (dispatch) => ({
    setUserAsync: async (payload, rootState) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      dispatch.app.setUser(payload);
    },
  }),
};
