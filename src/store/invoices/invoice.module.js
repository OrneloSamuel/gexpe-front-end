import invoiceService from "@/api/invoice.service";
import {
  // Actions
  FETCH_INVOICES,
  ADD_INVOICE,
  EDIT_INVOICE,
  REMOVE_INVOICE,
  // Mutations
  SET_INVOICES,
  SET_MESSAGE
} from "./invoice.constants";

const state = {
  invoices: []
};

const getters = {
  getInvoices: state => state.invoices,
  getInvoicesById: state => id =>
    state.invoices.find(invoice => invoice._id === id),
  getMessage: state => state.message
};

const actions = {
  [FETCH_INVOICES]: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      invoiceService.getInvoices(rootState.auth.token).then(
        res => {
          commit(SET_INVOICES, res.body);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err.message);
          reject(err);
        }
      );
    });
  },
  [ADD_INVOICE]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      invoiceService.addInvoice(rootState.auth.token, payload).then(
        res => {
          commit(SET_MESSAGE, `O pagamento foi adicionado com sucesso!`);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err.message);
          reject(err);
        }
      );
    });
  },
  [EDIT_INVOICE]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      invoiceService.editInvoice(rootState.auth.token, payload).then(
        res => {
          commit(SET_MESSAGE, `O pagamento foi atualizado com sucesso!`);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err);
          reject(err);
        }
      );
    });
  },
  [REMOVE_INVOICE]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      invoiceService.removeInvoice(rootState.auth.token, id).then(
        res => {
          commit(SET_MESSAGE, `O pagamento foi removido com sucesso!`);
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
  [SET_INVOICES]: (state, invoices) => {
    state.invoices = invoices;
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
