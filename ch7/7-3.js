// 방법 1
export class Order {
  constructor(data) {
    this.priority = data.priority;
  }
  isHighPriority() {
    return this.priority.higerThan("normal");
  }
}

class Priority {
  #value;
  constructor(value) {
    if (Priority.legalValues().includes(value)) {
      this.#value = value;
    } else {
      throw new Error(`${value} is invalid for Priority`);
    }
  }

  get index() {
    return Priority.legalValues().indexOf(this.#value);
  }

  equals(other) {
    return this.#index === other.index;
  }

  higerThan(other) {
    return this.#index > other.index;
  }

  static legalValues() {
    return ["low", "normal", "high", "rush"];
  }
}

const orders = [
  new Order({ priority: "normal" }),
  new Order({ priority: "high" }),
  new Order({ priority: "rush" }),
];

const highPriorityCount = orders.filter(
  (o) => "high" === o.isHighPriority()
).length;

// 방법 2
class Priority {
  //private fields
  #name;
  #index;
  //static fields
  static LOW = new Priority("low", 0);
  static NORMAL = new Priority("normal", 1);
  static HIGH = new Priority("high", 2);
  static RUSH = new Priority("rush", 3);
  constructor(name, index) {
    this.#name = name;
    this.#index = index;
  }

  get name() {
    return this.#name;
  }
  get index() {
    return this.#index;
  }

  toString() {
    return this.name;
  }
  equals(other) {
    return this.index === other.index;
  }
  higherThan(other) {
    return this.index > other.index;
  }
  lowerThan(other) {
    return this.index < other.index;
  }
}

class Order {
  priority;
  constructor(priority) {
    this.priority = priority;
  }
  get priority() {
    return this.priority;
  }
}

const orders = [
  new Order(Priority.NORMAL),
  new Order(Priority.HIGH),
  new Order(Priority.RUSH),
];
const highPriorityCount = orders.filter((o) =>
  o.priority.higherThan(Priority.NORMAL)
).length;
console.log(highPriorityCount);
