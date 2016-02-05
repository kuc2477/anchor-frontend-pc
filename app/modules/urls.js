export const app = () => {
  return process.env.NODE_ENV === 'production' ?
  'PRODUCTION_BACKEND_NOT_IMPLEMENTED' :
    `http://localhost:${process.env.DEV_SERVER_PORT}`
}

export const login = () => `${app()}/login`
export const logout = () => `${app()}/logout`
export const signup = () => `${app()}/signup`
export const csrf = () => `${app()}/csrf`
export const userinfo = () => `${app()}/userinfo`

export const news = (page = 0) => `${app()}/news?page=${page}`
export const sites = (page = 0) => `${app()}/sites?page=${page}`
export const schedules = (page = 0) => `${app()}/schedules?page=${page}`

export const user = (id) => `${app()}/users/${id}`
export const newsItem = (id) => `${app()}/news/${id}`
export const site = (id) => `${app()}/sites/${id}`
export const schedule = (id) => `${app()}/schedules/${id}`


export default {
  app, login, logout, signup, csrf, userinfo,
  news, newsItem,
  sites, site,
  schedules, schedule
}
