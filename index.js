let express = require('express');
let cors = require('cors');

let app = express();
app.use(cors());

let port = 3000;
// Server-side values
let taxRate = 5; // 5%
let discountPercentage = 10; // 10%
let loyaltyRate = 2; // 2 points per $1

//Endpoint 1: Calculate the total price of items in the cart
function totalCartPrice(newItemPrice, cartTotal) {
  return newItemPrice + cartTotal;
}

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(totalCartPrice(newItemPrice, cartTotal).toString());
});

//Endpoint 2 : Apply a discount based on membership status

function calculateMembershipDiscount(cartTotal, isMember) {
  if (isMember) {
    return cartTotal - (cartTotal * discountPercentage) / 100;
  } else {
    return cartTotal;
  }
}

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';

  res.send(calculateMembershipDiscount(cartTotal, isMember).toString());
});

//Endpoint 3 : Calculate tax on the cart total

function taxApplied(cartTotal) {
  return (cartTotal * taxRate) / 100;
}

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(taxApplied(cartTotal).toString());
});

//Endpoint 4 : Estimate delivery time based on shipping method

function calculateDeliveryTime(shippingMethod, distance) {
  if (shippingMethod === 'standard') {
    return distance / 50;
  } else if (shippingMethod === 'express') {
    return distance / 100;
  } else {
    return 'Wrong shipping method.Try Again!';
  }
}

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);

  res.send(calculateDeliveryTime(shippingMethod, distance).toString());
});

//Endpoint 5 : Calculate the shipping cost based on weight and distance

function shippingCost(weight, distance) {
  return weight * distance * 0.1;
}

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);

  res.send(shippingCost(weight, distance).toString());
});

//Endpoint 6 : Calculate loyalty points earned from a purchase

function calculateLoyaltyPoints(purchaseAmount) {
  return purchaseAmount * loyaltyRate;
}

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send(calculateLoyaltyPoints(purchaseAmount).toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
