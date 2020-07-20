const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
	  cb(null, __basedir + '/uploads/')
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
		const newName = file.originalname + '-' + uniqueSuffix + path.extname(file.originalname);
	  cb(null, newName.replace(/\s/g, ''));
	}
});

//const upload = multer({storage: storage});

const upload = multer({
	storage: storage,
	limits:{fileSize: 1000000}
  })

  // Check File Type
//function checkFileType(file, cb){
	// Allowed ext
	//const filetypes = /jpeg|jpg|png|gif/;
	// Check ext
//	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	// Check mime
//	const mimetype = filetypes.test(file.mimetype);
  
	//if(mimetype && extname){
	  //return cb(null,true);
	//} else {
	 // cb('Error: Images Only!');
	//}
  //}

module.exports = upload;