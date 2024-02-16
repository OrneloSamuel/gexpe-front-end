import permissionService from "@/api/permission.service";
import {
  // Actions
  FETCH_PERMISSIONS,
  ADD_PERMISSION,
  EDIT_PERMISSION,
  REMOVE_PERMISSION,
  // Mutations
  SET_PERMISSIONS,
  SET_MESSAGE
} from "./permission.constants";

const state = {
  permissions: []
};

const getters = {
  getPermissions: state => state.permissions,
  getPermissionsById: state => id =>
    state.permissions.find(permission => permission._id === id),
  getMessage: state => state.message
};

const actions = {
  [FETCH_PERMISSIONS]: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      permissionService.getPermissions(rootState.auth.token).then(
        res => {
          commit(SET_PERMISSIONS, res.body);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err.message);
          reject(err);
        }
      );
    });
  },
  [ADD_PERMISSION]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      permissionService.addPermission(rootState.auth.token, payload).then(
        res => {
          commit(
            SET_MESSAGE,
            `A permissão ${res.body.name} foi adicionada com sucesso!`
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
  [EDIT_PERMISSION]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      permissionService.editPermission(rootState.auth.token, payload).then(
        res => {
          commit(SET_MESSAGE, `A permissão foi atualizada com sucesso!`);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err);
          reject(err);
        }
      );
    });
  },
  [REMOVE_PERMISSION]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      permissionService.removePermission(rootState.auth.token, id).then(
        res => {
          commit(SET_MESSAGE, `A permissão foi removida com sucesso!`);
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
  [SET_PERMISSIONS]: (state, permissions) => {
    state.permissions = permissions;
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
