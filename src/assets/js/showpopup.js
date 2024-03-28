function showSwal(type,message) {
   'use strict';
   if (type === 'auto-close') {
      swal({
      title: message,
      text: 'Cửa sổ sẽ tự đóng trong vòng 2 giây',
      timer: 2000,
      button: false
      })
   }
}
var element = document.getElementById("loading");
function hideLoading() {
   element.style.display = "none";
}
function showLoading() {
   element.style.display = "block";
}

