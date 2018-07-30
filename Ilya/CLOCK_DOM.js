var arrWord=["ТАРА","ЛИПА","ТУРА","ЛУЖА","ПАРК","ЛОЖЬ","ЛУПА","ПЛОТ","МУРА","ПАУК","ПАУТ","ПЛУТ","ЛОЖА","СЛОТ","ПАРА"];
var word1='МУХА'
 var word2='СЛОН';
 var deltaArr=[];
var count=0;
var n=0;
while(word1!=word2 ){
             deltaArr=word1.split(''); //массив из слова ЛИСА
       for(var i=0; i<=arrWord.length-1; i++){ // слово ТАРА
        // лиса и тара
        count=0;   
        for(var j=0; j<=word2.length-1; j++){
            if(arrWord[i].indexOf(deltaArr[j])!=-1){  //ТАРА.indexOf('Л')
                count++;
            }
            else{ }
        }

        if(count==3){
            word1=arrWord[i];
            break;
        }
        
       //break;
    }
console.log(word1)
 //word1='ЛОСЬ'
} 
console.log('ha-ha');