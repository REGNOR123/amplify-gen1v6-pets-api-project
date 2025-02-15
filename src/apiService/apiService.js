import { get, post } from "aws-amplify/api";

export async function fetchPets() {
  try {
    const restOperation = get({
      apiName: 'petsapi',
      path: '/pets'
    });
    const { body } = await restOperation.response;
    const data = await body.json();
    console.log('GET call succeeded:', data);
    return data;
  } catch (e) {
    console.error('GET call failed:', e);
    return null;
  }
}

export async function postPet(pet) {
  try {
    const restOperation = post({
      apiName: 'petsapi',
      path: '/pets',
      options: {
        body: pet
      }
    });
    const { body } = await restOperation.response;
    const response = await body.json();
    console.log('POST call succeeded:', response);
    return true;
  } catch (e) {
    console.error('POST call failed:', e);
    return false;
  }
}
