document.getElementById("checkbox").addEventListener("click", function(){
    var checkbox = document.getElementById("checkbox");
    if(checkbox.checked == false){
        document.getElementById("path").hidden = false;
    }else{
        document.getElementById("path").hidden = true;
    }
});
document.getElementById("submit").addEventListener("click", function(){
    self.location.href = "./index.html";
});
function getfolder(e) {
    var files = e.target.files;
    var path = files[0].path;
    console.log(path);
}
