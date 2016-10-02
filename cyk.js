
var grama = { 
    S: ['AB', 'BC'],
    A: ['BA', 'a'],
    B: ['CC', 'b'],
    C: ['AB','a']
};
var w = 'baaba'; // nasze słowo

//funckja do wypełniania pierwszego (najwyższego) rzędu w tabeli
var znajdzNieTerm = function(litera, gram){
    var wynik = [];
    for (var r in gram){
      for (var i in gram[r]){
        if(gram[r][i] === litera){
            wynik.push(r);
        }
      }
    }
    return wynik;
};

//funkcja do wyszukiwania klucza dla zadanych dwóch komórek, gdzie j>0
var znajdzTerm = function(tab1, tab2, gram){
    var wynik = [];
    for (var r in gram){
      for (var i in gram[r]){
        if(tab1.indexOf(gram[r][i].charAt(0))>=0 && tab2.indexOf(gram[r][i].charAt(1))>=0){
            wynik.push(r);
        }
      }
    }
    return wynik;
};

//właściwy algorytm
var cyk = function(word,gram){
    var len = word.length;
    //wypełniamy tablicę pustymi miejscami
    var tab = new Array(len);
    for (var t = 0; t < len; t++) {
    tab[t] = new Array(0);
    }
    //wypełniamy górny rząd tablicy nietermilanami z formuł postaci NieTerminal -> terminal
    for (var z = 0; z<=len-1; z++){
        tab[0][z] = znajdzNieTerm(w.charAt(z), gram);
    }
    //iteracja po rzędach
    for (var j=1; j<=len-1; j++){
        //iteracja po kolumnach
        for (var i=0; i<=len-j-1; i++){
            tab[j][i] = [];
            //iteracja po rzędach niższych od naszego
            for (var k=0;k<j;k++){
                //indeksy porównywanych komórek
                var pier = j-k-1;
                var drug = i+k+1;
                //dodanie odpowiednich reguł dla jednego matcha
                tab[j][i] = tab[j][i].concat(znajdzTerm(tab[k][i],tab[pier][drug],gram));
            }
        }
    }
    for (var m in tab[len-1][0]){
        if (tab[len-1][0][m] === 'S'){
            return true;
        }
    }
    return false;

  console.log(wynik)
  console.log(wynik.indexOf['S']);

};

var test = function(){
    console.log(cyk(w, grama));
};
test();
