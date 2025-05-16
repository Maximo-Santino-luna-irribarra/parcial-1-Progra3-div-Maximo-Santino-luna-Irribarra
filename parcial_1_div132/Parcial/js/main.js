/*  
    Instrucciones del Parcial

    - Responde los puntos en orden.
    - Se valorará:
        * Código limpio
        * Comentarios claros
        * Separación en bloques funcionales
        * Buen uso de funciones/modularización

    IMPORTANTE:
    - El trabajo debe desarrollarse utilizando buenas prácticas de programación en JavaScript.
*/

/*  
    Punto 1 _________________________

    Este parcial consiste en crear el frontend de una tienda de frutas.
    Para ello ya se dispone del HTML y deberás programar el JavaScript necesario.

    1. Almacena tus datos personales (nombre, apellido, DNI) en un objeto y:
        - Imprime tu nombre y apellido en la etiqueta del <nav> (donde corresponda).
        - Imprímelo también en la consola.
*/

/*  
    Punto 2 _________________________

    Simula la carga de datos desde un archivo `db.json`. Este debe tener objetos con esta estructura:
    {
        "id": 1,
        "nombre": "arandano",
        "precio": 5000,
        "img": "img/arandano.jpg"
    }
*/

/*  
    Punto 3 _________________________

    Imprime los productos en pantalla al cargar la página.
    Agrega esta funcionalidad dentro de la función `init()`.

    El HTML que debes agregar por cada producto es el siguiente:

        <div class="product-card">
            <img src="ruta" alt="nombre">
            <h3>Nombre del producto</h3>
            <p>$Precio</p>
            <button class="add-to-cart">Agregar a carrito</button>
        </div>
*/

/*  
    Punto 4 _________________________

    Crea la función `filtro()` para filtrar los productos por nombre.
    - Asocia esta función al evento `keyup` de un campo `<input>`.
    - Cada vez que se escriba una letra, deben mostrarse solo los productos que coincidan con el texto ingresado.
*/

/*  
    Punto 5 _________________________

    Agrega la funcionalidad de carrito:
    - Crea un array `carrito` que almacene los productos seleccionados.
    - Al presionar “Agregar a carrito”, el producto debe aparecer en el listado con id `cart-items`.

    El HTML del carrito debe tener el siguiente formato:

        <li class="item-block">
            <p class="item-name">nombreproducto - $precioproducto</p>
            <button class="delete-button">Eliminar</button>
        </li>
*/

/*  
    Punto 6 _________________________

    Guarda los productos del carrito en `localStorage`.
    - Asegúrate de que al recargar la página el carrito se recupere automáticamente desde `localStorage`.
*/
const productGrid = document.querySelector(".product-grid");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const totalPrice = document.getElementById("total-price");

const datosPesonales = {
    nombre:" maximo santino",
    apellido:"luna irribarra",
    dni :"47058085"
};
let productos = [];
let carrito = [];

function imprimenav (){
    const divnombre = document.getElementById("nombreAlumno")
    divnombre.textContent = `
        ${datosPesonales.nombre}${datosPesonales.apellido}${datosPesonales.dni}
        `
}

function imprimirNombreconsola(){
    console.log( `
        ${datosPesonales.nombre}${datosPesonales.apellido}${datosPesonales.dni}
        `)
}

const url = "js/db.json"
async function ingresarMercaderia (url) {
    const response = await fetch(url);
        productos = await response.json();
        return productos
}

function mostrarProductos(productos) {
    const grid = document.querySelector('.product-grid');
    grid.innerHTML = ""; 

    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add('product-card');

        card.innerHTML = `
            <img src="${producto.img}" class="img-fluid" style="max-height: 70px;">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <button class="add-to-cart">Agregar a carrito</button>
        `;

        const boton = card.querySelector('.add-to-cart');
        boton.onclick = function () {
            carrito.push(producto);
            mostrarCarrito(carrito)
           
        };

        grid.appendChild(card);
    });
}
function mostrarCarrito(carrito) {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ""; 

    carrito.forEach((producto, index) => {
        const li = document.createElement('li');
        li.classList.add('item-block');

        li.innerHTML = `
            <p class="item-name">${producto.nombre} - $${producto.precio}</p>
            <button class="delete-button">Eliminar</button>
        `;

        cartItems.appendChild(li); 
    });
}


function filtro() {
    const searchText = document.querySelector('.search-bar').value.toLowerCase();
    const grid = document.querySelector('.product-grid');
    grid.innerHTML = "";

    const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(searchText));

    filtrados.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('product-card');

        card.innerHTML = `
            <img src="${producto.img}"   class="img-fluid" style="max-height: 50px;>
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <button class="add-to-cart" >Agregar a carrito</button>
        `;

        const boton = card.querySelector('.add-to-cart');
        boton.onclick = () => {
            carrito.push(producto);
           
        };

        grid.appendChild(card);
    });
}









// Función inicializadora
async function init() {
  // Aquí deben invocarse todas las funciones necesarias para que la aplicación comience a funcionar
    productos = await ingresarMercaderia(url);
    imprimenav()
    imprimirNombreconsola()

    mostrarProductos(productos);
    mostrarCarrito(carrito)
    document.querySelector('.search-bar').addEventListener('keyup', filtro);
    
}


init()