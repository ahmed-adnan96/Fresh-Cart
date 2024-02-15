export interface ProductsShow {
  imageCover: string;
  title: string;
  price: any;
  ratingsAverage: number;
  category: {
    name: string;
  };
  _id?: string;
}
