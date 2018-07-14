const fs = require('fs');
const calculateDistance = require('./utils/calcDist');

let data;

try {
  data = fs.readFileSync('input.txt', 'utf8');
} catch(e) {
  console.log('ERROR', e);
}

// Format data to work with
let {latitude, longitude, source, destination, safePaths} = require('./utils/formatData')(data);


if (source === destination) {
  console.log(0);
}else if(safePaths[source].indexOf(destination) > -1) {
  // Direct Route Present
  console.log(calculateDistance({lat: latitude[source], lon: longitude[source]}, 
                    {lat: latitude[destination], lon: longitude[destination]}));
}else {
  // Calculating based on available routes
  const state = [{}];
  const processed = [];
  for(let i = 0; i < latitude.length; i++) {
    let distance = Infinity;
    if (i === source) {
      distance = 0;
    }
    state[i] = { distance, parent: null}
  }

  while(state[destination].distance === Infinity && processed.length !== longitude.length) {
    let minIndex;
    let min = Infinity;
    state.forEach((val, i) => {
      if (min >= val.distance && processed.indexOf(i) < 0) {
        minIndex = i;
        min = val.distance;
      }
    })

    processed.push(minIndex);
    safePaths[minIndex].forEach(val => {
      let dist = calculateDistance({lat: latitude[minIndex], lon: longitude[minIndex]}, 
                        {lat: latitude[val], lon: longitude[val]});

      if (state[val].distance != Infinity) {
        if (state[val].distance + dist < state[val].distance) {
            state[val].distance += dist;
            state[val].parent = minIndex;
        }
      }else {
        state[val].distance = dist;
        state[val].parent = minIndex;
      }
    })
  }
  // console.log(state);
  if (state[destination].distance === Infinity) {
    // console.log(`Given the available routes there is no way we can get from Airport-${source} to Airport-${destination}`);
    console.log(-1);
  }else {
    let prev = destination;
    let totalDistance = 0;
    let connected = true;
    while (connected) {
      if (prev === source)
        connected = false;
      totalDistance += state[prev].distance;
      prev = state[prev].parent;
    }
    console.log(totalDistance);
  }
}

