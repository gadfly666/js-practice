'use strict'

function generate(testLengthArray){
  var results = new Array();
  var target = 0;
  var output = -1;
  for(var i = 0; i< testLengthArray.length; i++){
    var length = testLengthArray[i];
    var input = generateInputArray(length);
    if(i == 0){
      target = 10000;
    }else if (i == 1){
      target = input[0];
    }else if(i == 3){
      target = input[input.length-1];
    }else{
      target = getRandomNumnber();
    }
    output = search(input, target);
    results.push({
      "input": input,
      "target":target,
      "output":output
    });
  }

  return results;

  // return Array.from({length : testLengthArray.length})
  //   .map(item => ({
  //     input: Array.from({length: item}).map(item => []),
  //     target: 0,
  //     output: -1
  //   })
  // ); // Remove this line and change to your own algorithm
}

function generateInputArray(length){
  var input = new Array(length);
  var i =0;
  var randNumber = 0;
  while(i<length){
    randNumber = getRandomNumnber();
    if(search(input, randNumber) == -1){
      input[i] = randNumber;
      i++;
    }
  }
  return sort(input);
}

function sort(input) {
  for(var i=0; i < input.length; i++){
    for(var j=0; j < input.length -i -1; j++){
      if(input[j] > input[j + 1]){
        var temp = input[j];
        input[j] = input[j + 1];
        input[j + 1] = temp;
      }
    }
  }
  return input;
}

function search(input, target){
  for(var i=0; i < input.length; i++){
    if(input[i] === target){
      return i;
    }
  }
  return -1;
}

function getRandomNumnber(){
  return Math.floor((Math.random() * 9999*2) - 9999); 
}

module.exports = generate
