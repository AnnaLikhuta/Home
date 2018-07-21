

/*

//var str= prompt('Введите слово');
var str = '  aa  '
//var str = '123456789'
//var change=[];
var change=false;
var pos=0;
 
for (var i=0; i<=str.length-1; i++){

    if (str.indexOf(' ',i)!=-1 && change==false) {
        pos=str.indexOf(' ',i);
        console.log(pos);
        console.log('ha-1');
        
             // str=str.slice(pos);
       // continue
        }
    else if(  str.indexOf(' ',i)==-1 ){
        change=true;
        console.log('ha-true');
    }
    else if (str.indexOf(' ',i)!=-1 && change==true){
        pos=str.indexOf(' ',i);
       // str=str.slice(0,pos);
        console.log('ha-end');
        //break;
    }

    }



console.log(change);
console.log(str);
console.log(str.indexOf(' ',0));

*/











/*

function checkString(str){
    for (var i=0; i<=str.length-1; i++ ){
        pos= str.indexOf(' ',i);
        
        console.log(pos)
         change.push(pos);
     i=pos+1;
         }
        
return change ;
}
checkString(str);
//str=str.slice(change[0]+1, change[change.length-1]);
    
   

console.log(change)
console.log(str)
*/



/*


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


*/