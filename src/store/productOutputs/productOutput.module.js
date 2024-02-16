import productOutputService from "@/api/productOutput.service";
import {
  // Actions
  FETCH_PRODUCTOUTPUTS,
  ADD_PRODUCTOUTPUT,
  EDIT_PRODUCTOUTPUT,
  REMOVE_PRODUCTOUTPUT,
  // Mutations
  SET_PRODUCTOUTPUTS,
  SET_MESSAGE
} from "./productOutput.constants";

const state = {
  productOutputs: []
};

const getters = {
  getProductOutputs: state => state.productOutputs,
  getProductOutputsById: state => id =>
    state.productOutputs.find(productOutput => productOutput._id === id),
  getMessage: state => state.message
};

const actions = {
  [FETCH_PRODUCTOUTPUTS]: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      productOutputService.getProductOutputs(rootState.auth.token).then(
        res => {
          commit(SET_PRODUCTOUTPUTS, res.body);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err.message);
          reject(err);
        }
      );
    });
  },
  [ADD_PRODUCTOUTPUT]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      productOutputService.addProductOutput(rootState.auth.token, payload).then(
        res => {
          commit(
            SET_MESSAGE,
            `A saída de produto ${res.body.name} foi adicionada com sucesso!`
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
  [EDIT_PRODUCTOUTPUT]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      productOutputService.editProductOutput(rootState.auth.token, payload).then(
        res => {
          commit(SET_MESSAGE, `A saída de produto foi atualizada com sucesso!`);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err);
          reject(err);
        }
      );
    });
  },
  [REMOVE_PRODUCTOUTPUT]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      productOutputService.removeProductOutput(rootState.auth.token, id).then(
        res => {
          commit(SET_MESSAGE, `A saída de produto foi removida com sucesso!`);
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
  [SET_PRODUCTOUTPUTS]: (state, productOutputs) => {
    state.productOutputs = productOutputs;
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
