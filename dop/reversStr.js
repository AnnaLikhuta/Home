var str=prompt('Введите слово');

function reversStr(str){
  return  str.split('').reverse().join('');

}

var abc= reversStr(str);
console.log(abc)