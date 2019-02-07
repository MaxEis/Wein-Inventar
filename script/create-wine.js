var remote = require('electron').remote;
var fs = remote.require('fs');
const storage = require('electron-json-storage');


document.getElementById('submit').addEventListener("click", function(){
    storage.get('settings', function(error, data) {
        var docs = getData();
        checkDirectorySync(data.path + '/img'); 
    });
});


// Liste mit shelf anzeigen
function showList(){
    
    document.getElementById('list').innerHTML = document.getElementById('list')   
}

//daten auf Formular laden
function getData(){
    var name = document.getElementById('name');
    var traube = document.getElementById('traube');
    var jahrgang = document.getElementById('jahrgang');
    var liegeZeit = document.getElementById('liegeZeit');
    var type = document.getElementById('type');
    var menge = document.getElementById('menge');
    var weingut = document.getElementById('weingut');
    var country = document.getElementById('country');
    var drinkUntil = document.getElementById('drinkUntil');
    var bottleType = document.getElementById('bottleType');
    var shelf = document.getElementById('shelf');
    var liegeplatz = document.getElementById('liegeplatz');
    var imgPath = document.getElementById('imgPath');

    return docs = {
        name: name,
        traube: traube,
        jahrgang: jahrgang,
        liegeZeit: liegeZeit,
        type: type,
        menge: menge,
        weingut: weingut,
        country: country,
        drinkUntil: drinkUntil,
        bottleType: bottleType,
        shelf: shelf,
        liegeplatz: liegeplatz,
        imgPath: imgPath
    };
}
//Check if Ordner vorhanden ist, wenn nicht erstellen
function checkDirectorySync(directory) {  
    try {
      fs.statSync(directory);
    } catch(e) {
      fs.mkdirSync(directory);
    }
  }