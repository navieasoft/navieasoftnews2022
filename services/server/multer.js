import multer from "multer";
import path from "path";

const MulterConfiq = multer({
  storage: multer.diskStorage({
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const imgName =
        file.originalname.replace(ext, "").replace(" ", "_").toLowerCase() +
        ext +
        Date.now();
      cb(null, imgName);
    },
  }),
});

export default MulterConfiq;
