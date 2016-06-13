// ===============
// Component Bases
// ===============

export const app = () => {
  if (process.env.USE_PRODUCTION_SERVER &&
      process.env.USE_PRODUCTION_SERVER === 'true') {
    return process.env.PRODUCTION_SERVER
  }
  debugger
  return process.env.NODE_ENV === 'production' ?
    `${process.env.PROUDCTION_SERVER}`:
    `${process.env.DEV_SERVER}`
}

export const router = () => process.env.NODE_ENV === 'production' ?
  `wss://demo.crossbar.io/ws` :
  `wss://demo.crossbar.io/ws`

export const api = () => 'api'


// ==========
// Resources
// ==========

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

export const latestNews = (size) => `${news()}/latest?size=${size}`
export const newsRecomms = () => `${news()}/recomms`
export const newsRatings = (id) => `${news(id)}/ratings`

export const schedules = id => id ?
  `${app()}/${api()}/schedules/${id}` :
  `${app()}/${api()}/schedules`


export default {
  app, router, login, logout, signup, csrf, userinfo, resend,
  users, schedules, news, newsRecomms, latestNews, newsRatings,
}
