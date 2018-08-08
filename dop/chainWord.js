
function checkWord (where, WordWhat){//where - где проверяем
    WordWhat=WordWhat.split('');   // WordWhat- будем эти буквы перебирать для проверки
    var check=0; // количество повторений
    var abc=[]   // запоминать позиции букв. если 2 одинаковые буквы в слове
    var secondCheck=0; // если такая буква была, то запомнить следующую позицию на которой она встречается

    for(var i=0; i<=WordWhat.length-1; i++ ){
        check=where.indexOf(WordWhat[i]); 
        if(check!=-1  && abc.indexOf(check)==-1){
            abc.push(check)
        }
        secondCheck=where.indexOf(WordWhat[i],check);
        if(secondCheck!=-1 && abc.indexOf(secondCheck)==-1){
            abc.push(secondCheck);
        }

    }
    if(abc.length>=3){
        return true;
    }
    else {
        return false;
    }
}


var dictionary=["ТАРА","ЛИПА","ТУРА","ЛУЖА","ПАРК","ЛОЖЬ","ЛУПА","ПЛОТ","МУРА","ПАУК","ПАУТ","ПЛУТ","ЛОЖА","СЛОТ","ПАРА"];



/*

var firstWord='ЛИСА';
var finishWord='ЛОСЬ';

*/


var firstWord='МУХА';
var finishWord='СЛОН';


var n=0;
var bool;
var abc=[];

//fstW=fstW.split('');
 bool=checkWord (finishWord, firstWord); // сразу проверить, что слова не подходят

while(n<50){
    for(var i=0; i<=dictionary.length-1; i++){
        bool=checkWord (dictionary[i], firstWord); // сравнение  dictionary[i] с  'ЛИСА'
        if(bool==true &&  abc.indexOf(dictionary[i])==-1){
		    abc.push(dictionary[i]); // слово, которое подошло добавить в массив, чтобы 2-ой раз не выбирать
            console.log(firstWord);
            firstWord=dictionary[i];
            break;
        }
        
}
bool=checkWord (finishWord, firstWord) // проверка подходит ли итоговое
if(bool==true){
    firstWord=finishWord;
    console.log(firstWord)
    break;
}
n++;
}
console.log(abc)