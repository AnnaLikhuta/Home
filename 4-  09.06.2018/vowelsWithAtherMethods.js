function getStr(){
    var answer= prompt('Введите пожалуйста любое слово');
    var countTry=0;
            while(answer==null && countTry<=2 ) {
                answer=prompt('Давайте попробуем еще раз ввести слово');
        countTry++;
    }
    return answer;
}

function arrForEach(strArray){
   
    strArray=strArray.toLowerCase().split('');
  var countVowels=0;
  var vowels='аоуэяиеёюы'; //  для проверки
      strArray.forEach( (item, i, arr) => {  
        if(vowels.indexOf(item)!=-1)
           countVowels++; 
     });
     return  countVowels;
}

function arrFilter(strArray){
    strArray=strArray.toLowerCase().split('');
    var vowels='аоуэяиеёюы';
    var test= strArray.filter((item, i, arr ) => vowels.indexOf(item)!=-1 ).length; 
    return test;
}

function arrReduce(strArray){
    strArray=strArray.toLowerCase().split('');
    var vowels='аоуэяиеёюы';
    var test= strArray.reduce( (countVowels, item, i,arr)=> { 
        if(vowels.indexOf(item)!=-1) 
       countVowels++;
       return countVowels;} , 0 );
       return test;
}

var strArray=getStr();
//var countVowels=arrForEach(strArray);
console.log(arrForEach(strArray) + '-количество гласных букв по методу forEach')
console.log(arrFilter(strArray)+'- количество гласных по методу filter'); 
console.log(arrReduce(strArray) + '-количество гласных букв по методу reduce');
