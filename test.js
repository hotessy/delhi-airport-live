const delhiAirportLive = require("./index");

delhiAirportLive((type = "A"), (way = "I"), "", "")
  .then(function(data) {
    console.log(data);
  })
  .catch(function(err) {
    console.error(err);
  });
