const fsPromise = require('fs').promises;
const path = require('path');
const {format} = require('date-fns');

const sortData =  (arr) => {

    arr.sort((a ,b) => {
        return a["proID"] - b["proID"]
    })

}

const promotionData = {
    list:require('../model/promotion.json'), 
    setPromotion:function(data){
        this.list = data;
    }
}

const promotionAdd = async (req , res) => {

    const proID = promotionData.list.length > 0 ? promotionData.list[promotionData.list.length-1].proID +1 : 1;
    let newObjs = {};
    let promoList = [];
    newObjs["proID"] = proID;
    newObjs["proTitle"] = req.body.title;
    newObjs["proDes"] = req.body.des;

    if(req.files !== undefined){

        req.files.forEach((data , keys) => {

             promoList.push("promotion/"+data.filename);

        })

    }

    newObjs["proImg"] = promoList;
    newObjs["proSdate"] = req.body.sdate;
    newObjs["proEdate"] = req.body.edate;
    newObjs["proStatus"] = req.body.status;
    const proLog =  `${format(new Date() , 'yyyyMMdd_HH:mm:ss')}`;

    newObjs["proLog"] = proLog;

    promotionData.setPromotion([...promotionData.list , newObjs]);

    await fsPromise.writeFile(
        path.join(__dirname , ".." , "model" , "promotion.json"),
        JSON.stringify(promotionData.list)
    )

    res.json({code:1})

}

const getPromotion = (req , res) => {

    const dataPro = promotionData.list.length > 0 ? promotionData.list : [];

    res.json({code:1 , list:dataPro});

}
const getPromotionOnce = (req , res) => {

    const paramID = req.params.id;
    const findData = promotionData.list.find((itm) => itm.proID === parseInt(paramID));
    if(findData === undefined) return res.json({code:6 , msg:"data not found"});
    res.json({code:1 , list:findData})
}
const promotionUpdate = async (req , res) => {

    const paramID = req.body.id;
    const findPromo = promotionData.list.find((itm) =>itm.proID === parseInt(paramID));
    let proimgList = [];
    if(findPromo === undefined) return res.json({code:6 , msg:"data not found"});
    
    findPromo["proTitle"] = req.body.title;
    findPromo["proDes"] = req.body.des;

    if(req.files !== undefined){

        req.files.forEach((data , keys) => {

            proimgList.push("promotion/"+data.filename);

        })

    }
    var imgolds = JSON.parse(req.body.imgold);
    const newImg = imgolds.concat(proimgList);

    findPromo["proImg"] = newImg;
    findPromo["proSdate"] = req.body.sdate;
    findPromo["proEdate"] = req.body.edate;
    findPromo["proStatus"] = req.body.status;
    const proLog =  `${format(new Date() , 'yyyyMMdd_HH:mm:ss')}`;

    findPromo["proLog"] = proLog;


    const otherData = promotionData.list.filter((ele) => ele.proID !== parseInt(paramID));

    promotionData.setPromotion([...otherData , findPromo]);

    sortData(promotionData.list);

    await fsPromise.writeFile(
        path.join(__dirname , ".." , "model" , "promotion.json"),
        JSON.stringify(promotionData.list)
    )

    res.json({code:1})
}
const delPromotion = async (req , res) => {

    const paramID = req.body.id;
    const otherData = promotionData.list.filter((ele)=> ele.proID !== parseInt(paramID));

    promotionData.setPromotion(otherData);

    sortData(promotionData.list);

    await fsPromise.writeFile(
        path.join(__dirname , ".." , "model" , "promotion.json"),
        JSON.stringify(promotionData.list)
    )

    res.json({code:1})


}

module.exports = {promotionAdd , getPromotion , getPromotionOnce , promotionUpdate , delPromotion}