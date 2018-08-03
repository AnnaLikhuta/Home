do{
    var year=prompt('Введите год');
    year=parseInt(year);
}
while(year<=0)

function whichYear(year){
    return Math.ceil(year/100);
}

var vek=whichYear(year);
console.log(vek+' век')