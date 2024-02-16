import brandService from "@/api/brand.service";
import {
  // Actions
  FETCH_BRANDS,
  ADD_BRAND,
  EDIT_BRAND,
  REMOVE_BRAND,
  // Mutations
  SET_BRANDS,
  SET_MESSAGE
} from "./brand.constants";

const state = {
  brands: []
};

const getters = {
  getBrands: state => state.brands,
  getBrandById: state => id => state.brands.find(brand => brand._id === id),
  getMessage: state => state.message
};

const actions = {
  [FETCH_BRANDS]: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      brandService.getBrands(rootState.auth.token).then(
        res => {
          commit(SET_BRANDS, res.body);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err.message);
          reject(err);
        }
      );
    });
  },
  [ADD_BRAND]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      brandService.addBrand(rootState.auth.token, payload).then(
        res => {
          commit(
            SET_MESSAGE,
            `A marca ${res.body.name} foi adicionada com sucesso!`
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
  [EDIT_BRAND]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      brandService.editBrand(rootState.auth.token, payload).then(
        res => {
          commit(SET_MESSAGE, `A marca foi atualizada com sucesso!`);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err);
          reject(err);
        }
      );
    });
  },
  [REMOVE_BRAND]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      brandService.removeBrand(rootState.auth.token, id).then(
        res => {
          commit(SET_MESSAGE, `A marca foi removida com sucesso!`);
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
  [SET_BRANDS]: (state, brands) => {
    state.brands = brands;
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
