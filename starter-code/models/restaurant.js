const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const restSchema = new Schema({
  // userID: String,
  Nome: String,
  Endereço: String,
  Telefone: String,
  Email: String,
  enum: ['veg', 'veggie'],
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Restaurant = mongoose.model("Restaurant", restSchema);

module.exports = Restaurant;