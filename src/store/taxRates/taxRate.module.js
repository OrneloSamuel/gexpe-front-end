import taxRateService from "@/api/taxRate.service";
import {
  // Actions
  FETCH_TAXRATES,
  ADD_TAXRATE,
  EDIT_TAXRATE,
  REMOVE_TAXRATE,
  // Mutations
  SET_TAXRATES,
  SET_MESSAGE
} from "./taxRate.constants";

const state = {
  taxRates: []
};

const getters = {
  getTaxRates: state => state.taxRates,
  getTaxRateById: state => id =>
    state.taxRates.find(taxRate => taxRate._id === id),
  getMessage: state => state.message
};

const actions = {
  [FETCH_TAXRATES]: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      taxRateService.getTaxRates(rootState.auth.token).then(
        res => {
          commit(SET_TAXRATES, res.body);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err.message);
          reject(err);
        }
      );
    });
  },
  [ADD_TAXRATE]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      taxRateService.addTaxRate(rootState.auth.token, payload).then(
        res => {
          commit(
            SET_MESSAGE,
            `A taxa de imposto ${res.body.description} foi adicionada com sucesso!`
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
  [EDIT_TAXRATE]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      taxRateService.editTaxRate(rootState.auth.token, payload).then(
        res => {
          commit(SET_MESSAGE, `A taxa de imposto foi atualizada com sucesso!`);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err);
          reject(err);
        }
      );
    });
  },
  [REMOVE_TAXRATE]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      taxRateService.removeTaxRate(rootState.auth.token, id).then(
        res => {
          commit(SET_MESSAGE, `A taxa de imposto foi removida com sucesso!`);
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
  [SET_TAXRATES]: (state, taxRates) => {
    state.taxRates = taxRates;
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
