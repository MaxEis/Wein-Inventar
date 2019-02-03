const remote = require('electron').remote;
const app = remote.app;
const storage = require('electron-json-storage');

//Var path global definiert
var path = app.getPath('userData');

var btnStatus = true;

storage.get('settings', function(error, data) {
    document.getElementById("currentPath").value = data.path;
});
document.getElementById("submit").addEventListener("click", function(){
    console.log("Saving...");
    storage.set('settings', { path: path}, function(error) {
        if (error) throw error;
      });
      self.location.href = './settings.html';
});
document.getElementById("standardPathBtn").addEventListener("click", function(){
    path = app.getPath('userData');
});
document.getElementById("changePathBtn").addEventListener("click", function(){
    if(btnStatus){
        btnStatus = false;
        document.getElementById("changePath").hidden = false;
    }else{
        btnStatus = true;
        document.getElementById("changePath").hidden = true;
    }   
});
function getfolder(e) {
    var files = e.target.files;
    var path = files[0].path;
    //Globale Pfad Variable setzen
    this.path = path;

}
