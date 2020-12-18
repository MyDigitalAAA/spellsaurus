// API
import { RepositoryFactory } from "~/api/repositories"
const Users = RepositoryFactory.get('users')

export const namespaced = true

const state = {
  status: {
    logged: false,
    user_token: null,
  }
};

const getters = {
  getUserToken: state => {
    if (state.status.logged) {
      return state.status.user_token
    } else {
      return false
    }
  }
};

const mutations = {
  loginUser(state, user_token) {
    state.status.user_token = user_token;
    state.status.logged = true;
  },
  logoutUser(state) {
    state.status.user_token = null;
    state.status.logged = false;
  }
};

const actions = {
  user_login ({ commit }, data) {
    return new Promise((resolve, reject) => {
      Users.login(data)
      .then(v => {
        let user_token = v.data.token;
        commit('loginUser', user_token);
        resolve(user_token);
      })
      .catch(() => {
        reject();
      });
    })
  },
  user_logout ({ commit }) {
    commit('logoutUser');
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
