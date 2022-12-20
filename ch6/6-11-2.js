import fs from "fs";

checkFileName();
const fileName = `./${process.argv[2]}.json`;
checkFileExist(fileName);
const orders = getOrders(fileName);
printOrider(orders);

function checkFileName() {
  if (!process.argv[2]) {
    throw new Error("파일 이름을 입력하세요");
  }
}

function checkFileExist(fileName) {
  if (!fs.existsSync(fileName)) {
    throw new Error("파일이 존재하지 않습니다");
  }
}

function getOrders(fileName) {
  const rawData = fs.readFileSync(fileName);
  return JSON.parse(rawData);
}

function printOrider(orders) {
  if (process.argv.includes("-r")) {
    console.log(orders.filter((order) => order.status === "ready").length);
  } else {
    console.log(orders.length);
  }
}
