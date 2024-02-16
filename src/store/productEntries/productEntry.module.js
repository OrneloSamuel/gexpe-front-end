import productEntryService from "@/api/productEntry.service";
import {
  // Actions
  FETCH_PRODUCTENTRIES,
  ADD_PRODUCTENTRY,
  EDIT_PRODUCTENTRY,
  REMOVE_PRODUCTENTRY,
  // Mutations
  SET_PRODUCTENTRIES,
  SET_MESSAGE
} from "./productEntry.constants";

const state = {
  productEntries: []
};

const getters = {
  getProductEntries: state => state.productEntries,
  getProductEntriesById: state => id =>
    state.productEntries.find(productEntry => productEntry._id === id),
  getMessage: state => state.message
};

const actions = {
  [FETCH_PRODUCTENTRIES]: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      productEntryService.getProductEntries(rootState.auth.token).then(
        res => {
          commit(SET_PRODUCTENTRIES, res.body);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err.message);
          reject(err);
        }
      );
    });
  },
  [ADD_PRODUCTENTRY]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      productEntryService.addProductEntry(rootState.auth.token, payload).then(
        res => {
          commit(
            SET_MESSAGE,
            `A entrada de produto ${res.body.name} foi adicionada com sucesso!`
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
  [EDIT_PRODUCTENTRY]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      productEntryService.editProductEntry(rootState.auth.token, payload).then(
        res => {
          commit(SET_MESSAGE, `A entrada de produto foi atualizada com sucesso!`);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err);
          reject(err);
        }
      );
    });
  },
  [REMOVE_PRODUCTENTRY]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      productEntryService.removeProductEntry(rootState.auth.token, id).then(
        res => {
          commit(SET_MESSAGE, `A entrada de produto foi removida com sucesso!`);
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
  [SET_PRODUCTENTRIES]: (state, productEntries) => {
    state.productEntries = productEntries;
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
