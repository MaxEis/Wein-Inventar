const remote = require('electron').remote;
const app = remote.app;
const storage = require('electron-json-storage');

//Var path global definiert
var path = app.getPath('userData');

var checkbox = document.getElementById("checkbox");

checkbox.addEventListener("click", function(){
    if(checkbox.checked){
        document.getElementById("path").hidden = true;
        this.path = app.getPath('userData');
    }else{
        document.getElementById("path").hidden = false;
        this.path = path;
    }
});
document.getElementById("submit").addEventListener("click", function(){
    storage.set('settings', { path: path}, function(error) {
        if (error) throw error;
      });
});

function getfolder(e) {
    var files = e.target.files;
    var path = files[0].path;
    //Globale Pfad Variable setzen
    this.path = path;

}
