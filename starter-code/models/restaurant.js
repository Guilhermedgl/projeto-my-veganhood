const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const restSchema = new Schema({
  Name: String,
  Address: String,
  Zip: String,
  City: String,
  Phone: String,
  Email: String,
  Type: {
    type: String,
    enum: ['Vegan', 'Veggie', 'Both']
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

restSchema.index({ location: '2dsphere' });

const Restaurant = mongoose.model('Restaurant', restSchema);

module.exports = Restaurant;
