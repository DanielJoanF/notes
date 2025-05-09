class LoadingIndicator extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.render();
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <style>
          .loader {
            width: fit-content;
            font-weight: bold;
            font-family: monospace;
            font-size: 30px;
            color: #0000;
            overflow: hidden;
            animation: l9 5s infinite cubic-bezier(0.3,1,0,1);
            display: none;
          }
          .loader:before {
            content: "Loading...";
          }
          @keyframes l9 {
            0%  {text-shadow: 0    0 #000, 11ch 0 #8A9B0F, 22ch 0 #C02942, 33ch 0 #00A0B0, 44ch 0 #000;}
            25% {text-shadow:-11ch 0 #000,  0ch 0 #8A9B0F, 11ch 0 #C02942, 22ch 0 #00A0B0, 33ch 0 #000;}
            50% {text-shadow:-22ch 0 #000,-11ch 0 #8A9B0F,  0ch 0 #C02942, 11ch 0 #00A0B0, 22ch 0 #000;}
            75% {text-shadow:-33ch 0 #000,-22ch 0 #8A9B0F,-11ch 0 #C02942,  0ch 0 #00A0B0, 11ch 0 #000;}
            100%{text-shadow:-44ch 0 #000,-33ch 0 #8A9B0F,-22ch 0 #C02942,-11ch 0 #00A0B0,  0ch 0 #000;}
          }
          .loader.show {
            display: block;
          }
        </style>
        <div class="loader"></div>
      `;
    }
  
    show() {
      this.shadowRoot.querySelector('.loader').classList.add('show');
    }
  
    hide() {
      this.shadowRoot.querySelector('.loader').classList.remove('show');
    }
  }
  
  customElements.define('loading-indicator', LoadingIndicator);
  
  export default LoadingIndicator;