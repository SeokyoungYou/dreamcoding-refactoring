export function priceOrder(product, quantity, shippingMethod) {
  // const basePrice = product.basePrice * quantity;

  // const discount =
  //   Math.max(quantity - product.discountThreshold, 0) *
  //   product.basePrice *
  //   product.discountRate;

  const totalBasePrice = product.getTotalBasePrice(quantity);
  const discount = product.getTotalDiscount(quantity);

  // const shippingPerCase = getShippingPerCase(totalBasePrice);
  // totalBasePrice > shippingMethod.discountThreshold
  //   ? shippingMethod.discountedFee
  //   : shippingMethod.feePerCase;
  const shippingCost = shippingMethod.getShippingCost(quantity, totalBasePrice);
  const price = totalBasePrice - discount + shippingCost;
  return price;
}

class Product {
  #basePrice;
  #discountRate;
  #discountThreshold;
  constructor(data) {
    this.#basePrice = data.basePrice;
    this.#discountRate = data.discountRate;
    this.#discountThreshold = data.discountThreshold;
  }
  get basePrice() {
    return this.#basePrice;
  }
  get discountRate() {
    return this.#discountRate;
  }
  get discountThreshold() {
    return this.#discountThreshold;
  }

  getTotalBasePrice(quantity) {
    return this.#basePrice * quantity;
  }

  getTotalDiscount(quantity) {
    return (
      Math.max(quantity - this.#discountThreshold, 0) *
      this.#basePrice *
      this.#discountRate
    );
  }
}
class ShippingMethod {
  #discountThreshold;
  #feePerCase;
  #discountedFee;
  constructor(data) {
    this.#discountThreshold = data.discountThreshold;
    this.#feePerCase = data.feePerCase;
    this.#discountedFee = data.discountedFee;
  }
  get discountThreshold() {
    return this.#discountThreshold;
  }
  get feePerCase() {
    return this.#feePerCase;
  }
  get discountedFee() {
    return this.#discountedFee;
  }

  getShippingPerCase(totalBasePrice) {
    return totalBasePrice > this.#discountThreshold
      ? this.#discountedFee
      : this.#feePerCase;
  }

  getShippingCost(quantity, totalBasePrice) {
    const shippingPerCase = this.getShippingPerCase(totalBasePrice);
    return quantity * shippingPerCase;
  }
}

// 사용 예:
const product = new Product({
  basePrice: 10,
  discountRate: 0.1,
  discountThreshold: 10,
});

const shippingMethod = new ShippingMethod({
  discountThreshold: 20,
  feePerCase: 5,
  discountedFee: 3,
});

const price = priceOrder(product, 5, shippingMethod);
console.log(price);
