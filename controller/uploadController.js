

const uploadImgThumbRoom = (req , res) => {

    //console.log(req.file)

    res.send(req.file)
     //return upload.single('file');

}
const uploadMutiRoom = (req , res) => {

    console.log("mutiroom" , req.file)

    res.send(req.file)
     //return upload.single('file');

}




module.exports = {uploadImgThumbRoom , uploadMutiRoom }