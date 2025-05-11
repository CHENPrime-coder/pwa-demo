import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
    }),
    actions: {
        setUser(user) {
            this.user = user;
        },
        setUsername(name) {
            if (!this.user) {
                return;
            }
            this.user.name = name;
        }
    },
    getters: {
        isLoggedIn(state) {
            return !!state.user;
        },
        userInfo(state) {
            return state.user;
        },
        userId(state) {
            return state.user ? state.user.id : null;
        },
        userName(state) {
            return state.user ? state.user.name : null;
        },
    },
});