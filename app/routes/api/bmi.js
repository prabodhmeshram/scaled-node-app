const express = require("express");
const { to } = require("await-to-js");
const producerService = require("../../services/producerService");
const consumerService = require("../../services/consumerService");
const bmiService = require("../../services/bmiService");

const router = new express.Router();

router.post("/produce", async(req,res)=>{
	const data = req.body;
	const [err, success] = await to(producerService.putData(data));
	if(!success){
		if(err.code){
			console.log(err);
			res.status(err.code).send(err.message);
		}else{
			res.status(500).send("Server exception");
		}
		return;
	}
	res.status(200).send("Success");
});

router.get("/consume", async(req,res) =>{
	const [err, bmiValues] = await to(consumerService.consumeData());
	if(!bmiValues){
		if(err.code){
			console.log(err);
			res.status(err.code).send(err.message);
		}else{
			res.status(500).send("Server exception");
		}
		return;
	}
	// These bmiValues can be written into some DB for persistence
	res.status(200).send(bmiValues);
});

router.get("/processBmi", async(req,res)=>{
	const {filePath} = req.params;

	const [err, success] = await to(bmiService.processBMIData(filePath));

	if(!success){
		console.log(err);
		if(err.code){
			console.log(err);
			res.status(err.code).send(err.message);
		}else{
			res.status(500).send(err.message);
		}
		return;
	}
	res.status(200).send("File processed successfully");
});

module.exports = router;