const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb){
    cb(null, 'public/img')
  },
  filename(req, file, cb) {
    cb(null, `book-${new Date().toISOString()}-${file.originalname}`)
  }
});

module.exports = multer({ storage });