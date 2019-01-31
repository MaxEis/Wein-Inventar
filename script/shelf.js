//TODO: Einbinden der Usereingabe
//Placeholder für die Usereingabe
var test_tr = 6;
var test_th = 6;

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

for(var i = 1; i < test_tr + 1; i++){
    var text = '<tr>' + '<th>' + i + '</th>' +'</tr>';
    document.getElementById('tbody').innerHTML = document.getElementById("tbody").innerHTML + text; 
}
for(var i = 0; i < test_th + 1; i++){
    var text = '<th>' + alphabet.charAt(i) + '</th>';
    document.getElementById('tr').innerHTML = document.getElementById("tr").innerHTML + text; 
}

