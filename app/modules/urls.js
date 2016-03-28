export const app = () => process.env.NODE_ENV === 'production' ?
  `http://localhost:${process.env.DEV_SERVER_PORT}` :
  `http://localhost:${process.env.DEV_SERVER_PORT}`
export const api = () => 'api'

export const login = () => `${app()}/${api()}/login`
export const logout = () => `${app()}/${api()}/logout`
export const signup = () => `${app()}/${api()}/signup`
export const csrf = () => `${app()}/${api()}/csrf`
export const userinfo = () => `${app()}/${api()}/userinfo`
export const resend = () => `${app()}/${api()}/resend`

export const users = id => id ?
  `${app()}/${api()}/users/${id}` :
  `${app()}/${api()}/users`

export const news = id => id ?
  `${app()}/${api()}/news/${id}` :
  `${app()}/${api()}/news`

export const schedules = id => id ?
  `${app()}/${api()}/schedules/${id}` :
  `${app()}/${api()}/schedules`


export default {
  app, login, logout, signup, csrf, userinfo, resend,
  users, news, schedules,
}
