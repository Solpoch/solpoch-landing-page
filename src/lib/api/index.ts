const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const API_ROUTES = {
  user: {
    login: `${baseUrl}/api/auth/signin`,
  }, 
  worker: {

  }
}