const fsPromise = require('fs').promises;
const path = require('path');
const {format} = require('date-fns');

const sortData =  (arr) => {

    arr.sort((a ,b) => {
        return a["experID"] - b["experID"]
    })

}

const expertype = {
    list:require('../model/experiencetype.json') , 
    setExperType:function(data)
    {
        this.list = data;
    }
}
const experContent = {
    list:require('../model/experiencecontent.json') ,
    setExperContent:function(data){
        this.list = data
    }
}
const getExperTypeAll = (req , res) => {

    const dataExper = expertype.list.length > 0 ? expertype.list : [];

     res.json({code:1 , list:dataExper})
}

const experienceAdd = async (req , res) => {

    const experID = experContent.list.length > 0 ? experContent.list[experContent.list.length-1].experID + 1 : 1;
    let newObj = {};

    newObj["experID"] = experID;

    const findExperCate = expertype.list.find((item) => item.expernameen ===  req.body.experCate);
    if(findExperCate === undefined) return res.json({code:6 , msg:"experCate Not Found"});
    newObj["experCate"] = findExperCate.experid;
    if(newObj["experCate"] === 6){
        newObj["experDetail"] = req.body.experDetail;
    }
    newObj["experTitle"] = req.body.experTitle;
    newObj["experHighlight"] = req.body.experHighlight;
    newObj["experContent"] = req.body.experContent;
    newObj["experThumb"] =  "experience/"+req.file.filename;
    newObj["experStatus"] = req.body.experStatus;
    const createdate =  `${format(new Date() , 'yyyyMMdd_HH:mm:ss')}`;

    newObj["experCreate"] = createdate;

    experContent.setExperContent([...experContent.list , newObj]);

    await fsPromise.writeFile(
        path.join(__dirname , ".." , "model" , "experiencecontent.json"),
        JSON.stringify(experContent.list)
    )

    res.json({code:1})
 
}

const experUPdate = async (req , res) => {

    const paramsID = req.params.id;
    let newObj = {};
    const findUpdate = experContent.list.find((ele) => ele.experID === parseInt(paramsID));
    if(findUpdate === undefined) return res.json({code:6 , msg:"Data Not Found"});
    const findExperCate = expertype.list.find((item) => item.expernameen ===  req.body.experCate);
    if(findExperCate === undefined) return res.json({code:7 , msg:"experCate Not Found"});
    newObj["experID"] =  parseInt(paramsID);
    newObj["experCate"] = findExperCate.experid;

    if(newObj["experCate"] === 6){
        newObj["experDetail"] = req.body.experDetail;
    }
    newObj["experTitle"] = req.body.experTitle;
    newObj["experHighlight"] = req.body.experHighlight;
    newObj["experContent"] = req.body.experContent;
    newObj["experThumb"] =  req.file === undefined ? findUpdate.experThumb: "experience/"+req.file.filename;
    newObj["experStatus"] = req.body.experStatus;
    const createdate =  `${format(new Date() , 'yyyyMMdd_HH:mm:ss')}`;
    newObj["experCreate"] = createdate;

    const otherData = experContent.list.filter((ele) =>  ele.experID !== parseInt(paramsID))

    experContent.setExperContent([...otherData , newObj]);

    sortData(experContent.list);

    //console.log(experContent.list)
    await fsPromise.writeFile(
        path.join(__dirname , ".." , "model" , "experiencecontent.json"),
        JSON.stringify(experContent.list)
    )

    res.json({code:1})

}

const getExperContent = (req , res) => {

    const listData  = experContent.list.length > 0 ? experContent.list : [];

    /*listData.forEach((datas) => {

       expertype.list.forEach((vals) => {

            if(datas.experCate === vals.experid){

                datas["experCate"] = vals["expernameen"];

            }
       })
     })*/
     res.json({code:1 , list:listData})
}

const getExperienceByID = (req , res) => {

    console.log('infunc');
    const paramsID = req.params.id;
    console.log(experContent.list)
    const findContent = experContent.list.find((ele) => ele.experID === parseInt(paramsID))
    console.log(findContent)
    if(findContent === undefined) return res.json({code:6 , msg:"not Found Data"});
    res.json({code:1 , list: findContent , msg:"success"});

}

const delExperience = async (req, res) => {

    const paramID = req.params.id;
    const otherData = experContent.list.filter((ele) => ele.experID !== parseInt(paramID));

    experContent.setExperContent(otherData);  

    await fsPromise.writeFile(
        path.join(__dirname , ".." , "model" , "experiencecontent.json"),
        JSON.stringify(experContent.list)
    )

    res.json({code:1})


}

module.exports = {getExperTypeAll , experienceAdd , getExperContent , getExperienceByID , experUPdate , delExperience}