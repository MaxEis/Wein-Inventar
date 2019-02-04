const storage = require('electron-json-storage');
 
storage.get('settings', function(error, data) {
  if (error) throw error;
  //create Path
  var path = data.path + '/shelf.db'
  //load Database
  var Datastore = require('nedb')
  , db = new Datastore({ filename: path, autoload: true });

  document.getElementById('submit').addEventListener('click', function(){
    //Get Values from Inputs
    var name = document.getElementById('name').value;
    var columns = document.getElementById('columns').value;
    var rows = document.getElementById('rows').value;
    //Genereate the document object which should be inserted
    var doc = {name: name, columns:columns, rows: rows};
    //Insert doc
    db.insert(doc);
    //Redirect to main page
    self.location.href = './index.html';
  });

  
});