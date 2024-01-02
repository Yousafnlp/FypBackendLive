import mongoose from 'mongoose';


const imagesSchema = new mongoose.Schema(
  {
    
        img: {
          type: String,
          required: true
        },
}
);
const images = mongoose.model('images', imagesSchema);

export default images;
