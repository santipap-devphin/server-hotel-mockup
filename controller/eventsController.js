const fsPromise = require('fs').promises;
const path = require('path');
const {format} = require('date-fns');

const sortData =  (arr) => {

    arr.sort((a ,b) => {
        return a["eventsID"] - b["eventsID"]
    })

}

const events = {
    list:require('../model/events.json') , 
    setEvents:function(data)
    {
        this.list = data;
    }
}

const getCategoryEvents = (req , res) => {

    const getData = require('../model/eventscate.json');

    res.json({code:1 , list:getData})


}

const addEvent = async (req , res) => {

    const eventsID = events.list.length > 0 ? events.list[events.list.length-1].eventsID+1 : 1;
    let newObjs = {};
    let eventImgList = [];
    
    newObjs["eventsID"] = eventsID;
    newObjs["eventsCate"] = req.body.cate;
    newObjs["eventsTitle"] = req.body.title;
    newObjs["eventsDes"] = req.body.des;
    

    if(req.files !== undefined){

        req.files.forEach((data , keys) => {

            eventImgList.push("eventactivity/"+data.filename);

        })

    }

    newObjs["eventsImglist"] = eventImgList;
    newObjs["eventsTag"] = JSON.parse(req.body.tags);
    newObjs["eventsStatus"] = req.body.status;

    const eventedate =  `${format(new Date() , 'yyyyMMdd_HH:mm:ss')}`;

    newObjs["eventsLog"] = eventedate;

    events.setEvents([...events.list , newObjs]);

    await fsPromise.writeFile(
        path.join(__dirname , ".." , "model" , "events.json"),
        JSON.stringify(events.list)
    )

    res.json({code:1})
}

const getEventsAll = (req , res) => {

    const getData = events.list.length > 0 ? events.list : [];

    res.json({code:1 , list:getData})
}

const getEventsByID = (req , res) => {

    const findsDataEvent = events.list.find((ele) => ele.eventsID === parseInt(req.params.id));
    if(findsDataEvent === undefined) return res.json({code:6 , msg:"Not found Event"});
    res.json({code:1 , list:findsDataEvent});

}

const eventsUpdate = async (req , res) => {

    let newImgList = [];
    let imgEventold  = {};
    const findUpdate = events.list.find((lit) => lit.eventsID === parseInt(req.params.id));
    if(findUpdate === undefined) return res.json({code:6 , "msg" : "Not found Data"});

    findUpdate["eventsID"] = parseInt(req.params.id);
    findUpdate["eventsCate"] = req.body.cate;
    findUpdate["eventsTitle"] = req.body.title;
    findUpdate["eventsDes"] = req.body.des;
 
    imgEventold = JSON.parse(req.body.imgold);

    if(req.files !== undefined){

        req.files.forEach((data , keys) => {

            newImgList.push("eventactivity/"+data.filename);

        })

    }

    var imgListall = imgEventold.concat(newImgList);
    findUpdate["eventsImglist"] = imgListall;
    findUpdate["eventsTag"] = JSON.parse(req.body.tags);
    findUpdate["eventsStatus"] = req.body.status;

    const eventedate =  `${format(new Date() , 'yyyyMMdd_HH:mm:ss')}`;

    findUpdate["eventsLog"] = eventedate;

    const otherData = events.list.filter((item) => item.eventsID !== parseInt(req.params.id));
    events.setEvents([...otherData , findUpdate]);
    sortData(events.list);

    await fsPromise.writeFile(
        path.join(__dirname , ".." , "model" , "events.json"),
        JSON.stringify(events.list)
    )

    res.json({code:1})

}

const delEvents = async (req , res) => {

    const filtersEvents = events.list.filter((lit) => lit.eventsID !== parseInt(req.body.id));
    events.setEvents(filtersEvents);

    sortData(events.list);

    await fsPromise.writeFile(
        path.join(__dirname , ".." , "model" , "events.json"),
        JSON.stringify(events.list)
    )
   
    res.json({code:1 , list:events.list})
}


module.exports = {addEvent , getEventsAll , getEventsByID , eventsUpdate , delEvents , getCategoryEvents}
