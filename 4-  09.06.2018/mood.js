function randomDiap(n,m) {
    return Math.floor(Math.random()*(m-n+1))+n;
}

function mood(colorsCount) {
var colors=[ '', 'красный', 'оранжевый', 'жёлтый', 'зелёный', 'голубой', 'синий', 'фиолетовый' ];

console.log( 'цветов: ' + colorsCount );
var colorHash ={};
var i=0;
if (colorsCount>8){
    colorsCount=7;
}
while ( i < colorsCount ) {
    var n=randomDiap(1,7);
    var colorName=colors[n];
    
    if(!(colorName in colorHash)){
        colorHash[colorName]=true;
        console.log( colorName );
        i++;
    }
    else continue;
    
}
}
var numb= prompt('Введите число');
var intNumb = parseInt(numb) ;
mood(numb);