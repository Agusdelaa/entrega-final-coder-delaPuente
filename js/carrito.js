const cuerpoTabla = document.querySelector("tbody")
const seccionCarrito = document.querySelector("section.tabla")
const importeCarrito = document.querySelector("span.importe")
const botoncomprar = document.querySelector("button.button.boton-comprar")
//``

function cargarCarritosEnHTML(fruta) {
    return `<tr>
                <td>${fruta.codigo}</td>
                <td>${fruta.imagen}</td>
                <td>${fruta.nombre}</td>
                <td>${fruta.precioKg}</td>
                <td><button class="negro" id="${fruta.codigo}">❌</button></td>
            </tr>`
}


function msgCarritoSinNada() {
    return `<div class="card-error">
                <h3>El carrito está vacío</h3>
                <h4>🛒</h4>
            </div>`
}

function armarCarrito(){
    cuerpoTabla.innerHTML = ""
    if (carritoFrutas.length) {
        carritoFrutas.forEach((fruta)=> cuerpoTabla.innerHTML += cargarCarritosEnHTML(fruta))
        activarBotonesQuitar()
    } else {
        seccionCarrito.innerHTML = msgCarritoSinNada()
    }
}
armarCarrito()

function pagarCarrito() {
    importeCarrito.innerHTML = carritoFrutas.reduce((acumulador, fruta) => acumulador + (fruta.precioKg), 0)
}

pagarCarrito() 

function activarBotonesQuitar() {
    const botonesCruz = document.querySelectorAll("button.negro")
    botonesCruz.forEach((boton)=> {
        boton.addEventListener("click", ()=> {
            let objetoEliminar = carritoFrutas.findIndex((prod)=> prod.codigo === parseInt(boton.id) )
            carritoFrutas.splice( objetoEliminar, 1)
            activarBotonesQuitar()
            armarCarrito()
            crearCarritoLocalStorage()
            pagarCarrito()
        })
    })
}

botoncomprar.addEventListener("click", ()=> {
    Swal.fire({
        title: '¿Confirmas el carrito de productos?',
        icon: 'question',
        showDenyButton: true,
        confirmButtonText: 'SI',
        denyButtonText: 'NO'
      }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('Carrito')
            Swal.fire({
                title: '¡Muchas gracias por la compra!😁',
                imageUrl:'../gift/apu-thank-you.gif',
                timer: 2000
            })
            seccionCarrito.innerHTML = msgCarritoSinNada()
        } else if (result.isDenied) {
            localStorage.removeItem('Carrito')
            Swal.fire({
                title: 'Has cancelado la compra😞',
                imageUrl:'../gift/apusmeme.jpg',
                timer: 3000
            })
            seccionCarrito.innerHTML = msgCarritoSinNada()
        }
    })
})


