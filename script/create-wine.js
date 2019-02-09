var remote = require('electron').remote;
var fs = remote.require('fs');
const storage = require('electron-json-storage');

loadData();


document.getElementById('submit').addEventListener("click", function(){
    storage.get('settings', function(error, data) {
        var docs = getData();
        checkDirectorySync(data.path + '/img'); 
    });
});


function loadData(){
    storage.get('settings', function(error, data) {
        //create Path
       var path = data.path + '/shelf.db'
       //load Database
       var Datastore = require('nedb')
       , db = new Datastore({ filename: path, autoload: true });

       db.find({}, function(err, docs){
        showList(docs)
       });
       
   });
}

//Ggf neues Regal hinzufügen
document.getElementById('chooseShelf').addEventListener('change', function(){
    if(document.getElementById('chooseShelf').value == 'Regal hinzufügen'){
        self.location.href = './create-shelf.html';
        
    }else if(document.getElementById('chooseShelf').value == ''){
        document.getElementById('errorMsgShelf').hidden = false;
    }else{
        document.getElementById('errorMsgShelf').hidden = true;
    }
});

// Liste mit shelf anzeigen
function showList(docs){
    for(var i = 0; i < parseInt(docs.length); i++){       
        document.getElementById('chooseShelf').innerHTML = document.getElementById('chooseShelf').innerHTML + '<option>' + docs[i].name + '</option>'; 
    }  
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