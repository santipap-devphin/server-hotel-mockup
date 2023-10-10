const multer = require('multer');

const thumbroom = multer.diskStorage({
    destination: function (req, file, cb) {
      
        cb(null, 'public/thumbroom/')
    },
    filename: function (req, file, cb) {

         var newsfile = file.originalname.replace(" ","-");
        
        cb(null,Date.now()+"_"+newsfile)
    }
})

const promoset = multer.diskStorage({
    destination: function (req, file, cb) {
      
        cb(null, 'public/promotion/')
    },
    filename: function (req, file, cb) {

        var dir = "public/promotion/";
        const match = ["image/png", "image/jpeg"];
        if (match.indexOf(file.mimetype) === -1) {
           var message = `${file.originalname} is invalid. Only accept png/jpeg.`;
           return callback(message, null);
         }
         const fs = require('fs')

         const fileschk = fs.readdirSync(dir)
        
         //console.log(file)
         if(fileschk.indexOf(file.originalname) != -1)
           {  
                   console.log('have')
           }else{

               var newsfile = file.originalname.replace(" ","-");
               cb(null,Date.now()+"promotion_"+newsfile)
               //console.log('no')
           }
      }
})

const gallerys = multer.diskStorage({
    destination: function (req, file, cb) {
      
        cb(null, 'public/gallery/')
    },
    filename: function (req, file, cb) {

         var newsfile = file.originalname.replace(" ","-");
        
        cb(null,Date.now()+"_"+newsfile)
    }
})

const eventsAct = multer.diskStorage({
    destination: function (req, file, cb) {
      
        cb(null, 'public/eventactivity/')
    },
    filename: function (req, file, cb) {

        var dir = "public/eventactivity/";
        const match = ["image/png", "image/jpeg"];
        if (match.indexOf(file.mimetype) === -1) {
           var message = `${file.originalname} is invalid. Only accept png/jpeg.`;
           return callback(message, null);
         }
         const fs = require('fs')

         const fileschk = fs.readdirSync(dir)
        
         //console.log(file)
         if(fileschk.indexOf(file.originalname) != -1)
           {  
                   console.log('have')
           }else{

               var newsfile = file.originalname.replace(" ","-");
               cb(null,Date.now()+"events_"+newsfile)
               //console.log('no')
           }

         
        
     
    }
})

const thumbexper = multer.diskStorage({
    destination: function (req, file, cb) {
      
        cb(null, 'public/experience/')
    },
    filename: function (req, file, cb) {

         console.log(file)

         /*const match = ["image/png", "image/jpeg"];

         if (match.indexOf(file.mimetype) === -1) {
            var message = `${file.originalname} is invalid. Only accept png/jpeg.`;
            return callback(message, null);
          }*/

         var newsfile = file.originalname.replace(" ","-");
        
         cb(null,Date.now()+"_"+newsfile)
    }
})

const uploadmultiroomAdd = multer.diskStorage({
    destination: function (req, file, cb) {
      
        if(req.body.fronts.includes(file.originalname)){

            cb(null, 'public/thumbroom/')
        }else{
            cb(null, 'public/room/')
        }
       
    },
    filename: function (req, file, cb) {

         //console.log(req.files[0])

         var dir = "";

         if(req.body.fronts.includes(file.originalname)){

             dir = 'public/thumbroom/';
         }else{

            dir = 'public/room/';
          
        }

         const match = ["image/png", "image/jpeg"];
         if (match.indexOf(file.mimetype) === -1) {
            var message = `${file.originalname} is invalid. Only accept png/jpeg.`;
            return callback(message, null);
          }
          const fs = require('fs')

          const fileschk = fs.readdirSync(dir)
         
          //console.log(file)
          if(fileschk.indexOf(file.originalname) != -1)
            {  
                    console.log('have')
            }else{

                var newsfile = file.originalname.replace(" ","-");
                cb(null,Date.now()+"m@@_"+newsfile)
                //console.log('no')
            }
         }
})

const uploadRoomEdit =  multer.diskStorage({
    destination: function (req, file, cb) {

                if('fronts' in req.body){

                    if(req.body.fronts.includes(file.originalname)){

                        cb(null, 'public/thumbroom/')
                    }else{
                        cb(null, 'public/room/')
                    }

                }else{
                    cb(null, 'public/room/')
                }
       
    },
    filename: function (req, file, cb) {

         //console.log(req.files[0])

         var dir = "";

         if('fronts' in req.body){

            if(req.body.fronts.includes(file.originalname)){

                dir = 'public/thumbroom/';
            }else{
    
                dir = 'public/room/';
                
            }
         }else{
            dir = 'public/room/';
         }
         const match = ["image/png", "image/jpeg"];
         if (match.indexOf(file.mimetype) === -1) {
            var message = `${file.originalname} is invalid. Only accept png/jpeg.`;
            return callback(message, null);
          }
          const fs = require('fs')

          const fileschk = fs.readdirSync(dir)
         
          //console.log(file)
          if(fileschk.indexOf(file.originalname) != -1)
            {  
                    console.log('have')
            }else{

                var newsfile = file.originalname.replace(" ","-");
                cb(null,Date.now()+"m@@_"+newsfile)
                //console.log('no')
            }
         }

         
})

module.exports = {thumbroom , promoset , gallerys , eventsAct , thumbexper , uploadmultiroomAdd , uploadRoomEdit}