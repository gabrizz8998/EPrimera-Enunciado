//Añade el evento al input type file
files.addEventListener("change", leeFicheroLocal, true);
//Array para los registros del fichero xml
var datos = new Array();
// Array de marcadores de Google Map para pòder borrarles
var marcadores =  new Array();
 
var mobiliario = new Object();

function datosMobiliario(Id, Descripcion, Latitud, Longitud, URL, Fecha_mantenimiento, Familia) {
    this.Id = Id;
    this.Descripcion = Descripcion;
    this.Latitud = Latitud;
    this.Longitud = Longitud;
    this.URL = URL;
    this.Fecha_mantenimiento = Fecha_mantenimiento;
    this.Familia = Familia;
    this.guarda = guardadatos;
}

function guardadatos() {
    datos.push(this);
}

//Funcion que se ejecuta al cargar un fichero y lee sus datos 
function leeFicheroLocal(evt) {
    //Borra los datos de el anterior fichero introducido
    borrarMarcadores();
    datos=new Array();
    vaciarCampos();
   
    

    var ficheros = evt.target.files; // FileList object

    var file = ficheros[0];

    //Comprobar que es una fecha valida
    var fechas=false;
    if(fechaDesde.value!=""&&fechaHasta.value!=""){
        var fecha_Desde=fechaDesde.value.replaceAll('-','');
            var fecha_Hasta=fechaHasta.value.replaceAll('-','');
        if(fecha_Desde<fecha_Hasta){
            fechas=true;
        }
    }
    if(!fechas){
        if(fechaDesde.value==""&&fechaHasta.value==""){

        }else alert("Intervalo de fechas no valido")
    }
    

    var reader = new FileReader();
    reader.onload = function (event) {
       
        var contenido = event.target.result;
         //alert("contenido" + contenido)
        parser = new DOMParser();
        myXml = parser.parseFromString(contenido, "text/xml");
         //alert("myXml" + myXml)
         //mete los datos del xml en arrays
        aid= myXml.getElementsByTagName("id");
        adescripcion= myXml.getElementsByTagName("descripcion");
        alatitud = myXml.getElementsByTagName("latitud");
        alongitud = myXml.getElementsByTagName("longitud");
        aurl=myXml.getElementsByTagName("imagen");
        afechaMantenimiento=myXml.getElementsByTagName("fechaMantenimiento");
        afamilia=myXml.getElementsByTagName("familia");

        //recorre los arrays para meter los datos en objetos
        for (var i = 0; i < aid.length; i++) {
            //mete los datos en un objeto 
            var mobiliario = new datosMobiliario(aid.item(i).firstChild.nodeValue,
                adescripcion.item(i).firstChild.nodeValue,
                alatitud.item(i).firstChild.nodeValue,
                alongitud.item(i).firstChild.nodeValue,
                aurl.item(i).firstChild.nodeValue,
                afechaMantenimiento.item(i).firstChild.nodeValue,
                afamilia.item(i).firstChild.nodeValue
            );
            //Si se ha introducido una fecha valida se comprueba si la fecha del objeto creado esta entre las dos fechas introducidas
            if(fechas){
                if(mobiliario.Fecha_mantenimiento>fecha_Desde&&mobiliario.Fecha_mantenimiento<fecha_Hasta){
                    //Se guarda el objeto en el array de objetos y se crea y visualiza su marcadoren si su familia coincide con la familia introducida en el select. 
                    //Si no se ha introducido ninguna familia se introducen todos los objetos. 
                    //Realizado con un switch case
                    switch(FamiliaSeleccionada.value){
                        case "Servicios" :{
                            if(mobiliario.Familia=="Servicios"){

                                mobiliario.guarda();
                                visualizaMarcador(mobiliario);
                            }
                            break;
                        }
                        case "Infraestrucuturas" :{
                            if(mobiliario.Familia=="Infraestrucuturas"){
                                mobiliario.guarda();
                                visualizaMarcador(mobiliario);
                            }
                            break;
                        }
                        case "Cultura" :{
                            if(mobiliario.Familia=="Cultura"){
                                mobiliario.guarda();
                                visualizaMarcador(mobiliario);
                            }
                            break;
                        }
                        default :{
                            mobiliario.guarda();
                            visualizaMarcador(mobiliario);
                            break;
                        }
                    }
                }
                //Esto se ejecuta si no se ha introducido fecha o si la introducida no es una fecha válida
            }else{
                //Se guarda el objeto en el array de objetos y se crea y visualiza su marcadoren si su familia coincide con la familia introducida en el select. 
                    //Si no se ha introducido ninguna familia se introducen todos los objetos. 
                    //Realizado con un switch case
                switch(FamiliaSeleccionada.value){
                    case "Servicios" :{
                        if(mobiliario.Familia=="Servicios"){
                            mobiliario.guarda();
                            visualizaMarcador(mobiliario);
                        }
                        break;
                    }
                    case "Infraestrucuturas" :{
                        if(mobiliario.Familia=="Infraestrucuturas"){
                            mobiliario.guarda();
                            visualizaMarcador(mobiliario);
                        }
                        break;
                    }
                    case "Cultura" :{
                        if(mobiliario.Familia=="Cultura"){
                            mobiliario.guarda();
                            visualizaMarcador(mobiliario);
                        }
                        break;
                    }
                    default :{
                        mobiliario.guarda();
                        visualizaMarcador(mobiliario);
                        break;
                    }
                }
            }
            
          //  if(afamilia.item(i).firstChild.nodeValue)

            
            
        }
        //Los datos de los objetos guardados en el array de objetos datos se visualizan en la tabla
        imprimeTabla(datos);
        
       // Permite que se ejecute de nuevo el evento change, ya que siempre trabajamos con el mismo fichero xml
        evt.target.value='';
        //datos= new Array();
    }

    reader.onerror = function (event) {
        console.error("Error de lectura del fichero" + event.target.error.code);
    };

    reader.readAsText(file);
    
}
