import bankService from "@/api/bank.service";
import {
  // Actions
  FETCH_BANKS,
  ADD_BANK,
  EDIT_BANK,
  REMOVE_BANK,
  // Mutations
  SET_BANKS,
  SET_MESSAGE
} from "./bank.constants";

const state = {
  banks: []
};

const getters = {
  getBanks: state => state.banks,
  getBankById: state => id => state.banks.find(bank => bank._id === id),
  getMessage: state => state.message
};

const actions = {
  [FETCH_BANKS]: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      bankService.getBanks(rootState.auth.token).then(
        res => {
          commit(SET_BANKS, res.body);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err.message);
          reject(err);
        }
      );
    });
  },
  [ADD_BANK]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      bankService.addBank(rootState.auth.token, payload).then(
        res => {
          commit(SET_MESSAGE, `O banco foi adicionado com sucesso!`);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err.message);
          reject(err);
        }
      );
    });
  },
  [EDIT_BANK]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      bankService.editBank(rootState.auth.token, payload).then(
        res => {
          commit(SET_MESSAGE, `O banco foi atualizado com sucesso!`);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err);
          reject(err);
        }
      );
    });
  },
  [REMOVE_BANK]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      bankService.removeBank(rootState.auth.token, id).then(
        res => {
          commit(SET_MESSAGE, `O banco foi removido com sucesso!`);
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
  [SET_BANKS]: (state, banks) => {
    state.banks = banks;
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
