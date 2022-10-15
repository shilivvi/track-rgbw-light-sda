@@include('html.js');

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

@@include('request.js');
@@include('help.js');