const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const restSchema = new Schema({
  // userID: String,
  Name: String,
  Address: String,
  Phone: String,
  Email: String,
  enum: ['vegan', 'veggie'],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

restSchema.index({ location: '2dsphere' });

const Restaurant = mongoose.model('Restaurant', restSchema);

module.exports = Restaurant;
