import axios from 'axios';


const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');

  const isLoginRoute = config.url?.includes('/auth/login');
  const isRegisterRoute = config.url?.includes('/auth/register');

  if (token && !isLoginRoute && !isRegisterRoute) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


export default api;