const { Router } = require('express');
const express = require('express');
const multer = require('multer');
const router = Router();

// const storage = multer.diskStorage({ destination: 'api/uploads/', filename: filename });
// const upload = multer({ fileFilter: fileFilter(), storage: storage });



// function filename(req, file, callback) {
//     callback(null, file.originalname);
// }

// function fileFilter(req, file, callback) {
//     if(file.mimetype !== 'image/png') {
//         req.fileValidationError = 'Wrong file type';
//         callback(null, false, Error = { message: 'Wrong file type' });
//     } else {
//         callback(null, true);
//     }
// }

// router.post('/uploads', upload.single('photo'), (req, res) => {
//     if(req.fileValidationError) {
//         response.status(400).json({ error: req.fileValidationError });
//     } else {
//         req.status(201).json({ success: true });
//     }
// });


module.exports = router;