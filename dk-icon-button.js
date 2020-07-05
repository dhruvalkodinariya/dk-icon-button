import { LitElement, html ,css} from 'lit-element';
import { styleMap } from "lit-html/directives/style-map";

import '@dhruval/dk-icon/dk-icon.js';
import '@dhruval/dk-ripple/dk-ripple.js';

export class DkIconButton extends LitElement {
  static get styles(){
    return[
      css`
        :host{
          display: inline-block;
          outline: none;
          --dk-disabled-icon-back-color: rgba(0, 0, 0, 0.06);
        }

        :host([hidden]) {
          display: none; 
        }

        :host([disabled]){
          pointer-events: none;
        } 

        button:focus dk-icon {
          --dk-icon-color: var(--dk-icon-color-active, rgba(0, 0, 0, 0.87));
        }

        :host(:not([disabled]):not([touch-device])) button:hover  {
          background-color: rgba(0, 0, 0, 0.04);
        }

        button {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          width: 40px;
          height: 40px; 
          background: transparent;
          border: none;
          outline: none;
          cursor: pointer;
          padding: var(--dk-icon-button-padding, 12px);
          margin: 0px;
          overflow: hidden;
          border-radius: 50%;
        }
      `
    ];
  }

  static get properties() {
    return {
      /**
       * name of icon
       */
      icon: { type: String },

      /**
       * `true` if icon needs to be show as a disabled
       */
      disabled: { type: Boolean, reflect: true },

      /**
       * size of icon. default size is 24.
       */
      iconSize: { type: Number },

      /**
       * `true` if icon needs to be show as active
       */
      active: { type: Boolean },

      /**
       *  No default value. So, default icon container size is it's parent height and width. If buttonSize is exists then icon container size base on `buttonSize` property.
       */
      buttonSize: { type: Number }
    };
  }

  render() {
    return html`
        <button style=${this._buttonStyle()} 
        tabindex="${this.disabled ? -1 : ''}" 
        @touchstart="${this._onClick}" 
        @mousedown="${this._onClick}">
        <dk-icon 
          .name="${this.icon}" 
          .size=${this.iconSize} 
          ?disabled="${this.disabled}"
          ?active="${this.active}">
        </dk-icon>
        <dk-ripple unbounded ?disabled="${this.disabled}"></dk-ripple>
      </button>`
  }

  _buttonStyle() {
    if(!this.buttonSize) {
      return '';
    }
    
    let padding = (this.buttonSize - (this.iconSize || 24)) / 2;
    return styleMap({ width: this.buttonSize + 'px', height: this.buttonSize + 'px', padding: padding + 'px'});
  }

  _onClick() {
    /**
    * call blur method to fix ripple effect after icon click.
    */
    setTimeout(() => {
      this.shadowRoot.querySelector('button').blur();
    }, 350);
  }

  constructor() {
    super();
    this.disabled = false;
    this.active = false;
  }
}
customElements.define('dk-icon-button', DkIconButton);