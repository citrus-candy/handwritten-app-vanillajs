/* eslint-disable */
import './style.css';

import './assets/img/028_paper.jpg';

const redColor = '#ff3b66';
const purpleColor = '#e83bff';
const yellowColor = '#ffcc00';
const greenColor = '#1bcc00';
const lightblueColor = '#37b0ff';
const blueColor = '#3756ff';
const blackColor = '#505050';

const canvasSize = {
  width: 391,
  height: 553,
};
const brushOption = {
  width: 5,
  color: blackColor,
};

window.onload = function() {
  const mainContainer = document.getElementById('main');
  const imageContainer = document.getElementById('image');
  const imageButton = document.getElementById('image-button');
  const backButton = document.getElementById('back');
  const zoomActiveButton = document.getElementById('zoom-active');
  const zoomDeactiveButton = document.getElementById('zoom-deactive');
  const zoomWrapper = document.getElementById('zoom-wrapper');
  const zoomExpansionButton = document.getElementById('zoom-expansion');
  const zoomContractionButton = document.getElementById('zoom-contraction');
  const zoomResetButton = document.getElementById('zoom-reset');
  const colorActiveButton = document.getElementById('color-active');
  const colorDeactiveButton = document.getElementById('color-deactive');
  const colorWrapper = document.getElementById('color-wrapper');
  const colorButtons = document.querySelectorAll('.color');
  const bottomButtonContainer = document.getElementById('bottom-bc');
  const saveButton = document.getElementById('save');
  const closeButton = document.getElementById('close');

  /*
   * 画面サイズからvhを100%にする
   */
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  /*
   * Fabricjsの初期設定
   */
  const canvas = new fabric.Canvas('canvas', {
    width: canvasSize.width,
    height: canvasSize.height,
    isDrawingMode: true,
    freeDrawingBrush: new fabric.PencilBrush(canvas),
  });
  canvas.freeDrawingBrush.width = brushOption.width;
  canvas.freeDrawingBrush.color = brushOption.color;

  /*
   * 戻るボタンの処理
   */
  let canvasHistory = [];
  backButton.addEventListener('click', () => {
    if (canvas !== undefined && canvas._objects.length > 0) {
      const copyArray = [...canvasHistory];
      copyArray.push(canvas._objects.pop());
      canvasHistory = copyArray;
      canvas.renderAll();
    }
    onChangeExtendButtonStyle(
      false,
      zoomWrapper,
      zoomDeactiveButton,
      colorDeactiveButton
    );
    canvas.isDrawingMode = true;
  });

  /*
   * 拡大・縮小ボタンの処理
   */
  zoomDeactiveButton.addEventListener('click', () => {
    onChangeExtendButtonStyle(
      true,
      zoomWrapper,
      zoomDeactiveButton,
      colorDeactiveButton
    );
    canvas.isDrawingMode = false;

    // オブジェクトの選択を無効化
    const allObjects = canvas.getObjects();
    allObjects.forEach((object) => {
      object.selectable = false;
    });
  });
  zoomActiveButton.addEventListener('click', () => {
    onChangeExtendButtonStyle(
      false,
      zoomWrapper,
      zoomDeactiveButton,
      colorDeactiveButton
    );
    canvas.isDrawingMode = true;
  });

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
    resetZoom();
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
  colorDeactiveButton.addEventListener('click', () => {
    onChangeExtendButtonStyle(
      true,
      colorWrapper,
      colorDeactiveButton,
      zoomDeactiveButton
    );
    onChangeExtendButtonStyle(
      false,
      zoomWrapper,
      zoomDeactiveButton,
      colorDeactiveButton
    );
    canvas.isDrawingMode = true;
  });
  colorActiveButton.addEventListener('click', () => {
    onChangeExtendButtonStyle(
      false,
      colorWrapper,
      colorDeactiveButton,
      zoomDeactiveButton
    );
  });

  /*
   * 色ボタンの処理
   */
  colorButtons.forEach((colorButton) => {
    colorButton.addEventListener('click', () => {
      switch (colorButton.getAttribute('id')) {
        case 'red':
          onChangeBrushColor(redColor);
          break;
        case 'purple':
          onChangeBrushColor(purpleColor);
          break;
        case 'yellow':
          onChangeBrushColor(yellowColor);
          break;
        case 'green':
          onChangeBrushColor(greenColor);
          break;
        case 'lightblue':
          onChangeBrushColor(lightblueColor);
          break;
        case 'blue':
          onChangeBrushColor(blueColor);
          break;
        case 'black':
          onChangeBrushColor(blackColor);
          break;
      }
    });
  });

  /*
   * 保存ボタンの処理
   */
  let canvasJson = null;
  saveButton.addEventListener('click', () => {
    canvasJson = JSON.stringify(canvas);
    console.log(canvasJson);
    onChangeOverlayStyle(false);
  });

  /*
   * 閉じるボタンの処理
   */
  closeButton.addEventListener('click', () => {
    onChangeOverlayStyle(false);
  });

  /*
   *  画像ボタンの処理
   */
  imageButton.addEventListener('click', () => {
    canvas.clear();
    resetZoom();
    if (canvasJson) canvas.loadFromJSON(canvasJson);
    else
      fabric.Image.fromURL('./028_paper.jpg', (img) => {
        img.scaleToWidth(canvas.width);
        img.scaleToHeight(canvas.height);
        canvas.setBackgroundImage(img);
        canvas.requestRenderAll();
      });
    onChangeOverlayStyle(true);
  });

  /**
   * canvasの左上を基準にズームをリセット
   */
  function resetZoom() {
    canvas.setZoom(1);
    canvas.absolutePan(new fabric.Point(0, 0));
  }

  /**
   * ペンの色を変更
   * @param {string} color
   */
  function onChangeBrushColor(color) {
    canvas.freeDrawingBrush.color = color;
    onChangeExtendButtonStyle(
      false,
      zoomWrapper,
      zoomDeactiveButton,
      colorDeactiveButton
    );
    canvas.isDrawingMode = true;
  }

  /**
   * 拡張ボタンクリック時のCSSの調整
   * @param {boolean} flag
   * @param {HTMLElement} wrapper
   * @param {HTMLElement} button
   * @param {HTMLElement} styleTargetButton
   */
  function onChangeExtendButtonStyle(flag, wrapper, button, styleTargetButton) {
    const targetDisplay = styleTargetButton.style.display;

    wrapper.style.display = flag ? 'flex' : 'none';
    button.style.display = flag ? 'none' : 'flex';
    if (targetDisplay == 'flex' || targetDisplay == '')
      bottomButtonContainer.style.marginTop = flag ? '33px' : '104px';
  }

  /**
   * オーバーレイのCSSの調整
   * @param {boolean} flag
   */
  function onChangeOverlayStyle(flag) {
    if (flag) {
      mainContainer.style.display = 'flex';
      imageContainer.style.display = 'none';
    } else {
      mainContainer.style.display = 'none';
      imageContainer.style.display = 'flex';
    }
  }
};
