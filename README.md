Get live data from **Indira Gandhi International Airport, Delhi, India.** Information is being scraped from [their official website](https://www.newdelhiairport.in/live-flight-information.aspx)

# Request Object

To retrieve flight information you must specify an object with the following properties (and values) :

1. `type` : "A" (_arrival_) or "D"(_departure_).
2. `way`: "I" (_international_) or "D" (_domestic_)
3. `num` : Flight Number (_space allowed_)
4. `place` : Place of arrival or departure (_spaces allowed_)

It's simple to use; the more properties you specify, the finer the data gets.

# Response Object

The request **returns a Promise**. The data is a JS object with the following format:

```
{
  "request": {
    "flight_number": "value of num in the request object sent",
    "flight_place": "value of place in the request object sent",
    "flight_type": "value of type in the request object sent",
    "flight_way": "value of way in the request object sent",
    "timestamp": "Timestanp of the moment when request was sent to the the airport",
    "url": "URL of the request sent to the the airport"
  },
  "response": [
    {
      "estimated_date": "Proposed date of arrival or departure",
      "estimated_time": "Proposed date of arrival or departure",
      "flight_no": "Flight Number 1",
      "place": "Source or Destination",
      "scheduled_date": "Scheduled date of arrival or departure",
      "scheduled_time": "Scheduled date of arrival or departure",
      "status": "Status of flight : On-time, Delayed",
      "terminal": "Terminal code",
      "via": "Stoppage airports"
    },
    {
      "estimated_date": "Proposed date of arrival or departure",
      "estimated_time": "Proposed date of arrival or departure",
      "flight_no": "Flight Number 2",
      "place": "Source or Destination",
      "scheduled_date": "Scheduled date of arrival or departure",
      "scheduled_time": "Scheduled date of arrival or departure",
      "status": "Status of flight : On-time, Delayed",
      "terminal": "Terminal code",
      "via": "Stoppage airports"
    },
    ...
  ]
}
```

# Examples

`const delhiAirportLive = require("delhi-flight-live")`;

#### 1\. Fetching all arrivals

```
delhiAirportLive({ type: "A" })
  .then(function(data) {
    console.log(data);
  })
  .catch(function(err) {
    console.error(err);
  });
```

#### 2\. Fetching all domestic departures

```
delhiAirportLive({ type: "D", way: "D" })
  .then(function(data) {
    console.log(data);
  })
  .catch(function(err) {
    console.error(err);
  });
```

#### 3\. Fetching all arrivals from and departures to Bangkok

```
Promise.all([
  delhiAirportLive({ type: "A", place: "Bangkok" }),
  delhiAirportLive({ type: "D", place: "Bangkok" })
])
  .then(function(data) {
    let arrivals = data[0];
    let departures = data[1];
  })
  .catch(function(err) {
    console.error(err);
  });
```

#### 4\. Fetching info about a particular flight

```
delhiAirportLive({ num: "D7 182" })
  .then(function(data) {
    console.log(data);
  })
  .catch(function(err) {
    console.error(err);
  });
```
