import multer from 'multer';

const storage = multer.diskStorage({
  filename(req, file, cb) {
    cb(null, `book-${new Date().toISOString()}-${file.originalname}`)
  }
});

export default multer({ storage });