import { acquireReading, enrichReading } from "./6-10.js";

const rawReading = acquireReading(); // original data
const reading = enrichReading(rawReading); // 추가적인 데이터가 필요하다면

console.log(reading.baseCharge);
