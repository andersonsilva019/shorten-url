import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  id: String,
  longURL: String,
  shortURL: String,
})

export const URLModel = mongoose.model('URL', urlSchema);