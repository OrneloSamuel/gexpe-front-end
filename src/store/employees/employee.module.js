import employeeService from "@/api/employee.service";
import {
  // Actions
  FETCH_EMPLOYEES,
  ADD_EMPLOYEE,
  EDIT_EMPLOYEE,
  REMOVE_EMPLOYEE,
  // Mutations
  SET_EMPLOYEES,
  SET_MESSAGE
} from "./employee.constants";

const state = {
  employees: []
};

const getters = {
  getEmployees: state => state.employees,
  getEmployeesById: state => id =>
    state.employees.find(employee => employee._id === id),
  getMessage: state => state.message
};

const actions = {
  [FETCH_EMPLOYEES]: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      employeeService.getEmployees(rootState.auth.token).then(
        res => {
          commit(SET_EMPLOYEES, res.body);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err.message);
          reject(err);
        }
      );
    });
  },
  [ADD_EMPLOYEE]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      employeeService.addEmployee(rootState.auth.token, payload).then(
        res => {
          commit(
            SET_MESSAGE,
            `O funcionário ${res.body.name} foi adicionado com sucesso!`
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
  [EDIT_EMPLOYEE]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      employeeService.editEmployee(rootState.auth.token, payload).then(
        res => {
          commit(SET_MESSAGE, `O funcionário foi atualizado com sucesso!`);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err);
          reject(err);
        }
      );
    });
  },
  [REMOVE_EMPLOYEE]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      employeeService.removeEmployee(rootState.auth.token, id).then(
        res => {
          commit(SET_MESSAGE, `O funcionário foi removido com sucesso!`);
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
  [SET_EMPLOYEES]: (state, employees) => {
    state.employees = employees;
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
