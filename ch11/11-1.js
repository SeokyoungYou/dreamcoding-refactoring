// 예제 1
function totalOutstandingl() {
  return customer.invoices.reduce((total, each) => each.amount + total, 0);
}

function sendBill() {}

// 예제 2
export function alertForMiscreant(people, alarm) {
  const miscrean = findMiscreant(people);
  setOffAlarms(alarm, miscrean);
}

function findMiscreant() {
  for (const p of people) {
    if (p === "Don") {
      return "Don";
    }
    if (p === "John") {
      return "John";
    }
  }
  return "";
}

function setOffAlarms(alarm, p) {
  alarm.setOff("Found Miscreant " + p);
}
