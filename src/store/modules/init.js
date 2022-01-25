import axios from "axios"
import Swal from "sweetalert2";
import router from "../../router";
const state = {
    product: {},
    category: {},
    banners: {},
    categoryProducts: {},
    cart: JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [],
    product_details: {},
    // checkout: {},
    cartCheckout: {
        products: [],
        total: 0,
        payment_mode: '', // 1 for online . 2 for COD
        coupon: '', //storing coupon used code for the vlidation purpose .. fetching data from couponused_user table 
        address_id: '', // geeting array id 
        lastOrder: null,
    },
    myOrders: null,
    wishlist: [],
    loader: false,
}

const getters = {
    getInitIndexApi: (state) => {
        return state;
    },
    getCategoryWiseProduct: (state) => {
        return state.categoryProducts;
    },
    getCart: (state) => {
        return state.cart;
    },
    getProductDetails: state => {
        return state.product_details;
    },
    getCheckOuDetails: state => {
        return state.checkout;
    },
    getCartCheckout: state => {
        return state.cartCheckout;
    },
    getMyOrders: (state) => {
        return state.myOrders;
    },
    getMyWishlist: state => {
        return state.wishlist;
    },
    getLoader: state => {
        return state.loader
    }
}

const actions = {
    async initIndexApi({ commit, dispatch }) {
        dispatch('changeLoader', true)
        await axios.post('/init').then(res => {
            // console.log(res.data)
            commit('SET_INIT', res.data);
            dispatch('changeLoader', false)
        })
    },

    async categoryWiseProductApi({ commit, dispatch }, data) {
        dispatch('changeLoader', true)
        await axios.post('/get-category-wise-products', data)
            .then(res => {
                dispatch('changeLoader', false)
                return commit('SET_CATEGORYPRODUCT', res.data);
            })
    },
    addTocart({ commit }, data) {
        commit('SET_CART', data);
    },
    async productDetails({ commit, dispatch }, data) {
        dispatch('changeLoader', true)
        await axios.post('/product-details', { product_id: data })
            .then(res => {
                commit('SET_PRODUCT_DETAILS', res.data);
                dispatch('changeLoader', false)
                return res.data
            })
            .catch(err => {
                dispatch('changeLoader', false)
                console.log(err)
            })
    },
    async cartCheckOut({ commit, dispatch, state }) {
        dispatch('changeLoader', true)
        var id = [];
        var quantity = [];
        state.cart.forEach(element => {
            id.push(element.id);
            quantity.push(element.quantity);
        });
        const data = { id, quantity }
        await axios.post('/get-checkout-products', data)
            .then(res => {
                dispatch('changeLoader', false)
                return commit('SET_CART_CHECKOUT', res.data[0]);
            }).catch(err => {
                dispatch('changeLoader', false)
                console.log(err);
            })
    },
    removeProductFromCart({ commit }, id) {
        return commit('REMOVE_PRODUCT', id);
    },
    addProductQuantity({ commit }, data) {
        return commit('INCREASE_QUANTITY', data);
    },
    minusProductQuantity({ commit }, data) {
        return commit('DECREASE_QUANTITY', data);
    },
    async checkoutOrder({ state, dispatch }, data) {
        dispatch('changeLoader', true)
        state.cartCheckout.payment_mode = data.payment_mode;
        state.cartCheckout.address_id = data.address_id;
        state.cartCheckout.coupon = data.coupon;
        await axios.post('/profile/place-order', state.cartCheckout)
            .then(res => {
                if (res.data.status == 200) {
                    console.log(res.data.order.payment_mode)
                    if (res.data.order.payment_mode == 1) {
                        router.push(`/order/payment?order=${res.data.order.id}`);
                        state.cartCheckout.lastOrder = res.data.order;
                        dispatch('changeLoader', false)

                        return "";
                    } else {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            heightAuto: true,
                            title: `Thank you ! <br> Order  has been Placed !`,
                            timer: 2500
                        });
                    }
                    dispatch('changeLoader', false)
                    localStorage.removeItem('cart');
                    state.cartCheckout.payment_mode = '';
                    state.cartCheckout.address_id = '';
                    state.cartCheckout.coupon = '';
                    state.cartCheckout.total = 0;
                    state.cartCheckout.products = [];
                    state.cart = [];
                    router.push('/');
                } else {
                    console.log(res);
                    dispatch('changeLoader', false)
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        heightAuto: true,
                        width: '500px',
                        title: `Error ! <br>  code :${res.data.status} !`,
                        text: `Message:Please select the payment ,address and make sure products are visible to place the order !`,
                        timer: 2500
                    });

                }
            })
        return true;

    },
    async myOrders({ commit, dispatch }) {
        dispatch('changeLoader', true)
        const res = await axios.post('/profile/get-my-orders');
        commit('SET_MY_ORDERS', res.data);
        dispatch('changeLoader', false)
    },
    async addWishlist({ dispatch }, data) {
        dispatch('changeLoader', true)
        await axios.post('/profile/add-to-wishlist', data)
            .then(res => {
                console.log(res);
                if (res.data.status == 200) {

                    dispatch('getWishlistApi')
                    dispatch('changeLoader', false)
                    Swal.fire({
                        position: 'top-right',
                        icon: 'success',
                        heightAuto: true,
                        title: `Product has been added to Wishlist !`,
                        timer: 2500
                    })
                }
                if (res.data.status == 403) {
                    dispatch('changeLoader', false)
                    Swal.fire({
                        position: 'top-right',
                        icon: 'error',
                        heightAuto: true,
                        title: `Product not added !`,
                        text: `${res.data.message}`,
                        timer: 2500
                    })
                }

            }).catch(err => {
                dispatch('changeLoader', false)
                console.log(err);
            })
    },
    async removeFromWishlist({ dispatch }, data) {
        dispatch('changeLoader', true)
        await axios.post('/profile/remove-wishlist-product', data)
            .then(res => {
                console.log(res);
                dispatch('changeLoader', false)
                if (res.data.status == 200) {

                    dispatch('getWishlistApi')
                }

            }).catch(err => {
                dispatch('changeLoader', false)
                console.log(err);
            })

    }
    ,
    async getWishlistApi({ commit, dispatch }) {
        dispatch('changeLoader', true)
        await axios.post('/profile/get-my-wishlist')
            .then(res => {
                console.log("getWishList");
                console.log(res)
                if (res.data.status == 200) {

                    commit('SET_WISHLIST', res.data.list)
                }
                dispatch('changeLoader', false)

            }).catch(err => {
                console.log(err);
                dispatch('changeLoader', false)
            })
    },
    changeLoader({ commit }, status) {
        commit('SET_LOADER', status);
    }

}

const mutations = {
    SET_INIT: (state, data) => {
        state.product = data.product;
        state.category = data.category;
        state.banners = data.banner;
    },
    SET_CATEGORYPRODUCT: (stat, data) => {
        stat.categoryProducts = data;
    },
    SET_CART: (state, data) => {
        console.log(data)
        let flag = true;
        state.cart.forEach((element, index) => {
            if (element.id == data.id) {
                state.cart[index].quantity = parseInt(state.cart[index].quantity) + parseInt(data.quantity);
                flag = false;
            }
        });
        if (flag) {
            state.cart.push(data);
            Swal.fire({
                position: 'top-right',
                icon: 'success',
                heightAuto: true,
                title: `Product has been added to cart !`,
                timer: 2500
            });
        }


        localStorage.setItem('cart', JSON.stringify(state.cart));

    },
    SET_PRODUCT_DETAILS: (state, data) => {
        state.product_details = data;
    },
    SET_CART_CHECKOUT: (state, data) => {

        state.cartCheckout.products = data;
        data.map(ele => {
            state.cartCheckout.total += (ele.price * ele.quantity)
        })
        console.log(state.cartCheckout)

    },
    REMOVE_PRODUCT: async (state, data) => {

        const index = state.cartCheckout.products.findIndex(ele => ele.id == data)
        const remArr = state.cartCheckout.products.splice(index, 1);
        const cartIndex = state.cart.findIndex(ele => ele.id == data);
        await state.cart.splice(cartIndex, 1);
        localStorage.setItem('cart', JSON.stringify(state.cart));
        state.cartCheckout.total -= remArr[0].price * remArr[0].quantity;
        Swal.fire({
            icon: 'success',
            title: `Product has been removed !`,
            showConfirmButton: true,
            timer: 2500
        });
    },
    INCREASE_QUANTITY: (state, data) => {
        state.cartCheckout.products.forEach((element, index) => {
            if (element.id == data) {
                state.cartCheckout.products[index].quantity += 1;
                state.cartCheckout.total += element.price;
            }
        });

        state.cart.forEach((element, index) => {
            if (element.id == data) {
                state.cart[index].quantity += 1;
            }
        });
        localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    DECREASE_QUANTITY: (state, data) => {
        state.cartCheckout.products.forEach((element, index) => {
            if (element.id == data) {
                if (state.cartCheckout.products[index].quantity > 0) {
                    state.cartCheckout.products[index].quantity -= 1;
                    state.cartCheckout.total -= element.price;
                } else {
                    state.cartCheckout.products[index].quantity = 1;
                }

            }
        });
        state.cart.forEach((element, index) => {
            if (element.id == data) {
                if (state.cart[index].quantity > 0) {
                    state.cart[index].quantity -= 1;
                } else {
                    state.cart[index].quantity = 1
                }
            }
        })
        localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    SET_MY_ORDERS: (state, data) => {
        state.myOrders = data;
    },
    SET_WISHLIST: (state, data) => {
        state.wishlist = data;
    },
    SET_LOADER: (state, status) => {
        state.loader = status;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}