//DOM
const clickButton = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')
let carrito = []
//Defino el evento click y me posiciono en el articulo elegido
clickButton.forEach(btn => {
    btn.addEventListener('click', agregarCarritoItem)
})
function agregarCarritoItem(e){
    const button = e.target
    const item = button.closest('.card')
    const itemTitle = item.querySelector('.card-title').textContent;
    const itemSubTitle = item.querySelector('.card-subtitle').textContent;
    const itemPrecio = item.querySelector('.card-precio').textContent;
    //Defino el objeto 
    const newItem = {
        title : itemTitle,
        subtitle : itemSubTitle,
        precio : itemPrecio,
        cantidad: 1
    }
    libreriaToastify()
    agregarItemCarrito(newItem)
}
//Agrego el item elegido al carrito verificando que no este repetido
function agregarItemCarrito(newItem){
    const inputEl = tbody.getElementsByClassName('input__elemento')
    for(let i=0;i<carrito.length;i++){
        if(carrito[i].subtitle.trim() === newItem.subtitle.trim()){
            carrito[i].cantidad++;
            const inputValue = inputEl[i]
            inputValue.value++;
            CarritoTotal()
            return null;
        }
    }
    carrito.push(newItem)
    domCarrito()
}
//Muestro el articulo elegido en la solapa carrito, activo el boton delete y actualizo la suma
//de los articulos que quedaron en el carrito, llamando a la funcion CarritoTotal
function domCarrito(){
    tbody.innerHTML=''
    carrito.map(item=> {
        const tr = document.createElement('tr')
        let precioItem = Number(item.precio.replace("$", ''))
        let subtotalItem = precioItem*item.cantidad
        
        tr.classList.add('ItemCarrito')
        const content=`
                <td><h5 class="title">${item.title}</h5></td>
                <td class="table__cantidad">
                    <input type="number" min="1" value=${item.cantidad} class="input__elemento">
                </td>
                <td><h6 class="subtitle">${item.subtitle}</h6></td>
                <td class="table__price"><p>${item.precio}</p></td>
                <td class="table__price"><p>$ ${subtotalItem}</p></td>
                <td class="table__cantidad">
                    <button class="delete btn btn-danger">X</button>
                </td>
        `
        tr.innerHTML = content;
        tbody.append(tr)

        tr.querySelector(".delete").addEventListener('click', removeitemCarrito)
        tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
    })
    CarritoTotal()
}
//Actualiza la suma
function CarritoTotal(){
    let Total = 0;
    const itemCartTotal = document.querySelector('.itemCartTotal')
    carrito.forEach((item) =>{
        const precio = Number(item.precio.replace("$", ''))
        Total = Total + precio*item.cantidad
    })
    itemCartTotal.innerHTML = `Total $${Total}`
    addLocalStorage()
}
//Borra y actualiza
function removeitemCarrito(e){
    const buttonDelete = e.target
    const tr = buttonDelete.closest(".ItemCarrito")
    const subtitle = tr.querySelector('.subtitle').textContent;
    for(let i=0; i<carrito.length ; i++){
        if(carrito[i].subtitle.trim() === subtitle.trim()){
            carrito.splice(i,1)
        }
    }
    libreriaToastifyborrar()
    tr.remove()
    CarritoTotal()
}
//Se activa cuando modifico la cantidad desde la solapa carrito
function sumaCantidad(e){
    const sumaInput = e.target
    const tr = sumaInput.closest(".ItemCarrito")
    const subtitle = tr.querySelector('.subtitle').textContent;
    carrito.forEach(item => {
        if(item.subtitle.trim() === subtitle) {
            sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
            item.cantidad = sumaInput.value;
            domCarrito()
            CarritoTotal()
        }
    })
}
//Subo al localstorage
function addLocalStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito))
}
//Verifico si hay articulos en el local storage , si hay, los traigo
window.onload = function(){
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if(storage){
        carrito = storage;
        domCarrito()
    }
}
//Funcion libreria toastify
function libreriaToastify (){
    Toastify({
      text: "Ingresaste un articulo",
      duration: 2000,
      newWindow: true,
     // close: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();   
  }
  function libreriaToastifyborrar (){
    Toastify({
      text: "Borraste un articulo",
      duration: 2000,
      newWindow: true,
     // close: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, red, red)",
      },
    }).showToast();   
  }
  