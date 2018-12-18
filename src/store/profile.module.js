import ApiService from "@/common/api.service";
import {
  fetchProfile,
  fetchProfileFollow,
  fetchProfileFollowUnFollow
} from "./actions.type";
import { setProfile } from "./mutations.type";

const state = {
  errors: {},
  profile: {}
};

const getters = {
  profile(state) {
    return state.profile;
  }
};

const actions = {
  [fetchProfile](context, payload) {
    const { username } = payload;
    return ApiService.get("profiles", username)
      .then(({ data }) => {
        context.commit(setProfile, data.profile);
        return data;
      })
      .catch(() => {
      });
  },
  [fetchProfileFollow](context, payload) {
    const { username } = payload;
    return ApiService.post(`profiles/${username}/follow`)
      .then(({ data }) => {
        context.commit(setProfile, data.profile);
        return data;
      })
      .catch(() => {
      });
  },
  [fetchProfileFollowUnFollow](context, payload) {
    const { username } = payload;
    return ApiService.delete(`profiles/${username}/follow`)
      .then(({ data }) => {
        context.commit(setProfile, data.profile);
        return data;
      })
      .catch(() => {
      });
  }
};

const mutations = {
  [setProfile](state, profile) {
    state.profile = profile;
    state.errors = {};
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
