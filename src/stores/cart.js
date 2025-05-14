// 购物车
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
    state: () => ({
        cart: [],
        totalPrice: 0,
        totalCount: 0,
    }),
    actions: {
        removeFromCart(itemId) {
            this.cart = this.cart.filter(item => item.id !== itemId);
            this.calculateTotal();
        },
        updateItemCount(target, isAdd) {
            const item = this.cart.find(item => item.id === target.id);
            console.log(target, isAdd, item);
            
            if (item) {
                if (isAdd) {
                    item.selectedCount++;
                } else {
                    item.selectedCount--;
                    if (item.selectedCount <= 0) {
                        this.removeFromCart(target.id);
                    }
                }
            } else {
                target.selectedCount = 1;
                this.cart.push(target);
            }
            this.calculateTotal();
        },
        clearCart() {
            this.cart = [];
            this.calculateTotal();
        },
        calculateTotal() {
            this.totalPrice = this.cart.reduce((total, item) => total + item.price * item.selectedCount, 0);
            this.totalCount = this.cart.reduce((total, item) => total + item.selectedCount, 0);
            this.saveCart();
        },
        saveCart() {
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },
        loadCart() {
            const cart = localStorage.getItem('cart');
            if (cart) {
                this.cart = JSON.parse(cart);
                this.calculateTotal();
            }
        },
    },
    getters: {
        cartItems: (state) => state.cart,
        cartTotalPrice: (state) => state.totalPrice,
        cartTotalCount: (state) => state.totalCount,
    },
});