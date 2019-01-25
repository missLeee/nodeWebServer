/**
 * Created by pactera1 on 2019/1/24.
 */
 const http=require('http');
 const  conf=require('./config/defaultConfig');
 const path=require('path');
 const chalk=require('chalk');
 const fs=require('fs');

 const server=http.createServer(function(req,res){
  const url=req.url;
  const filePagh=path.join(conf.root,url);
  fs.stat(filePagh,function(err,stas){
   if(err){
    res.statusCode=404;
       res.setHeader('Content-Type','text-plain');
       res.end('666');
   return;
   }
   if(stas.isFile()){
       res.statusCode=200;
       res.setHeader('Content-Type','text-html');
       // res.end('Hello world');
       //    res.write('<html>');
       //    res.write('<body>');
       //    res.write(filePagh);
       //    res.write('</body>');
       // res.end(filePagh);
       fs.createReadStream(filePagh).pipe(res);
   }else if(stas.isDirectory()){
    fs.readdir((filePagh,function(err,files){
        res.statusCode=200;
        res.setHeader('Content-Type','text-plain');
        res.end(files.join(','));

    }))
   }
  })



 });
 server.listen(conf.port,conf.hostname,function(){
const  addr='http://${conf.hostname}:${conf.port}';
console.info('Server started at ${addr}');
 });

