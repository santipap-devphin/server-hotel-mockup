const fsPromise = require('fs').promises;
const path = require('path');
const {format} = require('date-fns');

const webData = {
    list:require('../model/webs.json') ,
    setWeb:function(data){
        this.list = data;
    }
};


const getAllData = (req , res) => {

    const dataAll =  webData.list.length > 0 ? webData.list : [];

    res.json({code:1 , list:dataAll});

}
const getDataPerID = (req , res) => {

    const paramsID = req.params.id;
    const findData = webData.list.find((ele) => ele.webID === parseInt(paramsID));
    if(findData === undefined) return res.json({code:6 , msg:"Data Not Found"});

    res.json({code:1 , list: findData});

}

const webUpdate = async (req , res) => {

    const paramsID = req.body.id;
    const findData = webData.list.find((ele) => ele.webID === parseInt(paramsID));
    if(findData === undefined) return res.json({code:6 , msg:"no data match"});
    let newObjs = {};
    let createdate =  `${format(new Date() , 'yyyyMMdd_HH:mm:ss')}`;
    newObjs["webID"] = findData.webID;
    newObjs["WebTitle"] = req.body.title;
    newObjs["webDesEn"] = req.body.desen;
    newObjs["webDesTh"] = req.body.desth;
    newObjs["webLog"] = createdate;

    const otherData = webData.list.filter((ele) => ele.webID !== parseInt(paramsID));

    webData.setWeb([...otherData , newObjs]);

    webData.list.sort((a ,b) => {
        return a["webID"] - b["webID"]
    })

    await fsPromise.writeFile(
        path.join(__dirname , ".." , "model" , "webs.json"),
        JSON.stringify(webData.list)
    )

    res.json({code:1})

}

module.exports = {getAllData , getDataPerID , webUpdate}