/* Instrucciones del Parcial

    - Responde los puntos en orden.
    - Se valorará:
        * Código limpio
        * Comentarios claros
        * Separación en bloques funcionales
        * Buen uso de funciones/modularización

    IMPORTANTE:
    - El trabajo debe desarrollarse utilizando buenas buenas prácticas de programación en JavaScript.
*/

/* Punto 1 _________________________

    Este parcial consiste en crear el frontend de una tienda de frutas.
    Para ello ya se dispone del HTML y deberás programar el JavaScript necesario.

    1. Almacena tus datos personales (nombre, apellido, DNI) en un objeto y:
        - Imprime tu nombre y apellido en la etiqueta del <nav> (donde corresponda).
        - Imprímelo también en la consola.
*/
let productos = [];
let carrito = [];
let totalcarrito = 0
let itemsTotales = 0
const datosPesonales = {
    nombre:" maximo santino",
    apellido:"luna irribarra",
    dni :"47058085"
};
function mostrarNombreEnNav(){
    const div = document.querySelector('.nombreAlumno');
    if (div) {
        div.textContent = `${datosPesonales.nombre} ${datosPesonales.apellido}`;
    }
}
function mostrarNombreConsola(){
    console.log(`
        ${datosPesonales.nombre}${datosPesonales.apellido}${datosPesonales.dni}
        `)
}

/* Punto 2 _________________________

    Simula la carga de datos desde un archivo `db.json`. Este debe tener objetos con esta estructura:
    {
        "id": 1,
        "nombre": "arandano",
        "precio": 5000,
        "img": "img/arandano.jpg"
    }
*/
const url = "js/db.json"

async function ingresarMercaderia (url)
{
    const response = await fetch(url);
        productos = await response.json();
        return productos
}
/* Punto 3 _________________________

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
function MostrarProductos(productos)
    {
        const divDeFrutas = document.querySelector('.product-grid');
        divDeFrutas.innerHTML="";
        //creas el div y le añdis la info de producto
        productos.forEach(producto => {
            const card = document.createElement("div");
            card.classList.add('product-card');

            card.innerHTML=`
            <img src="${producto.img}">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <button class="add-to-cart">Agregar a carrito</button>
        `;
        
        const boton = card.querySelector('.add-to-cart');
        boton.onclick = function () {
            agregaralcarrito(producto);
            actualizar()
        };
        divDeFrutas.appendChild(card);
        });

    }

/* Punto 4 _________________________

    Crea la función `filtro()` para filtrar los productos por nombre.
    - Asocia esta función al evento `keyup` de un campo `<input>`.
    - Cada vez que se escriba una letra, deben mostrarse solo los productos que coincidan con el texto ingresado.
*/
function filtrar()
    {
        const busqueda = document.querySelector('.search-bar').value.toLowerCase();
        const filtrados = productos.filter(producto => producto.nombre.toLowerCase().includes(busqueda));
        MostrarProductos(filtrados)
        if (filtrados.length === 0) {
            const divDeFrutas = document.querySelector('.product-grid');
                divDeFrutas.innerHTML = ''; // limpiar el grid
            const card = document.createElement("div");
            card.classList.add('product-card');
                card.innerHTML = `
                    <div class="no-products">
                        <h3>poner una fruta valida</h3>
                    </div>
                `;
            divDeFrutas.appendChild(card);
    } else {
        MostrarProductos(filtrados);
    }
}
/* Punto 5 _________________________

    Agrega la funcionalidad de carrito:
    - Crea un array `carrito` que almacene los productos seleccionados.
    - Al presionar “Agregar a carrito”, el producto debe aparecer en el listado con id `cart-items`.

    El HTML del carrito debe tener el siguiente formato:

        <li class="item-block">
            <p class="item-name">nombreproducto - $precioproducto</p>
            <button class="delete-button">Eliminar</button>
        </li>
*/
function agregaralcarrito(producto)
    {
        const productoExistente = carrito.find(item => item.id === producto.id);
        if(productoExistente){
            productoExistente.cantidad += 1;
        }else{
            carrito.push({...producto, cantidad: 1});
        }
        guardarCarrito();
        MostrarCarrito();
        actualizar();
        
    }
    //funcion que elimina los porductose del carrito que recibe un indice para eliminar 1 item de ese tipo onda bananas etc  tambien elimina 1 items de los itemas totales o un porducto del total 
    function eliminarDelCarrito(index)
    {
        const producto = carrito[index];
        totalcarrito -= producto.precio;
        itemsTotales  -= 1;
        producto.cantidad -= 1;
        if (producto.cantidad === 0){
            carrito.splice(index, 1);
        }
        guardarCarrito();
        MostrarCarrito();
        actualizar();    
    }
    // guardfa el carrito en el local storage
    function guardarCarrito(){
        totalcarrito = 0;
        itemsTotales = 0;

    carrito.forEach(item => {
        totalcarrito += item.precio * item.cantidad;
        itemsTotales += item.cantidad;
        });

    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('totalcarrito', JSON.stringify(totalcarrito));
    localStorage.setItem('itemsTotales', JSON.stringify(itemsTotales));
    actualizar();
    }
// carga el carrito desde el local storage 
    function cargarCarrito() 
    {
        const guardado = localStorage.getItem('carrito');
        const totalGuardado = localStorage.getItem('totalcarrito');
        const itemsTotalesGuardados = localStorage.getItem('itemsTotales');
        
        if (guardado) {
            carrito = JSON.parse(guardado);
            MostrarCarrito();
        if (totalGuardado){
            totalcarrito = parseInt(totalGuardado); 
        }
        if(itemsTotalesGuardados){
            itemsTotales = parseInt(itemsTotalesGuardados);
        }
        actualizar();
        }
    }

    function MostrarCarrito(){
    const lista = document.querySelector('#cart-items');
    lista.innerHTML = "";

    carrito.forEach((item, index) => 
    {
        const li = document.createElement('li');
        li.classList.add('item-block');
        li.innerHTML = `
            <p class="item-name">${item.nombre} - $${item.precio} - cantidad =  ${item.cantidad}</p>
            <button class="delete-button">Eliminar</button>
        `;
        li.querySelector('.delete-button').onclick = () => eliminarDelCarrito(index);

        lista.appendChild(li);
    });
    }
    // actualzia lso campos que se ven abajo 
    function actualizar()
    {
        const items = document.getElementById("cart-count");
        const total = document.getElementById("total-price");      

        items.textContent = itemsTotales;
        total.textContent = totalcarrito; 
    }
/* Punto 6 _________________________

    Guarda los productos del carrito en `localStorage`.
    - Asegúrate de que al recargar la página el carrito se recupere automáticamente desde `localStorage`.
*/

/*
    A partir de aquí, se agregan funcionalidades avanzadas para el recuperatorio.
    Asegúrate de integrar estas mejoras con el código existente, manteniendo la estructura y las buenas prácticas.
*/

/* Punto 7 _________________________

    Gestión de Cantidades en el Carrito:

    Hasta ahora, cada vez que un usuario agrega un producto al carrito, este aparece como un nuevo elemento, incluso si ya está en la lista. Para optimizar la gestión del carrito, se requiere una mejora fundamental:

    * **Si un producto ya se encuentra en el carrito**, su **cantidad debe incrementarse** en lugar de duplicarlo.
    * La **visualización de los productos en el carrito** debe reflejar esta cantidad (por ejemplo, "Nombre Producto - $Precio x Cantidad").
    * La funcionalidad para **eliminar productos del carrito** debe adaptarse para gestionar estas cantidades: si la cantidad es mayor a uno, debe decrementarse; solo debe eliminarse completamente si su cantidad es uno.
    * **Considerá si es necesario modificar la estructura de tus datos (por ejemplo, en el `db.json`) para facilitar esta funcionalidad.**
*/

/* Punto 8 _________________________

    Cálculo y Visualización del Total del Carrito:

    Para proporcionar una visión clara del costo total de la compra, se necesita implementar un **cálculo dinámico del total del carrito**.

    * Este total debe **actualizarse en tiempo real** cada vez que se agreguen, eliminen o modifiquen cantidades de productos en el carrito.
    * El valor total debe **mostrar el total calculado** en el elemento HTML destinado para ello (por ejemplo, el `div` que ya poseen).
*/

/* Punto 9 _________________________

    Funcionalidad "Vaciar Carrito":

    Ofrece al usuario la comodidad de poder **vaciar todo el carrito** con una sola acción.

    * Implementa un **botón** que, al ser presionado, elimine todos los productos del carrito y reinicie el total.
*/


function vaciarCarrito() {
    carrito = [];
    guardarCarrito();
    MostrarCarrito();
    actualizar();
}


/* Punto 10 _________________________

    Persistencia Avanzada del Carrito:

    Es crucial que el estado completo del carrito se mantenga incluso después de que el usuario recargue la página.

    * Asegurate de que la **cantidad de cada producto y el total del carrito** se **guarden y recuperen correctamente** desde `localStorage` al cargar la página. La información debe ser persistente en su totalidad.
*/

/* Punto 11 _________________________

    Botón "Finalizar Compra":

    Agrega un botón en la interfaz del carrito que permita al usuario finalizar su compra.

    * Al hacer clic en este botón, debe mostrarse una **alerta** con el mensaje "Tu pedido está siendo procesado".
    * Inmediatamente después de mostrar la alerta, el **carrito debe vaciarse** por completo (tanto visualmente como en `localStorage`).
*/
function finalizarCompra() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    alert("Tu pedido está siendo procesado");

    // Vaciar el carrito
    vaciarCarrito();
    //
    guardarCarrito();
    MostrarCarrito();
    actualizar();
}


// Función inicializadora
async function init() {

    mostrarNombreConsola();
    mostrarNombreEnNav();
    productos = await ingresarMercaderia(url)

    MostrarProductos(productos)
    cargarCarrito();
    document.querySelector('.search-bar').addEventListener('keyup', filtrar);
    document.getElementById('vaciar-carrito').addEventListener('click', vaciarCarrito);
    document.getElementById('finalizar-compra').addEventListener('click', finalizarCompra);

    console.log(carrito)
}


init()