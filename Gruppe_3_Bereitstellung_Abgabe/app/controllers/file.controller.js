//const session = require('express-session');
//const userId = request.session.userId;
//const moduleId = request.session.moduleId;     


//var moduleDirectory = connection.query("select groupID from groups where module.userID = " + userId + " and group.moduleID = " + moduleId + ";");

var uploadFolder = __basedir + '/uploads/'; // +'/' + moduleDirectory + '/';
const fs = require('fs');

exports.uploadFile = (req, res) => {
	res.send('File uploaded sucessfully!');
}

exports.listAllFiles = (req, res) => {
	fs.readdir(uploadFolder, (err, files) => {
		res.send(files);
	})
}

exports.downloadFile = (req, res) => {
	var filename = req.params.filename;
	res.download(uploadFolder + filename); 
}