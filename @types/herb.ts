export interface Herb {
  id: number;
  groupId: number;
  scientific_name?: string;
  common_names?: string[];
  family?: string;
  other_names: string[];
  botanical_description?: string;
  properties?: Properties;
  usage?: Usage;
  chemical_composition?: string[];
  nutritional_value?: NutritionalValue;
  price: number;
  stock: number;
  imageUrl?: string;
}

interface Properties {
  calyx?: string[];
  leaves?: string[];
  flowers?: string[];
  fruit?: string[];
  seeds?: string[];
  general?: string[];
}

interface Usage {
  method?: string;
  dosage?: string;
}

interface NutritionalValue {
  beverage?: string[];
  food?: string[];
  vitamins?: string[];
  coloring?: Coloring[];
}

interface Coloring {
  description?: string;
  colorCode?: string;
}