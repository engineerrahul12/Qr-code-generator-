const textInput = document.getElementById("qrText");
const sizeInput = document.getElementById("size");
const darkColor = document.getElementById("darkColor");
const lightColor = document.getElementById("lightColor");

const generateBtn = document.getElementById("generateBtn");
const clearBtn = document.getElementById("clearBtn");
const downloadBtn = document.getElementById("downloadBtn");

const qrContainer = document.getElementById("qrcode");
const emptyMessage = document.getElementById("emptyMessage");

let currentQR = null;


function generateQR() {

  const text = textInput.value.trim();

  if (!text) {
    alert("Please enter some text or a URL.");
    return;
  }

  qrContainer.innerHTML = "";

  const size = Number(sizeInput.value);

  currentQR = new QRCode(qrContainer, {
    text: text,
    width: size,
    height: size,
    colorDark: darkColor.value,
    colorLight: lightColor.value,
    correctLevel: QRCode.CorrectLevel.H
  });

  qrContainer.style.display = "block";
  emptyMessage.style.display = "none";

  downloadBtn.disabled = false;
}


generateBtn.addEventListener("click", generateQR);


clearBtn.addEventListener("click", () => {

  textInput.value = "";
  qrContainer.innerHTML = "";

  qrContainer.style.display = "none";
  emptyMessage.style.display = "block";

  downloadBtn.disabled = true;

  currentQR = null;
});


downloadBtn.addEventListener("click", () => {

  const canvas = qrContainer.querySelector("canvas");
  const image = qrContainer.querySelector("img");

  let url = null;

  if (canvas) {
    url = canvas.toDataURL("image/png");
  } else if (image) {
    url = image.src;
  }

  if (!url) {
    return;
  }

  const link = document.createElement("a");

  link.href = url;
  link.download = "rahul-sah-qr-code.png";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

});


textInput.addEventListener("keydown", (event) => {

  if (event.ctrlKey && event.key === "Enter") {
    generateQR();
  }

});