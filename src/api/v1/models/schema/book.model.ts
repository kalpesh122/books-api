import mongoose, { Model } from 'mongoose';
import IBook from '../../interfaces/book.interface';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid package

// Hard-coded categories
const categories = ['Thriller', 'Action', 'Romantic'];

// Hard-coded authors
const authors = ['Shreyash', 'Bipin', 'Kalpesh'];

// Hard-coded distributors
const distributors = ['Praful', 'Akash'];

// Book Schema
const bookSchema = new mongoose.Schema<IBook>({
  bookId: { type: String, default: uuidv4, required: true },
  name: { type: String, required: true },
  isbn: { type: String, required: true },
  category: { type: String, enum: categories, required: true },
  author: { type: String, enum: authors, required: true },
  publication: String,
  printing: { type: String, enum: ['ebook', 'hardcopy'], required: true },
  numberOfPages: { type: Number, required: true },
  editor: String,
  awards: [String],
  price: { type: Number, required: true },
  copiesSold: { type: Number, required: true },
  unitsInStock: { type: Number, required: true },
  rating: { type: Number, min: 0, max: 5 },
  reviews: [
    {
      userId: String,
      text: String,
      rating: { type: Number, min: 0, max: 5 },
    },
  ],
  distributor: { type: String, enum: distributors, required: true },
  latestRevision: { type: Number, required: true },
  latestRevisionDate: Date,
  bookReleaseDate: Date,
  availabilityZones: [String],
  retailerIds: [String],
  retailerWholeSalerMapping: [
    {
      retailerId: String,
      wholesalerId: String,
    },
  ],
  wholesalerDistributorMapping: [
    {
      wholesalerId: String,
      distributorId: String,
    },
  ],
  distributorWareHouseMapping: [
    {
      distributorId: String,
      wareHouseId: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  deletedAt: Date,
});

// Define the Book model
const BookModel: Model<IBook> = mongoose.model('Book', bookSchema);

export default BookModel;
