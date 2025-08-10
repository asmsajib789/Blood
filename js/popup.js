const popup = document.getElementById("popup");
const openPopupBtn = document.getElementById("openPopup");
const closePopupBtn = document.querySelector(".close");

openPopupBtn.onclick = function() {
  popup.style.display = "block";
}

closePopupBtn.onclick = function() {
  popup.style.display = "none";
}

window.onclick = function(e) {
  if (e.target == popup) {
    popup.style.display = "none";
  }
}
