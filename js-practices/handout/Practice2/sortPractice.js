'use strict'

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

module.exports = sort
