
 var str= prompt('Введите слово');

function deleteProb(str) {
     var check=false;
    var countLeft=0;
    var pos;
    var abc;
       for (var i=0; i<=str.length-1; i++ ){
        if (str[i]==' ' && check==false) {
             countLeft++;
           str= str.slice(countLeft+1);
        }
        else if (str[i]!=' ' ){
            check=true;
        }
        else if(str[i]==' ' && check==true) {
           
          while (str.indexOf(' ')!=-1) {
            pos=str.indexOf(' ');
               abc= str.slice(0,pos);
            str=str.slice(pos+1);
            str=abc+str;
           }
          break;
        }
        else    break;
    }
    return str ;
}

var cleanWord=deleteProb(str);
if (cleanWord.length==0){
    console.log('Вы ввели только пробельные символы');
    }
else {
    console.log('Ваше итоговое слово: '+'-'+ cleanWord+'-');
}