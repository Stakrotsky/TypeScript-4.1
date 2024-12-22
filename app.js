var WeatherSoundsApp = /** @class */ (function () {
    function WeatherSoundsApp() {
        this.buttons = {};
        this.sounds = {};
        this.currentSound = null;
        this.backgrounds = {
            rain: "url('src/assets/rainy-bg.jpg')",
            summer: "url('src/assets/summer-bg.jpg')",
            winter: "url('src/assets/winter-bg.jpg')",
        };
        this.icons = [
            { id: "rain", src: "src/assets/icons/cloud-rain.svg", alt: "Rain" },
            { id: "summer", src: "src/assets/icons/sun.svg", alt: "Summer" },
            { id: "winter", src: "src/assets/icons/cloud-snow.svg", alt: "Winter" },
        ];
        this.soundsData = {
            rain: "/src/assets/sounds/rain.mp3",
            summer: "src/assets/sounds/summer.mp3",
            winter: "src/assets/sounds/winter.mp3",
        };
        this.container = this.createContainer();
        this.volumeControl = this.createVolumeControl();
        this.initializeSounds();
        var defaultVolume = 0.5;
        for (var key in this.sounds) {
            if (Object.prototype.hasOwnProperty.call(this.sounds, key)) {
                this.sounds[key].volume = defaultVolume;
            }
        }
        this.changeBackground("summer");
        this.initEventListeners();
    }
    WeatherSoundsApp.prototype.createContainer = function () {
        var container = document.createElement("div");
        container.className = "container";
        var title = this.createTitle("Weather Sounds");
        container.appendChild(title);
        var buttonContainer = this.createButtonContainer();
        container.appendChild(buttonContainer);
        document.body.appendChild(container);
        return container;
    };
    WeatherSoundsApp.prototype.createTitle = function (text) {
        var title = document.createElement("h1");
        title.className = "title";
        title.textContent = text;
        return title;
    };
    WeatherSoundsApp.prototype.createButtonContainer = function () {
        var _this = this;
        var buttonContainer = document.createElement("div");
        buttonContainer.id = "buttons";
        buttonContainer.className = "button-container";
        this.icons.forEach(function (_a) {
            var id = _a.id, src = _a.src, alt = _a.alt;
            var button = _this.createButton(id, src, alt);
            buttonContainer.appendChild(button);
            _this.buttons[id] = button;
        });
        return buttonContainer;
    };
    WeatherSoundsApp.prototype.createButton = function (id, src, alt) {
        var button = document.createElement("button");
        button.id = id;
        button.className = "icon-button";
        var background = this.backgrounds[id];
        if (background) {
            button.style.background = "".concat(background, " no-repeat center center");
            button.style.backgroundSize = "cover";
        }
        var img = document.createElement("img");
        img.src = src;
        img.alt = alt;
        button.appendChild(img);
        return button;
    };
    WeatherSoundsApp.prototype.createVolumeControl = function () {
        var volumeContainer = document.createElement("div");
        volumeContainer.className = "volume-container";
        var volumeSlider = document.createElement("input");
        volumeSlider.type = "range";
        volumeSlider.id = "volume";
        volumeSlider.className = "volume-slider";
        volumeSlider.min = "0";
        volumeSlider.max = "1";
        volumeSlider.step = "0.01";
        volumeSlider.value = "0.5";
        volumeContainer.appendChild(volumeSlider);
        this.container.appendChild(volumeContainer);
        return volumeSlider;
    };
    WeatherSoundsApp.prototype.initializeSounds = function () {
        for (var key in this.soundsData) {
            if (Object.prototype.hasOwnProperty.call(this.soundsData, key)) {
                this.sounds[key] = new Audio(this.soundsData[key]);
            }
        }
    };
    WeatherSoundsApp.prototype.initEventListeners = function () {
        var _this = this;
        Object.keys(this.buttons).forEach(function (soundKey) {
            _this.buttons[soundKey].addEventListener("click", function () {
                return _this.toggleSoundAndBackground(soundKey);
            });
        });
        this.volumeControl.addEventListener("input", function () {
            var volume = parseFloat(_this.volumeControl.value);
            var percentage = volume * 100;
            _this.updateSliderBackground(percentage);
            if (_this.currentSound) {
                _this.currentSound.volume = volume;
            }
        });
    };
    WeatherSoundsApp.prototype.updateSliderBackground = function (percentage) {
        this.volumeControl.style.background = "linear-gradient(to right, #007bff ".concat(percentage, "%, #ffffff ").concat(percentage, "%)");
    };
    WeatherSoundsApp.prototype.toggleSoundAndBackground = function (soundKey) {
        var selectedSound = this.sounds[soundKey];
        this.changeBackground(soundKey);
        if (this.currentSound && this.currentSound !== selectedSound) {
            this.currentSound.pause();
            this.currentSound.currentTime = 0;
        }
        if (this.currentSound === selectedSound && !this.currentSound.paused) {
            this.currentSound.pause();
        }
        else {
            selectedSound.volume = parseFloat(this.volumeControl.value);
            selectedSound.play();
            this.currentSound = selectedSound;
        }
    };
    WeatherSoundsApp.prototype.changeBackground = function (soundKey) {
        var background = this.backgrounds[soundKey];
        if (background) {
            document.body.style.background = "".concat(background, " no-repeat center center fixed");
            document.body.style.backgroundSize = "cover";
        }
    };
    return WeatherSoundsApp;
}());
new WeatherSoundsApp();
