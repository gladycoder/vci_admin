const mongoose = require('mongoose');

// Schema for the counter
const studentCounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },  // The counter name (e.g., 'studentID')
  seq: { type: Number, default: 100 }     // The starting sequence for student IDs
});


// Model for StudentCounter
const StudentCounter = mongoose.model('StudentCounter', studentCounterSchema);

// Function to ensure the counter document exists with the correct _id
async function ensureCounterDocumentExists() {
  const counter = await StudentCounter.findOneAndUpdate(
    { _id: 'studentID' }, 
    { $setOnInsert: { seq: 1 } },  // Set seq to 100 if the document is being inserted
    { upsert: true, new: true }       // Create if not exists and return the updated document
  );
  return counter;
}

module.exports = { StudentCounter, ensureCounterDocumentExists };