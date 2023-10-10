const fsPromise = require('fs').promises;
const path = require('path');
const {format} = require('date-fns');

const categoryall = {
    list:require('../model/group.json'),
    setCateAll:function(data){
        this.list = data;
    }
};


const getCateAll = (req, res) =>{

    const getData = categoryall.list.length > 0 ? categoryall.list : [];

    res.json({code:1 , list:getData});

}
const getCateAlls = (req ,  res) => {

    const listRoom = require('../model/roomcate.json');
    const listExper = require('../model/experiencetype.json');
    const listEvent = require('../model/eventscate.json');

   console.log(listRoom)

    res.json({code:1 , room:listRoom , exper:listExper , event:listEvent})


}

const cateAdd = async (req, res) => {

    
    const cateNameTh = req.body.cateth;
    const cateNameEn = req.body.cateen;
    let status = 0;
    let createdate =  `${format(new Date() , 'yyyyMMdd_HH:mm:ss')}`;
    const cateFind = categoryall.list.find((ele) => ele.groupname === req.body.group);
    if(cateFind === undefined) return res.json({code:6 , msg:"data not found"});
   
    if(cateFind["groupid"] === 1){

        const objs = {};
        const rcateid = require('../model/roomcate.json');
        
        objs["rcateid"]  = rcateid.length > 0 ? rcateid[rcateid.length-1].rcateid + 1: 1;
        objs["rcatenameth"] = cateNameTh;
        objs["rcatenameen"] = cateNameEn;
        objs["group"] = cateFind["groupid"];
        objs["rcreatedate"] = createdate;

        const roomcate = {list:rcateid , setRoomCate:function(data){
            this.list = data;
        }}

        roomcate.setRoomCate([...roomcate.list , objs]);

        await fsPromise.writeFile(
            path.join(__dirname , ".." , "model" , "roomcate.json"),
            JSON.stringify(roomcate.list)
        )
        status = 1;

    }else if(cateFind["groupid"] === 2){

        const objsExper = {};
        const experall = require('../model/experiencetype.json');
        const experid = experall.length > 0 ? experall[experall.length-1].experid + 1 : 1;
        objsExper["experid"] = experid;
        objsExper["expernameth"] = cateNameTh;
        objsExper["expernameen"] = cateNameEn;
        objsExper["group"] = cateFind["groupid"];
        objsExper["expercreatedate"] = createdate;

        const experType = {list:experall , setExper:function(data){
            this.list = data;
        }}

        experType.setExper([...experType.list , objsExper]);

        await fsPromise.writeFile(
            path.join(__dirname , ".." , "model" , "experiencetype.json"),
            JSON.stringify(experType.list)
        )
        status = 1;


    }else if(cateFind["groupid"] === 3){

        let objEvent = {};
        const eventall = require('../model/eventscate.json');
        const eventid = eventall.length > 0 ? eventall[eventall.length-1].eventid +1 : 1;
        objEvent["eventid"] = eventid;
        objEvent["eventnameth"] = cateNameTh;
        objEvent["eventnameen"] = cateNameEn;
        objEvent["group"] = cateFind["groupid"];
        objEvent["eventcreatedate"] = createdate;

        const eventCate = {list:eventall , setEvent:function(data){
            this.list = data;
        }}

        eventCate.setEvent([...eventCate.list , objEvent]);

        await fsPromise.writeFile(
            path.join(__dirname , ".." , "model" , "eventscate.json"),
            JSON.stringify(eventCate.list)
        )

        status = 1;
    }


    if(status !== 0){
        res.json({code:1 , msg:"success"})
    }

}

const delCategory = async (req , res) => {

    const idCate = req.body.id;
    const groupID = req.body.group;
    let objReq = {};
    let status = 0;

    if(parseInt(groupID) === 1){

        const roomcate = {list:require('../model/roomcate.json') , setRoomCate:function(data){
            this.list = data;
        }}

        const otherData = roomcate.list.filter((ele) => ele.rcateid !== parseInt(idCate));

        otherData.sort((a ,b) => {
            return a["rcateid"] - b["rcateid"]
        })

        roomcate.setRoomCate(otherData);

        await fsPromise.writeFile(
            path.join(__dirname , ".." , "model" , "roomcate.json"),
            JSON.stringify(roomcate.list)
        )
        status = 1;
        objReq["room"] = roomcate.list;

    }
    else if(parseInt(groupID) === 2){

        const experType = {list:require('../model/experiencetype.json') , setExper:function(data){
            this.list = data;
        }}

        const otherDataExper = experType.list.filter((ele) => ele.experid !== parseInt(idCate));

        otherDataExper.sort((a ,b) => {
            return a["experid"] - b["experid"]
        })

        experType.setExper(otherDataExper);

        await fsPromise.writeFile(
            path.join(__dirname , ".." , "model" , "experiencetype.json"),
            JSON.stringify(experType.list)
        )
        status = 1;
        objReq["exper"] = experType.list;

    }

    else if(parseInt(groupID) === 3){

        const eventCate = {list:require('../model/eventscate.json') , setEvent:function(data){
            this.list = data;
        }}

        const otherDataEvent = eventCate.list.filter((ele) => ele.eventid !== parseInt(idCate));

        otherDataEvent.sort((a ,b) => {
            return a["eventid"] - b["eventid"]
        })

        eventCate.setEvent(otherDataEvent);

        await fsPromise.writeFile(
            path.join(__dirname , ".." , "model" , "eventscate.json"),
            JSON.stringify(eventCate.list)
        )
        status = 1;
        objReq["event"] = eventCate.list;

    }

    if(status === 1){

        if (objReq?.room === undefined) {

            objReq["room"] = require('../model/roomcate.json');

          }
          if (objReq?.exper === undefined) {

            objReq["exper"] = require('../model/experiencetype.json');

          }if (objReq?.event === undefined) {

            objReq["event"] = require('../model/eventscate.json');

          }

       
        res.json({code:1 , room:objReq["room"] , exper:objReq["exper"] , event:objReq["event"]})
     }

} 

module.exports = {getCateAll , cateAdd , getCateAlls , delCategory}
