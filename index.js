class CustomModal extends HTMLElement {
    constructor() {
        super();
        this._modalVisible = false;
        this._modal;
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `		
		<div class="modal-results"></div>
		<button class="open">Modal Aç</button>
		<div class="modal" style="display:none">
			<div class="modal-content">
				<div class="modal-header">
					<slot name="header"><h3>Otomatik Başlık</h3></slot>
				</div>
				<div class="modal-body">
					<slot name="body">Otomatik İçerik</slot>
				</div><br>
				<button class="submit">Evet</button> <button class="close">Iptal</button>
			</div>
		</div>
		`
    }

    connectedCallback() {
        this._modal = this.shadowRoot.querySelector(".modal");
        this.shadowRoot.querySelector("button").addEventListener('click', this._showModal.bind(this));
        this.shadowRoot.querySelector(".close").addEventListener('click', this._hideModal.bind(this));
        this.shadowRoot.querySelector(".submit").addEventListener('click', this._submitModal.bind(this));
    }
    disconnectedCallback() {
        this.shadowRoot.querySelector("button").removeEventListener('click', this._showModal);
        this.shadowRoot.querySelector(".close").removeEventListener('click', this._hideModal);
        this.shadowRoot.querySelector(".submit").removeEventListener('click', this._submitModal);
    }
    _showModal() {
        this._modalVisible = true;
        this._modal.style.display = 'block';
    }
    _hideModal() {
        this._modalVisible = false;
        this._modal.style.display = 'none';
        this.shadowRoot.querySelector(".modal-results").innerHTML = '<span style="color:red">"Iptal"</span>';
    }
    _submitModal() {
        this._modalVisible = false;
        this._modal.style.display = 'none';
        this.shadowRoot.querySelector(".modal-results").innerHTML = '<span style="color:blue">"Evet"</span>';
    }
}
customElements.define('sitemate-modal', CustomModal);