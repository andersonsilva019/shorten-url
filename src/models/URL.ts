import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  id: String,
  longURL: String,
  shortURL: String,
  clicks: { type: Number, default: 0 }
})

export const URLModel = mongoose.model('URL', urlSchema);