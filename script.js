

// Generar los datos del JSON
function generarJSON() {
    const nombres = ['Juan', 'María', 'Pedro', 'Ana', 'Luis', 'Carla', 'Marta', 'Mario', 'Sofía', 'Jorge'];
    const apellidos = ['García', 'Martínez', 'López', 'Hernández', 'González', 'Pérez', 'Sánchez', 'Rodríguez', 'Fernández', 'Torres'];
    const matriculas = ['12345', '23456', '34567', '45678', '56789', '67890', '78901', '89012', '90123', '01234'];
    const json = [];
    for (let i = 0; i < 10; i++) {
        const activo = Math.random() < 0.5;
        const nombre = nombres[Math.floor(Math.random() * nombres.length)];
        const apellido = apellidos[Math.floor(Math.random() * apellidos.length)];
        const matricula = matriculas[Math.floor(Math.random() * matriculas.length)];
        const objeto = { activo, matricula, nombreCompleto: `${nombre} ${apellido}` };
        json.push(objeto);
    }
    return json;
}

// Llenar la tabla con los datos del JSON
const datos = generarJSON();
const tablaBody = jQuery('#tabla-body');
// console.log(datos);
function llenarTabla(datosFiltrados) {

    for (let i = 0; i < datosFiltrados.length; i++) {
        const fila = $('<tr>');
        const checkbox = $('<input>').attr({ type: 'checkbox', id: 'checkbox-' + i });
        const inactivo = $('<i>').addClass('fas fa-times-circle text-danger');
        const activo = $('<i>').addClass('fas fa-check-circle text-success');

        if (datosFiltrados[i].activo) {
            activo.addClass('opacity-50');
        } else {
            inactivo.addClass('opacity-50');
        }

        const matricula = $('<td>').text(datosFiltrados[i].matricula);
        const nombreCompleto = $('<td>').text(datosFiltrados[i].nombreCompleto);
        const estado = $('<td>');
        const estadoText = datosFiltrados[i].activo ? 'Inactivo' : 'Activo';
        const estadoColor = datosFiltrados[i].activo ? 'text-danger' : 'text-success';
        const circle = $('<i>').addClass(`fas fa-circle ${estadoColor}`);
        estado.append(circle);
        estado.append(' ' + estadoText);

        const inactivoTd = $('<td>').append(inactivo);
        const activoTd = $('<td>').append(activo);
        fila.append($('<td>').append(checkbox));
        fila.append(inactivoTd);
        fila.append(activoTd);
        fila.append(matricula);
        fila.append(nombreCompleto);
        fila.append(estado);
        tablaBody.append(fila);
    }
}



llenarTabla(datos);

// Obtener los elementos del DOM
const buscador = jQuery('#buscador');
const botonBuscador = jQuery('#boton-buscador');



// Función para filtrar y mostrar los datos en la tabla
function filtrarYMostrarDatos(busqueda) {
    tablaBody.empty();

    const datosFiltrados = datos.filter(dato => dato.nombreCompleto.toLowerCase().includes(busqueda.toLowerCase()));
   // console.log(datosFiltrados);
    llenarTabla(datosFiltrados);
}



// Agregar event listener al botón de búsqueda
botonBuscador.on('click', () => {
    const busqueda = buscador.val();
    filtrarYMostrarDatos(busqueda);
});

// Obtener los elementos del DOM
const checkAll = jQuery('#check-all');
const checkAllFooter = jQuery('#check-all-footer');
const checkboxes = () => jQuery('input[type="checkbox"][id^="checkbox-"]');

// Función para seleccionar o deseleccionar todos los checkbox
function toggleCheckboxes(checked) {
    checkboxes().prop('checked', checked);
}

// Agregar event listeners a los checkbox "check-all" y "check-all-footer"
checkAll.on('change', function () {
    toggleCheckboxes(this.checked);
    checkAllFooter.prop('checked', this.checked);
});

checkAllFooter.on('change', function () {
    toggleCheckboxes(this.checked);
    checkAll.prop('checked', this.checked);
});


// Obtener los elementos del DOM
const setInactivoBtn = jQuery('#set-inactivo');
const setActivoBtn = jQuery('#set-activo');

// Función para cambiar la propiedad "activo" de cada elemento de la tabla
function cambiarEstado(estado) {
    checkboxes().each(function () {
        if (this.checked) {
            const index = parseInt(this.id.replace('checkbox-', ''), 10);
            datos[index].activo = estado;
        }
    });

    // Recargar la tabla
    filtrarYMostrarDatos(buscador.val());

    // Limpiar los checkboxes
    checkboxes().prop('checked', false);
    checkAllFooter.prop('checked', false);
    checkAll.prop('checked', false);
}

// Agregar event listeners a los botones "set-inactivo" y "set-activo"
setInactivoBtn.on('click', () => {
    cambiarEstado(false);
});

setActivoBtn.on('click', () => {
    cambiarEstado(true);
});

buscador.on('keydown', (e) => {
if (e.key === 'Enter') {
const busqueda = buscador.val();
filtrarYMostrarDatos(busqueda);
}
});
