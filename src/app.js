/* eslint-disable */
import "./style.css";

window.onload = function() {
  // 画面サイズからvhを100%にする
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  // Fabricjsの初期設定
  const canvas = new fabric.Canvas("canvas", {
    isDrawingMode: true,
    freeDrawingBrush: new fabric.PencilBrush(canvas)
  });
  canvas.freeDrawingBrush.width = 5;
  canvas.freeDrawingBrush.color = "#505050";
  canvas.setBackgroundColor("lightgray", canvas.renderAll.bind(canvas));

  // 戻るボタンの処理
  const backButton = document.getElementById("back-button");
  let canvasHistory = [];
  backButton.addEventListener("click", () => {
    if (canvas !== undefined && canvas._objects.length > 0) {
      const copyArray = [...canvasHistory];
      copyArray.push(canvas._objects.pop());
      canvasHistory = copyArray;
      canvas.renderAll();
    }
  });

  // テキストボタンの処理
  const activeButton = document.getElementById("active-button");
  const activeButtonContainer = document.getElementById(
    "active-button-container"
  );
  const deactiveButton = document.getElementById("deactive-button");
  const bottomButtonContainer = document.getElementById(
    "bottom-button-container"
  );
  deactiveButton.addEventListener("click", () => {
    activeButtonContainer.style.display = "flex";
    deactiveButton.style.display = "none";
    bottomButtonContainer.style.marginTop = "33px";
  });
  activeButton.addEventListener("click", () => {
    activeButtonContainer.style.display = "none";
    deactiveButton.style.display = "flex";
    bottomButtonContainer.style.marginTop = "104px";
  });

  // 色ボタンの処理
  const colorButtons = document.querySelectorAll(".color");
  colorButtons.forEach(colorButton => {
    colorButton.addEventListener("click", () => {
      switch (colorButton.getAttribute("id")) {
        case "red":
          canvas.freeDrawingBrush.color = "#ff3b66";
          break;
        case "purple":
          canvas.freeDrawingBrush.color = "#e83bff";
          break;
        case "yellow":
          canvas.freeDrawingBrush.color = "#ffcc00";
          break;
        case "green":
          canvas.freeDrawingBrush.color = "#1bcc00";
          break;
        case "lightblue":
          canvas.freeDrawingBrush.color = "#37b0ff";
          break;
        case "blue":
          canvas.freeDrawingBrush.color = "#3756ff";
          break;
        case "black":
          canvas.freeDrawingBrush.color = "#505050";
          break;
        default:
          break;
      }
    });
  });

  // 保存ボタンの処理
  const saveButton = document.getElementById("save-button");
  saveButton.addEventListener("click", () => {
    const json = JSON.stringify(canvas);
    console.log(json);
  });
};
