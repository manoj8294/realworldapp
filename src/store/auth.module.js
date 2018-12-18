import ApiService from "@/common/api.service";
import JwtService from "@/common/jwt.service";
import {
  login,
  logoutUser,
  registerUser,
  isAuthenticate,
  updateUser
} from "./actions.type";
import { setAuthentication, deleteAuthentication, setError } from "./mutations.type";

const state = {
  errors: null,
  user: {},
  isAuthenticated: !!JwtService.getToken()
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  }
};

const actions = {
  [login](context, credentials) {
    return new Promise(resolve => {
      ApiService.post("users/login", { user: credentials })
        .then(({ data }) => {
          context.commit(setAuthentication, data.user);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(setError, response.data.errors);
        });
    });
  },
  [logoutUser](context) {
    context.commit(deleteAuthentication);
  },
  [registerUser](context, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.post("users", { user: credentials })
        .then(({ data }) => {
          context.commit(setAuthentication, data.user);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(setError, response.data.errors);
          reject(response);
        });
    });
  },
  [isAuthenticate](context) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("user")
        .then(({ data }) => {
          context.commit(setAuthentication, data.user);
        })
        .catch(({ response }) => {
          context.commit(setError, response.data.errors);
        });
    } else {
      context.commit(deleteAuthentication);
    }
  },
  [updateUser](context, payload) {
    const { email, username, password, image, bio } = payload;
    const user = {
      email,
      username,
      bio,
      image
    };
    if (password) {
      user.password = password;
    }

    return ApiService.put("user", user).then(({ data }) => {
      context.commit(setAuthentication, data.user);
      return data;
    });
  }
};

const mutations = {
  [setError](state, error) {
    state.errors = error;
  },
  [setAuthentication](state, user) {
    state.isAuthenticated = true;
    state.user = user;
    state.errors = {};
    JwtService.saveToken(state.user.token);
  },
  [deleteAuthentication](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    JwtService.destroyToken();
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
