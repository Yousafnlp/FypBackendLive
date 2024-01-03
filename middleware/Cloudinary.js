// const cloudinary = require('cloudinary');
import cloudinary from 'cloudinary'

cloudinary.v2.config({
  cloud_name: 'dvtrhncbh',
  api_key: '791723333153869',
  api_secret: 'ozcFEhm5fEP5Uid3nBvTgXLQFKg',
  secure: true,
});

export default cloudinary;