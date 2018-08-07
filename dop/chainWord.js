
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
var fstW='МУХА';
var fshW='СЛОН';
var n=0;
var bool;
var abc=[];

//fstW=fstW.split('');
 //bool=checkWord (fshW, fstW);
//console.log(bool);

while(n<100){
//fstW=fstW.split('');
    for(var i=0; i<=dictionary.length-1; i++){
	

        bool=checkWord (dictionary[i], fstW);
	//console.log(bool);
	//console.log(dictionary[i]);

        if(bool==true &&  abc.indexOf(dictionary[i])==-1){
		abc.push(dictionary[i]);
            console.log(dictionary[i]);
            fstW=dictionary[i];
	fstW=fstW.split('');
	console.log(fstW)
break;
}
        
    //    else ;
    
}
n++;
}
console.log(fstW)
console.log(abc)