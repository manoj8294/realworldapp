import { TagsService, ArticlesService } from "@/common/api.service";
import { fetchMultipleArticles, fetchTags } from "./actions.type";
import {
  fetchStart,
  fetchEnd,
  setTags,
  updateArticleList
} from "./mutations.type";

const state = {
  tags: [],
  articles: [],
  isLoading: true,
  articlesCount: 0
};

const getters = {
  articlesCount(state) {
    return state.articlesCount;
  },
  articles(state) {
    return state.articles;
  },
  isLoading(state) {
    return state.isLoading;
  },
  tags(state) {
    return state.tags;
  }
};

const actions = {
  [fetchMultipleArticles]({ commit }, params) {
    commit(fetchStart);
    return ArticlesService.query(params.type, params.filters)
      .then(({ data }) => {
        commit(fetchEnd, data);
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  [fetchTags]({ commit }) {
    return TagsService.get()
      .then(({ data }) => {
        commit(setTags, data.tags);
      })
      .catch(error => {
        throw new Error(error);
      });
  }
};

/* eslint no-param-reassign: ["error", { "props": false }] */
const mutations = {
  [fetchStart](state) {
    state.isLoading = true;
  },
  [fetchEnd](state, { articles, articlesCount }) {
    state.articles = articles;
    state.articlesCount = articlesCount;
    state.isLoading = false;
  },
  [setTags](state, tags) {
    state.tags = tags;
  },
  [updateArticleList](state, data) {
    state.articles = state.articles.map(article => {
      if (article.slug !== data.slug) {
        return article;
      }
      article.favorited = data.favorited;
      article.favoritesCount = data.favoritesCount;
      return article;
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
