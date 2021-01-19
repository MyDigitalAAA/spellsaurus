import cookie from 'vue-cookies';

// API
import { RepositoryFactory } from "~/api/repositories";
const Users = RepositoryFactory.get('users');

export const namespaced = true;

const state = {
  profile: cookie.get('user_profile') || null,
};

const getters = {
  getUserProfile: state => {
    return state.profile
  }
};

const mutations = {
  loginUser(state, user) {
    state.profile = user;
  },

  logoutUser(state) {
    state.profile = null;
  },

  registerUser() {
    // Will contain the email call eventually
  }
};

const actions = {
  /**
   * @param data
   * An object containing : 
   * - user object with mail and password hash properties
   * - remember_me boolean to check cookie expiration time
   */
  user_login ({ commit }, data) {
    return new Promise((resolve, reject) => {
      Users.login(data.user)
      .then(v => {
        let user = v.data.user;

        // Check if the use wishes to be remembered
        if (data.remember_me) {
          cookie.set('user_profile', user, 60 * 60 * 24 * 30); // Expires after a month
        } else {
          cookie.set('user_profile', user, 0); // Expires after browser session expires
        }
        
        commit('loginUser', user);
        resolve(user);
      })
      .catch(err => {
        reject(err.response);
      });
    })
  },

  user_logout ({ commit }) {
    cookie.remove('user_profile');
    commit('logoutUser');
  },

  /**
   * @param data
   * An object containing : 
   * - user object with string mail, string name, and string password
   */
  user_register ({ commit }, data) {
    return new Promise((resolve, reject) => {
      Users.register(data.user)
      .then(() => {
        commit('registerUser');
        resolve();
      })
      .catch(err => {
        reject(err.response);
      });
    })
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
