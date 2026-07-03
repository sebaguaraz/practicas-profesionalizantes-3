class WCLoginFormView extends HTMLElement {

    constructor() {

        super()

        this.content_main = document.createElement("div")

        this.div1 = this.createDiv("w3-center w3-padding-16")

        this.imgSingIn = document.createElement("img")

        this.parragraph1 = document.createElement("p")

        this.div2 = this.createDiv("w3-margin-bottom")

        this.inputUsername = document.createElement("input")

        this.div3 = this.createDiv("w3-margin-bottom")

        this.inputPassword = document.createElement("input")

        this.buttonSignIn = document.createElement("button")

        this.div4 = this.createDiv("w3-center w3-margin-bottom w3-opacity")
        
        this.div5 = this.createDiv("w3-center w3-border-top")

        this.parragraph2 = document.createElement("p")

        this.enlaceRegister = document.createElement("a")


        this.insertStyleLogin()

        this.appendChild(this.content_main)

        this.content_main.appendChild(this.div1)
        this.div1.appendChild(this.imgSingIn)
        this.div1.appendChild(this.parragraph1)

        this.content_main.appendChild(this.div2)
        this.div2.appendChild(this.inputUsername)

        this.content_main.appendChild(this.div3)
        this.div3.appendChild(this.inputPassword)

        this.content_main.appendChild(this.buttonSignIn)

        this.content_main.appendChild(this.div4)
        
        this.content_main.appendChild(this.div5)
        this.div5.appendChild(this.parragraph2)
        this.parragraph2.appendChild(this.enlaceRegister)


    }

    insertStyleLogin() {

        this.className = "w3-main"
        this.style.marginTop = "54px"
        this.style.padding = "16px 32px"
        this.style.display = "flex"

        this.content_main.className = "w3-auto w3-white w3-round w3-margin-bottom w3-border"
        this.content_main.style.width = "380px"

        this.imgSingIn.src = "./assets/admin-logo.png"
        this.imgSingIn.alt = "w3mix"
        this.imgSingIn.className = "w3-image"

        this.parragraph1.textContent = "SIGN IN"

        this.inputUsername.type = "text"
        this.inputUsername.className = "w3-input w3-round w3-border"
        this.inputUsername.placeholder = "Enter Username"

        this.inputPassword.type = "password"
        this.inputPassword.className = "w3-input w3-round w3-border"
        this.inputPassword.placeholder = "Enter Password"

        this.buttonSignIn.type = "button"
        this.buttonSignIn.className = "w3-button w3-round w3-margin-bottom w3-primary w3-block"
        this.buttonSignIn.textContent = "Sign In"

        // this.div4.textContent= "Sign In With"
    
        this.parragraph2.className ="w3-margin w3-text-warning" 
        this.parragraph2.textContent = "Do not have an account? "

        this.enlaceRegister.href ="register.html"
        this.enlaceRegister.textContent = "Sign Up here"

    }


    createDiv(params) {

        const div = document.createElement("div")
        div.className = params

        return div

    }


    connectedCallback() { }


    disconnectedCallback() { }


}


customElements.define("wc-login", WCLoginFormView)



function main() {

    const loginFormWC = new WCLoginFormView()

    document.body.appendChild(loginFormWC)

}

window.onload = main