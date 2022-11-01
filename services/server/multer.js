import multer from "multer";
import path from "path";

export async function multipleBodyParser(req, res, folder, images) {
  try {
    const MulterConfiq = multer({
      storage: multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, path.join(process.cwd(), "public", folder));
        },
        filename(req, file, cb) {
          let fileName;
          const isFavicon = req.files.favicon;
          if (isFavicon) {
            fileName = "favicon.ico";
          } else {
            fileName = `${file.fieldname}-${Date.now()}${path.extname(
              file.originalname
            )}`;
          }
          cb(null, fileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        const filetypes = /jpg|jpeg|png|gif/;
        const extname = filetypes.test(
          path.extname(file.originalname).toLowerCase()
        );
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
          return cb(null, true);
        } else {
          cb("Unsupported file extension");
        }
      },
      limits: 1000000,
    });

    await new Promise((resolve) => {
      const multer = MulterConfiq.fields(images);
      multer(req, res, resolve);
    });
    return { error: false };
  } catch (err) {
    return { error: err.message };
  }
}
