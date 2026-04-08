document.addEventListener("DOMContentLoaded", main);


function main() {

    const name = document.getElementById("nombre");
    const stock = document.getElementById("stock_numerico");
    const price = document.getElementById("price");
    const units = document.getElementById("units");
    const form = document.getElementById("form_create_materials");
    const form_update = document.querySelector(".form_update_materials")
    const form_decrement = document.querySelector(".form_decrement_materials")

    const message = document.getElementById("message");
    const tbody_materials = document.querySelector(".tbody_materials");

    form.addEventListener("submit", SendForm);

    form_decrement.addEventListener("submit", formDecrementMaterial);

    showMaterials();

    async function SendForm(event) {
        event.preventDefault();

        if (!name.value || name.value.trim() === "") {
            message.textContent = "Debe ingresar el nombre del material como prioridad";
            return;
        }

        if (isNaN(price.value) || !price.value || Number(price.value) <= 0) {
            message.textContent = "Debe ingresar un precio entero sin caracteres y mayor a 0"
            return;
        }

        if (stock.value <= 0 || !stock.value) {
            message.textContent = "Debe ingresar un stock mayor a 0";
            return;
        }

        const units_declared = ["kg", "m^3", "unidad"];

        if (!units_declared.includes(units.value)) {
            message.textContent = "Debe ingresar una unidad valida como kg, m^3 o unidad";
            return;
        }

        const data = {
            name: name.value,
            stock: Number(stock.value),
            price: Number(price.value),
            units: units.value
        }

        try {
            // * envia la ruta al servidor y un objeto con las caracteristicas
            const response = await fetch(`/api/createMaterials`, {
                method: "POST",
                // * especifica el tipo de contenido osea en formato JSON osea texto
                headers: { "Content-type": "application/json" },
                // * transforma los datos a formato JSON 
                body: JSON.stringify(data)
            })

            // * luego recibe la respuesta del servidor y se convierte a un objeto
            const result = await response.json();
            if (!response.ok) {

                message.textContent = result.message;

                setTimeout(() => {
                    message.textContent = "";
                }, 3000);

                return;
            }

            message.textContent = result.message;

            form.reset();

            showMaterials();


            setTimeout(() => {
                message.textContent = "";
            }, 3000);


        } catch (error) {

            message.textContent = error.message;

            setTimeout(() => {
                message.textContent = "";
            }, 3000);

        }
    }



    async function showMaterials() {

        try {
            const ObjectData = {
                method: "GET"
            };
            const response = await fetch(`/api/getMaterials`, ObjectData);

            const ArrayMaterials = await response.json();


            if (!response.ok) {

                message.textContent = ArrayMaterials.message;

                setTimeout(() => {
                    message.textContent = "";
                }, 3000);

                return;
            }



            if (ArrayMaterials.length === 0) {
                tbody_materials.innerHTML = `<tr>
                        <td colspan="10">No hay elementos aun en la tabla...</td>
                    </tr>`;
                return;
            }

            tbody_materials.innerHTML = "";

            ArrayMaterials.forEach((material) => {
                const tr = document.createElement("tr");
                const td_id = document.createElement("td");
                const td_name = document.createElement("td");
                const td_stock = document.createElement("td");
                const td_price = document.createElement("td");
                const td_units = document.createElement("td");
                const td_state = document.createElement("td");
                const td_actions = document.createElement("td");
                const button_update = document.createElement("button");
                const button_cancel = document.createElement("button");

                td_id.textContent = material.id;
                td_name.textContent = material.name;
                td_stock.textContent = material.stock;
                td_price.textContent = `$ ${material.price}`;
                td_units.textContent = material.units;
                td_state.textContent = material.state;

                button_update.textContent = "Actualizar";
                button_update.value = material.id;
                button_update.addEventListener("click", (e) => {

                    form_update.classList.remove("form_update_materials");

                    const ID = document.getElementById("id_material");
                    ID.textContent = `Material ID: ${material.id}`

                    const idMaterial = e.target.value;

                    form_update.addEventListener("submit", (e) => {
                        e.preventDefault();
                        formUpdateMaterial(idMaterial)
                    });

                })

                button_cancel.textContent = "Cancelar";
                button_cancel.addEventListener("click", () => {
                    form_update.classList.add("form_update_materials");
                })

                tr.appendChild(td_id);
                tr.appendChild(td_name);
                tr.appendChild(td_stock);
                tr.appendChild(td_price);
                tr.appendChild(td_units);
                tr.appendChild(td_state);
                td_actions.appendChild(button_update);
                td_actions.appendChild(button_cancel);
                tr.appendChild(td_actions);

                tbody_materials.appendChild(tr);
            })





        } catch (error) {

            message.textContent = error.message;

            setTimeout(() => {
                message.textContent = "";
            }, 3000);
        }

    }



    async function formUpdateMaterial(idMaterial) {
        try {

            const objectForm = new FormData(form_update);
            const form = Object.fromEntries(objectForm);

            const ObjectData = {
                method: "PUT",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(form)
            }
            const response = await fetch(`/api/updateMaterials/increment/${idMaterial}`, ObjectData);

            const result = await response.json();
            if (!response.ok) {

                message.textContent = result.message;

                setTimeout(() => {
                    message.textContent = "";
                }, 3000);

                return;
            }
            message.textContent = result.message || "Material actualizado correctamente";

            form_update.reset();
            form_update.classList.add("form_update_materials");

            showMaterials();

            setTimeout(() => {
                message.textContent = "";
            }, 3000);


        } catch (error) {
            message.textContent = `error en el servidor, ${error.message}`;

            setTimeout(() => {
                message.textContent = "";
            }, 3000);
        }


    }


    async function formDecrementMaterial(e) {
        e.preventDefault();

        const idMaterial = document.getElementById("idMaterial").value;
        const stockMaterial = e.target.stock.value;

        if (!idMaterial || isNaN(idMaterial)) {
            message.textContent = "El ID del material debe ser un entero";
            return;
        }

        if (!stockMaterial || isNaN(stockMaterial) || stockMaterial <= 0) {
            message.textContent = "El stock del material debe ser un entero y mayor a 0";
            return;
        }


        const form = {
            stock: Number(stockMaterial)
        }


        try {

            const dataConfig = {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(form)
            };

            const response = await fetch(`/api/updateMaterials/decrement/${Number(idMaterial)}`, dataConfig);

            const result = await response.json();

            if (!response.ok) {

                message.classList.add("error");
                message.textContent = result.message;

                setTimeout(() => {
                    message.classList.remove("error");
                }, 3000);

                return;


            }

            message.textContent = `${result.message}`
            e.target.reset();

            showMaterials();

            setTimeout(() => {
                message.textContent = "";
            }, 3000);

        } catch (error) {
            message.textContent = `Error en el servidor, ${error.message}`

            setTimeout(() => {
                message.textContent = "";
            }, 3000);
        }
    }



}

