const storage = require('electron-json-storage');
 
storage.get('settings', function(error, data) {
  if (error) throw error;
  var path = data.path + '/shelf.db'
  console.log(path);
  var Datastore = require('nedb')
  , db = new Datastore({ filename: path, autoload: true });
  document.getElementById('submit').addEventListener('click', function(){
    var name = document.getElementById('name').value;
    var columns = document.getElementById('columns').value;
    var rows = document.getElementById('rows').value;

    var doc = {name: name, columns:columns, rows: rows};
    db.insert(doc);

    self.location.href = './index.html';
  });

  
});