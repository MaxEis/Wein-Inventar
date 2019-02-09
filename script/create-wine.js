var remote = require('electron').remote;
var fs = remote.require('fs');
var path;
var name;
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
    name = document.getElementById('name').value;
/*     var traube = document.getElementById('traube').innerHTML;
    var jahrgang = document.getElementById('jahrgang').innerHTML;
    var liegeZeit = document.getElementById('liegeZeit').innerHTML;
    var type = document.getElementById('type').innerHTML;
    var menge = document.getElementById('menge').innerHTML;
    var weingut = document.getElementById('weingut').innerHTML;
    var country = document.getElementById('country').innerHTML;
    var drinkUntil = document.getElementById('drinkUntil').innerHTML;
    var bottleType = document.getElementById('bottleType').innerHTML;
    var shelf = document.getElementById('shelf').innerHTML;
    var location = document.getElementById('location').innerHTML;
    var imgPath = document.getElementById('imgPath').innerHTML;
 */
    return docs = {
        name: name
 /*       , traube: traube,
        jahrgang: jahrgang,
        liegeZeit: liegeZeit,
        type: type,
        menge: menge,
        weingut: weingut,
        country: country,
        drinkUntil: drinkUntil,
        bottleType: bottleType,
        shelf: shelf,
        liegeplatz: location,
        imgPath: imgPath */
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

  function getImg(e) {
    var files = e.target.files;
    var path = files[0].path;
    //Globale Pfad Variable setzen
    this.path = path;

}
document.getElementById('imgChooserBtn').addEventListener("click", function(){
    document.getElementById('imgChooser').click();
});

document.getElementById("submit").addEventListener("click", function(){
    getData();
    storage.get('settings', function(error, data) {
        fs.copyFile(path, data.path + "/img/" + name + ".jpg" , (err) => {
            if (err) throw err;
          });
    });
});