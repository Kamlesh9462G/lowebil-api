const httpStatus = require("http-status");
const productServices = require("../services/product.services");
module.exports.createProducts = async (req, res, next) => {
  try {
    const product = await productServices.createProducts(
      req.user.id,
      req.file,
      req.body
    );
    console.log(product)
    return res.status(httpStatus.CREATED).json({
      message: "Success",
      statusCode: httpStatus.CREATED,
    });
  } catch (error) {
    console.log(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: error.message,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }
};