
    function getWord(){
        var str= prompt('Введите пожалуйста любое слово');
        var countTry=0;
        
        while(str==null && countTry<2 ) {
            str=prompt('Давайте попробуем еще раз ввести слово');
            countTry++;
        }
        return str;
    } // отдельная функция для ввода
    
   
   function checkWord( word){  // получает слово и выдает количество гласных
    var vowelsArray=['а','о','у','э','я','и','е','ё','ю','ы'];

    var countVowels=0;
    for(var i=0; i<=word.length-1 ; i++){
        if (vowelsArray.indexOf(word[i])!=-1){
          countVowels++;
        }
    }
    return countVowels;
   }

   var str=getWord();
  var count= checkWord( str );

    console.log('Количество гласных букв составляет: '+count);  // вывод 
