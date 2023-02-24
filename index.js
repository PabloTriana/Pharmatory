var firebaseConfig = {
    apiKey: "AIzaSyBushCUf16bA4JKjKuoZx9j-XnfJ2itQqU",
    authDomain: "pharmatory-49da9.firebaseapp.com",
    databaseURL: "https://pharmatory-49da9-default-rtdb.firebaseio.com",
    projectId: "pharmatory-49da9",
    storageBucket: "pharmatory-49da9.appspot.com",
    messagingSenderId: "313792425018",
    appId: "1:313792425018:web:3fa79b87236254ce349903",
    measurementId: "G-12P50WHSLB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function resetFields() {
    document.getElementById("Input1").value = '';
    document.getElementById("Input2").value = '';
    document.getElementById("Input3").value = '';
    document.getElementById("Input4").value = 'selecciona';
}
function createR() {
    document.getElementById("Input1").disabled = false;
    //Guardo los datos capturados usando el id de cada control
    var codigo = document.getElementById("Input1").value;
    var nombre = document.getElementById("Input2").value;
    var precio = document.getElementById("Input3").value;
    var marca = document.getElementById("Input4").value;

    //validaciones
    if (codigo.length > 0) {
        //creo un objeto que guarda los datos
        var medicamento = {
            codigo, //matricula:id
            nombre,
            precio,
            marca,
        }

        

        firebase.database().ref('Medicamentos/' + codigo).update(medicamento).then(() => {
            resetFields();
        }).then(() => {
            read();
        });

        swal("Listo!", "Agregado correctamente", "success");


    }
    else {
        swal("Error", "Llena todos los campos", "warning");
    }

    document.getElementById("Input1").disabled = false;

}

function read() {
    document.getElementById("Table1").innerHTML = '';

    var ref = firebase.database().ref('Medicamentos');


    ref.on("child_added", function (snapshot) {
        printRow(snapshot.val());
    });

}

function printRow(medicamento) {

    if (medicamento != null) {
        var table = document.getElementById("Table1");

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);

        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = medicamento.codigo;
        cell2.innerHTML = medicamento.nombre;
        cell3.innerHTML = medicamento.precio;
        cell4.innerHTML = medicamento.marca;
        cell5.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${medicamento.codigo})">Eliminar</button>`;
        cell6.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR(' + medicamento.codigo + ')">Modificar</button>';
    }
}

function deleteR(medicamento) {
    firebase.database().ref('Medicamentos/' + medicamento).set(null).then(() => {
        read();
    }).then(() => {
        swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(codigo) {
    var ref = firebase.database().ref('Medicamentos/' + codigo);
    ref.on('value', function (snapshot) {
        updateR(snapshot.val());
    });
}

function updateR(medicamento) {
    if (medicamento != null) {
        document.getElementById("Input1").value = medicamento.codigo;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value = medicamento.nombre;
        document.getElementById("Input3").value = medicamento.precio;
        document.getElementById("Input4").value = medicamento.marca;
    }
}


//Para consulta de carrera
function readQ() {
    document.getElementById("Table2").innerHTML = '';
    var c = document.getElementById("Input5").value;

    var ref = firebase.database().ref("Medicamentos");
    ref.orderByChild("marca").equalTo(c).on("child_added", function (snapshot) {
        printRowQ(snapshot.val());
    });

}


function printRowQ(medicamento) {

    var table = document.getElementById("Table2");

    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = medicamento.codigo;
    cell2.innerHTML = medicamento.nombre;
    cell3.innerHTML = medicamento.precio;
    cell4.innerHTML = medicamento.marca;

}