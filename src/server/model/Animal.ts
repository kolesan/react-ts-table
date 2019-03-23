export interface Animal {
  name: string,
  growth: number,
  wiki: string,
  carnivore: boolean,
  height: number,
  origin: string
}

export interface Property {
  readonly type: string,
  readonly sortable: boolean,
  readonly filterable: boolean
}

export const AnimalProperties: Map<string, Property> = new Map()
  .set("name", { type: "string", sortable: true, filterable: true })
  .set("growth", { type: "number", sortable: true, filterable: false })
  .set("height", { type: "number", sortable: true, filterable: false })
  .set("origin", { type: "string", sortable: true, filterable: true });
