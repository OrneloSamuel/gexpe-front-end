import provinceService from "@/api/province.service";
import {
  // Actions
  FETCH_PROVINCES,
  ADD_PROVINCE,
  EDIT_PROVINCE,
  REMOVE_PROVINCE,
  // Mutations
  SET_PROVINCES,
  SET_MESSAGE
} from "./province.constants";

const state = {
  provinces: []
};

const getters = {
  getProvinces: state => state.provinces,
  getProvincesById: state => id =>
    state.provinces.find(province => province._id === id),
  getMessage: state => state.message
};

const actions = {
  [FETCH_PROVINCES]: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      provinceService.getProvinces(rootState.auth.token).then(
        res => {
          commit(SET_PROVINCES, res.body);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err.message);
          reject(err);
        }
      );
    });
  },
  [ADD_PROVINCE]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      provinceService.addProvince(rootState.auth.token, payload).then(
        res => {
          commit(
            SET_MESSAGE,
            `A província ${res.body.name} foi adicionada com sucesso!`
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
  [EDIT_PROVINCE]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      provinceService.editProvince(rootState.auth.token, payload).then(
        res => {
          commit(SET_MESSAGE, `A província foi atualizada com sucesso!`);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err);
          reject(err);
        }
      );
    });
  },
  [REMOVE_PROVINCE]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      provinceService.removeProvince(rootState.auth.token, id).then(
        res => {
          commit(SET_MESSAGE, `A província foi removida com sucesso!`);
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
  [SET_PROVINCES]: (state, provinces) => {
    state.provinces = provinces;
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
