import { defineStore } from 'pinia';

export const useUserStore = defineStore("mainStore", {
  state: () => ({
    user:[],  
  }),
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
    },
  },
  getters: {
    getUser: (state) => state.user,
  },
});
