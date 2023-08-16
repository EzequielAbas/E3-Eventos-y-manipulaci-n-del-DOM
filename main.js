const pizzas = [{
        id: 1,
        nombre: "Pizza de Muzzarella",
        precio: 1300,
        ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
        imagen: "./img/muzzarella.png",
    },

    {
        id: 2,
        nombre: "Pizza de Cebolla",
        precio: 3000,
        ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
        imagen: "./img/cebolla.png",
    },

    {
        id: 3,
        nombre: "Pizza 4 Quesos",
        precio: 2700,
        ingredientes: [
            "Muzzarella",
            "Tomate",
            "Queso Azul",
            "Parmesano",
            "Roquefort",
        ],
        imagen: "./img/4quesos.png",
    },

    {
        id: 4,
        nombre: "Pizza Especial",
        precio: 2000,
        ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
        imagen: "./img/especial.png",
    },

    {
        id: 5,
        nombre: "Pizza con Anana",
        precio: 1500,
        ingredientes: ["Muzzarella", "Tomate", "Anana"],
        imagen: "./img/anana.png",
    },
];


document.addEventListener('DOMContentLoaded', function() {
    const inputNumber = document.getElementById("input");
    const form = document.querySelector(".form");
    const errorMessage = document.querySelector(".form-error");
    const container4 = document.querySelector(".contenedor-card");

    const saveLocalStorage = (correctId) => {
        localStorage.setItem("correct-pizza", JSON.stringify(correctId));
    };

    const loadLocalStorage = () => {
        const storedPizza = JSON.parse(localStorage.getItem("correct-pizza"));
        if (storedPizza) {
            container4.innerHTML = `
                <img src='${storedPizza.imagen}' class='img'>
                <p class='parrafo'>${storedPizza.nombre}</p>
                <p class='parrafo'>$${storedPizza.precio}</p>
                <p class='parrafo'>${storedPizza.ingredientes.join(', ')}</p>
            `;
            container4.classList.remove('hidden');
        }
    };


    // Busca el ID correcto y luego me trae el nombre, precio e ingredientes.

    const submitEvent = (e) => {
        e.preventDefault();
        const correctId = pizzas.find(pizza => {
            return pizza.id === parseInt(inputNumber.value);
        });

        if (correctId) {
            container4.innerHTML = `
                <img src='${correctId.imagen}' class='img'>
                <p class='parrafo'>${correctId.nombre}</p>
                <p class='parrafo'>$${correctId.precio}</p>
                <p class='parrafo'>${correctId.ingredientes.join(', ')}</p>
            `;
            errorMessage.textContent = '';
            saveLocalStorage(correctId);
            container4.classList.remove('hidden');

            // En caso de que no sea un número entre 1 a 5 da mensaje de error

        } else {
            errorMessage.textContent = `Por favor, ingrese un número de pizza del 1 al 5`;
            container4.innerHTML = '';
            container4.classList.add('hidden');
        }
        form.reset();
    };

    loadLocalStorage(); // Cargar información almacenada en el localStorage al cargar la página
    form.addEventListener("submit", submitEvent);
});