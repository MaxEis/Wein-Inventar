const remote = require('electron').remote;
const app = remote.app;
const storage = require('electron-json-storage');

//Var path global definiert
var path = app.getPath('userData');

var checkbox = document.getElementById("checkbox");

checkbox.addEventListener("click", function(){
    if(checkbox.checked){
        document.getElementById("dirChooserBtn").hidden = true;
        this.path = app.getPath('userData');
    }else{
        document.getElementById("dirChooserBtn").hidden = false;
        this.path = path;
    }
});
document.getElementById("submit").addEventListener("click", function(){
    storage.set('settings', { path: path}, function(error) {
        if (error) throw error;
         //create Path
         var path = this.path + '/shelf.db'
         //load Database
         console.log(path);
         var Datastore = require('nedb')
         , db = new Datastore({ filename: path, autoload: true });
         db.find({}, function(err, docs){
             console.log(docs);
             if(docs.length > 0){
                self.location.href='./index.html';
             }else{
                self.location.href='./first-setup.html';
             }
         });
    });
});

function getfolder(e) {
    var files = e.target.files;
    var path = files[0].path;
    //Globale Pfad Variable setzen
    this.path = path;

}
document.getElementById('dirChooserBtn').addEventListener("click", function(){
    document.getElementById('dirChooser').click();
});