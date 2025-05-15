import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        addresses: []
    }),
    actions: {
        setUser(user) {
            this.user = user;
            localStorage.setItem('user', JSON.stringify(this.user));
        },
        setAddresses(addresses) {
            this.addresses = addresses;
            localStorage.setItem('addresses', JSON.stringify(this.addresses));
        },
        setUsername(name) {
            if (!this.user) {
                return;
            }
            this.user.name = name;
            localStorage.setItem('user', JSON.stringify(this.user));
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
        },
        setPreferredAddress(addressId) {
            if (!this.user) {
                return;
            }
            this.user.preferredAddressId = addressId;
            localStorage.setItem('user', JSON.stringify(this.user));
        },
        removeAddress(addressId) {
            const index = this.addresses.findIndex(address => address.id === addressId);
            if (index !== -1) {
                this.addresses.splice(index, 1);
            }
            if (this.user && this.user.preferredAddressId === addressId) {
                this.user.preferredAddressId = this.addresses.length > 0 ? this.addresses[0].id : null;
            }
            localStorage.setItem('user', JSON.stringify(this.user));
            localStorage.setItem('addresses', JSON.stringify(this.addresses));
        },
        addAddress(address) {
            this.addresses.push(address);
            if (this.user && !this.user.preferredAddressId) {
                this.user.preferredAddressId = address.id;
            }
            localStorage.setItem('user', JSON.stringify(this.user));
            localStorage.setItem('addresses', JSON.stringify(this.addresses));
        },
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
        userAddresses(state) {
            return state.addresses;
        },
        userPreferredAddressId(state) {
            return state.user ? state.user.preferredAddressId : state.addresses.length > 0 ? state.addresses[0].id : null;
        }
    },
});