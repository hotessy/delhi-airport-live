const Helper = require("./Helper");

class Options {
  constructor(type, way, num, place) {
    this.method = "GET";
    this.uri = "https://www.newdelhiairport.in/getFidsAllflightSch.aspx";
    this.FltType = type;
    this.FltWay = way;
    this.FltNum = num;
    this.FltFrom = place;
  }

  get requestObject() {
    return this.createRequestObject();
  }

  createRequestObject() {
    return {
      method: this.method,
      uri: this.uri,
      qs: {
        FltType: this.FltType, // A or D
        FltWay: this.FltWay, // I or D
        FltNum: this.FltNum, // flight number
        FltFrom: this.FltFrom, // source or destination
        rn: Math.random().toString()
      }
    };
  }
}

module.exports = function(type, way, num, place) {
  return Helper.getFlightData(new Options(type, way, num, place).requestObject);
};
