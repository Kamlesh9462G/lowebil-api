const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    //ref: "User",
    //equired: true,
  },
  productImage: [
    {
      type: String,
      //required: true,
      //validate: [arrayLimit, "{PATH} exceeds the limit of 10"],
    },
  ],
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    //required: true,
  },
  price: {
    type: String,
    //required: true,
  },
  hashTags: {
    type: String,
    //required: true,
  },
  category: {
    type: String,
    //required: true,
  },
  brand: {
    type: String,
    //required: true,
  },
  condition: {
    type: String,
    //required: true,
  },
  color: {
    type: String,
    //required: true,
  },
  shipsFrom: {
    type: String,
    //required: true,
  },
  time: {
    type: String,
    default: new Date().toLocaleDateString(),
  },
  // statusSold: {
  //   type: Boolean,
  //   default: false,
  // },
  // highestBidPrice: {
  //   type: String,
  //   required: true,
  // },
  // buyer: {
  //   type: String,
  //   default: null,
  // },
  // bids: [
  //   {
  //     bidderID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  //     bidderName: String,
  //     biddingPrice: String,
  //   },
  // ],
});
function arrayLimit(val) {
  return val.length <= 10;
}
module.exports = mongoose.model("Product", productSchema);
