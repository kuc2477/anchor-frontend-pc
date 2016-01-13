import Schedules from '../containers/Schedules'
import News from '../containers/News'


export const NEWS = {
  component: News,
  path: 'news',
  label: 'NEWS',
  loginRequired: true
}

export const SCHEDULES = {
  component: Schedules,
  path: 'sites',
  label: 'SITES',
  loginRequired: true,
}

export default { NEWS, SCHEDULES }
