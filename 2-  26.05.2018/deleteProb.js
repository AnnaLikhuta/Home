function startDelete(){
    var str= prompt('Введите слово');

function deleteProb(str) {
     var check=false;
    var countLeft=0;
    var countRight=0;
       for (var i=0; i<=str.length-1; i++ ){
        if (str[i]==' ' && check==false) {
             countLeft++;
        }
        else if (str[i]!=' ' ){
            check=true;
        }
        else if(str[i]==' ' && check==true) {
            countRight++;
        }
        else    break;
    
    }
    
    return str.slice(countLeft,-countRight) ;
}
var cleanWord=deleteProb(str);
console.log(cleanWord)
if (cleanWord.length==0){
    console.log('Вы ввели только пробельные символы');
    }
else {
    console.log('Ваше итоговое слово: '+ cleanWord)
}


}

