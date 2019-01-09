window.onload = function(){
    var textarea = document.querySelector("textarea");
    var span = document.querySelector("span");

textarea.addEventListener("input", function(){
    var maxlength = this.getAttribute("maxlength");
    var currentLength = this.value.length;

    if( currentLength >= maxlength ){
        span.innerHTML ="Hết chỗ để nhập rồi nạ. Chúc vui";
    }else{
        span.innerHTML ="Chỉ còn " + (maxlength - currentLength) + " kí tự.";
    }
});
}