const express=require("express");
const fs=require("fs");
 
const logger=(req,res,next)=>{
  let date= new Date();
  next();
  let newdate=new Date();
  const log=`Method:${req.method} | Route:${req.url} | user-agent:${req.headers["user-agent"]} | Response Time:${newdate-date}ms |Date Route Visited:${date.toString()}\n`;
  fs.appendFileSync("./logs/logs.txt",log);
}

module.exports={
    logger
}