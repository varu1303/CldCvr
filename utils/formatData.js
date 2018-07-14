module.exports = data => {
  let lineDetail = data.split('\r\n');
  // export_object
  let formatedData = {};
  formatedData.latitude = lineDetail[0].split(' ').map(v => parseInt(v));
  formatedData.longitude = lineDetail[1].split(' ').map(v => parseInt(v));
  formatedData.source = parseInt(lineDetail[3]);
  formatedData.destination = parseInt(lineDetail[4]);
  let x = lineDetail[2].split('"');
  formatedData.safePaths = x.filter(val => {
  if (val == ' ' || val == '') 
    return false;
  else 
    return true;
  }).map(val => {
    return val.split(' ').map(v => parseInt(v));;
  });

  return formatedData;
}