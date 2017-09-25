const PDFDocument = require('pdfkit');
const fs = require ('fs');
const bwipjs = require('bwip-js');



var env = process.env.NODE_ENV || "development";
//var config = require('../config/shippers.json')[env];

class DeutschePost {

  generate_label_pdf() {
    var label_doc = new PDFDocument({
      layout: 'portrait',
      size: [this.cm_to_point(15), this.cm_to_point(10)],
      margin: this.cm_to_point(0.2)
    });


    label_doc.pipe(fs.createWriteStream('output.pdf'));

    //Draw the middle line
    label_doc.save().moveTo(this.cm_to_point(7.8), this.cm_to_point(0.2));
    label_doc.lineWidth(this.cm_to_point(0.12));
    label_doc.lineTo(this.cm_to_point(7.8), this.cm_to_point(8.5)).stroke();

    //----------------LEFT SIDE STARTS HERE------------------------

    //Draw left side boundary box
    label_doc.lineWidth(this.cm_to_point(0.03));
    label_doc.rect(this.cm_to_point(0.2), this.cm_to_point(0.2), this.cm_to_point(7.42), this.cm_to_point(8.3)).stroke();

    //CUSTOMS INFORMATION block
    label_doc.fontSize(10);
    label_doc.text('CUSTOMS DECLARATION', this.cm_to_point(0.3), this.cm_to_point(0.6), {
      align: 'left',
      height: this.cm_to_point(0.25)
    }).moveDown().fontSize(6).text('Postal Administration (May be opened officially)', this.cm_to_point(0.3), this.cm_to_point(0.9)).moveDown();
    label_doc.fontSize(10).text('CN22', this.cm_to_point(6.50), this.cm_to_point(0.6), {
      height: this.cm_to_point(0.25)
    }).moveDown().fontSize(6).text('Important', this.cm_to_point(6.50), this.cm_to_point(0.9));
    label_doc.moveTo(this.cm_to_point(0.2), this.cm_to_point(1.2)).lineTo(this.cm_to_point(7.62), this.cm_to_point(1.2)).stroke();

    //Item type box
    label_doc.lineWidth(this.cm_to_point(0.03));
    label_doc.rect(this.cm_to_point(0.5), this.cm_to_point(1.4), this.cm_to_point(0.4), this.cm_to_point(0.4)).stroke();
    label_doc.fontSize(8);
    label_doc.text('Gift', this.cm_to_point(1.0), this.cm_to_point(1.5), {
      align: 'left',
      height: this.cm_to_point(0.25),
      width: this.cm_to_point(3)
    });

    label_doc.rect(this.cm_to_point(0.5), this.cm_to_point(2.0), this.cm_to_point(0.4), this.cm_to_point(0.4)).stroke();
    label_doc.text('Printed Matter', this.cm_to_point(1.0), this.cm_to_point(2.1), {
      align: 'left',
      height: this.cm_to_point(0.25),
      width: this.cm_to_point(3)
    });

    label_doc.rect(this.cm_to_point(3.5), this.cm_to_point(1.4), this.cm_to_point(0.4), this.cm_to_point(0.4)).stroke();
    label_doc.text('Sample', this.cm_to_point(4.0), this.cm_to_point(1.5), {
      align: 'left',
      height: this.cm_to_point(0.25),
      width: this.cm_to_point(3.5)
    });

    label_doc.rect(this.cm_to_point(3.5), this.cm_to_point(2.0), this.cm_to_point(0.4), this.cm_to_point(0.4)).stroke();
    label_doc.text('Others(Tick as appropriate)', this.cm_to_point(4.0), this.cm_to_point(2.1), {
      align: 'left',
      height: this.cm_to_point(0.25),
      width: this.cm_to_point(3.5)
    });

   label_doc.moveTo(this.cm_to_point(0.2), this.cm_to_point(2.6)).lineTo(this.cm_to_point(7.62), this.cm_to_point(2.6)).stroke();

    //Product Information
    label_doc.moveTo(this.cm_to_point(5.0), this.cm_to_point(2.6)).lineTo(this.cm_to_point(5.0), this.cm_to_point(5.4)).stroke();

    label_doc.text('Detailed description of contents', this.cm_to_point(0.3), this.cm_to_point(2.7), {
      align: 'left',
      height: this.cm_to_point(0.25),
      width: this.cm_to_point(4.6)
    });

    label_doc.text('Value', this.cm_to_point(5.2), this.cm_to_point(2.7), {
      align: 'left',
      height: this.cm_to_point(0.25),
      width: this.cm_to_point(4.6)
    });

    var product_y = 3.1;
    var products = [
      {
        description: 'Perfume',
        hsn_code: 12345,
        value: 'EUR 100.65'
      },

      {
        description: 'iPhone',
        hsn_code: 87534,
        value: 'EUR 1498.00'
      },

      {
        description: 'Coffee Powder',
        hsn_code: 23879,
        value: 'EUR 234.70'
      }
    ];

    var origin_country = 'Netherlands';
    var total_weight = 1.65;

    var total_value = (100.65 + 1498.00 + 234.70).toFixed(2);
    for(let product of products) {
      label_doc.text(product.description + '-' + product.hsn_code, this.cm_to_point(0.3), this.cm_to_point(product_y), {
        align: 'left',
        height: this.cm_to_point(0.25),
        width: this.cm_to_point(4.6)
      });

      label_doc.text(product.value, this.cm_to_point(5.2), this.cm_to_point(product_y), {
        align: 'left',
        height: this.cm_to_point(0.25),
        width: this.cm_to_point(4.6)
      });

      product_y += 0.35;
    }
    label_doc.moveTo(this.cm_to_point(0.2), this.cm_to_point(4.7)).lineTo(this.cm_to_point(7.62), this.cm_to_point(4.7)).stroke();

    //Origin Country, Total Weight, Total Value block
    label_doc.moveTo(this.cm_to_point(5.0), this.cm_to_point(4.7)).lineTo(this.cm_to_point(5.0), this.cm_to_point(5.7)).stroke();
    label_doc.fontSize(8);
    label_doc.text('Origin country', this.cm_to_point(0.3), this.cm_to_point(4.8), {
      align: 'left',
      height: this.cm_to_point(0.25),
      width: this.cm_to_point(4.6)
    });

    label_doc.text('Total Weight in kg', this.cm_to_point(2.7), this.cm_to_point(4.8), {
      align: 'left',
      height: this.cm_to_point(0.25),
      width: this.cm_to_point(4.6)
    });

    label_doc.text('Total Value', this.cm_to_point(5.2), this.cm_to_point(4.8), {
      align: 'left',
      height: this.cm_to_point(0.25),
      width: this.cm_to_point(4.6)
    });

    label_doc.fontSize(10);
    label_doc.text(origin_country, this.cm_to_point(0.3), this.cm_to_point(5.2), {
      align: 'left',
      height: this.cm_to_point(0.25),
      width: this.cm_to_point(4.6)
    });

    label_doc.text(total_weight, this.cm_to_point(2.7), this.cm_to_point(5.2), {
      align: 'left',
      height: this.cm_to_point(0.25),
      width: this.cm_to_point(4.6)
    });

    label_doc.text(total_value, this.cm_to_point(5.2), this.cm_to_point(5.2), {
      align: 'left',
      height: this.cm_to_point(0.25),
      width: this.cm_to_point(4.6)
    });
    label_doc.moveTo(this.cm_to_point(0.2), this.cm_to_point(5.7)).lineTo(this.cm_to_point(7.62), this.cm_to_point(5.7)).stroke();

    //Declaration
    label_doc.fontSize(7);
    label_doc.text('I, hereby undersigned whose name and address are given on the ' +
      'item certify that the particulars given in the declaration are correct ' +
      'and that this item does not contain any dangerous articles or ' +
      'articles prohibited by legislation or postal or customs regulations.', this.cm_to_point(0.3), this.cm_to_point(5.8), {
      align: 'left',
      height: this.cm_to_point(1.4),
      width: this.cm_to_point(7.4),
      lineBreak: true
    });
    label_doc.moveTo(this.cm_to_point(0.2), this.cm_to_point(7.1)).lineTo(this.cm_to_point(7.62), this.cm_to_point(7.1)).stroke();

    //Date and Signature
    label_doc.fontSize(10);
    label_doc.text("Date and Sender's Signature", this.cm_to_point(0.3), this.cm_to_point(7.2), {
      align: 'left',
      height: this.cm_to_point(0.5),
      width: this.cm_to_point(7.4),
      lineBreak: true
    });

    label_doc.text('01-Sep-2017', this.cm_to_point(0.7), this.cm_to_point(7.7), {
      align: 'left',
      height: this.cm_to_point(1.4),
      width: this.cm_to_point(7.4),
      lineBreak: true
    });

    this.generate_right_side(label_doc);

    label_doc.end();
  }

  generate_right_side(label_doc) {
    label_doc.lineWidth(this.cm_to_point(0.05));

    //Top rectangle content
    label_doc.rect(this.cm_to_point(8.9), this.cm_to_point(0.2), this.cm_to_point(5.9), this.cm_to_point(2.4)).stroke();

    //left side
    label_doc.fontSize(7);
    label_doc.text('In case of non-delivery please return to:', this.cm_to_point(9.0), this.cm_to_point(0.4), {
      align: 'left',
      height: this.cm_to_point(0.8),
      width: this.cm_to_point(2.7),
      lineBreak: true
    });

    var return_address = 'MJ Fulfillment Wagenmakerstraat 9 2984 BD Ridderkerk The Netherlands';
    label_doc.text(return_address, this.cm_to_point(9.0), this.cm_to_point(1.0), {
      align: 'left',
      height: this.cm_to_point(1.5),
      width: this.cm_to_point(2.7),
      lineBreak: true
    });

    //middle line
    label_doc.moveTo(this.cm_to_point(11.8), this.cm_to_point(0.2)).lineTo(this.cm_to_point(11.8), this.cm_to_point(2.6)).stroke();

    //right side
    label_doc.moveTo(this.cm_to_point(11.8), this.cm_to_point(0.8)).lineTo(this.cm_to_point(14.8), this.cm_to_point(0.8)).stroke();
    label_doc.moveTo(this.cm_to_point(11.8), this.cm_to_point(1.4)).lineTo(this.cm_to_point(14.8), this.cm_to_point(1.4)).stroke();

    label_doc.fontSize(10);
    label_doc.font('Helvetica-Bold').text('PRIORITAIRE', this.cm_to_point(11.9), this.cm_to_point(0.3), {
      align: 'left',
      height: this.cm_to_point(0.6),
      width: this.cm_to_point(2.8),
    });

    label_doc.font('Helvetica-Bold').text('Deutsche Post', this.cm_to_point(11.9), this.cm_to_point(0.9), {
      align: 'left',
      height: this.cm_to_point(0.6),
      width: this.cm_to_point(2.8),
    });

    label_doc.fontSize(9);
    label_doc.font('Helvetica').text('Port payé 60544 Franfurt Allemagne', this.cm_to_point(11.9), this.cm_to_point(1.5), {
      align: 'left',
      height: this.cm_to_point(1.2),
      width: this.cm_to_point(2.8),
      lineBreak: true
    });

//    doc.font('fonts/GoodDog.ttf')


    label_doc.fontSize(8);
    label_doc.font('fonts/arial.ttf').text('CustRef: MJ123789', this.cm_to_point(8.42), this.cm_to_point(2.7), {
      align: 'left',
      lineBreak: true
    });

    //R
    label_doc.fontSize(30);
    label_doc.font('fonts/arial.ttf').text('R', this.cm_to_point(8.10), this.cm_to_point(4.8), {
      align: 'left',
      //lineBreak: true
    });

   //Bar Code
   bwipjs.toBuffer({
           bcid:        'code128',       // Barcode type  -- identcode  11 / 12  ||  leitcode  13 / 14
           text:        'RR 37 619 487 0DE',    // Text to encode
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



    label_doc.image('/home/dell/Desktop/toPiyush/out5.png',this.cm_to_point(9.3), this.cm_to_point(4.9),{
      width: this.cm_to_point(4.6),
      height: 24,
      align: 'left',
      valign: 'down'
    });

    // Recommande
    label_doc.fontSize(6.7);
    label_doc.font('fonts/arial.ttf').text('Recommande', this.cm_to_point(8.15), this.cm_to_point(6.0), {
      align: 'left',
    //  lineBreak: true
    });

    // XXXXXXX
    var address = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl. Suspendisse rhoncus nisl posuere tortor tempus et dapibus elit porta';
    var country = 'India';
    var space = ' ';
    var comma = ',';
    var city = 'Bangalore';
    label_doc.fontSize(7);
    label_doc.text(address + comma + space + city.toUpperCase() + comma + space + country.toUpperCase(), this.cm_to_point(8.10), this.cm_to_point(6.3), {
      align: 'justify',
      height: this.cm_to_point(2.4),
      width: this.cm_to_point(6.6),
      lineGap :this.cm_to_point(0.05),
      underline : true,
      lineBreak: true
    });

  }

  cm_to_point(cm) {
    return cm * 28.3465;
  }
}

var dp = new DeutschePost();
dp.generate_label_pdf();
