import productService from "@/api/product.service";
import {
  // Actions
  FETCH_PRODUCTS,
  ADD_PRODUCT,
  EDIT_PRODUCT,
  REMOVE_PRODUCT,
  // Mutations
  SET_PRODUCTS,
  SET_MESSAGE
} from "./product.constants";

const state = {
  products: []
};

const getters = {
  getProducts: state => state.products,
  getProductById: state => id =>
    state.products.find(product => product._id === id),
  getMessage: state => state.message
};

const actions = {
  [FETCH_PRODUCTS]: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      productService.getProducts(rootState.auth.token).then(
        res => {
          commit(SET_PRODUCTS, res.body);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err.message);
          reject(err);
        }
      );
    });
  },
  [ADD_PRODUCT]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      productService.addProduct(rootState.auth.token, payload).then(
        res => {
          commit(
            SET_MESSAGE,
            `O produto ${res.body.name} foi adicionado com sucesso!`
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
  [EDIT_PRODUCT]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      productService.editProduct(rootState.auth.token, payload).then(
        res => {
          commit(SET_MESSAGE, `O produto foi atualizado com sucesso!`);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err);
          reject(err);
        }
      );
    });
  },
  [REMOVE_PRODUCT]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      productService.removeProduct(rootState.auth.token, id).then(
        res => {
          commit(SET_MESSAGE, `O produto foi removido com sucesso!`);
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
  [SET_PRODUCTS]: (state, products) => {
    state.products = products;
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
