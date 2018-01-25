const requestPromise = require("request-promise");
const tabletojson = require("tabletojson");
const querystring = require("querystring");

exports.getFlightData = function(options) {
  return new Promise(function(resolve, reject) {
    var datetime = new Date(Date.now()); // to include in the request object

    requestPromise(options) // HTTP GET request via a promise
      .then(function(content) {
        // console.log(
        //   options["uri"] + "?" + querystring.stringify(options["qs"])
        // );
        var data = tabletojson.convert(content)[0];
        create_response_object(data, options, datetime, function(
          err,
          response_object
        ) {
          if (err) reject(err);
          else resolve(response_object);
        });
      })
      .catch(function(err) {
        if (err) reject(err);
        else {
          create_response_object([], options, datetime, function(
            err,
            response_object
          ) {
            if (err) reject(err);
            else resolve(response_object);
          });
        }
      });
  });
};

function create_response_object(data, options, datetime, callback) {
  var request = {
    timestamp: datetime,
    url: options["uri"] + "?" + querystring.stringify(options["qs"]),
    flight_type: options.qs.FltType,
    flight_way: options.qs.FltWay,
    flight_number: options.qs.FltNum,
    flight_place: options.qs.FltFrom
  };

  var response = [];
  if (!data || !data.length) {
    var response_object = { request: request, response: response };
    callback(null, response_object);
  }

  for (let i = 0; i < data.length; i++) {
    let obj = {};

    obj["flight_num"] = data[i]["FLIGHT NO"];
    obj["via"] = data[i]["VIA"] || " ";
    obj["terminal"] = data[i]["TERMINAL"] || " ";
    obj["status"] = data[i]["STATUS"] || " ";

    if ("DESTINATION" in data[i]) {
      obj["place"] = data[i]["DESTINATION"];
      obj["scheduled_time"] = data[i]["STD"].slice(0, 5);
      obj["scheduled_date"] = data[i]["STD"].slice(5, this.length);
      obj["estimated_time"] = data[i]["ETD"].slice(0, 5);
      obj["estimated_date"] = data[i]["ETD"].slice(5, this.length);
    } else if ("ORIGIN" in data[i]) {
      obj["place"] = data[i]["ORIGIN"];
      obj["scheduled_time"] = data[i]["STA"].slice(0, 5);
      obj["scheduled_date"] = data[i]["STA"].slice(5, this.length);
      obj["estimated_time"] = data[i]["ETA"].slice(0, 5);
      obj["estimated_date"] = data[i]["ETA"].slice(5, this.length);
    }

    response.push(obj);
  }

  var response_object = { request: request, response: response };
  callback(null, response_object);
}
