class ConnectionComponent extends HTMLElement {
    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: 'open' })
    }
    static get observedAttributes() {
        return ['connected', 'ip', 'password']
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        this.render()
    }
    connectedCallback() {
        this.render()
    }
    template() {
        return `
            <style>
                :host {
                  display: block;
                  margin-bottom: 10px;
                  font-size: 16px;
                }
                #connection input {
                    font-size: 16px;
                    background: inherit;
                }
                #connection {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                }
                #connection input[name=ip],
                #connection input[name=password] {
                    flex-grow: 2;
                }
            </style>
            <form id="connection">
                <input type="text" name="ip" placeholder="ip address" value="${this.get('ip')}">
                <input type="password" name="password" placeholder="password" value="${this.get('password')}">
                <input type="submit" name="connect" value="connect" ${this.get('connected')?'disabled':''}>
            </form>
        `
    }
    render() {
        this.shadowRoot.innerHTML = this.template()
        let connectionForm = this.shadowRoot.querySelector('#connection')
        connectionForm.addEventListener('submit', this.connectHandler.bind(this))
    }
    get(attr) {
        if(this.hasAttribute(attr)) {
            return this.getAttribute(attr)
        } else {
            return ''
        }
    }
    connectHandler(e) {
        e.preventDefault()
        let connectionForm = this.shadowRoot.querySelector('#connection')
        this.dispatchEvent(
            new CustomEvent('connect', {
                detail: {
                    ip: connectionForm.ip.value,
                    password: connectionForm.password.value
                }
            })
        )
        return false
    }
}
customElements.define('webrepl-connection', ConnectionComponent)
