const roomcate = {
    list:require('../model/roomcate.json') , 
    setRoomCate:function(data)
    {
        this.list = data;
    }
}

const amen = {

    list:require('../model/amenities.json'),
    setAmen:function(data){
        this.list = data;
    }
}

const faciData = {

    list:require('../model/facilities.json') , 
    setFacility:function(data){
            this.list = data;
    }

}

const roomList = {

     list:require('../model/roomlist.json') , 
     setRoomList:function(data){

            this.list = data;

     }
}

const fsPromise = require('fs').promises;
const path = require('path');
const {format} = require('date-fns');

const sortData =  (arr) => {

    arr.sort((a ,b) => {
        return a["id"] - b["id"]
    })

}

 const getAmen = (req , res) => {

    const amenall = amen.list;

    if(amenall.length > 0){

            res.json({code:1 , list:amenall , mes:"Success"})
    }
    else{

        res.json({code:2 , data:[] , mes:"no data"})
    }


 }

const getRoomCate = (req , res) => {

    const roomcateall = roomcate.list;

    if(roomcateall.length > 0){

            res.json({code:1 , list:roomcateall , mes:"Success"})
    }
    else{

        res.json({code:2 , data:[] , mes:"no data"})
    }

}

const getFacilities = (req , res) => {

 const facAll = faciData.list;

    if(facAll.length > 0){

            res.json({code:1 , list:facAll , mes:"Success"})
    }
    else{

        res.json({code:2 , data:[] , mes:"no data"})
    }
}

const roomAdd = async (req , res) => {

    const id = roomList.list.length > 0 ? roomList.list[roomList.list.length-1].id +1 : 1;
    let newobj = {};
    var imglist = [];
    var amenlistname = [];
    var facList =  [];
    newobj["id"] = id;

    const findRoomCate = roomcate.list.find((item) => req.body.cate.trim() === item.rcatenameen);
    if(findRoomCate === undefined) return res.json({code:6 , msg:"not found"});

    newobj["roomname"] =  findRoomCate.rcatenameth;
    newobj["roomnameen"] = req.body.cate;
    newobj["roomdetail"] = req.body.detailroom;
    newobj["sizeadults"] = req.body.sizeadults;
    newobj["sizeroom"] = req.body.sizeroom;
    
    if(req.body.amenities.indexOf(",") > -1){

        var sp_amen = req.body.amenities.split(",");
        sp_amen.forEach((data , keys) => {

              const findsAmen = amen.list.find((item) => item.amennameen === data);
              if(findsAmen !== undefined) amenlistname.push(findsAmen.amenname);
              
     })
     }else{

        const findsAmen = amen.list.find((item) => item.amennameen === req.body.amenities);
        if(findsAmen !== undefined) amenlistname.push(findsAmen.amenname);
    }

    console.log(amenlistname)

    newobj["amenities"] = amenlistname;

    if(req.body.facilities.indexOf(",") > -1){

        var sp_facilities = req.body.facilities.split(",");
        
        sp_facilities.forEach((data , keys) => {

              const findsFac = faciData.list.find((item) => item.facid === parseInt(data));
              if(findsFac !== undefined) facList.push(findsFac.facname);
            
              
     })
     }else{

        const findsFac = faciData.list.find((item) => item.facid  ===  parseInt(req.body.facilities));
        if(findsFac !== undefined) facList.push(findsFac.facname);
        

    }

    newobj["facilities"] = facList;


    req.files.forEach((data , keys) => {

        //console.log(data.destination)

        if(data.destination.indexOf("thumbroom") >-1){

            newobj["imgthumb"] =  "thumbroom/"+data.filename;
    
        }else{
    
            imglist.push("room/"+data.filename)
           
        }


    })
    newobj["imglist"] = imglist;
    newobj["status"] = req.body.status;

    const createdate =  `${format(new Date() , 'yyyyMMdd_HH:mm:ss')}`;
    newobj["createdate"] = createdate;
 
    roomList.setRoomList([...roomList.list , newobj]);

    await fsPromise.writeFile(
        path.join(__dirname , ".." , "model" , "roomlist.json"),
        JSON.stringify(roomList.list)
    )

    res.json({code:1})
   
}

const roomUpDate = async (req , res) => {

    const paramID = req.params.id;
    var newImgList = [];
    var oldImgList = [];
    var amenlistname = [];
    var facList =  [];
    const findsData = roomList.list.find((roomper) => roomper.id === parseInt(paramID));
    if(findsData === undefined) return res.json({code:6 , msg:"Data not found"});
    const findRoomCate = roomcate.list.find((item) => req.body.cate.trim() === item.rcatenameen);
    if(findRoomCate === undefined) return res.json({code:7 , msg:"Category Room not found"});
    let newobj = {};
    newobj["id"] = parseInt(paramID);
    newobj["roomname"] =  findRoomCate.rcatenameth;
    newobj["roomnameen"] = req.body.cate;
    newobj["roomdetail"] = req.body.detailroom;
    newobj["sizeadults"] = req.body.sizeadults;
    newobj["sizeroom"] = req.body.sizeroom;
    newobj["imgthumb"] = findsData.imgthumb;

    console.log(req.body)
    if(req.body.imgold.indexOf(",") > -1){

         var sp_oldimg = req.body.imgold.split(",");
         sp_oldimg.forEach((data , keys) => {

            const findold = findsData.imglist.find((item) => item === data);
            if(findold !== undefined) oldImgList.push(data);
            
        })
    }else{

        const findold = findsData.imglist.find((item) => item === req.body.imgold);
        if(findold !== undefined) oldImgList.push(findold[0]);

    }
    
    if(req.files !== undefined){

        req.files.forEach((data , keys) => {

            if(data.destination.indexOf("thumbroom") >-1){
    
                newobj["imgthumb"] =  "thumbroom/"+data.filename;
        
            }else{
        
                newImgList.push("room/"+data.filename)
               
            }
        })

    }
    var imgListall = oldImgList.concat(newImgList);
    newobj["imglist"] = imgListall;

    if(req.body.amenities.indexOf(",") > -1){

        var sp_amen = req.body.amenities.split(",");
        sp_amen.forEach((data , keys) => {

              const findsAmen = amen.list.find((item) => item.amennameen === data);
              if(findsAmen !== undefined) amenlistname.push(findsAmen.amenname);
              
     })
     }else{

        const findsAmen = amen.list.find((item) => item.amennameen === req.body.amenities);
        if(findsAmen !== undefined) amenlistname.push(findsAmen.amenname);
    }
    newobj["amenities"] = amenlistname;

    if(req.body.facilities.indexOf(",") > -1){

        var sp_facilities = req.body.facilities.split(",");
        
        sp_facilities.forEach((data , keys) => {

              const findsFac = faciData.list.find((item) => item.facid === parseInt(data));
              if(findsFac !== undefined) facList.push(findsFac.facname);
            
              
     })
     }else{

        const findsFac = faciData.list.find((item) => item.facid  ===  parseInt(req.body.facilities));
        if(findsFac !== undefined) facList.push(findsFac.facname);
        

    }

    newobj["facilities"] = facList;
    newobj["status"] = req.body.status;

    const createdate =  `${format(new Date() , 'yyyyMMdd_HH:mm:ss')}`;
    newobj["createdate"] = createdate;


    console.log(newobj)
    const otherData = roomList.list.filter((item) => item.id !== parseInt(paramID));
    roomList.setRoomList([...otherData , newobj]);
    sortData(roomList.list);

    await fsPromise.writeFile(
        path.join(__dirname , ".." , "model" , "roomlist.json"),
        JSON.stringify(roomList.list)
    )

    res.json({code:1})


}

const roomAllData = (req ,res) =>{

    const listRoom = roomList.list.length > 0 ? roomList.list : [];

     res.json({code:1 , list:listRoom})
}

const getRoomPerID = (req , res) => {

     const ids = req.params.id;
     const findsRoom = roomList.list.find((ele) => parseInt(ids) === ele.id);
     if(findsRoom === undefined) return res.json({code:6 , msg:"no data"});

     res.json({code:1 , list:findsRoom, msg:"success"})

}

const delRoomPerID = async (req , res) => {

    const Param = req.params.id;
    const otherData = roomList.list.filter((rms) => rms.id !== parseInt(Param));
    roomList.setRoomList(otherData);
    sortData(roomList.list);

    await fsPromise.writeFile(
        path.join(__dirname , ".." , "model" , "roomlist.json"),
        JSON.stringify(roomList.list)
    )

    res.json({code:1})


}

module.exports = {getRoomCate , getAmen , getFacilities , roomAdd , roomUpDate , roomAllData , getRoomPerID , delRoomPerID}