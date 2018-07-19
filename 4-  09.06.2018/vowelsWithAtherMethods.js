function vowels(){


    function getStr(){
        var answer= prompt('Введите пожалуйста любое слово');
        var countTry=0;
                while(answer==null && countTry<=2 ) {
                    answer=prompt('Давайте попробуем еще раз ввести слово');
            countTry++;
        }
        return answer;
    }

   var countVowels=0;
    var strArray=getStr().split('');
        var vowels='аоуэяиеёюы'; //  для проверки


//метод forEach
   // console.log(strArray);
    strArray.forEach( (item, i, arr) => {  
       if(vowels.indexOf(item)!=-1)
          countVowels++; 
    });
    console.log(countVowels + '-количество гласных букв по методу forEach')
 


    //метод filter
   var test= strArray.filter((item, i, arr ) => vowels.indexOf(item)!=-1 ).length; 
   console.log(test+'- количество гласных по методу filter'); 

     // метод  reduce
  var test= strArray.reduce( (countVowels, item, i,arr)=> { 
      if(vowels.indexOf(item)!=-1) 
     countVowels++;
     return countVowels;} , 0 );
    console.log(test + '-количество гласных букв по методу reduce');
         return;
}
vowels();
