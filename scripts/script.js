const listaTonalidades = ["F","Bb","Eb","Ab","Db","Gb","F#","B","E","A","D","G","C","Am","Em","Bm","F#m","C#m","G#m","Ebm","Bbm","Fm","Cm","Gm","Dm"]

// al cargar la página añade un detector de clic a cada campo:
listaTonalidades.forEach(obj => {
	if(document.querySelector('area') != null){
		document.querySelector('area[title="' + obj +'"]').addEventListener("click", (event) => {
			event.preventDefault();
			tonalidad = obj;
			console.log(tonalidad);
			mostrarDatos();
		});
	}
});

if(document.querySelector(".botones") != null){
	boton = document.querySelector(".botones");
	estilo = boton.style.display;

	// función que acaba las animaciones:
	boton.addEventListener('animationend', () => {	
		if (estilo == "none"){
			boton.classList.remove('animated');
			boton.classList.remove('fadeInDown');
		} else {
			boton.classList.remove('animated');
			boton.classList.remove('fadeOutUp');
			boton.style.display = "none";
		};
		estilo = boton.style.display;
	});
};

// funciones para mostrar los datos:
const datosMayor = () => {
	let contenido = '';
	notasTonalidad(tonalidad).forEach(nota => {
		nota = nota.replace("#","<sup>&#9839</sup>");	
		nota = nota.replace("b","<sup>&#9837</sup>");
		contenido += nota + ' ';
	});
	if(document.querySelector("#notas") != null){
		document.querySelector("#notas").innerHTML = contenido;
	}
}

const datosMenor = () => {
	let contenido = '';
	tonalidad = tonalidad.replace("m","");
	alterar(tonalidad,tipo).forEach(nota => {
		if (!nota.includes("&#119082")) {
			nota = nota.replace("#","<sup>&#9839</sup>");
			nota = nota.replace("b","<sup>&#9837</sup>");
		}
		contenido += nota + ' ';
	});
	document.querySelector("#notas").innerHTML = contenido;
}

// selector de modos menores con animaciones y llamada a las funciones de mostrar datos:
const mostrarDatos = () => {
	let datos = document.querySelector("#datos");

	if (tonalidad.includes("m") && estilo == 'none'){
		boton.style.display = "block";
		boton.classList.add('animated');
		boton.classList.add('fadeInDown');
	} else if (!tonalidad.includes("m") && estilo == 'block'){
		boton.classList.add('animated');
		boton.classList.add('fadeOutUp');
	};

	tono = document.querySelector(".tono p");
	let tonalidad_local = tonalidad
	tonalidad_local = tonalidad_local.replace("#","<sup>&#9839</sup>");	
	tonalidad_local = tonalidad_local.replace("b","<sup>&#9837</sup>");
	tono.innerHTML = tonalidad_local;

	if (!tonalidad.includes("m")){
		datosMayor();
	} else {
		tipo = 'menor';
		document.querySelectorAll(".b_menores").forEach(obj => obj.style.backgroundColor = "white");
		document.querySelector("#menor").style.backgroundColor = "lightgray";
		datosMenor();
	} ;
};

// activa los botones para seleccionar el modo menor (nat, arm o mel):
document.querySelectorAll(".b_menores").forEach(obj => {
	obj.addEventListener("click", (e) => {
		e.preventDefault();
		tipo = obj.id;
		datosMenor();
		document.querySelectorAll(".b_menores").forEach(obj => obj.style.backgroundColor = "white");
		obj.style.backgroundColor = "lightgray";
	});
	
});

// selector de tonalidad en la página de referencia:
const tonalidadesMayores = [" ","C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"]
selectores = ''
tonalidadesMayores.forEach(obj => {
	selectores += `<option value="${obj}">${obj}</option>`
});
if(document.querySelector("#escoger_tono") != null){
	document.querySelector("#escoger_tono").innerHTML = selectores;
};

if(document.querySelector("select") != null){
	document.querySelector("select").addEventListener("change",() => {
		let tono = document.querySelector("#escoger_tono").value;
		if (tono == " ") location.reload();
		let i=0;
		document.querySelectorAll(".ch").forEach(chord => {
			if (chord.closest(".col").id == "mayor") chord.innerHTML = notasTonalidad(tono)[i]; 
			if (chord.closest(".col").id == "menor") chord.innerHTML = alterar(tono,"menor")[i-7];
			if (chord.closest(".col").id == "menor_mel") chord.innerHTML = alterar(tono,"menor_mel")[i-14];
			if (chord.closest(".col").id == "menor_arm") chord.innerHTML = alterar(tono,"menor_arm")[i-21];
			i++;
		});
		document.querySelectorAll(".ch").forEach(chord => {
			chord.innerHTML = chord.innerHTML.replace("bb","<sup>&#119083</sup>");
			chord.innerHTML = chord.innerHTML.replace("#","<sup>&#9839</sup>");
			chord.innerHTML = chord.innerHTML.replace("b","<sup>&#9837</sup>");
		});
	});
};

//inicia la página index.html en do mayor:
tonalidad = "C";
datosMayor(tonalidad);