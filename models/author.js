import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
  name:{ 
    type: String,
    required: true
  },
  bio:{
    type: String
  },
  books:[{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Book' 
  }]
});

export default mongoose.model('Author', authorSchema);
