export const PROPERTY_TYPES: Map<string, string> = new Map()
  .set("name", "string")
  .set("growth", "number")
  .set("height", "number")
  .set("origin", "string");

export interface Animal {
  name: string,
  growth: number,
  wiki: string,
  carnivore: boolean,
  height: number,
  origin: string
}