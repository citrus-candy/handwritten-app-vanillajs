/* eslint-disable */
import './style.css';

import './assets/img/028_paper.jpg';

window.onload = function() {
  let canvasJson = null;

  /*
   * 画面サイズからvhを100%にする
   */
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  /*
   * Fabricjsの初期設定
   */
  const canvas = new fabric.Canvas('canvas', {
    width: 391,
    height: 553,
    isDrawingMode: true,
    freeDrawingBrush: new fabric.PencilBrush(canvas),
  });
  canvas.freeDrawingBrush.width = 5;
  canvas.freeDrawingBrush.color = '#505050';

  /*
   * 戻るボタンの処理
   */
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

  const bottomButtonContainer = document.getElementById('bottom-bc');

  /*
   * 拡大・縮小ボタンの処理
   */
  const zoomActiveButton = document.getElementById('zoom-active');
  const zoomDeactiveButton = document.getElementById('zoom-deactive');
  const zoomWrapper = document.getElementById('zoom-wrapper');
  zoomDeactiveButton.addEventListener('click', () => {
    zoomWrapper.style.display = 'flex';
    zoomDeactiveButton.style.display = 'none';
    if (
      colorDeactiveButton.style.display == 'flex' ||
      colorDeactiveButton.style.display == ''
    )
      bottomButtonContainer.style.marginTop = '33px';
    canvas.isDrawingMode = false;
  });
  zoomActiveButton.addEventListener('click', () => {
    zoomWrapper.style.display = 'none';
    zoomDeactiveButton.style.display = 'flex';
    if (
      colorDeactiveButton.style.display == 'flex' ||
      colorDeactiveButton.style.display == ''
    )
      bottomButtonContainer.style.marginTop = '104px';
    canvas.isDrawingMode = true;
  });

  const zoomExpansionButton = document.getElementById('zoom-expansion');
  const zoomContractionButton = document.getElementById('zoom-contraction');
  const zoomResetButton = document.getElementById('zoom-reset');
  zoomExpansionButton.addEventListener('click', () => {
    let zoom = canvas.getZoom();
    if (zoom >= 1 && zoom < 5) {
      canvas.zoomToPoint(
        new fabric.Point(canvas.width / 2, canvas.height / 2),
        zoom + 0.5
      );
    }
  });
  zoomContractionButton.addEventListener('click', () => {
    let zoom = canvas.getZoom();
    if (zoom > 1) {
      canvas.zoomToPoint(
        new fabric.Point(canvas.width / 2, canvas.height / 2),
        zoom - 0.5
      );
    }
  });
  zoomResetButton.addEventListener('click', () => {
    canvas.setZoom(1);
    canvas.absolutePan(new fabric.Point(0, 0));
  });
  let lastPosX;
  let lastPosY;
  canvas.on('mouse:down', function(opt) {
    if (!canvas.isDrawingMode) {
      lastPosX = opt.pointer.x;
      lastPosY = opt.pointer.y;
    }
  });
  canvas.on('mouse:move', function(opt) {
    if (!canvas.isDrawingMode) {
      var vpt = canvas.viewportTransform;
      vpt[4] += opt.pointer.x - lastPosX;
      vpt[5] += opt.pointer.y - lastPosY;
      canvas.requestRenderAll();
      lastPosX = opt.pointer.x;
      lastPosY = opt.pointer.y;
    }
  });

  /*
   * テキストボタンの処理
   */
  const colorActiveButton = document.getElementById('color-active');
  const colorDeactiveButton = document.getElementById('color-deactive');
  const colorWrapper = document.getElementById('color-wrapper');
  colorDeactiveButton.addEventListener('click', () => {
    colorWrapper.style.display = 'flex';
    colorDeactiveButton.style.display = 'none';
    if (
      zoomDeactiveButton.style.display == 'flex' ||
      zoomDeactiveButton.style.display == ''
    )
      bottomButtonContainer.style.marginTop = '33px';
  });
  colorActiveButton.addEventListener('click', () => {
    colorWrapper.style.display = 'none';
    colorDeactiveButton.style.display = 'flex';
    if (
      zoomDeactiveButton.style.display == 'flex' ||
      zoomDeactiveButton.style.display == ''
    )
      bottomButtonContainer.style.marginTop = '104px';
  });

  /*
   * 色ボタンの処理
   */
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

  /*
   * 保存ボタンの処理
   */
  const saveButton = document.getElementById('save');
  saveButton.addEventListener('click', () => {
    canvasJson = JSON.stringify(canvas);
    console.log(canvasJson);
    mainContainer.style.display = 'none';
    imageContainer.style.display = 'flex';
  });

  /*
   * 閉じるボタンの処理
   */
  const closeButton = document.getElementById('close');
  closeButton.addEventListener('click', () => {
    mainContainer.style.display = 'none';
    imageContainer.style.display = 'flex';
  });

  /*
   *  画像ボタンの処理
   */
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
