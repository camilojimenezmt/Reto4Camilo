const baseUrl = "http://152.67.255.53:8080/api/"

function traerInformacionCategorias(){
    console.log("test");
        $.ajax({
        url:baseUrl +"Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(respuesta){

    let myTable="<table  border = 1>";
    myTable+="<tr>";
    myTable+="<th>Nombre</th>";
    myTable+="<th>Descripción</th>";
    myTable+="<th colspan = 2> Acciones </th>";
    "</tr>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td> <button onclick=' actualizarInformacionCategorias("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarCategoria("+respuesta[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado1").html(myTable);
}


function guardarInformacionCategorias(){
   
    if ($("#Cname").val().length==0 || $("#Cdescription").val().length==0){

        alert("Todos los campos son obligatorios");
    }else{
   
    let var2 = {
        name:$("#Cname").val(),
        description:$("#Cdescription").val()
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:baseUrl + "Category/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");
    
    
        }
        });}

}
function actualizarInformacionCategorias(idElemento){
    
    if ($("#Cname").val().length==0 || $("#Cdescription").val().length==0){

        alert("Todos los campos son obligatorios");
    }else{
    
    
    let myData={
        id:idElemento,
        name:$("#Cname").val(),
        description:$("#Cdescription").val()

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url: baseUrl + "Category/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado1").empty();
            $("#id").val("");
            $("#Cname").val("");
            $("#Cdescription").val("");
            traerInformacionCategorias();
            alert("se ha Actualizado correctamente la categoria")
        }
    });}

}

function borrarCategoria(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url: baseUrl + "Category/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado1").empty();
            traerInformacionCategorias();
            alert("Se ha Eliminado.")
        }
    });

}
