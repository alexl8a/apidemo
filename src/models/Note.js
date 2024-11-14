import mongoose from 'mongoose';
const { Schema } = mongoose;

const noteSchema = new Schema({
  title: {type: String, required: true},
  content: String,
  active: {type: Boolean, default: true}
});

export default mongoose.model('Note', noteSchema);