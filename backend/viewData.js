const mongoose = require('mongoose');

// Connect to MongoDB (replace with your connection string)
mongoose.connect('mongodb://localhost:27017/mongodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('DB Connected');
}).catch((err) => {
  console.error('DB Connection Error:', err);
});

// Define a Schema for the data (this should match your collection structure)
const expenseSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  type: String,
  date: Date,
  category: String,
  description: String
}, { timestamps: true });

// Create a Model based on the schema
const Expense = mongoose.model('Expense', expenseSchema);

// Fetch all records from the 'expenses' collection
Expense.find({}, (err, expenses) => {
  if (err) {
    console.error('Error fetching data:', err);
  } else {
    console.log('All Expenses:', expenses);
  }
  mongoose.disconnect(); // Disconnect from the database after fetching data
});
