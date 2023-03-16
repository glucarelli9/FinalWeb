function loadImage(url) {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = "blob";
        xhr.onload = function (e) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const res = event.target.result;
                resolve(res);
            }
            const file = this.response;
            reader.readAsDataURL(file);
        }
        xhr.send();
    });
}

let signaturePad = null;

window.addEventListener('load', async () => {


    const canvas = document.querySelector("canvas");
    canvas.height = canvas.offsetHeight;
    canvas.width = canvas.offsetWidth;

    signaturePad = new SignaturePad(canvas, {});

    var cancelButton = document.getElementById('clear');
    cancelButton?.addEventListener('click', function (e) {
        signaturePad.clear();
    });
    const form = document.querySelector('#form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        //Hijos:
        
        //
        let dniConyu = document.getElementById('dniConyu').value.toUpperCase();
        let fechaConyu = document.getElementById('fechaConyu').value.toUpperCase();
        let nombreConyu = document.getElementById('nombreConyu').value.toUpperCase();
        let conyugecircle = document.getElementById('checkb1').checked;  // check box
        let asignacion = document.getElementById('select2').value;
        let obrasocial = document.getElementById('obrasocial').value.toUpperCase();
        let nameparent = document.getElementById('nameparent').value.toUpperCase();
        let cuil = document.getElementById('cuil').value.toUpperCase();
        let contactemer = document.getElementById('contactemer').value.toUpperCase();
        let dni = document.getElementById('dni').value.toUpperCase();
        let cel = document.getElementById('cel').value.toUpperCase();
        let nacionalidad = document.getElementById('nacionalidad').value.toUpperCase();
        let telf = document.getElementById('telf').value.toUpperCase();
        let state = document.getElementById('state').value.toUpperCase();
        let fechanac = document.getElementById('fechanac').value.toUpperCase();
        let codigop = document.getElementById('codigop').value.toUpperCase();
        let provi = document.getElementById('provi').value.toUpperCase();
        let local = document.getElementById('local').value.toUpperCase();
        let domiL = document.getElementById('domiL').value.toUpperCase();
        let domiR = document.getElementById('domiR').value.toUpperCase();
        let nombreyapp = document.getElementById('nombreyapp').value.toUpperCase();
        console.log(conyugecircle);
        generatePDF(dniConyu,fechaConyu,nombreConyu,conyugecircle,asignacion, obrasocial, nameparent, cuil, contactemer, dni, cel, nacionalidad, telf, state, fechanac, codigop, provi, local, domiL, domiR, nombreyapp);
    })

});

async function generatePDF(dniConyu,fechaConyu,nombreConyu,conyugecircle,asignacion, obrasocial, nameparent, cuil, contactemer, dni, cel, nacionalidad, telf, state, fechanac, codigop, provi, local, domiL, domiR, nombreyapp) {
    const image = await loadImage("img/Formularios/Datos_Personales.jpg");
    const signatureImage = signaturePad.toDataURL();
    const pdf = new jsPDF('p', 'pt', 'letter');
    pdf.addImage(image, 'PNG', -10, -37, 600, 800);
    pdf.addImage(signatureImage, 'PNG', 320, 698, 280, 60);
    // Formato a la Fecha de Nacimiento.
    var salida = formato(fechanac)
    function formato(texto) {
        return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');
    }
    // End

    pdf.setFontSize(9);

//Comenzamos con los hijos:
    







// Conyuge comienzo

    pdf.text(dniConyu,300,292);
    // Formato Fecha de nacimiento:
    var salida2 = formato(fechaConyu)
    function formato(texto){
        return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');
    }
    // Fin formato

    pdf.text(salida2,122,292);
    pdf.text(nombreConyu,168,280);

// Conyuge FIN

    // Check box Analisis
    if(conyugecircle == true ){
        pdf.setDrawColor(0);
        pdf.setFillColor(0, 0, 0);
        pdf.roundedRect(215, 297, 5, 6, 2, 2, 'FD'); //  Black sqaure with rounded corners 
    } else {
        pdf.setDrawColor(0);
        pdf.setFillColor(0, 0, 0);
        pdf.roundedRect(182, 297, 5, 6, 2, 2, 'FD'); //  Black sqaure with rounded corners 
    }
    // Check box Analisis

   
   
   
    // Comienzo Asignacion
    if (parseInt(asignacion) == 1) {
        pdf.text("Asignación Universal por Hijo (AUH)", 335, 303);
    } else {
        if (parseInt(asignacion) == 2) {
            pdf.text("Asignación por Embarazo", 335, 303);
        } else {
            if (parseInt(asignacion) == 3) {
                pdf.text("Asignación por Maternidad", 335, 303);
            }
        }
    }
    if (parseInt(asignacion) == 4) {
        pdf.text("Pensión por Fallecimiento", 335, 303);
    } else {
        if (parseInt(asignacion) == 5) {
            pdf.text("Pensión por Invalidez", 335, 303);
        }
    }
    if (parseInt(asignacion) == 6) {
        pdf.text("Prestación por Desempleo", 335, 303);
    }
    if (parseInt(asignacion) == 7) {
        pdf.text("Pensión por Jubilación", 335, 303);
    }
    if (parseInt(asignacion) == 8) {
        pdf.text("Pro. de Atención Integral a la Primera Infancia", 335, 303);
    }
    if (parseInt(asignacion) == 9) {
        pdf.text("Subsidio Familiar Universal", 335, 303);
    }
    if (parseInt(asignacion) == 10) {
        pdf.text("Subsidio para Madres Jefas de Familia", 335, 303);
    }
    if (parseInt(asignacion) == 11) {
        pdf.text("Asignación Familiar por Hija e Hijo", 335, 303);
    }
    //
    //Fin de Asignacion

    pdf.text(obrasocial, 94, 255)
    pdf.text(nameparent, 376, 243)
    pdf.text(cuil, 76, 243)
    pdf.text(contactemer, 393, 232)
    pdf.text(dni, 75, 232);
    pdf.text(cel, 335, 220);
    pdf.text(nacionalidad, 96, 219)
    pdf.text(telf, 338, 208)
    pdf.text(state, 89, 208)
    pdf.text(salida, 123, 196)
    pdf.text(codigop, 479, 184)
    pdf.text(provi, 262, 184)
    pdf.text(local, 85, 184)
    pdf.text(domiL, 103, 173)
    pdf.text(domiR, 100, 161)
    pdf.text(nombreyapp, 125, 150)





    let date = new Date()

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    pdf.save("Datos_Personales-" + day + "/" + month + "/" + year + ".pdf");

}

//your javascript goes here
var currentTab = 0;
document.addEventListener("DOMContentLoaded", function (event) {


    showTab(currentTab);

});

function showTab(n) {
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }
    fixStepIndicator(n)
}

function nextPrev(n) {
    var x = document.getElementsByClassName("tab");
    if (n == 1 && !validateForm()) return false;
    x[currentTab].style.display = "none";
    currentTab = currentTab + n;
    if (currentTab >= x.length) {
        // document.getElementById("regForm").submit();
        // return false;
        //alert("sdf");
        document.getElementById("nextprevious").style.display = "none";
        document.getElementById("all-steps").style.display = "none";
        document.getElementById("register").style.display = "none";
        document.getElementById("text-message").style.display = "block";




    }
    showTab(currentTab);
}

function validateForm() {
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    for (i = 0; i < y.length; i++) {
        if (y[i].value == "") {
            y[i].className += " invalid";
            valid = false;
        }
    }
    if (valid) { document.getElementsByClassName("step")[currentTab].className += " finish"; }
    return valid;
}

function fixStepIndicator(n) {
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) { x[i].className = x[i].className.replace(" active", ""); }
    x[n].className += " active";
}  