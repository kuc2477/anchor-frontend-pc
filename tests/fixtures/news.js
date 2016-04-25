import _ from 'lodash'
import faker from 'faker'

export function createFakeNews() {
  return {
    id: Number(_.uniqueId()),
    src: null,
    url: faker.internet.url(),
    title: faker.lorem.sentence(),
    description: faker.lorem.sentence(),
    image: faker.internet.url(),
    currentUserRating: faker.random.boolean()
  }
}
