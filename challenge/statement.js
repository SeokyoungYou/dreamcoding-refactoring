export function statement(invoice, plays) {
  const statement = new Statement();

  statement.result = invoice.printCustomer();

  for (let perf of invoice.performances) {
    const play = plays.findPlayByPlayID(perf.playID);
    const thisAmount = perf.calculateAmount(play);
    statement.volumeCredits = perf.calculateVolumeCredits(play);
    statement.result = invoice.printPlay(play.name, thisAmount, perf.audience);
    statement.totalAmount = thisAmount;
  }
  statement.result = invoice.printTotalAmount(statement.totalAmount);
  statement.result = invoice.printVolumeCredits(statement.volumeCredits);
  return statement.result;
}
class Statement {
  #totalAmount;
  #volumeCredits;
  #result;
  constructor() {
    this.#totalAmount = 0;
    this.#volumeCredits = 0;
    this.#result = "";
  }
  get result() {
    return this.#result;
  }
  set result(value) {
    this.#result += value;
  }
  get totalAmount() {
    return this.#totalAmount;
  }
  set totalAmount(value) {
    this.#totalAmount += value;
  }
  get volumeCredits() {
    return this.#volumeCredits;
  }
  set volumeCredits(value) {
    this.#volumeCredits += value;
  }
}

// 사용예:

const playsJSON = {
  hamlet: { name: "Hamlet", type: "tragedy" },
  "as-like": { name: "As You Like It", type: "comedy" },
  othello: { name: "Othello", type: "tragedy" },
};

export class PlayRepository {
  #plays;

  constructor(plays) {
    this.#plays = plays;
  }
  findPlayByPlayID(playID) {
    return new Play(this.#plays[playID]);
  }
}

export class Play {
  #name;
  #type;
  constructor({ name, type }) {
    this.#name = name;
    this.#type = PlayType.createPlayType(type);
  }
  get name() {
    return this.#name;
  }
  get type() {
    return this.#type.type;
  }

  amount(audience) {
    return this.#type.amount(audience);
  }
  volumeCredits(audience) {
    return this.#type.volumeCredits(audience);
  }
}

export class PlayType {
  #type;
  constructor(type) {
    this.#type = type;
  }
  get type() {
    return this.#type;
  }
  static createPlayType(type) {
    switch (type) {
      case "tragedy":
        return new Tragedy(type);
      case "comedy":
        return new Comedy(type);
      default:
        return new PlayType(type);
    }
  }

  amount(audience) {
    throw new Error(`알 수 없는 장르: ${this.#type}`);
  }
  volumeCredits(audience) {
    return Math.max(audience - 30, 0);
  }
}
export class Tragedy extends PlayType {
  amount(audience) {
    const basicAmount = 40000;
    return audience > 30 ? basicAmount + 1000 * (audience - 30) : basicAmount;
  }
}
export class Comedy extends PlayType {
  amount(audience) {
    const basicAmount = 30000 + 300 * audience;
    return audience > 20
      ? basicAmount + 10000 + 500 * (audience - 20)
      : basicAmount;
  }
  volumeCredits(audience) {
    return Math.max(audience - 30, 0) + Math.floor(audience / 5);
  }
}

const format = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
}).format;
export class Invoice {
  #customer;
  #performances;
  constructor({ customer, performances }) {
    this.#customer = customer;
    this.#performances = performances.map((per) => new Performance(per));
  }
  get customer() {
    return this.#customer;
  }
  get performances() {
    return this.#performances;
  }
  printCustomer() {
    return `청구 내역 (고객명: ${this.#customer})\n`;
  }

  printPlay(playName, amount, audience) {
    return `  ${playName}: ${format(amount / 100)} (${audience}석)\n`;
  }

  printTotalAmount(totalAmount) {
    return `총액: ${format(totalAmount / 100)}\n`;
  }
  printVolumeCredits(volumeCredits) {
    return `적립 포인트: ${volumeCredits}점\n`;
  }
}
export class Performance {
  #playID;
  #audience;
  constructor({ playID, audience }) {
    this.#playID = playID;
    this.#audience = audience;
  }
  get playID() {
    return this.#playID;
  }
  get audience() {
    return this.#audience;
  }

  calculateAmount(play) {
    return play.amount(this.#audience);
  }
  calculateVolumeCredits(play) {
    return play.volumeCredits(this.#audience);
  }
}

const invoicesJSON = [
  {
    customer: "BigCo",
    performances: [
      {
        playID: "hamlet",
        audience: 55,
      },
      {
        playID: "as-like",
        audience: 35,
      },
      {
        playID: "othello",
        audience: 40,
      },
    ],
  },
];

const invoice = new Invoice(invoicesJSON[0]);
const plays = new PlayRepository(playsJSON);
const result = statement(invoice, plays);

const expected =
  "청구 내역 (고객명: BigCo)\n" +
  "  Hamlet: $650.00 (55석)\n" +
  "  As You Like It: $580.00 (35석)\n" +
  "  Othello: $500.00 (40석)\n" +
  "총액: $1,730.00\n" +
  "적립 포인트: 47점\n";
console.log(result);
console.log(result === expected);
