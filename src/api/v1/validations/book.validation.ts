import Joi from 'joi';
import IBook from '../interfaces/book.interface';


// Define Joi schema for book validation
const createBook = Joi.object<IBook>({
  name: Joi.string().required(),
  isbn: Joi.string().required(),
  category: Joi.string().required(),
  author: Joi.string().required(),
  publication: Joi.string(),
  printing: Joi.string().valid('ebook', 'hardcopy').required(),
  numberOfPages: Joi.number().required(),
  editor: Joi.string(),
  awards: Joi.array().items(Joi.string()),
  price: Joi.number().required(),
  copiesSold: Joi.number().required(),
  unitsInStock: Joi.number().required(),
  rating: Joi.number().min(0).max(5),
  reviews: Joi.array().items(
    Joi.object({
      userId: Joi.string(),
      text: Joi.string(),
      rating: Joi.number().min(0).max(5),
    })
  ),
  distributor: Joi.string().required(),
  latestRevision: Joi.number().required(),
  latestRevisionDate: Joi.date(),
  bookReleaseDate: Joi.date(),
  availabilityZones: Joi.array().items(Joi.string()),
  retailerIds: Joi.array().items(Joi.string()),
  retailerWholeSalerMapping: Joi.array().items(
    Joi.object({
      retailerId: Joi.string(),
      wholesalerId: Joi.string(),
    })
  ),
  wholesalerDistributorMapping: Joi.array().items(
    Joi.object({
      wholesalerId: Joi.string(),
      distributorId: Joi.string(),
    })
  ),
  distributorWareHouseMapping: Joi.array().items(
    Joi.object({
      distributorId: Joi.string(),
      wareHouseId: Joi.string(),
    })
  ),
  createdAt: Joi.date().allow(null),
  updatedAt: Joi.date().allow(null),
  deletedAt: Joi.date().allow(null),
});


const updateBook = Joi.object<IBook>({
  name: Joi.string().required(),
  isbn: Joi.string().required(),
  category: Joi.string().required(),
  author: Joi.string().required(),
  publication: Joi.string(),
  printing: Joi.string().valid('ebook', 'hardcopy').required(),
  numberOfPages: Joi.number().required(),
  editor: Joi.string(),
  awards: Joi.array().items(Joi.string()),
  price: Joi.number().required(),
  copiesSold: Joi.number().required(),
  unitsInStock: Joi.number().required(),
  rating: Joi.number().min(0).max(5),
  reviews: Joi.array().items(
    Joi.object({
      userId: Joi.string(),
      text: Joi.string(),
      rating: Joi.number().min(0).max(5),
    })
  ),
  distributor: Joi.string().required(),
  latestRevision: Joi.number().required(),
  latestRevisionDate: Joi.date(),
  bookReleaseDate: Joi.date(),
  availabilityZones: Joi.array().items(Joi.string()),
  retailerIds: Joi.array().items(Joi.string()),
  retailerWholeSalerMapping: Joi.array().items(
    Joi.object({
      retailerId: Joi.string(),
      wholesalerId: Joi.string(),
    })
  ),
  wholesalerDistributorMapping: Joi.array().items(
    Joi.object({
      wholesalerId: Joi.string(),
      distributorId: Joi.string(),
    })
  ),
  distributorWareHouseMapping: Joi.array().items(
    Joi.object({
      distributorId: Joi.string(),
      wareHouseId: Joi.string(),
    })
  ),
  createdAt: Joi.date().allow(null),
  updatedAt: Joi.date().allow(null),
  deletedAt: Joi.date().allow(null),
});


export  { createBook,updateBook };
