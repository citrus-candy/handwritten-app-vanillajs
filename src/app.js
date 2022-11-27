/* eslint-disable */
import './style.css';

import './assets/img/028_paper.jpg';

window.onload = function() {
  let canvasJson = null;

  // 画面サイズからvhを100%にする
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  // Fabricjsの初期設定
  const canvas = new fabric.Canvas('canvas', {
    width: 391,
    height: 553,
    isDrawingMode: true,
    freeDrawingBrush: new fabric.PencilBrush(canvas),
  });
  canvas.freeDrawingBrush.width = 5;
  canvas.freeDrawingBrush.color = '#505050';

  // 戻るボタンの処理
  const backButton = document.getElementById('back');
  let canvasHistory = [];
  backButton.addEventListener('click', () => {
    if (canvas !== undefined && canvas._objects.length > 0) {
      const copyArray = [...canvasHistory];
      copyArray.push(canvas._objects.pop());
      canvasHistory = copyArray;
      canvas.renderAll();
    }
  });

  // 拡大・縮小ボタンの処理
  const zoomButton = document.getElementById('zoom');
  let zoomFlag = false;
  zoomButton.addEventListener('click', () => {
    let zoom = canvas.getZoom();
    canvas.zoomToPoint(
      new fabric.Point(canvas.width / 2, canvas.height / 2),
      zoom == 1 ? 1.5 : 1
    );
    if (zoomFlag) {
      zoomButton.style.backgroundColor = 'white';
      zoomFlag = false;
    } else {
      zoomButton.style.backgroundColor = '#eaf8f9';
      zoomFlag = true;
    }
  });

  // テキストボタンの処理
  const activeButton = document.getElementById('active');
  const activeWrapper = document.getElementById('active-wrapper');
  const deactiveButton = document.getElementById('deactive');
  const bottomButtonContainer = document.getElementById('bottom-bc');
  deactiveButton.addEventListener('click', () => {
    activeWrapper.style.display = 'flex';
    deactiveButton.style.display = 'none';
    bottomButtonContainer.style.marginTop = '33px';
  });
  activeButton.addEventListener('click', () => {
    activeWrapper.style.display = 'none';
    deactiveButton.style.display = 'flex';
    bottomButtonContainer.style.marginTop = '104px';
  });

  // 色ボタンの処理
  const colorButtons = document.querySelectorAll('.color');
  colorButtons.forEach((colorButton) => {
    colorButton.addEventListener('click', () => {
      switch (colorButton.getAttribute('id')) {
        case 'red':
          canvas.freeDrawingBrush.color = '#ff3b66';
          break;
        case 'purple':
          canvas.freeDrawingBrush.color = '#e83bff';
          break;
        case 'yellow':
          canvas.freeDrawingBrush.color = '#ffcc00';
          break;
        case 'green':
          canvas.freeDrawingBrush.color = '#1bcc00';
          break;
        case 'lightblue':
          canvas.freeDrawingBrush.color = '#37b0ff';
          break;
        case 'blue':
          canvas.freeDrawingBrush.color = '#3756ff';
          break;
        case 'black':
          canvas.freeDrawingBrush.color = '#505050';
          break;
        default:
          break;
      }
    });
  });

  // 保存ボタンの処理
  const saveButton = document.getElementById('save');
  saveButton.addEventListener('click', () => {
    canvasJson = JSON.stringify(canvas);
    console.log(canvasJson);
    mainContainer.style.display = 'none';
    imageContainer.style.display = 'flex';
  });

  // 閉じるボタンの処理
  const closeButton = document.getElementById('close');
  closeButton.addEventListener('click', () => {
    mainContainer.style.display = 'none';
    imageContainer.style.display = 'flex';
  });

  // 画像ボタンの処理
  const mainContainer = document.getElementById('main');
  const imageContainer = document.getElementById('image');
  const imageButton = document.getElementById('image-button');
  imageButton.addEventListener('click', () => {
    canvas.clear();
    if (canvasJson) canvas.loadFromJSON(canvasJson);
    else {
      fabric.Image.fromURL('./028_paper.jpg', (img) => {
        img.scaleToWidth(canvas.width);
        img.scaleToHeight(canvas.height);
        canvas.setBackgroundImage(img);
        canvas.requestRenderAll();
      });
    }
    mainContainer.style.display = 'flex';
    imageContainer.style.display = 'none';
  });
};
