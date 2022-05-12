import axios from 'axios';
import { AUSTERA_BASE_URL } from '../Configs/generalConfigs';

const CustomAxios = (token) => {
  const defaultOptions = {
    baseURL: AUSTERA_BASE_URL,
    headers: {
      token
    }
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.response.use((response) => {
    return response.data;
  }, (error) => {
    console.log(error);
    return Promise.reject(error);
  });

  return {
    get: (url, config = {}) => instance.get(url, config),
    post: (url, data, config = {}) => instance.post(url, data, config),
    put: (url, data, config = {}) => instance.put(url, data, config),
    patch: (url, data, config = {}) => instance.patch(url, data, config),
    delete: (url, data = {}, config = {}) => instance.delete(url, { ...{ data }, ...config }),
  };
};

export default CustomAxios;
