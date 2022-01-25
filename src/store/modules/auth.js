import axios from "axios";
import router from "../../router";
import Swal from 'sweetalert2';

const state = {
    auth: {
        isAuth: false,
        token: '',
        user: {},
        
    }
}

const getters = {
    fetchAuth: (state) => {
        return state.auth;
    }
}

const actions = {
    async loginUser({ commit,dispatch }, data) {
        dispatch('changeLoader',true)
        await axios
            .post("/login", data)
            .then((response) => {
                const com = commit('SET_TOKEN', response.data.access_token);
                axios.get('/profile')
                    .then(res => {
                        commit('SET_USER', res.data);
                        dispatch('changeLoader',false)
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: `User Logged in !`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    });
                router.push('/')
            })
            .catch((err) => {
                dispatch('changeLoader',false)
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: `Please check credentials or blocked by admin : ${err.message}`,
                    showConfirmButton: false,
                    timer: 2500
                })
            });
    },

    async attempt({ commit }, token) {
        commit('SET_TOKEN', token);
        if (state.auth.isAuth) {
            await axios.get('/profile')
                .then(res => {
                    commit('SET_USER', res.data);
                }).catch(err => {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: `Session has expired please login  : ${err.message}`,
                        showConfirmButton: false,
                        timer: 2500
                    });
                    commit('LOGOUT_USER');
                })
        }
    },

    async logoutUser({ commit }) {
        commit('LOGOUT_USER');
    },

 

}

const mutations = {
    SET_TOKEN: (state, token) => {
        if (token) {
            state.auth.isAuth = true;
        } else {
            state.auth.isAuth = false;
        }
        state.auth.token = token
    },
    SET_USER: (state, user) => {
        state.auth.user = user
    },
    LOGOUT_USER: (state) => {
        state.auth.token = null;
        state.auth.user = null;
        state.auth.isAuth = false;
        localStorage.removeItem('token');
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `User Logged Out !`,
            showConfirmButton: false,
            timer: 1500
        });
        router.push('/login');
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}