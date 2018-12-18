import Vue from "vue";
import {
  ArticlesService,
  CommentsService,
  FavoriteService
} from "@/common/api.service";
import {
  fetchArticle,
  fetchComments,
  createComment,
  destroyComment,
  addFavoriteArticle,
  removeFavoriteArticle,
  publishArticle,
  editArticle,
  editArticleAddTag,
  editArticleRemoveTag,
  deleteArticle,
  resetArticleState
} from "./actions.type";
import {
  reset,
  setArticle,
  setComments,
  addTag,
  removeTag,
  updateArticleList
} from "./mutations.type";

const initialState = {
  article: {
    author: {},
    title: "",
    description: "",
    body: "",
    tagList: []
  },
  comments: []
};

export const state = { ...initialState };

export const actions = {
  async [fetchArticle](context, articleSlug, prevArticle) {
    if (prevArticle !== undefined) {
      return context.commit(setArticle, prevArticle);
    }
    const { data } = await ArticlesService.get(articleSlug);
    context.commit(setArticle, data.article);
    return data;
  },
  async [fetchComments](context, articleSlug) {
    const { data } = await CommentsService.get(articleSlug);
    context.commit(setComments, data.comments);
    return data.comments;
  },
  async [createComment](context, payload) {
    await CommentsService.post(payload.slug, payload.comment);
    context.dispatch(fetchComments, payload.slug);
  },
  async [destroyComment](context, payload) {
    await CommentsService.destroy(payload.slug, payload.commentId);
    context.dispatch(fetchComments, payload.slug);
  },
  async [addFavoriteArticle](context, payload) {
    const { data } = await FavoriteService.add(payload);
    context.commit(updateArticleList, data.article, { root: true });
    context.commit(setArticle, data.article);
  },
  async [removeFavoriteArticle](context, payload) {
    const { data } = await FavoriteService.remove(payload);
    context.commit(updateArticleList, data.article, { root: true });
    context.commit(setArticle, data.article);
  },
  [publishArticle]({ state }) {
    return ArticlesService.create(state.article);
  },
  [deleteArticle](context, slug) {
    return ArticlesService.destroy(slug);
  },
  [editArticle]({ state }) {
    return ArticlesService.update(state.article.slug, state.article);
  },
  [editArticleAddTag](context, tag) {
    context.commit(addTag, tag);
  },
  [editArticleRemoveTag](context, tag) {
    context.commit(removeTag, tag);
  },
  [resetArticleState]({ commit }) {
    commit(reset);
  }
};

/* eslint no-param-reassign: ["error", { "props": false }] */
export const mutations = {
  [setArticle](state, article) {
    state.article = article;
  },
  [setComments](state, comments) {
    state.comments = comments;
  },
  [addTag](state, tag) {
    state.article.tagList = state.article.tagList.concat([tag]);
  },
  [removeTag](state, tag) {
    state.article.tagList = state.article.tagList.filter(t => t !== tag);
  },
  [reset]() {
    for (let f in state) {
      Vue.set(state, f, initialState[f]);
    }
  }
};

const getters = {
  article(state) {
    return state.article;
  },
  comments(state) {
    return state.comments;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
