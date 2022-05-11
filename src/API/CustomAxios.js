import axios from 'axios';

// const baseURL = process.env.REACT_APP_AUSTERA_BASE_URL;
const baseURL = 'http://192.168.0.155:3030';

const CustomAxios = (token) => {
  const defaultOptions = {
    baseURL,
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
