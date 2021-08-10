const multer= require('multer')
const path=require('path')

  const storage = multer.diskStorage({
   
    destination: (req, file, callback) => {
        
      callback(null,path.join(__dirname,'../react-ui/public/roomTypes'));
    },
    filename: (req, file, callback) => {
      console.log(req.body,file)
      let ex=file.mimetype.split('/')[1]
       if(ex=="jpeg"){
         ex="jpg"
       }
      callback(null,req.body.typeC+"-essaouira."+ex);
    }
  });
  
  module.exports = multer({storage: storage}).single('file');