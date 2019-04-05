var Express = require("express");
var Multer = require("multer");
var BodyParser = require("body-parser");
const util = require('util');
const exec = util.promisify(require('child_process').exec);

var app = Express();

app.use(BodyParser.json({limit: "4mb"}));

var currentImage = '',
    currentImageExtension = '';

var storage = Multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        currentImageExtension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        console.log('FileExtension:', currentImageExtension);
        cb(null, file.originalname);
        cb(null, "testImage"+currentImageExtension);
    }
});

async function checkForFace(response) {
    const { stdout, stderr } = await exec('python -m scripts.label_image --graph=tf_files/retrained_graph.pb --image=/tensor/IPR/uploads/testImage'+currentImageExtension);
    console.log(stdout);
    response.send("Out:"+stdout+" Err:"+stderr);
}

async function executeCmd(response) {
    const { stdout, stderr } = await exec('ls');// Work In Progress
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
    response.send("success");
}

app.post("/checkImagesForFaces", Multer({storage: storage}).single("upload"), (request, response) => {
    checkForFace(response);
});

app.post("/extractImages", Multer({storage: storage}).single("upload"), (request, response) => { // Work In Progress
    executeCmd(response);
});

app.listen(3000, () => {
    console.log("Listening...");
})