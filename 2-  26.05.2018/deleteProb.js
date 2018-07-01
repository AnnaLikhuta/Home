function deleteProb() {
    var str= prompt('Введите слово');
    var countLeft=0;
    var countRight=0;
       for (var i=0; i<=str.length-1; i++ ){
        if (str[i]==' ') {
             countLeft++;
        }
        else    break;
    
    }

    for (var j=str.length-1; j>=0;  j--){
        if(str[j]==' ') {
            countRight++;
        }
        else  break;
        
    }
    console.log(countLeft);
    console.log(countRight);
    console.log('-'+str.slice(countLeft,-countRight)+'-');
    return ;
}

//deleteProb(' gfgf ')