import { strict as assert } from "node:assert";
class Customer {
  constructor() {
    this.discountRate = 0;
  }
  applyDiscount(number) {
    assert(number >= 0); // 실수하면 안되는 조건 붙여주기
    return this.discountRate ? number - this.discountRate * number : number;
  }
}

new Customer().applyDiscount(1); // 유효한 값은 잘 동작
new Customer().applyDiscount(-1); // 앱 crash됨!
