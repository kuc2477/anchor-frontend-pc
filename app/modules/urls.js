export const app = () => process.env.NODE_ENV === 'production' ?
  'PRODUCTION_BACKEND_NOT_IMPLEMENTED' :
  'http://localhost:' + process.env.DEV_SERVER_PORT

export const login = () => app() + '/auth/login'
export const csrf = () => app() + '/auth/csrf'


export default {
  app,
  login,
  csrf
}
