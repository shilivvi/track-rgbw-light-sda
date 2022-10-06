var html = '<header class="header"><div class="container"><div class="header__wrap"><ul class="header__nav"><li class="header__item" data-menu=\'rgb\'><snap class="header__icon"><svg><use xlink:href="#color"></use></svg></snap><snap class="header__text">RGB</snap></li><li class="header__item" data-menu=\'modes\'><snap class="header__icon"><svg><use xlink:href="#modes"></use></svg></snap><snap class="header__text">Режимы</snap></li><li class="header__item"  data-menu=\'settings\'><snap class="header__icon"><svg><use xlink:href="#settings"></use></svg></snap><snap class="header__text">Настройки</snap></li></ul></div></div></header><section class="rgb active-menu"><div class="container"><div class="rgb__wrap"><div class="rgb__picker picker-rbg"><div id="picker"></div><form class="picker-rbg__form"><div class="picker-rbg__row picker-rbg__row--r"><span class="picker-rbg__text">R: </span><input name="red" type="number" class="picker-rbg__input" min="0" max="255"></div><div class="picker-rbg__row picker-rbg__row--g"><span class="picker-rbg__text">G: </span><input name="green" type="number" class="picker-rbg__input" min="0" max="255"></div><div class="picker-rbg__row picker-rbg__row--b"><span class="picker-rbg__text">B: </span><input name="blue" type="number" class="picker-rbg__input" min="0" max="255"></div></form></div><div class="rgb__sliders sliders-rgb"><div class="sliders-rgb__item"><div class="sliders-rgb__icon sliders-rgb__icon--left"><svg><use xlink:href="#small-sun"></use></svg></div><div class="sliders-rgb__slider"><input class="sliders-rgb__input" id="brightness" type="range" min="1" max="255" value="0" oninput="brightnessSliderChanged(this)" onchange="changeEventBrightnessSlider(this)"></div><div class="sliders-rgb__icon sliders-rgb__icon--right"><svg><use xlink:href="#big-sun"></use></svg></div></div><div class="sliders-rgb__item"><div class="sliders-rgb__icon sliders-rgb__icon--left"><svg><use xlink:href="#slow"></use></svg></div><div class="sliders-rgb__slider"><input class="sliders-rgb__input" id="speed" type="range" min="1" max="65535" value="0" oninput="speedSliderChanged(this)" onchange="changeEventSpeedSlider(this)"></div><div class="sliders-rgb__icon sliders-rgb__icon--right"><svg><use xlink:href="#fast"></use></svg></div></div></div><div id="favorite-colors" class="rgb__colors colors-rgb"><div class="colors-rgb__row"><div class="colors-rgb__item"><span class="colors-rgb__plus">+</span></div><div class="colors-rgb__item"><span class="colors-rgb__plus">+</span></div><div class="colors-rgb__item"><span class="colors-rgb__plus">+</span></div><div class="colors-rgb__item"><span class="colors-rgb__plus">+</span></div><div class="colors-rgb__item"><span class="colors-rgb__plus">+</span></div><div class="colors-rgb__item"><span class="colors-rgb__plus">+</span></div></div></div><div id="favorite-modes" class="rbg__modes modes-rgb"><div class="modes-rgb__row"><button class="modes-rgb__item"><div class="modes-rgb__plus">+</div><div class="modes-rgb__name"></div></button><button class="modes-rgb__item"><div class="modes-rgb__plus">+</div><div class="modes-rgb__name"></div></button><button class="modes-rgb__item"><div class="modes-rgb__plus">+</div><div class="modes-rgb__name"></div></button><button class="modes-rgb__item"><div class="modes-rgb__plus">+</div><div class="modes-rgb__name"></div></button></div></div></div></div><div class="power-btn on"><button class="power-btn__btn"><svg class=\'power-btn__svg power-btn__on\'><use xlink:href="#led on"></use></svg><svg class=\'power-btn__svg power-btn__off\'><use xlink:href="#led off"></use></svg></button></div></section><section class="modes"><div class="container"><div class="modes__wrap"></div></div></section><div class="favorite-popup"><div class="favorite-popup__wrap"><div class="favorite-popup__content"><div class="favorite-popup__row"><div class="favorite-popup__icon"></div><div class="favorite-popup__text">Удалить</div></div></div></div></div><template id="modes-item"><div class="modes__item"><div class="modes__name"></div></div></template>';