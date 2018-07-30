var arrWord=["ТАРА","ЛИПА","ТУРА","ЛУЖА","ПАРК","ЛОЖЬ","ЛУПА","ПЛОТ","МУРА","ПАУК","ПАУТ","ПЛУТ","ЛОЖА","СЛОТ","ПАРА"];
var word1='ЛИСА'
 var word2='ЛОСЬ';
 var deltaArr;
var count=0;
var n=0;
while(word1!=word2 || n<=50){
    deltaArr=word2.split('');
    for(var i=0; i<=arrWord.length-1; i++){
        for(var j=0; j<=deltaArr.length-1; j++){
            if(arrWord[i].indexOf(deltaArr[j]!=-1)){
                count++;
            }
            else{continue;}


        }

        if(count==3){
            word2=arrWord[i];
        }
        else{continue;}
    }
n++;





} 