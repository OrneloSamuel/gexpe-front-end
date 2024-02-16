import paymentMethodService from "@/api/paymentMethod.service";
import {
  // Actions
  FETCH_PAYMENTMETHODS,
  ADD_PAYMENTMETHOD,
  EDIT_PAYMENTMETHOD,
  REMOVE_PAYMENTMETHOD,
  // Mutations
  SET_PAYMENTMETHODS,
  SET_MESSAGE
} from "./paymentMethod.constants";

const state = {
  paymentMethods: []
};

const getters = {
  getPaymentMethods: state => state.paymentMethods,
  getPaymentMethodById: state => id =>
    state.paymentMethods.find(paymentMethod => paymentMethod._id === id),
  getMessage: state => state.message
};

const actions = {
  [FETCH_PAYMENTMETHODS]: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      paymentMethodService.getPaymentMethods(rootState.auth.token).then(
        res => {
          commit(SET_PAYMENTMETHODS, res.body);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err.message);
          reject(err);
        }
      );
    });
  },
  [ADD_PAYMENTMETHOD]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      paymentMethodService.addPaymentMethod(rootState.auth.token, payload).then(
        res => {
          commit(
            SET_MESSAGE,
            `A forma de pagamento ${res.body.name} foi adicionada com sucesso!`
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
  [EDIT_PAYMENTMETHOD]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      paymentMethodService
        .editPaymentMethod(rootState.auth.token, payload)
        .then(
          res => {
            commit(
              SET_MESSAGE,
              `A forma de pagamento foi atualizada com sucesso!`
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
  [REMOVE_PAYMENTMETHOD]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      paymentMethodService.removePaymentMethod(rootState.auth.token, id).then(
        res => {
          commit(SET_MESSAGE, `A forma de pagamento foi removida com sucesso!`);
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
  [SET_PAYMENTMETHODS]: (state, paymentMethods) => {
    state.paymentMethods = paymentMethods;
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
