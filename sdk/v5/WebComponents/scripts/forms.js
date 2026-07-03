class WCRegisterFormView  extends HTMLElement {

    constructor(){

        super()

        this.h3 = document.createElement("h3")

        this.article = document.createElement("article")

        this.header = document.createElement("header")

        this.form = document.createElement("form")

        this.div1 = this.createDiv("w3-row w3-margin-bottom")
        this.labelName = document.createElement("label")
        this.inputName = document.createElement("input")

        this.div2 = this.createDiv("w3-row w3-margin-bottom")
        this.labelEmail = document.createElement("label")   
        this.inputEmail = document.createElement("input")

        this.div3 = this.createDiv("w3-row w3-margin-bottom")
        this.labelMobileNumber = document.createElement("label")
        this.inputMobileNumber = document.createElement("input")
        
        this.div4 = this.createDiv("w3-row w3-margin-bottom")
        this.labelPassword = document.createElement("label")
        this.inputPassword = document.createElement("input")

        this.div5 = this.createDiv("w3-row w3-margin-bottom")
        this.labelConfirmPassword = document.createElement("label")
        this.inputConfirmPassword = document.createElement("input")

        this.div6 = this.createDiv("w3-row w3-margin-bottom")
        this.labelAgreeTerms = document.createElement("label")
        this.inputAgreeTerms = document.createElement("input")

        this.div7 = this.createDiv("w3-row w3-margin-bottom")
        this.div_contentButton = this.createDiv("w3-col l2 w3-col l10")
        this.buttonRegister = document.createElement("button")
        this.iconRegister = document.createElement("i")
        this.iconRegister.className ="fa fa-fw fa-lock"



        this.insertStyleHorizontalForm()

        this.appendChild(this.h3)
        this.appendChild(this.article)
        this.article.appendChild(this.header)
        this.article.appendChild(this.form)
        this.form.appendChild(this.div1)
        this.div1.appendChild(this.labelName)
        this.div1.appendChild(this.inputName)

        this.form.appendChild(this.div2)
        this.div2.appendChild(this.labelEmail)
        this.div2.appendChild(this.inputEmail)
        this.form.appendChild(this.div3)
        this.div3.appendChild(this.labelMobileNumber)
        this.div3.appendChild(this.inputMobileNumber)
        this.form.appendChild(this.div4)
        this.div4.appendChild(this.labelPassword)
        this.div4.appendChild(this.inputPassword)
        this.form.appendChild(this.div5)
        this.div5.appendChild(this.labelConfirmPassword)
        this.div5.appendChild(this.inputConfirmPassword)
        this.form.appendChild(this.div6)
        this.div6.appendChild(this.labelAgreeTerms)
        this.labelAgreeTerms.appendChild(this.inputAgreeTerms)

        this.form.appendChild(this.div7)
        this.div7.appendChild(this.div_contentButton)
        this.div_contentButton.appendChild(this.buttonRegister)
        this.buttonRegister.appendChild(this.iconRegister)
        this.buttonRegister.append(" Register")
    }

    createDiv(paramsClassName){
        const div = document.createElement("div")
        div.className = paramsClassName

        return div
    }


    insertStyleHorizontalForm(){
        this.className ="w3-main" 
        this.style="margin-top:54px; padding:16px 32px; display:block"
        
        
        this.h3.textContent = "Form Layouts"

        this.article.className ="w3-white w3-round w3-margin-bottom w3-border"

        this.header.className ="w3-padding-large w3-large w3-border-bottom"

        this.header.style="font-weight: 500"

        this.header.textContent = "HORIZONTAL FORM"

        this.form.className ="w3-padding-large"

        this.labelName.htmlFor ="input-1"
        this.labelName.className="w3-col l2"
        this.labelName.textContent = "Name"

        this.inputName.type="text"
        this.inputName.className ="w3-input w3-border w3-round w3-col l10"
        this.inputName.placeholder ="Enter Your Name"

        this.labelEmail.htmlFor ="input-1"
        this.labelEmail.className ="w3-col l2"
        this.labelEmail.textContent = "Email"

        this.inputEmail.type="email"
        this.inputEmail.className ="w3-input w3-border w3-round w3-col l10"
        this.inputEmail.placeholder="Enter Your Email Address"

        this.labelMobileNumber.htmlFor ="input-1"
        this.labelMobileNumber.className ="w3-col l2"
        this.labelMobileNumber.textContent = "Mobile Number"

        this.inputMobileNumber.type="number"
        this.inputMobileNumber.className ="w3-col l10 w3-input w3-border w3-round"
        this.inputMobileNumber.placeholder="Enter Your Mobile Number"

        this.labelPassword.htmlFor ="input-1"
        this.labelPassword.className ="w3-col l2"
        this.labelPassword.textContent = "Password"

        this.inputPassword.type="password"
        this.inputPassword.className ="w3-col l10 w3-input w3-border w3-round"
        this.inputPassword.placeholder="Enter Password"

        this.labelConfirmPassword.htmlFor="input-1"
        this.labelConfirmPassword.className ="w3-col l2"
        this.labelConfirmPassword.textContent = "Confirm Password"

        this.inputConfirmPassword.className ="w3-col l10 w3-input w3-border w3-round"
        this.inputConfirmPassword.type= "password"
        this.inputConfirmPassword.placeholder = "Confirm Password"

        this.inputAgreeTerms.className ="w3-check"
        this.inputAgreeTerms.checked =""
        this.inputAgreeTerms.type = "checkbox"
        this.labelAgreeTerms.className ="w3-col l2 w3-col l10"
        this.labelAgreeTerms.textContent = "I Agree Terms & Conditions "

        this.buttonRegister.className ="w3-button w3-primary w3-round"
        this.buttonRegister.type = "button"
        // this.buttonRegister.textContent = "Register"
        this.iconRegister.className ="fa fa-fw fa-lock"
    
    }

    connectedCallback(){}
    disconnectedCallback(){}

}



customElements.define("wc-register-form", WCRegisterFormView)


function main(){

    const registerForm = new WCRegisterFormView()

    document.body.appendChild(registerForm)

}


window.onload = main