
    var str=prompt('Ввести фразу для проверки');
    

    function palindrom (str) {  //функция получает строку и выводит boolean
        var smallStr=str.toLowerCase();  // к нижнему регистру
        var newStr='';
         for(var i=0; i<=smallStr.length-1; i++){
            if( (smallStr.charAt(i)>='а' && smallStr.charAt(i)<='я') ||   smallStr.charAt(i)=='ё' ) {  //проверка только на русские буквы
                 if (smallStr.charCodeAt(i)==1098 || smallStr.charCodeAt(i)==1100 ) { // отбрасываем ъ и ь
                     continue;
                 }
                 if(smallStr.charAt(i)=='ё'){ // заменяем ё на е
                    smallStr.charAt(i)='е'
                 }

             newStr+=smallStr[i]; // получаем строку только с руссими  буквами
                        }
              }
     for(i=0; i<=(newStr.length)/2; i++){  // проверяем до половины слова,т.к. остальная часть
                                            // параллельно прошла проверку
         if ( newStr[i]==newStr[newStr.length-1-i]  ){
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

    var count= palindrom(str);
   printAnswer(count);

