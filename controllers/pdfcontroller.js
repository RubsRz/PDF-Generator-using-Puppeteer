const ExampleModel = require('../models/pdfmodel');

exports.index = (req, res) => {
  res.render("main")
};

exports.generatepdf = async(req, res, next) => {
  // console.log("req controller", req)
  const pdfname = await ExampleModel.generatepdf(req);
  res.send(pdfname);
}

