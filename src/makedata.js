import { faker } from "@faker-js/faker";

const newPerson = () => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.datatype.number(40),
    visits: faker.datatype.number(1000),
    progress: faker.datatype.number(100),
    createdAt: faker.datatype.datetime({ max: new Date().getTime() }),
    status: faker.helpers.shuffle(["relationship", "complicated", "single"])[0],
  };
};

export function makeData(count = 1) {
  if (count < 1) {
    count = 1;
  }

  let people = [];

  for (let i = 1; i <= count; i++) {
    people.push({
      id: i,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      age: faker.number.int(40),
      visits: faker.number.int(1000),
      progress: faker.number.int(100),
      createdAt: faker.date.between({ max: new Date().getTime() }),
      status: faker.helpers.shuffle([
        "relationship",
        "complicated",
        "single",
      ])[0],
    });
  }

  return people;
}
