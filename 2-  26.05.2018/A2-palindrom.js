
    var str=prompt('Ввести фразу для проверки');
    var smallStr=str.toLowerCase(); // к нижнему регистру

    function editeWord (smallStr) {  //функция получает строку и выводит boolean
         var newStr='';
         for(var i=0; i<=smallStr.length-1; i++){
            if( (smallStr.charCodeAt(i)>=1072 && smallStr.charCodeAt(i)<=1103) ||   smallStr.charCodeAt(i)==1105 ) {  //проверка только на русские буквы
                 if (smallStr.charCodeAt(i)==1098 || smallStr.charCodeAt(i)==1100 ) { // отбрасываем ъ и ь
                     continue;
                 }
             newStr+=smallStr[i]; // получаем строку только с руссими  буквами
                        }
              }
     if (newStr==''){
         newStr='не полиндром' // если возвращается пустая строка после проверки, 
     }                          // записываем  свой текст

     var count=0;
     for(i=0; i<=newStr.length-1; i++){
         if ( (newStr[i]==newStr[newStr.length-1-i] )  || 
          (newStr[i]=='е' &&  newStr[newStr.length-1-i]=='ё' ) ||
          (newStr[i]=='ё' &&  newStr[newStr.length-1-i]=='е' )  ){
              continue;
         }
         else {
             return false; }
     }
     return true; }

  function printAnswer(count){
    if (count){
        console.log('You have palindrom');
    }
    else {
        console.log('Sorry, you haven\'t palindrom')
    }
  }

    var count= editeWord(smallStr);
   printAnswer(count);

