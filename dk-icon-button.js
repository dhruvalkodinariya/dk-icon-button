import { LitElement, html ,css} from 'lit-element';
import {MDCIconButtonStyle} from './mdc-icon-button-css';
import {MDCIconButtonToggle} from '@material/icon-button';
import '@dhruval/dk-icon/dk-icon.js';
import '@dhruval/dk-ripple/dk-ripple.js';

export class DkIconButton extends LitElement {
  static get styles(){
    return[
      MDCIconButtonStyle,
      css`
        :host{
          --dk-disabled-icon-back-color: rgba(0, 0, 0, 0.06);
        }
        :host(:hover) dk-icon{
          --dk-icon-color:var(--dk-icon-color-active);
        }

        :host([disabled]) .mdc-icon-button{
          background-color:var(--dk-disabled-icon-back-color);
          border-radius:50%;
        }
      `
    ];
  }

  static get properties() {
    return {
      icon: { type: String },
      onIcon: { type: String },
      offIcon: { type: String },
      toggleButton: { type: Boolean },
      isOn: { type: Boolean },
      disabled: { type: Boolean },
      title: String
    };
  }

  render() {
    return html`
      ${!this.toggleButton ? html`
        <button class="mdc-icon-button" ?disabled="${this.disabled}">
          <dk-icon name="${this.icon}" ?disabled="${this.disabled}"></dk-icon>
          <dk-ripple unbounded></dk-ripple>
        </button>` : html``
      }

      ${this.toggleButton ? html`
        <button class="mdc-icon-button" aria-label="${this.title}" aria-pressed="true" ?disabled="${this.disabled}">
          <dk-icon class="mdc-icon-button__icon mdc-icon-button__icon--on" name="${this.onIcon}" ?disabled="${this.disabled}"></dk-icon>
          <dk-icon class="mdc-icon-button__icon" name="${this.offIcon}" ?disabled="${this.disabled}"></dk-icon>
        </button>` : html``
      }
    `;
  }

  firstUpdated(){
    this._iconToggle = new MDCIconButtonToggle(this.shadowRoot.querySelector('.mdc-icon-button'));
    if(this.toggleButton && this.isOn)
      this._iconToggle.on = this.isOn;
  }

  connectedCallback(){
    super.connectedCallback()
    this.addEventListener('click',this._clickToggle);
  }

  disconnectedCallback(){
    super.disconnectedCallback()
    this.removeEventListener('click',this._clickToggle);
  }

  _clickToggle(e){
    setTimeout(()=>{
      this.shadowRoot.querySelector('.mdc-icon-button').blur();
    })
    
    if(this.toggleButton){
      this.isOn = !this.isOn;
      const clickToggle = new CustomEvent('change',{
        detail: { val: this.isOn },
        bubbles: true,
        composed: true
      })
      this.dispatchEvent(clickToggle);
    }
  }
}
customElements.define('dk-icon-button', DkIconButton);