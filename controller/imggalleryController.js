const fsPromise = require('fs').promises;
const path = require('path');
const {format} = require('date-fns');


const imgallery = {
    list:require('../model/imggallery.json') , 
    setImgGallery:function(data)
    {
        this.list = data;
    }
}
const onlyUnique = (value, index, array) => {
    return array.indexOf(value) === index;
}
const sortData =  (arr) => {

    arr.sort((a ,b) => {
        return a["imgid"] - b["imgid"]
    })

}
const imgGalleryExper = (req , res)=> {

    let formats = {};
    formats["statusCode"] = 200;
    formats["result"] = imgallery.list;

    res.json(formats)

}
const imgTagAll = (req , res) => {

 let objs = [];

 imgallery.list.forEach((data) => {

    if(typeof data.tag === "object"){

        data.tag.forEach((ele) => {

            objs.push(ele)
        })


    }else{

        objs.push(data.tag)

    }
 })

 var unique = objs.filter(onlyUnique);
 res.json({code:1 , list:unique})

}
const imgGalleryAdd = async (req , res) => {

    const imgid = imgallery.list.length > 0 ? imgallery.list[imgallery.list.length-1].imgid +1 : 1;
    let newObjs = {};
    newObjs["imgid"] = imgid;
    newObjs["src"] = "http://localhost:7070/gallery/"+req.file.filename;
    newObjs["name"] = req.body.name;
    newObjs["des"] = req.body.des;
    newObjs["size"] =  JSON.parse(req.body.size);
    newObjs["alt"]  = req.body.alt;
    newObjs["tag"]  = JSON.parse(req.body.tags);
    newObjs["status"]  = req.body.status;
   
    const createdate =  `${format(new Date() , 'yyyyMMdd_HH:mm:ss')}`;

    newObjs["dates"]  = createdate;
    
    console.log(newObjs);

    imgallery.setImgGallery([...imgallery.list , newObjs]);

    console.log(imgallery.list)

    await fsPromise.writeFile(
        path.join(__dirname , ".." , "model" , "imggallery.json"),
        JSON.stringify(imgallery.list)
    )

    res.json({code:1})

}

const imgGalleryUpdate = async (req , res) => {

    const paramID = req.params.id;
    const findData = imgallery.list.find((ele) => ele.imgid === parseInt(paramID));
    if(findData === undefined) res.json({code:7 , msg:"Data not Update"});
    let newObjs = {};
    newObjs["imgid"] = parseInt(paramID);
    newObjs["src"] =  req.file !== undefined ?  "http://localhost:7070/gallery/"+req.file.filename : findData.src ;
    newObjs["name"] = req.body.name;
    newObjs["des"] = req.body.des;
    newObjs["size"] =  JSON.parse(req.body.size);
    newObjs["alt"]  = req.body.alt;
    newObjs["tag"]  = JSON.parse(req.body.tags);
    newObjs["status"]  = req.body.status;

    const createdate =  `${format(new Date() , 'yyyyMMdd_HH:mm:ss')}`;

    newObjs["dates"]  = createdate;

    const otherGallery = imgallery.list.filter((ele) => ele.imgid !== parseInt(paramID));

    imgallery.setImgGallery([...otherGallery , newObjs]);

    sortData(imgallery.list);

    await fsPromise.writeFile(
        path.join(__dirname , ".." , "model" , "imggallery.json"),
        JSON.stringify(imgallery.list)
    )

    res.json({code:1})

}

const getimgGallery = (req , res) => {

    const allData = imgallery.list.length > 0 ? imgallery.list : [];

    res.json({code:1 , list:allData})
}
const getimgGalleryByID = (req , res) => {

    const paramID = req.params.id ;
    const findsGallery  = imgallery.list.find((ele) => ele.imgid === parseInt(paramID));
    if(findsGallery === undefined) return res.json({code:6 , "msg":"Data Not Found"});
    res.json({code:1 , list:findsGallery});
}

const delImgGallery  = async (req , res) => {

    const paramID = req.params.id ;
    const otherGallery  = imgallery.list.filter((ele) => ele.imgid !== parseInt(paramID));

    imgallery.setImgGallery(otherGallery);

    sortData(imgallery.list);

    await fsPromise.writeFile(
        path.join(__dirname , ".." , "model" , "imggallery.json"),
        JSON.stringify(imgallery.list)
    )

    res.json({code:1 ,list : imgallery.list})


}


module.exports = {imgGalleryExper , imgTagAll , imgGalleryAdd , getimgGallery , getimgGalleryByID , imgGalleryUpdate , delImgGallery}