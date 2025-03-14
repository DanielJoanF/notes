class NoteItem extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    static get observedAttributes() {
      return ['title', 'body', 'id'];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      this.render();
    }
  
    render() {
      const title = this.getAttribute('title') || '';
      const body = this.getAttribute('body') || '';
      const id = this.getAttribute('id') || '';
  
      this.shadowRoot.innerHTML = `
        <style>
          .note {
            background: #ffffff;
            padding: 15px;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            border-left: 5px solid #1976d2;
            margin-bottom: 10px;
          }
          
          h3 {
            margin-top: 0;
            color: #0d47a1;
          }
          
          .delete-btn {
            background: #d32f2f;
            color: white;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
            margin-top: 10px;
            border-radius: 5px;
          }
          
          .delete-btn:hover {
            background: #b71c1c;
          }
        </style>
        <div class="note">
          <h3>${title}</h3>
          <p>${body}</p>
          <button class="delete-btn" data-id="${id}">Hapus</button>
        </div>
      `;
  
      this.shadowRoot.querySelector('.delete-btn').addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('delete-note', {
          bubbles: true,
          composed: true,
          detail: { id }
        }));
      });
    }
  }
  
  customElements.define('note-item', NoteItem);
  
  export default NoteItem;