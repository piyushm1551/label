var env = process.env.NODE_ENV || "development";

const fs = require ('fs');
const bwipjs = require('bwip-js');

bwipjs.toBuffer({
        bcid:        'code128',       // Barcode type  -- identcode  11 / 12  ||  leitcode  13 / 14
        text:        'RR 37 619 485 0DE',    // Text to encode
        backgroundcolor: 'FFFFFF',
        //inkspreadv : -10,
    //  scale:       10,                 // 3x scaling factor
        width :      46,
        height:      8,              // Bar height, in millimeters
        includetext: true,            // Show human-readable text
        textxalign:  'center',
      textyalign: 'above' ,       // Always good to set this
      textyoffset : -0.75,
    //  bordertop : 20
    }, function (err, png) {
        if (err) {
          } else {
          console.log(png);
          require("fs").writeFile("out5.png", png, function(err) {
            console.log(err);
          });
            }
    });
