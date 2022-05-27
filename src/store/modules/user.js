import { login, logout } from '@/api/user';
import { getLocalStorageToken, setLocalStorageToken, removeLocalStorageToken } from '@/utils/auth';

export const state = {
  token: getLocalStorageToken(),
  name: '',
  id: '', // test
  avatar: '',
};

export const actions = {
    // user login
    async login({ commit }, userInfo) {
      try {
        const { email, password } = userInfo;
        const { data } = await login({ email: email.trim(), password: password });

        commit('SET_ID', data.id);
        commit('SET_TOKEN', data.token);
        commit('SET_NAME', data.name);
        commit('SET_AVATAR', data.avatar);

        setLocalStorageToken(data.token);
      } catch (error) {
        console.log(error);

        return error;
      }
    },
    async logout({ commit, state, dispatch }) {
      try {
        commit('SET_ID', '');
        commit('SET_TOKEN', '');
        commit('SET_NAME', '');
        commit('SET_AVATAR', '');

        removeLocalStorageToken();
      } catch (error) {
        console.log(error);

        return error;
      }
    },
  
    resetLocalStorageToken({ commit }) {
      return new Promise(resolve => {
        commit('SET_ID', '');
        commit('SET_TOKEN', '');
        commit('SET_NAME', '');
        commit('SET_AVATAR', '');

        removeLocalStorageToken();

        resolve();
      })
    },
};

export const mutations = {
  SET_ID: (state, id) => {
    state.id = id;
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
};

export const getters = {
  isLogin: state => state.token !== '' || state.token !== null,
  token: state => state.token,
  userInfo: (state) => {
    const { name, id, avatar } = state;

    return {
      name,
      id,
      avatar,
    };
  }
};

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true,
}