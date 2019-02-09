const storage = require('electron-json-storage');

var test_tr = 6;
var test_th = 6;

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

drawTable(0);

function drawTable(index){
    storage.get('settings', function(error, data) {
        if (error) throw error;
        //create Path
        var path = data.path + '/shelf.db'
        //load Database
        var Datastore = require('nedb')
        , db = new Datastore({ filename: path, autoload: true });
        db.find({}, function(err, docs){
            if(index+1 == docs.length){
                document.getElementById('next-btn').disabled = true;
            }
            if(index <= 0){
                document.getElementById('previous-btn').disabled = true;
            }
            for(var i = 1; i < parseInt(docs[index].columns)+1; i++){
                var html = '<tr>' + '<th>' + i + '</th>' +'</tr>';
                document.getElementById('tbody').innerHTML = document.getElementById("tbody").innerHTML + html; 
            }
            for(var i = 0; i < parseInt(docs[index].rows); i++){
                var html = '<th>' + alphabet.charAt(i) + '</th>';
                document.getElementById('tr').innerHTML = document.getElementById("tr").innerHTML + html; 
            }

        });
    });
}
