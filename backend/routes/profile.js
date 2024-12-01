const express = require('express');
const router = express.Router();
const { changeUsername, getMyProfile, changeUpi, profilePicUpload } = require('../controllers/profile');
const { upload } = require('../util/multer');

router.get('/myprofile', getMyProfile);

router.post('/changeusername', changeUsername);

router.post('/changeupi', changeUpi);

router.post('/profilepicupload', upload.single('profilePic'), profilePicUpload);






exports.profileRouter = router