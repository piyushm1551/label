var env = process.env.NODE_ENV || "development";

var JsBarcode = require('jsbarcode');
var Canvas = require("canvas");
var base64Img = require('base64-img');
var canvas = new Canvas();
JsBarcode(canvas, "RR 37 619 485 0DE", {
  fontSize : 10,
  textPosition: "top",
  width: 1.5,
  height: 14
});
const PDFDocument = require('pdfkit');
const fs = require ('fs');

console.log('<img src="' + canvas.toDataURL() + '" />');
//base64Img.img(`${canvas.toDataURL()}`, 'dest', '1', function(err,'/home/dell/Desktop/toPiyush/c.png') {});

var base64Data = canvas.toDataURL().replace(/^data:image\/png;base64,/, "");

require("fs").writeFile("out10.png", base64Data, 'base64', function(err) {
  console.log(err);
});
