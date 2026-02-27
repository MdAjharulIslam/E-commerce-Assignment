import ImageKit from "imagekit";

let imagekitInstance = null;

const getImageKit = () => {
  if (!imagekitInstance) {
    
    if (!process.env.IMAGEKIT_PUBLIC_KEY || 
        !process.env.IMAGEKIT_PRIVATE_KEY || 
        !process.env.IMAGEKIT_URI_ENDPOINT) {
      console.error(' ImageKit environment variables are missing!');
      throw new Error('ImageKit credentials not found in environment variables');
    }
    
    console.log(' Initializing ImageKit...');
    imagekitInstance = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.IMAGEKIT_URI_ENDPOINT,
    });
    console.log(' ImageKit initialized successfully');
  }
  return imagekitInstance;
};

export default getImageKit;