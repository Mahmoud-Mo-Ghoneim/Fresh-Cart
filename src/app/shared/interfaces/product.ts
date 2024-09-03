export interface productResponse {
  results: number;
  metadata: Metadata;
  data: product[];
}

export interface product {
  sold: number;
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Category;
  brand: Category;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
  priceAfterDiscount?: number;
  availableColors?: any[];
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}

export interface addProductRes {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: addData;
}

export interface addData {
  _id: string;
  cartOwner: string;
  products: addProduct[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface addProduct {
  count: number;
  _id: string;
  product: string;
  price: number;
}

export interface addProductError {
  statusMsg: string;
  message: string;
}
