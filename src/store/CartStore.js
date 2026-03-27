import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [   {
        id: 1,
        brand: 'Nike',
        name: 'Air Max Pre-Day SE',
        price: 3600000,
        quantity: 1,
        size: '42',
        color: 'Red/Black',
        image: 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/502f1725-4015-4e8a-9956-982bc0f96a99/SABRINA+3+ASW+%28GS%29.png',
        selected: true
      }]
  }),
  getters: {
    totalItems: (state) => state.items.length,
    subTotal: (state) => state.items
      .filter(i => i.selected)
      .reduce((acc, i) => acc + (i.price * i.quantity), 0)
  },
  actions: {
    addToCart(product) {
      const existingItem = this.items.find(i => i.id === product.id && i.size === product.size);
      if (existingItem) {
        existingItem.quantity += product.quantity;
      } else {
        this.items.push({ ...product, selected: true });
      }
    },
    removeItem(index) {
      this.items.splice(index, 1);
    },
    incrementQty(index) {
      this.items[index].quantity++;
    },
    decrementQty(index) {
      if (this.items[index].quantity > 1) this.items[index].quantity--;
    }
  }
});