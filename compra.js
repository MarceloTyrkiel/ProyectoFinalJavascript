
const tbody1 = document.querySelector('.tbody1')

//DOM utilizando JSON como "base  de datos local" mediante el metodo FETCH
  
  fetch('data.json')
    .then(respuesta => respuesta.json())
    .then (datosFacturacion => {
      let select = document.getElementById('cliente');
      select.addEventListener('change',
      function(){
          let selectedOption = this.options[select.selectedIndex];
          let clienteSeleccionado = selectedOption.text
          
                
                  datosFacturacion.forEach(item => {
                    if (item.cliente === clienteSeleccionado){ 
                      const facturaCompra = document.getElementById("direccionCompra")
                      const factura = document.createElement('div')
                      factura.className="factura";
                      factura.innerHTML=`
                      <div class="row d-flex">
                        <div class="col-6">
                          <p>RAZON SOCIAL : ${item.razon}</p>
                          <p>DIRECCION : ${item.direccion}</p>
                          <p>TELEFONO : ${item.telefono}</p>
                        </div>  
                        <div class="col-6">
                          <p>CUIT : ${item.CUIT}</p>
                          <p>CONDICION : ${item.IVA}</p>
                          <p>CONDICION DE PAGO :${item.CONDICION}</p>
                        </div>
                      </div>  
                        </div> `
                    ;
                    facturaCompra.append(factura)
                    }      
                  });
                
    })
    
  });
//Obtengo los datos de la compra del Storage y elimino input y boton de eliminar
  function leer (){
  const storage = JSON.parse(localStorage.getItem('carrito'));
  if(storage){
      carrito = storage;
      domCarrito1()
  }
}
//Muestro los datos del cliente a facturar
function domCarrito1(){
  tbody1.innerHTML=''
  carrito.map(item=> {
      const tr = document.createElement('tr')
      let precioItem = Number(item.precio.replace("$", ''))
      let subtotalItem = precioItem*item.cantidad
      
      tr.classList.add('ItemCarrito1')
      const content=`
              <td><h5 class="title">${item.title}</h5></td>
              <td class="table__cantidad">
                  <input type="text" min="1" value=${item.cantidad} class="input__elemento">
              </td>
              <td><h6 class="subtitle">${item.subtitle}</h6></td>
              <td class="table__price"><p>${item.precio}</p></td>
              <td class="table__price"><p>$ ${subtotalItem}</p></td>
              <td class="table__cantidad">
              </td>
      `
      tr.innerHTML = content;
      tbody1.append(tr)
  })
  CarritoTotal()

}
//Muestro la suma total
function CarritoTotal(){
  let Total = 0;
  const itemCartTotal = document.querySelector('.itemCartTotal')
  carrito.forEach((item) =>{
      const precio = Number(item.precio.replace("$", ''))
      Total = Total + precio*item.cantidad
  })
  itemCartTotal.innerHTML = `Total $${Total}`
}
//Borra el localStorage
function borrar(){
  localStorage.clear()
}


//Llamo a la funcion para traer los articulos comprados y borro el localStorage
leer()
borrar()





