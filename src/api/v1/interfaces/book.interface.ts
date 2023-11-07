import { Document } from 'mongoose';

// Book Document
type IBook = {
  bookId: string;
  name: string;
  isbn: string;
  category: string;
  author: string;
  publication: string;
  printing: 'ebook' | 'hardcopy';
  numberOfPages: number;
  editor: string;
  awards: string[];
  price: number;
  copiesSold: number;
  unitsInStock: number;
  rating: number;
  reviews: {
    userId: string;
    text: string;
    rating: number;
  }[];
  distributor: string;
  latestRevision: number;
  latestRevisionDate: Date;
  bookReleaseDate: Date;
  availabilityZones: string[];
  retailerIds: string[];
  retailerWholeSalerMapping: {
    retailerId: string;
    wholesalerId: string;
  }[];
  wholesalerDistributorMapping: {
    wholesalerId: string;
    distributorId: string;
  }[];
  distributorWareHouseMapping: {
    distributorId: string;
    wareHouseId: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
} & Document;

export default IBook;
