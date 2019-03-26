import Animal from "./Animal";

interface AnimalsResponse {
  readonly total: number;
  readonly animals: Animal[];
}

export default AnimalsResponse;