const frutas = []


function crearCarritoLocalStorage() {
    if (carritoFrutas.length >= 0){
        localStorage.setItem ("Carrito", JSON.stringify(carritoFrutas))
    }
}

function recuperarCarritoLocalStorage() {
    if(localStorage.getItem("Carrito") !== null){
        return JSON.parse(localStorage.getItem("Carrito"))
    } else {
        return []
    }
}

const carritoFrutas = recuperarCarritoLocalStorage()            