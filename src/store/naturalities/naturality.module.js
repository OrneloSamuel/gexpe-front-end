import naturalityService from "@/api/naturality.service";
import {
  // Actions
  FETCH_NATURALITIES,
  ADD_NATURALITY,
  EDIT_NATURALITY,
  REMOVE_NATURALITY,
  // Mutations
  SET_NATURALITIES,
  SET_MESSAGE
} from "./naturality.constants";

const state = {
  naturalitys: []
};

const getters = {
  getNaturalities: state => state.naturalitys,
  getNaturalitiesById: state => id =>
    state.naturalitys.find(naturality => naturality._id === id),
  getMessage: state => state.message
};

const actions = {
  [FETCH_NATURALITIES]: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      naturalityService.getNaturalities(rootState.auth.token).then(
        res => {
          commit(SET_NATURALITIES, res.body);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err.message);
          reject(err);
        }
      );
    });
  },
  [ADD_NATURALITY]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      naturalityService.addNaturality(rootState.auth.token, payload).then(
        res => {
          commit(
            SET_MESSAGE,
            `A naturalidade ${res.body.name} foi adicionada com sucesso!`
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
  [EDIT_NATURALITY]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      naturalityService.editNaturality(rootState.auth.token, payload).then(
        res => {
          commit(SET_MESSAGE, `A naturalidade foi atualizada com sucesso!`);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err);
          reject(err);
        }
      );
    });
  },
  [REMOVE_NATURALITY]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      naturalityService.removeNaturality(rootState.auth.token, id).then(
        res => {
          commit(SET_MESSAGE, `A naturalidade foi removida com sucesso!`);
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
  [SET_NATURALITIES]: (state, naturalitys) => {
    state.naturalitys = naturalitys;
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
