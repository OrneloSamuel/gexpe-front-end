import companyService from "@/api/company.service";
import {
  // Actions
  FETCH_COMPANIES,
  ADD_COMPANY,
  EDIT_COMPANY,
  REMOVE_COMPANY,
  // Mutations
  SET_COMPANIES,
  SET_MESSAGE
} from "./company.constants";

const state = {
  companies: [],
  message: ""
};

const getters = {
  getCompanies: state => state.companies,
  getCompanyById: state => id => {
    return state.companies.find(company => company._id === id);
  },
  getCompaniesByLevel: state => level => {
    return state.companies.filter(company => company.level === level);
  },
  getMessage: state => state.message
};

const actions = {
  [FETCH_COMPANIES]: async ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      companyService.getCompanies(rootState.auth.token).then(
        res => {
          commit(SET_COMPANIES, res.body);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err.message);
          reject(err);
        }
      );
    });
  },
  [ADD_COMPANY]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      companyService.addCompany(rootState.auth.token, payload).then(
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
  [EDIT_COMPANY]: ({ rootState }, payload) => {
    return new Promise((resolve, reject) => {
      companyService.editCompany(rootState.auth.token, payload).then(
        res => resolve(res),
        err => reject(err)
      );
    });
  },
  [REMOVE_COMPANY]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      companyService.removeCompany(rootState.auth.token, id).then(
        res => {
          commit(SET_MESSAGE, "sucesso!");
          resolve(res);
        },
        err => reject(err)
      );
    });
  }
};

export const mutations = {
  [SET_COMPANIES]: (state, companies) => {
    state.companies = companies;
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
