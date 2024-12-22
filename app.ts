class WeatherSoundsApp {
  private container: HTMLElement;
  private buttons: Record<string, HTMLButtonElement> = {};
  private sounds: Record<string, HTMLAudioElement> = {};
  private currentSound: HTMLAudioElement | null = null;
  private volumeControl: HTMLInputElement;

  private readonly backgrounds: Record<string, string> = {
    rain: "url('src/assets/rainy-bg.jpg')",
    summer: "url('src/assets/summer-bg.jpg')",
    winter: "url('src/assets/winter-bg.jpg')",
  };

  private readonly icons = [
    { id: "rain", src: "src/assets/icons/cloud-rain.svg", alt: "Rain" },
    { id: "summer", src: "src/assets/icons/sun.svg", alt: "Summer" },
    { id: "winter", src: "src/assets/icons/cloud-snow.svg", alt: "Winter" },
  ];

  private readonly soundsData: Record<string, string> = {
    rain: "/src/assets/sounds/rain.mp3",
    summer: "src/assets/sounds/summer.mp3",
    winter: "src/assets/sounds/winter.mp3",
  };

  constructor() {
    this.container = this.createContainer();
    this.volumeControl = this.createVolumeControl();
    this.initializeSounds();
    const defaultVolume = 0.5;
    for (const key in this.sounds) {
      if (Object.prototype.hasOwnProperty.call(this.sounds, key)) {
        this.sounds[key].volume = defaultVolume;
      }
    }

    this.changeBackground("summer");
    this.initEventListeners();
  }

  private createContainer(): HTMLElement {
    const container = document.createElement("div");
    container.className = "container";

    const title = this.createTitle("Weather Sounds");
    container.appendChild(title);

    const buttonContainer = this.createButtonContainer();
    container.appendChild(buttonContainer);

    document.body.appendChild(container);
    return container;
  }

  private createTitle(text: string): HTMLElement {
    const title = document.createElement("h1");
    title.className = "title";
    title.textContent = text;
    return title;
  }

  private createButtonContainer(): HTMLElement {
    const buttonContainer = document.createElement("div");
    buttonContainer.id = "buttons";
    buttonContainer.className = "button-container";

    this.icons.forEach(({ id, src, alt }) => {
      const button = this.createButton(id, src, alt);
      buttonContainer.appendChild(button);
      this.buttons[id] = button;
    });

    return buttonContainer;
  }

  private createButton(
    id: string,
    src: string,
    alt: string
  ): HTMLButtonElement {
    const button = document.createElement("button");
    button.id = id;
    button.className = "icon-button";

    const background = this.backgrounds[id];
    if (background) {
      button.style.background = `${background} no-repeat center center`;
      button.style.backgroundSize = "cover";
    }

    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;

    button.appendChild(img);
    return button;
  }

  private createVolumeControl(): HTMLInputElement {
    const volumeContainer = document.createElement("div");
    volumeContainer.className = "volume-container";

    const volumeSlider = document.createElement("input");
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
  }

  private initializeSounds(): void {
    for (const key in this.soundsData) {
      if (Object.prototype.hasOwnProperty.call(this.soundsData, key)) {
        this.sounds[key] = new Audio(this.soundsData[key]);
      }
    }
  }

  private initEventListeners(): void {
    Object.keys(this.buttons).forEach((soundKey) => {
      this.buttons[soundKey].addEventListener("click", () =>
        this.toggleSoundAndBackground(soundKey)
      );
    });

    this.volumeControl.addEventListener("input", () => {
      const volume = parseFloat(this.volumeControl.value);
      const percentage = volume * 100;
      this.updateSliderBackground(percentage);
      if (this.currentSound) {
        this.currentSound.volume = volume;
      }
    });
  }

  private updateSliderBackground(percentage: number): void {
    this.volumeControl.style.background = `linear-gradient(to right, #007bff ${percentage}%, #ffffff ${percentage}%)`;
  }

  private toggleSoundAndBackground(soundKey: string): void {
    const selectedSound = this.sounds[soundKey];
    this.changeBackground(soundKey);

    if (this.currentSound && this.currentSound !== selectedSound) {
      this.currentSound.pause();
      this.currentSound.currentTime = 0;
    }

    if (this.currentSound === selectedSound && !this.currentSound.paused) {
      this.currentSound.pause();
    } else {
      selectedSound.volume = parseFloat(this.volumeControl.value);
      selectedSound.play();
      this.currentSound = selectedSound;
    }
  }

  private changeBackground(soundKey: string): void {
    const background = this.backgrounds[soundKey];
    if (background) {
      document.body.style.background = `${background} no-repeat center center fixed`;
      document.body.style.backgroundSize = "cover";
    }
  }
}

new WeatherSoundsApp();
