import { LitElement, html ,css} from 'lit-element';
import '../dk-icon-button';

export class DkIconButtonDemo extends LitElement {
static get styles(){
  return[
    css`
      :host{
        display:block;
      }

      dk-icon-button{
        --dk-icon-color: rgba(0, 0, 0, 0.6);
        --dk-icon-color-active: rgba(0, 0, 0, 0.87);
        --dk-icon-color-disabled: rgba(0, 0, 0, 0.38);
      }
    `
  ];
}
  render() {
    return html`
      <h3>Toggle icon button</h3>
      <dk-icon-button icon="cloud_download"></dk-icon-button>
      <dk-icon-button icon="cloud_download" buttonSize="30" iconSize="16"></dk-icon-button>
      <h4>Disabled</h4>
      <dk-icon-button icon="polymer" disabled></dk-icon-button>
      
      
      
    `;
  }
}
customElements.define('dk-icon-button-demo', DkIconButtonDemo);