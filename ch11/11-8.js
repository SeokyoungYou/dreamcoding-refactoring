export class Employee {
  constructor(name, typeCode) {
    // 보통은
    this._name = name;
    this._typeCode = typeCode;
  }
  get name() {
    return this._name;
  }

  get type() {
    return Employee.legalTypeCodes[this._typeCode];
  }

  static get legalTypeCodes() {
    return { E: "Engineer", M: "Manager", S: "Salesman" };
  }

  static createEngineer(name) {
    return new Employee(name, "E");
  }
  static createSeniorEngineer(name) {
    return new Employee(name, "SE");
  }
}

const empoly1 = new Employee("엘리", "E"); // 이게 아니라
const empoly2 = Employee.createEngineer("엘리"); // 팩토리함수를 이용해서 간편하게 인스턴스를 만들 수 있음
