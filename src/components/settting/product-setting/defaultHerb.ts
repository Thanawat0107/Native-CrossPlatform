import { Herb } from "../../../../@types";

const defaultHerb: Herb = {
  id: 0,
  groupId: 1,
  other_names: [],
  scientific_name: "",
  common_names: [],
  family: "",
  botanical_description: "",
  properties: {
    calyx: [],
    leaves: [],
    flowers: [],
    fruit: [],
    seeds: [],
    general: [],
  },
  usage: {
    method: "",
    dosage: "",
  },
  chemical_composition: [],
  nutritional_value: {
    beverage: [],
    food: [],
    vitamins: [],
    coloring: [],
  },
  price: 0,
  stock: 0,
  imageUrl: "",
};

export default defaultHerb
