const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const restSchema = new Schema({
  // userID: String,
  Nome: String,
  Endereço: String,
  Telefone: String,
  Email: String,
  Tipo: { Tipo: String, enum: ['veg', 'veggie'] },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

restSchema.index({ location: '2dsphere' });

const Restaurant = mongoose.model('Restaurant', restSchema);

module.exports = Restaurant;
