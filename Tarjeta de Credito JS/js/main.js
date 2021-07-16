const tarjeta = document.querySelector('#tarjeta'),

    btnAbrirFormulario = document.querySelector('#btn-abrir-formulario'),
    formulario = document.querySelector('#formulario-tarjeta'),
    numeroTarjeta = document.querySelector('#tarjeta .numero'),
    nombreTarjeta = document.querySelector('#tarjeta .nombre');
    logoMarca = document.querySelector('#logo-marca'),
    firma = document.querySelector('#tarjeta .firma p'),
    mesExpiracion = document.querySelector('#tarjeta #expiracion .mes'),
    yearExpiracion = document.querySelector('#tarjeta #expiracion .year'),
    ccv = document.querySelector('#tarjeta .ccv');


// Darla vuelta a la tarjeta del
const mostrarFrente = () => {
    if (tarjeta.classList.contains('active')) {
        tarjeta.classList.remove('active');
    }
};


// * Rotación de la tarjeta 
tarjeta.addEventListener('click', () => {
	tarjeta.classList.toggle('active');
});

// * Boton de abrir formulario
btnAbrirFormulario.addEventListener('click', () => {
	btnAbrirFormulario.classList.toggle('active')
    formulario.classList.toggle('active');
});

// * Select del mes generado dinamicamente
for(let i = 1; i <= 12; i++) {
    let opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerHTML = i;
    formulario.selectMes.appendChild(opcion);
}

// * Select del año generado dinamicamente
const yearActual = new Date().getFullYear();
for(let i = yearActual; i <= yearActual + 10; i++) {
    let opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerHTML = i;
    formulario.selectYear.appendChild(opcion);
}

/* Input numero de tarjeta */
formulario.inputNumero.addEventListener('keyup', (e) => {
    let valorInput = e.target.value;

	formulario.inputNumero.value = valorInput
	// Eliminamos espacios en blanco
	.replace(/\s/g, '')
	// Eliminar las letras
	.replace(/\D/g, '')
	// Ponemos espacio cada cuatro numeros
	.replace(/([0-9]{4})/g, '$1 ')
	// Elimina el ultimo espaciado
	.trim();

    numeroTarjeta.textContent = valorInput;

    if(valorInput.length == '') {
        numeroTarjeta.textContent = '#### #### #### ####';

        logoMarca.innerHTML = '';
    }

    if(valorInput[0] == 4){
        logoMarca.innerHTML = '';
        const imagen = document.createElement('img');
        imagen.src = 'img/logos/visa.png';
        logoMarca.appendChild(imagen);
    }else if(valorInput[0] == 5){
        logoMarca.innerHTML = '';
        const imagen = document.createElement('img');
        imagen.src = 'img/logos/mastercard.png';
        logoMarca.appendChild(imagen);
    }
    
    //Dar la vuelta a la tarjeta
    mostrarFrente();

});

// * Input nombre de tarjeta
formulario.inputNombre.addEventListener('keyup', (e) => {
    let valorInput = e.target.value;
    nombreTarjeta.textContent = valorInput;

    formulario.inputNombre.value = valorInput.replace(/[0-9]/g, '');
    nombreTarjeta.textContent = valorInput;
    firma.textContent = valorInput;

    if(valorInput.length == '') {
        nombreTarjeta.textContent = 'Jhon Doe';
    }

    mostrarFrente();
});

/* Select mes */

formulario.selectMes.addEventListener('change', (e) => {
    mesExpiracion.textContent = e.target.value;
    mostrarFrente();
});

/* Select Año */
formulario.selectYear.addEventListener('change', (e) => {
    yearExpiracion.textContent = e.target.value.slice(2);
    mostrarFrente();
});

/* CCV */
formulario.inputCCV.addEventListener('keyup', (e) => {
    if(!tarjeta.classList.contains('active')) {
        tarjeta.classList.toggle('active');
    }
    formulario.inputCCV.value = formulario.inputCCV.value.replace(/\D/g, '').replace(/\s/g, '');
    ccv.textContent = formulario.inputCCV.value;
});




