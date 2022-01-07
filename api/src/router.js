const { Router } = require('express');
const multer = require('multer')

const router = Router();

const filename = function(request, file, callback) {
    callback(null, file.originalname);

}

const fileFilter = function(request, file, callback) {
    if(file.mimetype !== 'image/png') {
        request.fileValidationError = 'Wrong file type';
        callback(null, false, Error = { message: 'Wrong file type' });
    } else {
        callback(null, true);
    }
}

const storage = multer.diskStorage({ destination: 'api/uploads/', filename: filename });

const upload = multer({ fileFilter: fileFilter(), storage: storage });

router.post('/uploads', uploads.single('photo'), (req, res) => {
    if(req.fileValidationError) {
        response.status(400).json({ error: req.fileValidationError });
    } else {
        req.status(201).json({ success: true });
    }
});


module.exports = router;