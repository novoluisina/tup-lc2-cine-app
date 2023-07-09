
function validarEmail(email) {
  
    // Expresión regular para validar el formato de un correo electrónico
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    
function mostrarMensajeError() {
    
    let contenedorMensaje = document.getElementById('sec-cine-result');
    contenedorMensaje.innerHTML=`<p id="error_mail" class="rojo">Ingrese un Email válido</p>`
}
    
function procesarFormulario(){
    
    let email = document.getElementById('mail').value;
      
    if (validarEmail(email)==false) {
        mostrarMensajeError()
    }   
}