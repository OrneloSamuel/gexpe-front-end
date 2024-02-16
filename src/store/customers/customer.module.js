import customerService from "@/api/customer.service";
import {
  // Actions
  FETCH_CUSTOMERS,
  ADD_CUSTOMER,
  EDIT_CUSTOMER,
  REMOVE_CUSTOMER,
  // Mutations
  SET_CUSTOMERS,
  SET_MESSAGE
} from "./customer.constants";

const state = {
  customers: [],
  message: ""
};

const getters = {
  getCustomers: state => state.customers,
  getCustomerById: state => id => {
    return state.customers.find(customer => customer._id === id);
  },
  getMessage: state => state.message
};

const actions = {
  [FETCH_CUSTOMERS]: async ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      customerService.getCustomers(rootState.auth.token).then(
        res => {
          commit(SET_CUSTOMERS, res.body);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err.message);
          reject(err);
        }
      );
    });
  },
  [ADD_CUSTOMER]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      customerService.addCustomer(rootState.auth.token, payload).then(
        res => {
          commit(SET_MESSAGE, "sucesso!");
          resolve(res.body);
        },
        err => {
          commit(SET_MESSAGE, err.message);
          reject(err);
        }
      );
    });
  },
  [EDIT_CUSTOMER]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      customerService.editCustomer(rootState.auth.token, payload).then(
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
  },
  [REMOVE_CUSTOMER]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      customerService.removeCustomer(rootState.auth.token, id).then(
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
  [SET_CUSTOMERS]: (state, customers) => {
    state.customers = customers;
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
