function randomDiap(n,m) {
    return Math.floor(Math.random()*(m-n+1))+n;
}

function mood(colorsCount) {
var colors=[ '', 'красный', 'оранжевый', 'жёлтый', 'зелёный', 'голубой', 'синий', 'фиолетовый' ];


console.log( 'цветов: ' + colorsCount );
var colorHash ={};
for ( var i=1; i<=colorsCount; i++ ) {
    var n=randomDiap(1,7);
    var colorName=colors[n];
    
    if(!(colorName in colorHash)){
        colorHash[colorName]=true;
        console.log( colorName );
    }
    else continue;
   // console.log( colorName );
    
}
//console.log(colorHash)
}
var numb= prompt('Введите число');
var intNumb = parseInt(numb) ;
mood(numb);