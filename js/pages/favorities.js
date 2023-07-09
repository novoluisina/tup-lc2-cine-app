
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

// if (favoritos) {
//   for (let i = 0; i < favoritos.length; i++) {
//     fetch(`https://api.themoviedb.org/3/movie/${favoritos[i]}?api_key=a95e93e06cb568562da143d90e898296&language=es-MX`)
//       .then(response => response.json())
//       .then(movie => {
//         let poster = `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`;
//         let titulo = movie.title;
//         let codigo = movie.id;
//         let tituloOriginal = movie.original_title;
//         let idiomaOriginal = movie.original_language;
//         let resumen = movie.overview;

//         let tarjeta = `
//           <div class="contendorPosterFav">
//             <div class="contenedorImg">
//               <img class="poster" src="${poster}">
//             </div>
//             <h3 class="titulo">${titulo}</h3>
//             <div class="txtPelisFav">
//               <p>
//               <b>Código:</b> ${codigo}<br>
//               <b>Título original:</b> ${tituloOriginal}<br>
//               <b>Idioma original:</b> ${idiomaOriginal}<br>
//               <b>Resumen:</b> ${resumen}
//               </p>
//             </div>
//             <button class="button radius" onclick="eliminarFav(this)">
//             <span>Quitar de Favoritos</span>
//             </button>
//           </div>`;

//         let contenedorPeliculasFav = document.getElementById('contenedorPelisFav');
//         contenedorPeliculasFav.innerHTML += tarjeta;
//       })
//       .catch(err => {
//         console.error(`Error al obtener información de la película con ID ${favoritos[i]}:`, err);
//       });
//   }
// }else{
//   let mensaje = `<p id="aviso_warning" class="amarillo">No tiene películas seleccionadas en sus favoritos</p>`;
//   let contenedorMensajes = document.getElementById('sec-favorities-list');
//   contenedorMensajes.innerHTML = mensaje;
// }
if (favoritos) {
  for (let i = 0; i < favoritos.length; i++) {
    fetch(`https://api.themoviedb.org/3/movie/${favoritos[i]}?api_key=a95e93e06cb568562da143d90e898296&language=es-MX`)
      .then(response => response.json())
      .then(movie => {
        let poster = `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`;
        let titulo = movie.title;
        let codigo = movie.id;
        let tituloOriginal = movie.original_title;
        let idiomaOriginal = movie.original_language;
        let resumen = movie.overview;

        // Obtener los videos de la película
        fetch(`https://api.themoviedb.org/3/movie/${codigo}/videos?api_key=a95e93e06cb568562da143d90e898296`)
          .then(response => response.json())
          .then(videos => {
            let videoKey = videos.results.length > 0 ? videos.results[0].key : ''; // Obtener la clave del primer video (si existe)

            let tarjeta = `
              <div class="contendorPosterFav">
                <div class="contenedorImg">
                  <img class="poster" src="${poster}">
                </div>
                <h3 class="titulo">${titulo}</h3>
                <div class="txtPelisFav">
                  <p>
                  <b>Código:</b> ${codigo}<br>
                  <b>Título original:</b> ${tituloOriginal}<br>
                  <b>Idioma original:</b> ${idiomaOriginal}<br>
                  <b>Resumen:</b> ${resumen}
                  </p>
                </div>
                <div class="videoWrapper">
                  <iframe width="150" height="150" src="https://www.youtube.com/embed/${videoKey}" frameborder="0" allowfullscreen></iframe>
                </div>
                <button class="button radius" onclick="eliminarFav(this)">
                  <span>Quitar de Favoritos</span>
                </button>
              </div>`;

            let contenedorPeliculasFav = document.getElementById('contenedorPelisFav');
            contenedorPeliculasFav.innerHTML += tarjeta;
          })
          .catch(err => {
            console.error(`Error al obtener los videos de la película con ID ${codigo}:`, err);
          });
      })
      .catch(err => {
        console.error(`Error al obtener información de la película con ID ${favoritos[i]}:`, err);
      });
  }
} else {
  let mensaje = `<p id="aviso_warning" class="amarillo">No tiene películas seleccionadas en sus favoritos</p>`;
  let contenedorMensajes = document.getElementById('sec-favorities-list');
  contenedorMensajes.innerHTML = mensaje;
}

function eliminarFav(boton){
  let divBorrar = boton.parentNode;
  let contenedorPeliculasFavoritas = document.getElementById('contenedorPelisFav');
  let indiceBorrar = Array.from(contenedorPeliculasFavoritas.children).indexOf(divBorrar);
  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

  favoritos.splice(indiceBorrar, 1);
  localStorage.setItem('favoritos', JSON.stringify(favoritos));

  divBorrar.remove();

  if (favoritos.length === 0) {
    let contenedorMensajes = document.getElementById('sec-favorities-list');
    contenedorMensajes.innerHTML = `<p id="aviso_warning" class="amarillo">No tiene películas seleccionadas en sus favoritos</p>`;
  }
}







