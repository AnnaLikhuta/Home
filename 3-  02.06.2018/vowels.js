function vowels(){
    function getWord(){
        var str= prompt('Введите пожалуйста любое слово');
        var countTry=0;
        
        while(str==null && countTry<2 ) {
            str=prompt('Давайте попробуем еще раз ввести слово');
            countTry++;
        }
        return str;
    }
    
   
   function checkWord(arr, word){
    var countVowels=0;
    for(var i=0; i<=word.length-1 ; i++){
        if (arr.indexOf(word[i])!=-1){
          countVowels++;
        }
    }
    return countVowels;
   }

   var vowelsArray=['а','о','у','э','я','и','е','ё','ю','ы'];
   var str=getWord();
  var count= checkWord(vowelsArray, str );

    console.log('Количество гласных букв составляет: '+count);
    return;
}