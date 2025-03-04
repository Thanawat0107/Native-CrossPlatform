import { Group } from "./group";
import { Herb } from "./herb";

export type RootStackParamList = {
  Home: undefined;

  ProductList: undefined;
  ProductDetails: { productId: number, groupId: number };
  Search: undefined;

  Cart: undefined;

  Account: { userId: string };

  Seting: undefined;
  MainManagements: undefined;
  ProductSetting: undefined;
  ProductUpsert: { herbs?: Herb, groups: Group[] };
  GroupSetting: undefined;
  GroupUpsert: { groups?: Group }

  MainDashboards: undefined;
  HerbalPropertiesReport: undefined;
  HerbalNutritionReport: undefined;
  PriceComparisonReport: undefined;
};
