const http = require('http')
const express = require('express');
const cors = require('cors');
const confCors = require('./config/corsOption')
const app = express();
const PORT = process.env.PORT || 7070;
const server = http.createServer(app);
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');

const mulerSetting = require('./middleware/setmuler');

const path = require('path');

const multer = require('multer');

app.use(credentials); 

app.use(cors(confCors));

app.use(express.urlencoded({ extended : false}));

app.use(express.json({limit: '50mb'}));

app.use(cookieParser());


const upload = multer({ storage: mulerSetting.thumbroom })

const uploadevents = multer({ storage: mulerSetting.eventsAct })

const uploadgallery = multer({ storage: mulerSetting.gallerys })

const experupload = multer({ storage: mulerSetting.thumbexper })

const multi_upload  = multer({ storage: mulerSetting.uploadmultiroomAdd });

const multi_upload_edit  = multer({ storage: mulerSetting.uploadRoomEdit });

const uploadPromotion  = multer({ storage: mulerSetting.promoset });

/*function uploadFiles(req, res , next) {
    console.log('inin')
    console.log(req.body.cate , req.body.sizeroom);
    console.log(req.files);
   
    res.json({ message: "Successfully uploaded files" });

    next();
}
*/

app.get('/', (req, res) => {
    res.json({server:"server running"})
})

app.use("/roomcate" , require('./routes/room'));

app.use("/cate" , require('./routes/cate'));

app.use("/webs" , require('./routes/webs'));

app.use("/experience" , require('./routes/experience'));

app.use("/experience/add", experupload.single('file') , require('./routes/experupload'));

app.use("/experience/update", experupload.single('file') , require('./routes/experupload'));

app.use("/imgmedia" , require('./routes/imggallery'));

app.use("/imgmedia/add" , uploadgallery.single('file'), require('./routes/imggalleryadd'));


app.use("/room", multi_upload.array("files"), require('./routes/roomadd')) // เพิ่มข้อมูลห้องพัก

app.use("/roomupdate", multi_upload_edit.array("filesnew"), require('./routes/roomedit')) // แก้ไขข้อมูลห้องพัก

app.use('/uploads', upload.single('file'), require('./routes/upload'))

app.use("/eventsact", uploadevents.array("files"), require('./routes/eventadd')) 

app.use("/promotion", uploadPromotion.array("files"), require('./routes/promotion')) 

//app.post("/upload_files", multi_upload.array("files"), uploadFiles);

app.use('/thumbroom', express.static(path.join(__dirname,'public','thumbroom'))) /**หากต้องการ referrance file ต้องทำ static path ก่อนไม่งั้นจะไม่สามารถเห็น file รูปได้ */
app.use('/experience', express.static(path.join(__dirname ,'public','experience')))
app.use('/room', express.static(path.join(__dirname ,'public','room')))
app.use('/gallery', express.static(path.join(__dirname ,'public','gallery')))
app.use('/eventactivity', express.static(path.join(__dirname ,'public','eventactivity')))
app.use('/promotion', express.static(path.join(__dirname ,'public','promotion')))



server.listen(PORT , () => console.log(`Server running on PORT ${PORT}`) )


