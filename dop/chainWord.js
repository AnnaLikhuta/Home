
function checkWord (firstWord, finishWord){//where - где проверяем
    var count=0; // количество повторений
    for(var i=0; i<=firstWord.length-1; i++ ){
      if(firstWord[i]!=finishWord[i]){
        count++;
        if(count==2){
            return false;
        }
      }

    }
    return true;
}


var dictionary=["ТАРА","ЛИПА","ТУРА","ЛУЖА","ПАРК","ЛОЖЬ","ЛУПА","ПЛОТ","МУРА","ПАУК","ПАУТ","ПЛУТ","ЛОЖА","СЛОТ","ПАРА"];

 var firstWord='ЛИСА';
    var finishWord='ЛОСЬ';

 //   var firstWord='МУХА';
 //  var finishWord='СЛОН';


var n=0;
var bool;
var abc=[];

 bool=checkWord (firstWord, finishWord); // сразу проверить, что слова не подходят
if(bool==true){
    abc.push(firstWord, finishWord); // добавляю в цепочку. если слова сразу подошли
}
while(bool==false){  // страхуюсь конечным условием. 
    for(var i=0; i<=dictionary.length-1; i++){
        bool=checkWord (dictionary[i], firstWord); 
        
        if(bool==true &&  abc.indexOf(dictionary[i])==-1){
		    abc.push(firstWord); // слово, которое подошло добавить в массив, чтобы 2-ой раз не выбирать
            firstWord=dictionary[i];
        }

        bool=checkWord (firstWord, finishWord) // проверка подходит ли итоговое
        if(bool==true ){
            abc.push(firstWord, finishWord);
            break;
        }    
}

//n++;
}

console.log(abc)// итоговая цепочка