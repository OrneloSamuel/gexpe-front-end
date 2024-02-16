import supplierService from "@/api/supplier.service";
import {
  // Actions
  FETCH_SUPPLIERS,
  ADD_SUPPLIER,
  EDIT_SUPPLIER,
  REMOVE_SUPPLIER,
  // Mutations
  SET_SUPPLIERS,
  SET_MESSAGE
} from "./supplier.constants";

const state = {
  suppliers: []
};

const getters = {
  getSuppliers: state => state.suppliers,
  getSupplierById: state => id =>
    state.suppliers.find(supplier => supplier._id === id),
  getMessage: state => state.message
};

const actions = {
  [FETCH_SUPPLIERS]: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      supplierService.getSuppliers(rootState.auth.token).then(
        res => {
          commit(SET_SUPPLIERS, res.body);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err.message);
          reject(err);
        }
      );
    });
  },
  [ADD_SUPPLIER]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      supplierService.addSupplier(rootState.auth.token, payload).then(
        res => {
          commit(
            SET_MESSAGE,
            `O fornecedor ${res.body.name} foi adicionado com sucesso!`
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
  [EDIT_SUPPLIER]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      supplierService.editSupplier(rootState.auth.token, payload).then(
        res => {
          commit(SET_MESSAGE, `O fornecedor foi atualizado com sucesso!`);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err);
          reject(err);
        }
      );
    });
  },
  [REMOVE_SUPPLIER]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      supplierService.removeSupplier(rootState.auth.token, id).then(
        res => {
          commit(SET_MESSAGE, `O fornecedor foi removido com sucesso!`);
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
  [SET_SUPPLIERS]: (state, suppliers) => {
    state.suppliers = suppliers;
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
