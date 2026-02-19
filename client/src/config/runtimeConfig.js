const defaultConfig = {
  MRANK_API_HOST: 'http://localhost:3002/api',
  GOOGLE_CLIENT_ID: '',
};

let runtimeConfig = { ...defaultConfig };
let loadPromise = null;

export const loadRuntimeConfig = async () => {
  if (loadPromise) return loadPromise;

  loadPromise = fetch('/config.json', { cache: 'no-store' })
    .then((response) => {
      if (!response.ok) {
        return {};
      };
      return response.json();
    })
    .then((config) => {
      runtimeConfig = { ...defaultConfig, ...(config || {}) };
      return runtimeConfig;
    })
    .catch(() => runtimeConfig);

  return loadPromise;
};

export const getConfigValue = (key, fallback = '') => {
  const value = runtimeConfig[key];
  if (value === undefined || value === null || value === '') {
    return fallback;
  };
  return value;
};

export const getRuntimeConfig = () => runtimeConfig;
