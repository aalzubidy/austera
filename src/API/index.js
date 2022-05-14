import CustomAxios from "./CustomAxios";

const API = {
  account: {
    updateAvatar: async (body, token = '', config = {}) => {
      try {
        const response = await CustomAxios(token).patch('/account/avatar', body, config);
        return response;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    getAvatar: async (token) => {
      try {
        const response = await CustomAxios(token).get('/account/avatar');
        return response;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    updateInformation: async (body, token) => {
      try {
        const response = await CustomAxios(token).patch('/account', body);
        return response;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  },
  system: {
    getBackendSystemVersion: async (token = '') => {
      try {
        const response = await CustomAxios(token).get('/system/version');
        return response;
      } catch (error) {
        throw error;
      }
    },
    pingBackendSystem: async (token = '') => {
      try {
        const response = await CustomAxios(token).get('/system/ping');
        return response;
      } catch (error) {
        throw error;
      }
    }
  }
}

export default API;
