const request = require('request');

var geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);

  request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
  json: true
  }, (error, response, body) =>{
  if(error) {
    callback('Unable to Connect ot Google Servers');
  } else if (body.status === 'ZERO_RESULTS') {
    callback('Unable to find the address provided');
  } else if (body.status === 'OK') {
  //console.log(JSON.stringify(body, undefined, 2));
  callback(undefined, {
    address: body.results[0].formatted_address,
    latitude: body.results[0].geometry.location.lat,
    longitude: body.results[0].geometry.location.lng
  });
  //console.log(`Address: ${body.results[0].formatted_address}`);
  //console.log(`Latitude: ${body.results[0].geometry.location.lat}\nLongitude: ${body.results[0].geometry.location.lng}`);
  }
  });
};

module.exports.geocodeAddress = geocodeAddress;
