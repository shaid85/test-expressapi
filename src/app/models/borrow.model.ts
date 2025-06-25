/**
 * Book borrowing model for the library system.
 * Borrow Model Fields & Validation
 */

import mongoose, { Schema } from 'mongoose'
import { BorrowCreate } from '../interfaces/borrow.interface'

/**
 * Borrow schema
 * Represents a book borrowing transaction.
 */
const borrowSchema = new Schema<BorrowCreate>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1, // Quantity must be a positive integer
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
    versionKey: false, // this disables __v
  }
)

// Post-save middleware to update book copies
borrowSchema.post('save', async function (doc, next) {
  try {
    const BookModel = mongoose.model('Book')
    const book = await BookModel.findById(doc.book)
    if (book) {
      book.copies -= doc.quantity
      if (book.copies < 0) book.copies = 0
      await book.save()
    }
    next()
  } catch (error) {
    next(new Error('copies not available') || error)
  }
})

const BorrowModel = mongoose.model<BorrowCreate>('Borrow', borrowSchema)

export default BorrowModel
