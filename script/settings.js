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
document.getElementById('dirChooserBtn').addEventListener("click", function(){
    document.getElementById('dirChooser').click();
});

storage.get('settings', function(error, data) {

    if (error) throw error;
    //create Path
    var path = data.path + '/shelf.db'
    //load Database
    var Datastore = require('nedb')
    , db = new Datastore({ filename: path, autoload: true });
    db.find({}, function(err, docs){
        for(var i = 0; i < docs.length; i++){
            var html = '<tr><th>' + docs[i].name + '</th>' + '<th><button class="btn btn-danger" style="margin-left:40rem" onclick=' + '"self.location.href=' + "'./script/delete-shelf.html?" + 'id='+ docs[i]._id + "'" + '"' + '>Löschen</button></th>' +'</tr>'
            document.getElementById('tbody').innerHTML = document.getElementById('tbody').innerHTML + html;
        }
    });
});
