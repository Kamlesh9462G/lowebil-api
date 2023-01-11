const Product = require("../models/product.model");
module.exports.createProducts = async (userId, fileData, bodyData) => {
  return await new Product({
    userId:userId,
    productImage:fileData.location?fileData.location:null,
    title: bodyData.title,
    description:bodyData.description,
    price:bodyData.price,
    hashTags:bodyData.hashTags,
    category:bodyData.category,
    brand:bodyData.brand,
    condition:bodyData.condition,
    color:bodyData.color,
    shipsFrom:bodyData.shipsFrom,
  }).save();
};
