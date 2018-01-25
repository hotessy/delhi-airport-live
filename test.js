const delhiAirportLive = require("./index");

// delhiAirportLive({ place: "Dubai" })
//   .then(function(data) {
//     console.log(JSON.stringify(data));
//   })
//   .catch(function(err) {
//     console.error(err);
//   });
//
// delhiAirportLive({ type: "A" })
//   .then(function(data) {
//     console.log(data);
//   })
//   .catch(function(err) {
//     console.error(err);
//   });

delhiAirportLive({ type: "F", way: "D" })
  .then(function(data) {
    console.log(JSON.stringify(data));
  })
  .catch(function(err) {
    console.error(err);
  });

// Promise.all([
//   delhiAirportLive({ type: "A", place: "Bangkok" }),
//   delhiAirportLive({ type: "D", place: "Bangkok" })
// ])
//   .then(function(data) {
//     let arrivals = data[0];
//     let departures = data[1];
//   })
//   .catch(function(err) {
//     console.error(err);
//   });
//
// delhiAirportLive({ num: "D7 182" })
//   .then(function(data) {
//     console.log(data);
//   })
//   .catch(function(err) {
//     console.error(err);
//   });
