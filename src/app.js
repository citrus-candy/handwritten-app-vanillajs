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
  canvas.freeDrawingBrush.color = "black";
  canvas.setBackgroundColor("lightgray", canvas.renderAll.bind(canvas));
};
