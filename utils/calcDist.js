module.exports = ({lat :lat1, lon :lon1}, {lat: lat2, lon: lon2})  => {
  const radius = 4000;
  // console.log(`lat1, lon1 - ${lat1},${lon1} | lat2, lon2 - ${lat2},${lon2}`);

  return (radius * (Math.acos(  
    Math.sin(lat1*0.01745329252) * 
    Math.sin(lat2*0.01745329252) +
    Math.cos(lat1*0.01745329252) * 
    Math.cos(lat2*0.01745329252) *
    Math.cos(lon2*0.01745329252 - lon1*0.01745329252)
  )));
}
