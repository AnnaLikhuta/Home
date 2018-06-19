function vowels(){
    var str= prompt('Введите пожалуйста любое слово');
    var countTry=0;
    var countVowels=0;
    while(str==null && countTry<2 ) {
        str=prompt('Давайте попробуем еще раз ввести слово');
        countTry++;
    }
   var vowelsArray=['а','о','у','э','я','и','е','ё','ю','ы'];
    for(var i=0; i<=str.length-1; i++){
        for(var j=0; j<=vowelsArray.length-1; j++){
            if(str[i]==vowelsArray[j]){
                countVowels++;
            }
        }

    }
    console.log('Количество гласных букв составляет: '+countVowels);
    return;
}

