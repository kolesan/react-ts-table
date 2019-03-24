import log from "../utils/logging";
import Animal from "../model/Animal";

const { default: axios } = require('axios');

export interface AnimalData {
  readonly total: number;
  readonly animals: Animal[];
}

export default class AnimalProvider {

  getAnimals(page: number, rowsPerPage: number): Promise<AnimalData> {
    let start = rowsPerPage * page;
    return axios.get(`http://localhost:3000/animals?start=${start}&count=${rowsPerPage}`)
      .then(resp => resp.data)
      .catch(err => {
        log("Error retrieving data from animals api:", err);
      });
  }

}