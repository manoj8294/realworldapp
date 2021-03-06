import { ArticlesService, CommentsService } from "@/common/api.service";
import { fetchArticle, fetchComments } from "./actions.type";
import { setArticle, setComments } from "./mutations.type";

export const state = {
  article: {},
  comments: []
};

export const actions = {
  [fetchArticle](context, articleSlug) {
    return ArticlesService.get(articleSlug)
      .then(({ data }) => {
        context.commit(setArticle, data.article);
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  [fetchComments](context, articleSlug) {
    return CommentsService.get(articleSlug)
      .then(({ data }) => {
        context.commit(setComments, data.comments);
      })
      .catch(error => {
        throw new Error(error);
      });
  }
};

/* eslint no-param-reassign: ["error", { "props": false }] */
export const mutations = {
  [setArticle](state, article) {
    state.article = article;
  },
  [setComments](state, comments) {
    state.comments = comments;
  }
};

export default {
  state,
  actions,
  mutations
};
