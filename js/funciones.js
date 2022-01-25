//Vacia los inputs al coger un nuevo archivo
function vaciarCampos() {
    cId.value = "";
    cDescripcion.value = "";
    cLatitud.value = "";
    cLongitud.value = "";
    cImagen.value = "";
    cFechaMantenimiento.value = "";
    cFamilia.value = "";
}

//Introduce los datos de los registros recogidos en la tabla. Si no hay registros recogidos no hace nada
function imprimeTabla(datos) {
    document.getElementById("cuerpo").innerHTML = '';
    if(datos.length>0){
        for (c = 0; c < datos.length; c++) {
            var da = new datosMobiliario();
            da = datos[c];
            var tabla = document.getElementById("tabla");
            var cuerpo = document.getElementById("cuerpo");
            linea = document.createElement("tr");
            parrafo = document.createElement("p");
            dato = document.createTextNode(datos[c].Id);
            Columna = document.createElement("td");
            Columna.appendChild(dato);
            linea.appendChild(Columna);
    
            parrafo = document.createElement("p");
            dato = document.createTextNode(datos[c].Descripcion);
            Columna = document.createElement("td");
            Columna.appendChild(dato);
            linea.appendChild(Columna)
    
            parrafo = document.createElement("p");
            dato = document.createTextNode(datos[c].Fecha_mantenimiento);
            Columna = document.createElement("td");
            Columna.appendChild(dato);
            linea.appendChild(Columna);
    
            parrafo = document.createElement("p");
            dato = document.createTextNode(datos[c].Familia);
            Columna = document.createElement("td");
            Columna.appendChild(dato);
            linea.appendChild(Columna);
    
            cuerpo.appendChild(linea);
        }
        tabla.appendChild(cuerpo);
    }
    
}

//Crea y visualiza los marcadores de los registros recogidos en el mapa
function visualizaMarcador(mobiliario) {
    var latlng = new google.maps.LatLng(mobiliario.Latitud, mobiliario.Longitud);
    var icono = {
        url: mobiliario.URL, // url
        scaledSize: new google.maps.Size(25, 25), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    };
    var marker = new google.maps.Marker({
        position: latlng,
        icon: icono,
        map: map,
        id:mobiliario.Id,
        descripcion:mobiliario.Descripcion,
        url:mobiliario.URL,
        familia:mobiliario.Familia

    });
    aMarcadores.push(marker);   
    google.maps.event.addListener(marker, 'click', function () {

        leeDireccion(latlng, mobiliario);
    });
}