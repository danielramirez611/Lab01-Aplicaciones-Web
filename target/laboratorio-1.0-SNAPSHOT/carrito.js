// Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-productos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
let articulosCarrito = [];

// Listeners
cargarEventListeners();

function cargarEventListeners() {
     // Dispara cuando se presiona "Agregar Carrito"
     listaCursos.addEventListener('click', agregarCurso);

     // Cuando se elimina un curso del carrito
     carrito.addEventListener('click', eliminarCurso);

     // Al Vaciar el carrito
     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

}




// Funciones
// Función que añade el curso al carrito
function agregarCurso(e) {
     e.preventDefault();
     // Delegation para agregar-carrito
     if(e.target.classList.contains('agregar-carrito')) {
          const curso = e.target.parentElement.parentElement;
          // Enviamos el curso seleccionado para tomar sus datos
          leerDatosCurso(curso);
     }
}

// Lee los datos del curso
function leerDatosCurso(curso) {
     const infoCurso = {
          imagen: curso.querySelector('img').src,
          titulo: curso.querySelector('h3').textContent,
          precio: curso.querySelector('.contenedor-precios p').textContent,
          id: curso.querySelector('svg').getAttribute('data-id'), 
          cantidad: 1
     }


     if( articulosCarrito.some( curso => curso.id === infoCurso.id ) ) { 
          const cursos = articulosCarrito.map( curso => {
               if( curso.id === infoCurso.id ) {
                    curso.cantidad++;
                     return curso;
                } else {
                     return curso;
             }
          })
          articulosCarrito = [...cursos];
     }  else {
          articulosCarrito = [...articulosCarrito, infoCurso];
     }

     // console.log(articulosCarrito)

     

     // console.log(articulosCarrito)
     carritoHTML();
}

// Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
     e.preventDefault();
     if(e.target.classList.contains('borrar-curso') ) {
          // e.target.parentElement.parentElement.remove();
          const cursoId = e.target.getAttribute('data-id')
          
          // Eliminar del arreglo del carrito
          articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

          carritoHTML();
     }
}


// Muestra el curso seleccionado en el Carrito
function carritoHTML() {

     vaciarCarrito();

     articulosCarrito.forEach(curso => {
          const row = document.createElement('tr');
          row.innerHTML = `
               <td>  
                    <img src="${curso.imagen}" width=95>
               </td>
               <td>${curso.titulo}</td>
               <td>${curso.precio}</td>
               <td>${curso.cantidad} </td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
               </td>
          `;
          contenedorCarrito.appendChild(row);
     });

}

// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
     // forma lenta
     // contenedorCarrito.innerHTML = '';


     // forma rapida (recomendada)
     while(contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
      }
}

// const carrito =document.getElementById('carrito');
// const catalogos =document.getElementById('lista-catalogo');
// const listaCatalogos =document.querySelector('#lista-carrito tbody');
// const vaciarCarritoBtn =document.getElementById('vaciar-carrito');

// cargarEventListeners();

// function cargarEventListeners() {
//     catalogos.addEventListener('click', comprarCatalogo);
//     carrito.addEventListener('click', eliminarCatalogo);
//     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
//     document.addEventListener('DOMContentLoaded', leerLocalStorange);

// }

// function  comprarCatalogo(e) {
//     e.prevenDefault();

//     if(e.target.classList.contains('cart')){
//         const catalogo= e.target.parentElement.parentElement;
//         leerDatosCatalogo(catalogo);
//     }
// }

// function leerDatosCatalogo(catalogo) {
//     const infoCatalogo = {
//         imagen: catalogo.querySelector('img').src,
//         titulo: catalogo.querySelector('h3').textContent,
//         precio: catalogo.querySelector('.precio span').textContent,
//         id: catalogo.querySelector('svg').getAttribute('data-id')
//     }
//     insertarCarrito(infoCatalogo);
// }

// function insertarCarrito(catalogo) {
//     const row = document.createElement('tr');
//     row.innerHTML = `
//             <td>
//                 <img src= "${catalogo.imagen}" width=100 >
//                 </td>
//             <td> ${catalogo.titulo}</td>
//             <td> ${catalogo.precio}</td>
//             <td>
//             <a href="#" class="borrar-catalogo data-id="${catalogo.id}">X</a>
//             </td>

                

//             `;
//     listaCatalogos.appendChild(row);
//     guardarCatalogoLocalStorage(catalogo);

// }

// function eliminarCatalogo(e) {
//     e.preventDefault();

//         let catalogo,
//                 catalogoId;

//                 if(e.target.classList.contains('borrar-catalogo')) {
//                     e.target.parentElement.parentElement.remove();
//                     catalogo =e.target.parentElement.parentElement;
//                     catalogoId= catalogo.querySelector('svg').getAttribute('data-id');
//               }
//               elimarCatalogoLocalStorage(catalogoId);
// }

// function vaciarCarrito() {
//     while(listaCatalogos.firstChild){
//         listaCatalogos.removeChild(listaCatalogos.firstChild);
//     }
//     vaciarLocalStorage();
//     return false;
// }

// function guardarCatalogoLocalStorage(catalogo) {
//     let catalogos;

//     catalogo =obtenerCatalogosLocalStorage();
//     catalogos=push(catalogo);
//     localStorage.setItem('catalogos', JSON.stringify(catalogos));
// }

// function obtenerCatalogosLocalStorage() {
//     let catalogosLS;

//     if(localStorage.getItem('catalogos') === null){
//         catalogosLS =[];
//     }
//     else{
//         catalogosLS =JSON.parse(localStorage.getItem('catalogos'));
//     }
//     return catalogosLS
// }

// function leerLocalStorange() {
//     let catalogosLS;

//     catalogosLS= obtenerCatalogosLocalStorage();
//     catalogosLS.forEach(function(catalogo){
        
//         const row=document.createElement('tr');
//         row.innerHTML =`
//         <td>
//             <img src= "${catalogo.imagen}" width=100 >
//             </td>
//            <td> ${catalogo.titulo}</td>
//            <td> ${catalogo.precio}</td>
//            <td>
//           <a href="#" class="borrar-catalogo data-id="${catalogo.id}">X</a>
//           </td>
    
            
    
//         `;
//         listaCatalogos.appendChild(row);
//     });
// }

// function elimarCatalogoLocalStorage(catalogo) {
//     let catalogosLS;
//     catalogosLS=obtenerCatalogosLocalStorage();

//     catalogosLS.forEach(function(catalogosLS, index){
//         if(catalogosLS.id === catalogo){
//             catalogosLS.splice(index, 1);
//         }
//     }); 
//     localStorage.setItem('catalogos', JSON.stringify(catalogosLS));
// }

// function vaciarLocalStorage() {
//     localStorage.clear();
// }


