class HeaderWC extends HTMLElement {

    constructor() {

        super()

        // * Creo elementos del componente
        this.divButtons = document.createElement("div")
        this.divProfile = document.createElement("div")

        this.h5 = document.createElement("h5")
        this.a = document.createElement("a")
        this.a.textContent = "W3Admin "

        this.img = document.createElement("img")

        this.label = document.createElement("label")
        this.iconBurger = this.createIcon("fa fa-bars")

        this.bttn1 = this.createButtonHeader("w3-button w3-opacity-min")
        this.iconBuzon = this.createIcon("fa fa-envelope-open")

        this.bttn2 = this.createButtonHeader("w3-button w3-opacity-min")
        this.iconAlert = this.createIcon("fa fa-bell")

        this.profile = this.createIcon("fa fa-fw fa-user fa")

        // * Inserto estilos css a elementos del componente
        this.InsertStyleHeader()


        // * Inserto al DOM a elementos del componente
        this.h5.appendChild(this.a)
        this.a.appendChild(this.img)

        this.label.appendChild(this.iconBurger)

        this.divButtons.appendChild(this.bttn1)
        this.bttn1.appendChild(this.iconBuzon)
        this.divButtons.appendChild(this.bttn2)
        this.bttn2.appendChild(this.iconAlert)


        this.divProfile.appendChild(this.profile)

        this.appendChild(this.h5)
        this.appendChild(this.label)
        this.appendChild(this.divButtons)
        this.appendChild(this.divProfile)

    }


    InsertStyleHeader() {
        // const header = document.createElement("header")
        // const divButtons = document.createElement("div")
        // const divProfile = document.createElement("div")

        this.className = "w3-flex-bar w3-theme w3-left-align"
        this.style = "height:70px; padding:0 10px 0 10px;"


        this.h5.style = "line-height:1; margin:0!important; font-weight:300"
        this.h5.className = "admin-logo w3-bar-item w3-hide-medium w3-hide-small"

        // const a = document.createElement("a")
        this.a.href = "./index.html"
        this.a.className = "w3-button w3-bold"
        // this.a.textContent = "W3Admin"

        // const img = document.createElement("img")
        // this.img.src = "./assets/admin-logo.png"
        this.img.src = "./assets/admin-logo.png"
        this.img.className = "w3-image"
        this.img.width = "26"
        this.img.alt = "w3mix"



        // this.h5.appendChild(this.a)
        // this.a.appendChild(this.img)


        // const label = document.createElement("label")
        this.label.className = "w3-button w3-opacity-min"
        this.label.htmlFor = "sidebar-control"

        // const iconBurger = this.createIcon("fa fa-bars")

        // this.label.appendChild(iconBurger)


        this.divButtons.className = "w3-right"

        // const bttn1 = this.createButtonHeader("w3-button w3-large w3-opacity-min")
        // const iconBuzon = this.createIcon("fa fa-envelope-open")

        // const bttn2 = this.createButtonHeader("w3-button w3-large w3-opacity-min")
        // const iconAlert = this.createIcon("fa fa-bell")

        // this.divButtons.appendChild(this.bttn1)
        // this.bttn1.appendChild(this.iconBuzon)
        // this.divButtons.appendChild(this.bttn2)
        // this.bttn2.appendChild(this.iconAlert)

        this.divProfile.className = "w3-circle w3-center w3-text-white w3-primary w3-button"
        this.divProfile.style = "width:38px; height:38px; display:flex; align-items:center; justify-content:center; "

        // this.profile = this.createIcon("fa fa-fw fa-user fa")
        this.profile.style = "font-size: 15px;"

        // this.divProfile.appendChild(this.profile)

        // this.header.appendChild(this.h5)
        // this.header.appendChild(this.label)
        // this.header.appendChild(this.divButtons)
        // this.header.appendChild(this.divProfile)


    }

    createButtonHeader(paramsBttn) {
        const button = document.createElement("button")
        button.className = paramsBttn
        button.type = "button"

        return button
    }

    createIcon(paramsIcon) {

        const icon = document.createElement("i")
        icon.className = paramsIcon

        return icon

    }

    connectedCallback() { }


    disconnectedCallback() { }

}

class AsideWC extends HTMLElement {

    constructor() {

        super()

        // * Creo elementos del componente
        this.nav = document.createElement("nav")

        this.span1 = document.createElement("span")

        this.a1 = this.createEnlace("./index.html", "Dashboard ", "fa fa-fw fa-bar-chart")
        this.a2 = this.createEnlace("./icons.html", "UI Icons ", "fa fa-fw fa-fire")
        this.a3 = this.createEnlace("./forms.html", "Forms ", "fa fa-fw fa-edit")
        this.a4 = this.createEnlace("./tables.html", "Tables ", "fa fa-fw fa-table")
        this.a5 = this.createEnlace("./profile.html", "Profile ", "fa fa-fw fa-user-circle")
        this.a6 = this.createEnlace("./login.html", "Login ", "fa fa-fw fa-lock")
        this.a7 = this.createEnlace("./register.html", "Registration ", "fa fa-fw fa-sign-in")

        this.span2 = document.createElement("span")


        this.a8 = this.createEnlace("#dashboard", "Important", "fa fa-fw fa-coffee w3-text-danger")
        this.a9 = this.createEnlace("#dashboard", "Warning", "fa fa-fw fa-circle-o-notch w3-text-success")
        this.a10 = this.createEnlace("#dashboard", "Information", "fa fa-fw fa-share-alt w3-text-info")

        // * Inserto estilos a elementos del componente
        this.InsertStyleAside()


        // * Inserto al DOM los elementos del componente
        this.appendChild(this.nav)
        this.nav.appendChild(this.span1)

        this.nav.appendChild(this.a1)
        this.nav.appendChild(this.a2)
        this.nav.appendChild(this.a3)
        this.nav.appendChild(this.a4)
        this.nav.appendChild(this.a5)
        this.nav.appendChild(this.a6)
        this.nav.appendChild(this.a7)

        this.nav.appendChild(this.span2)

        this.nav.appendChild(this.a8)
        this.nav.appendChild(this.a9)
        this.nav.appendChild(this.a10)

    }

    createEnlace(paramsHref, textContent, paramsIconClassName) {

        const a = document.createElement("a")
        a.href = paramsHref
        a.className = "w3-bar-item w3-button w3-padding-large w3-hover-text-primary"

        const icon = document.createElement("i")
        icon.className = paramsIconClassName

        a.appendChild(icon)
        a.append(" " + textContent)

        return a


    }

    InsertStyleAside() {

        this.id = "sidebar"
        this.className = "w3-sidebar w3-top w3-bottom w3-collapse w3-white w3-border-right w3-border-top scrollbar"

        this.style = "z-index:3;width:230px;height:auto;margin-top:70px;border-color:rgba(0, 0, 0, .1)!important"

        this.nav.className = "w3-bar-block"

        this.span1.className = "w3-bar-item w3-padding w3-small w3-opacity"
        this.span1.style = "margin-top:8px"
        this.span1.textContent = "MAIN NAVIGATION"


        this.span2.className = "w3-bar-item w3-padding w3-small w3-opacity"
        this.span2.textContent = "LABELS"



    }



    connectedCallback() { }

    disconnectedCallback() { }



}

class MainWC extends HTMLElement {

    constructor() {

        // * Creo elementos del componente
        super()

        this.span = document.createElement("span")


        // * Inserto estilos a elementos del componente
        this.InsertStyleMain()


        // * Inserto al DOM los elementos del componente
        this.appendChild(this.span)
    }

    InsertStyleMain() {
        this.className = "w3-main";
        this.style = "display:block; margin-top:70px; padding:16px 32px;";

        this.span.style.display = "block";
        this.span.textContent = "Contenido de la Pagina";
    }

    connectedCallback() { }

    disconnectedCallback() { }




}

class FooterWC extends HTMLElement {

    constructor() {

        // * Creo elementos del componente
        super()

        this.span = document.createElement("span")

        this.parragraph = document.createElement("p")
        this.parragraph.textContent = "Powered with ♥ by"

        this.a = document.createElement("a")

        this.strong = document.createElement("strong")
        this.strong.textContent = "W3Mix.com"


        // * Inserto estilos a elementos del componente
        this.InsertStyleFooter()


        // * Inserto al DOM los elementos del componente
        this.appendChild(this.span)
        this.span.appendChild(this.parragraph)
        this.parragraph.appendChild(this.a)
        this.a.appendChild(this.strong)
    }

    InsertStyleFooter() {
        this.className = "w3-padding w3-border-top w3-center w3-white w3-main";
        this.style = "display:block; margin-top:54px; padding:16px 32px;";

        this.span.className = "w3-opacity";
        this.a.href = "https://w3mix.com";
        this.a.target = "_blank";
    }

    connectedCallback() { }

    disconnectedCallback() { }




}


class WCApplicationView extends HTMLElement {

    constructor() {
        super()

        // * contiene al componente HEADER, FOOTER y SIDEBAR
        this.id = "app"

        this.header = new HeaderWC()

        this.aside = new AsideWC()

        this.main = new MainWC()

        this.footer = new FooterWC()

        this.appendChild(this.header)
        this.appendChild(this.aside)
        this.appendChild(this.main)
        this.appendChild(this.footer)

    }


    connectedCallback() {

    }


    disconnectedCallback() {

    }






}



customElements.define("wc-application-view", WCApplicationView)
customElements.define("wc-header", HeaderWC)
customElements.define("wc-aside", AsideWC)
customElements.define("wc-main", MainWC)
customElements.define("wc-footer", FooterWC)


function main() {

    const objectView = new WCApplicationView()

    const input = document.createElement("input")
    input.className = "w3-hide"
    input.type = "checkbox"
    input.id = "sidebar-control"

    document.body.appendChild(input)
    document.body.appendChild(objectView)


}


window.onload = main