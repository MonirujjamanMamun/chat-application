const path = require('path');
const multer = require('multer');
const createError = require('http-errors');

const uploader = (
  subfolder_path,
  allowed_file_types,
  max_file_size,
  error_mes
) => {
  const UPLOAD_FOLDER = `${__dirname}/../public/uploads/${subfolder_path}/`;
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOAD_FOLDER);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const filename =
        file.originalname
          .replace(fileExt, '')
          .toLowerCase()
          .split(' ')
          .join('_') +
        '_' +
        Date.now();
      cb(null, filename + fileExt);
    },
  });
  const upload = multer({
    storage,
    limits: { fileSize: max_file_size }, // 10MB
    fileFilter: (req, file, cb) => {
      if (allowed_file_types.includes(file.mimetype)) {
        return cb(null, true);
      } else {
        cb(createError(error_mes), false);
      }
    },
  });
  return upload;
};

module.exports = uploader;
