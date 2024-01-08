import multer, { Multer } from "multer";
import path from "path";
import uuid  = require("uuid");
import { ErrorHandler } from "../utils/errorHandler";

const storage = (folderPath: string, filterRegex: RegExp): Multer | null => {
   try{
    const multerStorage = multer.diskStorage({
        destination: (_, __, cb) => {
          cb(null, path.join('public', folderPath + '/'))
        },
        filename: (d, file, cb) => {
          cb(null, `${file.fieldname}-${uuid.v4()}${path.extname(file.originalname)}`)
        },
      });
    
      const fileFilter = (_, file, cb) => {
        console.log("filter ichida fayl : ", file);
        
        if (!file.originalname.match(new RegExp(filterRegex))) {
          return cb(new ErrorHandler('Faylning tipi noto\'g\'ri'));
        }
        cb(null, true);
      };
    
      return multer({
        storage: multerStorage,
        fileFilter: fileFilter,
      });
   }catch(e){
    console.log("multer config err: ", e);
    return null
   }
  };
  
export default storage