
var paginaActual=1;

let options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOTVlOTNlMDZjYjU2ODU2MmRhMTQzZDkwZTg5ODI5NiIsInN1YiI6IjY0YTM0NWY0ODI4OWEwMDEwY2VjYmM1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sC8MPlonJ15Krddgoy8MR82wOtngtmxApdnI8FOh23E'
    }
  };
  
// fetch('https://api.themoviedb.org/3/movie/popular?api_key=a95e93e06cb568562da143d90e898296&language=en-US&page=1', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));


function mostrarPeliculas(pagina){
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=a95e93e06cb568562da143d90e898296&language=en-US&page=${pagina}`, options)
    .then(response => response.json())
    .then(response=>{
        let movies = response.results;
        let cartelera = movies.map(movie => {
            let poster = `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`;
            let titulo = movie.title;
            let codigo = movie.id;
            let tituloOriginal = movie.original_title;
            let idiomaOriginal = movie.original_language;
            let anio = movie.release_date;

            let tarjeta =
            `<div class="contenedorPoster">
            <img class="poster" src="${poster}">
            <h3 class="titulo">${titulo}</h3>
            <div class="txtPeliculas">
            <p>
            <b>Código:</b> ${codigo}<br>
            <b>Título original:</b> ${tituloOriginal}<br>
            <b>Idioma original:</b> ${idiomaOriginal}<br>
            <b>Año:</b> ${anio}<br>
            </p>
            </div>
            <button class="button radius" onclick="agregarAFavoritos('${codigo}')">
            <span>Agregar a Favoritos</span>
            </button>
            </div>`;

            return tarjeta;
        });

        let contenedorPeliculas = document.getElementById('contenedorPeliculas');
        contenedorPeliculas.innerHTML = cartelera.join('');
    })
    .catch (err => console.error(err));

}

var favoritos=[];
var favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

function validacionCodigo(){
    let codigoPelicula=document.getElementById("codigopeli").value;

    let options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
   
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=a95e93e06cb568562da143d90e898296&language=en-US&page=${paginaActual}`, options)
        .then(response => response.json())
        .then(response=>{
            let movies=response.results;
            let pelicula=movies.find(movie => movie.id.toString()===codigoPelicula)
    
            if(pelicula){
              agregarAFavoritos(`${codigoPelicula}`);
                    
            }else{
                  let mensaje=`<p id="aviso_error" class="rojo">Error: La Película seleccionada no se encuentra en la API o se produjo un error al
                  consultar</p>`
                  let contenedorMensajes = document.getElementById('sec-messages');
                  contenedorMensajes.innerHTML = mensaje;
            }
            

        })
        .catch (err => {
            console.error(err);  
            let mensaje=`<p id="aviso_error" class="rojo">Error: La Película seleccionada no se encuentra en la API o se produjo un error al
            consultar</p>`

            let contenedorMensajes = document.getElementById('sec-messages');
            contenedorMensajes.innerHTML = mensaje;
            
        })    
        
}

function agregarAFavoritos(codigo) {
  try{
    if (favoritos.includes(codigo)) {
      let mensaje = `<p id="aviso_warning" class="amarillo">La película ingresada ya se encuentra almacenada</p>`;
      let contenedorMensajes = document.getElementById('sec-messages');
      contenedorMensajes.innerHTML = mensaje;
    } else {
      favoritos.push(codigo);
      let mensaje = `<p id="aviso_success" class="verde">Película agregada con éxito</p>`;
      let contenedorMensajes = document.getElementById('sec-messages');
      contenedorMensajes.innerHTML = mensaje;
      localStorage.setItem('favoritos', JSON.stringify(favoritos));
      
    }
  }catch(err){
    console.error(err);  
    let mensaje=`<p id="aviso_error" class="rojo">Error: La Película seleccionada no se encuentra en la API o se produjo un error al
    consultar</p>`

    let contenedorMensajes = document.getElementById('sec-messages');
    contenedorMensajes.innerHTML = mensaje;
  }
  console.log(favoritos)
}

let bnSiguiente=document.getElementById('btnSiguiente');
let bnAnterior=document.getElementById('btnAnterior');

bnSiguiente.addEventListener('click', () =>{
  paginaActual++;
  mostrarPeliculas(paginaActual);
});

bnAnterior.addEventListener('click', () =>{
  if(paginaActual>1){
    paginaActual--;
  }
  mostrarPeliculas(paginaActual);
});


 

