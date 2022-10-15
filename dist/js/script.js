var html = '<section class="rgb active-menu"><div class="container"><div class="rgb__wrap"><div class="rgb__picker picker-rbg"><div id="picker"></div></div><div class="rgb__sliders sliders-rgb"><div class="sliders-rgb__item"><div class="sliders-rgb__icon sliders-rgb__icon--left sliders-rgb__icon--text"><span>WH</span><span>0%</span></div><div class="sliders-rgb__slider"><input class="sliders-rgb__input" id="white" type="range" min="0" max="255" value="0" oninput="whiteSliderChanged(this)" onchange="changeEventWhiteSlider(this)"></div><div class="sliders-rgb__icon sliders-rgb__icon--right sliders-rgb__icon--text"><span>WH</span><span>100%</span></div></div><div class="sliders-rgb__item"><div class="sliders-rgb__icon sliders-rgb__icon--left"><svg><use xlink:href="#small-sun"></use></svg></div><div class="sliders-rgb__slider"><input class="sliders-rgb__input" id="brightness" type="range" min="0" max="255" value="0" oninput="brightnessSliderChanged(this)" onchange="changeEventBrightnessSlider(this)"></div><div class="sliders-rgb__icon sliders-rgb__icon--right"><svg><use xlink:href="#big-sun"></use></svg></div></div></div></div></div></section><div id="favorite-colors" class="rgb__colors colors-rgb"><div class="container"><div class="colors-rgb__row"><div class="colors-rgb__item" style="background-color: rgb(255, 0, 255);" data-color="255,0,255"></div><div class="colors-rgb__item" style="background-color: rgb(0, 255, 255);" data-color="0,255,255"></div><div class="colors-rgb__item" style="background-color: rgb(255, 0, 0);" data-color="255,0,0"></div><div class="colors-rgb__item" style="background-color: rgb(0, 255, 0);" data-color="0,255,0"></div><div class="colors-rgb__item" style="background-color: rgb(255, 255, 0);" data-color="255,255,0"></div><div class="colors-rgb__item" style="background-color: rgb(0, 0, 255);" data-color="0,0,255"></div></div></div></div>';
;

let colorPicker = '';
let defaultColor = [255, 0, 0];
let defaultBr = 150;
let defaultWhite = 150;

window.addEventListener('DOMContentLoaded', () => {

  //hack svg sprite
  getSvgSprite( 'https://sda.proykey.by/dist/img/sprite.svg' );

  document.querySelector('body').insertAdjacentHTML('afterbegin', html);

  //get defaults settings
  getVal( 'defaults' )
    .then( data => {      
      const splitStr = data.split(';')

      defaultColor = [splitStr[0], splitStr[1], splitStr[2]]
      defaultWhite = splitStr[3]
      defaultBr = splitStr[4]

      setDefaultSettings()
      initPresetsColors()
    });

});

function setDefaultSettings(){

  /* colorPicker */
  colorPicker = new iro.ColorPicker("#picker", {
    width: 330,
    color: {
      r: defaultColor[0],
      g: defaultColor[1],
      b: defaultColor[2],
      alpha: 1
    }
  })

  colorPicker.on('input:end', function(color){
    const rgb = color.rgb
    const selectedColor = (rgb['r'] * 65536) + (rgb['g'] * 256) + rgb['b'];
    submitVal('c', selectedColor);
  })

  // colorPicker.on('input:change', function(color){
  //   setRGBForm(colorPicker.color.rgb)
  // })

  // setRGBForm(colorPicker.color.rgb)
  // initEventRGBForm()

  // imageData.data[0] * 65536 + imageData.data[1] * 256 + imageData.data[2];

  /* sliders brightness init */
  const brightnessSlider = document.querySelector('#brightness')
  brightnessSlider.value = parseInt(defaultBr)
  const brightnessValue = brightnessSlider.value
  brightnessSlider.style.background = `linear-gradient(to right, #1083ff, #1083ff ${brightnessValue/2.56}%, #ccc ${brightnessValue/2.56}%)`;


  /* sliders white init */
  const whiteSlider = document.querySelector('#white')
  whiteSlider.value = parseInt(defaultWhite)
  const whiteValue = whiteSlider.value
  whiteSlider.style.background = `linear-gradient(to right, #1083ff, #1083ff ${whiteValue/2.56}%, #ccc ${whiteValue/2.56}%)`;

  // /* sliders speed init  */
  // const speedSlider = document.querySelector('#speed')
  // speedSlider.value = parseInt(defaultSpeed)
  // const speedValue = speedSlider.value
  // speedSlider.style.background = `linear-gradient(to right, #1083ff, #1083ff ${speedValue/655.35}%, #ccc ${speedValue/655.35}%)`;
}

//call always when change brightness
function brightnessSliderChanged(e){
	let br = e.value; // brightness
	e.style.background = `linear-gradient(to right, #1083ff, #1083ff ${br/2.56}%, #ccc ${br/2.56}%)`;
}

//call when change brightness is end
function changeEventBrightnessSlider(e){
  let br = e.value; // brightness
  submitVal('l', br);
}

//call always when change white
function whiteSliderChanged(e){
	let br = e.value; // white
	e.style.background = `linear-gradient(to right, #1083ff, #1083ff ${br/2.56}%, #ccc ${br/2.56}%)`;
}

//call when change white is end
function changeEventWhiteSlider(e){
  const white = parseInt(e.value); // white
  submitVal('w', white);
  //console.log('w = ' + white)
}

function initPresetsColors(){
  const $colors = document.querySelectorAll('#favorite-colors .colors-rgb__item');

  if(!$colors){
    return
  }

  $colors.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      const color = item.getAttribute('data-color').split(',');
      submitVal('c', (parseInt(color['0']) * 65536) + (parseInt(color['1']) * 256) + parseInt(color['2']));
      colorPicker.color.rgb = { r: color['0'], g: color['1'], b: color['2'] };
    })
  });
}

function sendRequest( method, url, body = null ){
  return new Promise( (resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    xhr.onload = () => {
      if(xhr.status >= 400){
        reject(xhr.response)
      }else{
        //console.log( xhr.response )
        if( isJson( xhr.response ) ){
          resolve( JSON.parse(data) )
        }else{
          resolve( xhr.response )
        }
      }
    }

    xhr.onerror = () => {
      reject(xhr.response);
    }

    xhr.open(method, url);
    xhr.send(JSON.stringify(body))
  });
}

function getVal(name){
  return new Promise( (resolve, reject) => {
    const method = 'GET'
    const url = name

    sendRequest(method, url)
      .then( data => resolve(data) )
      .catch( data => resolve(data) )
  })
}

function submitVal(name, val) {
  const method = 'GET'
  const url = `set?${name}=${val}`

  sendRequest(method, url)
}

function getSvgSprite(url){
  const ajax = new XMLHttpRequest();
  ajax.open('GET', url, true);
  ajax.send();
  ajax.onload = function(e) {
    const div = document.createElement("div");
    div.classList.add('svg-sprite');
    div.innerHTML = ajax.responseText;
    document.body.insertBefore(div, document.body.childNodes[0]);
  }
};
// GET - string
// RETURN - bool
function isJson(str) {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

// GET - int
// RETURN - array
//
//Function for translate RGB value in dec max"16777215" to array[3] = R, G, B dec values
function decToRgb(value){
  const r = Math.floor(value / (256*256));
  const g = Math.floor(value / 256) % 256;
  const b = value % 256;
  return [r, g, b];
};