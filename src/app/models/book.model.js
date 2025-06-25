/**
 * Book model structure and validation.
 * This model defines the properties of a book in the library system.
 */

import { model, Schema } from 'mongoose'

// Define the schema for the Book model
const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
    },
    genre: {
      type: String,
      required: [true, 'Genre is required'],
      enum: [
        'FICTION',
        'NON_FICTION',
        'SCIENCE',
        'HISTORY',
        'BIOGRAPHY',
        'FANTASY',
      ],
    },
    isbn: {
      type: String,
      required: [true, 'ISBN is required'],
      unique: true,
    },
    description: { type: String, default: '' },
    copies: {
      type: Number,
      required: true,
      min: [0, 'Copies must be a positive number'],
    },
    available: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

// Create the Book model using the defined schema
const BookModel = model('Book', bookSchema)

// Export the Book model
export default BookModel

// Export the schema
export { bookSchema }
