import { Herb } from "./herb";

export type RootStackParamList = {
  Home: undefined;
  ProductList: undefined;
  ProductDetails: { productId: number };
  Search: undefined;
  Cart: undefined;
  Account: { userId: string };
  Seting: undefined;
  ProductSetting: undefined;
  ProductUpsert: { herb?: Herb };
  CategorySetting: undefined;
};
