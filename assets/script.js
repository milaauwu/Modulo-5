let personajesMostrados = {
    'personajes-1': [],
    'personajes-2': [],
    'personajes-3': []
};

let timeoutId; 

// Búsqueda de personajes para un rango específico
function iniciarBusquedaPersonajes(inicio, fin, elementoId) {
    const contenedor = document.getElementById(elementoId);

    // limpia si el mouse se mueve muy rapido
    clearTimeout(timeoutId);

    // Timeout para retrasar al mostrar
    timeoutId = setTimeout(() => {
        const siguienteIdPersonaje = obtenerSiguienteIdPersonaje(inicio, fin, elementoId);

        if (siguienteIdPersonaje !== null) {
            buscarYMostrarPersonaje(siguienteIdPersonaje, contenedor);
        }
    }, 200); 
}

// buscar y mostrar personaje por ID
function buscarYMostrarPersonaje(id, contenedor) {
    // evitar personaje ya mostrado
    if (personajesMostrados[contenedor.id].includes(id)) return;

    fetch(`https://rickandmortyapi.com/api/character/${id}/`)
        .then(response => {
            //respuesta a objeto js
            return response.json();
        })
        .then(personaje => {
            const bloquePersonaje = document.createElement('div');
            bloquePersonaje.classList.add('personaje-tarjeta'); 

            // personaje info
            bloquePersonaje.innerHTML = `
                <img class="img-personaje" src="${personaje.image}" alt="${personaje.name}" /> 
                <div class="info-personaje">
                    <strong>Nombre:</strong> ${personaje.name} <br>
                    <strong>Estado:</strong> ${personaje.status} <br>
                    <strong>Especie:</strong> ${personaje.species} <br>
                </div>
            `;
            contenedor.appendChild(bloquePersonaje);

            // personaje mostrado
            personajesMostrados[contenedor.id].push(id);

            // clase visible para animación
            setTimeout(() => {
                bloquePersonaje.classList.add('visible');
            }, 0);
        })
}

//siguiente ID de personaje a cargar
function obtenerSiguienteIdPersonaje(inicio, fin, elementoId) {
    // cuantos personajes se han mostrado
    if (personajesMostrados[elementoId].length >= 5) {
        // si ya van 5 detener 
        return null;
    }

    // ID de personaje que no se ha mostrado(por orden)
    for (let i = inicio; i <= fin; i++) {
        if (!personajesMostrados[elementoId].includes(i)) {
            return i;
        }
    }
}

clearTimeout(timeoutId);

