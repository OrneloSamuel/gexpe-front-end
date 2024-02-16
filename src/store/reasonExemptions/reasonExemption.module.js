import reasonExemptionService from "@/api/reasonExemption.service";
import {
  // Actions
  FETCH_REASONEXEMPTIONS,
  ADD_REASONEXEMPTION,
  EDIT_REASONEXEMPTION,
  REMOVE_REASONEXEMPTION,
  // Mutations
  SET_REASONEXEMPTIONS,
  SET_MESSAGE
} from "./reasonExemption.constants";

const state = {
  reasonExemptions: []
};

const getters = {
  getReasonExemptions: state => state.reasonExemptions,
  getReasonExemptionById: state => id =>
    state.reasonExemptions.find(reasonExemption => reasonExemption._id === id),
  getMessage: state => state.message
};

const actions = {
  [FETCH_REASONEXEMPTIONS]: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      reasonExemptionService.getReasonExemptions(rootState.auth.token).then(
        res => {
          commit(SET_REASONEXEMPTIONS, res.body);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err.message);
          reject(err);
        }
      );
    });
  },
  [ADD_REASONEXEMPTION]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      reasonExemptionService
        .addReasonExemption(rootState.auth.token, payload)
        .then(
          res => {
            commit(
              SET_MESSAGE,
              `A razão de isenção ${res.body.name} foi adicionado com sucesso!`
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
  [EDIT_REASONEXEMPTION]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      reasonExemptionService
        .editReasonExemption(rootState.auth.token, payload)
        .then(
          res => {
            commit(
              SET_MESSAGE,
              `A razão de isenção foi atualizado com sucesso!`
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
  [REMOVE_REASONEXEMPTION]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      reasonExemptionService
        .removeReasonExemption(rootState.auth.token, id)
        .then(
          res => {
            commit(SET_MESSAGE, `A razão de isenção foi removido com sucesso!`);
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
  [SET_REASONEXEMPTIONS]: (state, reasonExemptions) => {
    state.reasonExemptions = reasonExemptions;
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
