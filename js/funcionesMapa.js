//Crea un mapa de Google Maps
var aMarcadores=new Array();
var map;
var latitud = 41.67097948393865;
var longitud = -3.6769259916763985;
function inicio()
{
 
map = new google.maps.Map(
    document.getElementById('map_canvas'), {
    // En el mapa se visualiza el mapa correspondiente a esta latitud, longitud
        center: new google.maps.LatLng(latitud,longitud),//latitud,longitud),//
       // center: new google.maps.LatLng(41.6685198,-3.6886618),//latitud,longitud),//
    zoom: 18, // zoom del mapa
    draggableCursor: 'auto', // forma del cursor
    draggingCursor: 'crosshair',
    mapTypeId: google.maps.MapTypeId.SATELLITE // tipo de mama
});
}

function leeDireccion(latlng,mobiliario) {
    geocoder = new google.maps.Geocoder();
    if (latlng != null) {
        //    address = latlng;
        //    geocoder.getLocations(latlng, MuestraDireccion);
            
        geocoder.geocode({'latLng': latlng}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    MuestraDireccion(latlng,results[0].formatted_address,mobiliario)
                } else {
                    alert('No results found');
                }
            } else {
                alert('Geocoder failed due to: ' + status);
            }
        });      
    }
}

//Muestra los datos del marcador pinchado
function MuestraDireccion(latlng,direccion,mobiliario) {
    cId.value=mobiliario.Id;
    cDescripcion.value=mobiliario.Descripcion;
    cLatitud.value=latlng.lat();
    cLongitud.value=latlng.lng();
    cImagen.value=mobiliario.URL;
    cFechaMantenimiento.value=mobiliario.Fecha_mantenimiento;
    cFamilia.value=mobiliario.Familia;
   // direccionLocal.value= direccion;
    //latitud_longitud.value=latlng.lat()+","+latlng.lng();
}

//Borra los marcadores. Se ejecuta cuando se carge otro archivo
function borrarMarcadores(){
    // Elimina los marcadores de una consulta anterior
        for (var i = 0; i < aMarcadores.length; i++ ) {
            aMarcadores[i].setMap(null);
          }     
          aMarcadores= new Array();
    }
    



inicio();