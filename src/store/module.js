import emailService from "@/api/email.service";
import {
  // Actions
  SEND_EMAIL,
  // Mutations
  SET_MESSAGE
} from "./constants";

const actions = {
  [SEND_EMAIL]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      emailService.sendEmail(rootState.auth.token, payload).then(
        res => {
          commit(SET_MESSAGE, "sucesso!");
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
  [SET_MESSAGE]: (state, message) => {
    state.message = message;
  }
};

export default {
  namespaced: true,
  actions,
  mutations
};
