const configuration = {
  backend_url: String(import.meta.env.VITE_BACKEND_URL),
  builder_server: String(import.meta.env.VITE_DEPLOYMENT_SERVER),
};
export default configuration;
