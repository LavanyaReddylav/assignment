'use strict';                                   // Strictly follow latest JS standards

// Required Dependencies
var express = require('express');
var router = express.Router();
var Slot = require('../models/slot');     // Profile Model

router.route('/latest_slots')
.get(function(req, res, next){                  // Give all recommends in ascending order
    
	var d = new Date();
	d.setHours(0);
	d.setMinutes(0);
	d.setSeconds(0);
	
    Slot.find({'when.date': {$gte: d}})
    .exec(function(err, slots){
        if(err)
            return next(err);
        return res.status(200).json(slots);
    });
});

router.route('/:id')
.put(function(req, res, next){
	Slot.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true})
    .exec(function(err, slot){
        if(err)
            return next(err);
        return res.status(200).json({message: "Done"});
    });
});

router.route('/')
.get(function(req, res, next){                  // Give all recommends in ascending order
    
    Slot.find()
    .exec(function(err, slots){
        if(err)
            return next(err);
        return res.status(200).json(slots);
    });
})

.post(function(req, res, next){
	console.log(req.body);
	
	Slot.create(req.body, function(err, slots){
        if(err)
            return next(err);
        return res.status(200).json(slots);
    });
})

.delete(function(req, res, next){               // Drop Whole Collection
    
    Slot.find()
    .exec(function(err){
        if(err)
            next(err);
        
        var ver = Slot.length>0 ? Slot.collection.drop() : false;
        if(ver)
            res.status(200).send({"message": "Collection Removed"});
        else
            res.status(501).send({"message": "Collection Doesn't Exist"});
    });    
});

module.exports = router;