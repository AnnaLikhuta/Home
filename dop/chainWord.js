
function checkWord (where, arrWordWhat){
    var check=0;
    var abc=[]
    var secondCheck=0;

    for(var i=0; i<=arrWordWhat.length-1; i++ ){
        check=where.indexOf(arrWordWhat[i]);
        if(check!=-1  && abc.indexOf(check)==-1){
            abc.push(check)
        }
        secondCheck=where.indexOf(arrWordWhat[i],check);
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
var fstW='ЛИСА';
var fshW='ЛОСЬ';

fstW=fstW.split('');
var bool=checkWord (fshW, fstW);
console.log(bool);
while(boll==false){
    for(var i=0; i<=dictionary.length-1; i++){
        boll=checkWord (dictionary[i], fstW);
        if(bool==true){
            console.log(dictionary[i]);
            fstW=dictionary[i].split('');
        }
        else continue;
    }
    bool=checkWord (fshW, fstW);
}
