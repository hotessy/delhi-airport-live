const Helper = require("./Helper");
const Promise = require("bluebird");
const _ = require("lodash");

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

module.exports = function(options) {
  // check type and way for allowed values

  let allowedTypes = ["A", "D"];
  let allowedWays = ["I", "D"];

  let type =
    options.hasOwnProperty("type") && _.includes(allowedTypes, options.type)
      ? [options.type]
      : allowedTypes;
  let way =
    options.hasOwnProperty("way") && _.includes(allowedWays, options.way)
      ? [options.way]
      : allowedWays;
  let num = options.hasOwnProperty("num") ? options.num : "";
  let place = options.hasOwnProperty("place") ? options.place : "";

  options = [];
  for (let t of type) {
    for (let w of way) {
      options.push(new Options(t, w, num, place).requestObject);
    }
  }

  return Promise.map(options, function(option) {
    return Helper.getFlightData(option);
  });
};
