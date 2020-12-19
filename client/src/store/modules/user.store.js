// import cookie from 'vue-cookies';

// API
import { RepositoryFactory } from "~/api/repositories";
const Users = RepositoryFactory.get('users');

export const namespaced = true;

const state = {
  status: {
    logged: false,
    profile: null,
  }
};

const getters = {
  getUserProfile: state => {
    if (state.status.logged) {
      return state.status.profile
    } else {
      return false
    }
  }
};

const mutations = {
  loginUser(state, user) {
    state.status.profile = user;
    state.status.logged = true;
  },
  logoutUser(state) {
    state.status.profile = null;
    state.status.logged = false;
  }
};

const actions = {
  user_login ({ commit }, data) {
    return new Promise((resolve, reject) => {
      Users.login(data)
      .then(v => {
        let user = v.data.user;
        // cookie.set('user_token', user.uuid);
        commit('loginUser', user);
        resolve(user);
      })
      .catch(() => {
        reject();
      });
    })
  },
  user_logout ({ commit }) {
    // cookie.remove('user_token');
    commit('logoutUser');
  }
};

// Check if a cookie with user token exists
// if (cookie.get('user_token')) {
//   mutations.loginUser(state, cookie.get('user_token'));
// }

export default {
  state,
  getters,
  actions,
  mutations,
};
