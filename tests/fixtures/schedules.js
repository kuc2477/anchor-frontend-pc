import _ from 'lodash'
import faker from 'faker'

export function createFakeSchedule() {
  return {
    id: Number(_.uniqueId()),
    url: faker.internet.url(),
    cycle: 60,
    maxDepth: null,
    maxDist: null,
    brothers: [faker.internet.url()],
    isActive: false,
    status: 'PENDING'
  }
}
