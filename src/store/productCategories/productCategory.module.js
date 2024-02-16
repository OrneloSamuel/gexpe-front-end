import productCategoryService from "@/api/productCategory.service";
import {
  // Actions
  FETCH_PRODUCTCATEGORIES,
  ADD_PRODUCTCATEGORY,
  EDIT_PRODUCTCATEGORY,
  REMOVE_PRODUCTCATEGORY,
  // Mutations
  SET_PRODUCTCATEGORIES,
  SET_MESSAGE
} from "./productCategory.constants";

const state = {
  productCategorys: []
};

const getters = {
  getProductCategories: state => state.productCategorys,
  getProductCategoryById: state => id =>
    state.productCategorys.find(productCategory => productCategory._id === id),
  getMessage: state => state.message
};

const actions = {
  [FETCH_PRODUCTCATEGORIES]: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      productCategoryService.getProductCategories(rootState.auth.token).then(
        res => {
          commit(SET_PRODUCTCATEGORIES, res.body);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err.message);
          reject(err);
        }
      );
    });
  },
  [ADD_PRODUCTCATEGORY]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      productCategoryService
        .addProductCategory(rootState.auth.token, payload)
        .then(
          res => {
            commit(
              SET_MESSAGE,
              `A categoria de produto ${res.body.name} foi adicionada com sucesso!`
            );
            resolve(res);
          },
          err => {
            commit(SET_MESSAGE, err.message);
            reject(err);
          }
        );
    });
  },
  [EDIT_PRODUCTCATEGORY]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      productCategoryService
        .editProductCategory(rootState.auth.token, payload)
        .then(
          res => {
            commit(
              SET_MESSAGE,
              `A categoria de produto foi atualizada com sucesso!`
            );
            resolve(res);
          },
          err => {
            commit(SET_MESSAGE, err);
            reject(err);
          }
        );
    });
  },
  [REMOVE_PRODUCTCATEGORY]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      productCategoryService
        .removeProductCategory(rootState.auth.token, id)
        .then(
          res => {
            commit(
              SET_MESSAGE,
              `A categoria de produto foi removida com sucesso!`
            );
            resolve(res);
          },
          err => {
            commit(SET_MESSAGE, err.message);
            reject(err);
          }
        );
    });
  }
};

export const mutations = {
  [SET_PRODUCTCATEGORIES]: (state, productCategorys) => {
    state.productCategorys = productCategorys;
  },
  [SET_MESSAGE]: (state, message) => {
    state.message = message;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
