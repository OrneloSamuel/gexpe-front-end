import roleService from "@/api/role.service";
import {
  // Actions
  FETCH_ROLES,
  ADD_ROLE,
  EDIT_ROLE,
  REMOVE_ROLE,
  // Mutations
  SET_ROLES,
  SET_MESSAGE
} from "./role.constants";

const state = {
  roles: []
};

const getters = {
  getRoles: state => state.roles,
  getRolesById: state => id =>
    state.roles.find(role => role._id === id),
  getMessage: state => state.message
};

const actions = {
  [FETCH_ROLES]: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      roleService.getRoles(rootState.auth.token).then(
        res => {
          commit(SET_ROLES, res.body);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err.message);
          reject(err);
        }
      );
    });
  },
  [ADD_ROLE]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      roleService.addRole(rootState.auth.token, payload).then(
        res => {
          commit(
            SET_MESSAGE,
            `A função ${res.body.name} foi adicionada com sucesso!`
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
  [EDIT_ROLE]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      roleService.editRole(rootState.auth.token, payload).then(
        res => {
          commit(SET_MESSAGE, `A função foi atualizada com sucesso!`);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err);
          reject(err);
        }
      );
    });
  },
  [REMOVE_ROLE]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      roleService.removeRole(rootState.auth.token, id).then(
        res => {
          commit(SET_MESSAGE, `A função foi removida com sucesso!`);
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
  [SET_ROLES]: (state, roles) => {
    state.roles = roles;
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
