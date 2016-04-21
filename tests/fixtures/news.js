import faker from 'faker'

export function createFakeNews() {
  return {
    id: faker.random.uuid(),
    src: null,
    url: faker.internet.url(),
    title: faker.lorem.sentence(),
    description: faker.lorem.sentence(),
    image: faker.internet.url(),
    currentUserRating: faker.random.boolean()
  }
}
