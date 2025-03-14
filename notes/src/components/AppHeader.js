class AppHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        header {
          background: linear-gradient(135deg, #0d47a1, #1976d2);
          color: white;
          padding: 20px;
          text-align: center;
          font-size: 1.8em;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 2px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          transition: transform 0.3s ease-in-out;
        }
        header:hover {
          transform: scale(1.05);
        }
        .logo {
          font-size: 1.2em;
          font-weight: normal;
          display: block;
          margin-top: 5px;
          opacity: 0.8;
        }
      </style>
      <header>
        📒 Web Notes App
      </header>
    `;
  }
}

customElements.define('app-header', AppHeader);

export default AppHeader;