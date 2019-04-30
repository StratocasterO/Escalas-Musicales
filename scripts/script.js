const listaTonalidades = ["F","Bb","Eb","Ab","Db","Gb","F#","B","E","A","D","G","C","Am","Em","Bm","F#m","C#m","G#m","Ebm","Bbm","Fm","Cm","Gm","Dm"]

// al cargar la página añade un detector de clic a cada campo:
listaTonalidades.forEach(obj => {
	document.querySelector('area[title="' + obj +'"]').addEventListener("click", (event) => {
		event.preventDefault();
		tonalidad = obj;
		console.log(tonalidad);
		mostrarDatos();
	});
});

boton = document.querySelector(".botones");

// el estilo tiene que estar en linea para que funcione la línea anterior. Si viene de una hoja de estilos, hay que usar:
// estilo =  boton.currentStyle ? boton.currentStyle['display'] : window.getComputedStyle ? window.getComputedStyle(boton, null).getPropertyValue('display') : null;
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

// funciones para mostrar los datos:
const datosMayor = () => {
	let contenido = '';
	notasTonalidad(tonalidad).forEach(nota => {
		nota = nota.replace("#","<sup>&#9839</sup>");	
		nota = nota.replace("b","<sup>&#9837</sup>");
		contenido += nota + ' ';
	});
	document.querySelector("#notas").innerHTML = contenido;
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

document.querySelectorAll(".b_menores").forEach(obj => {
	obj.addEventListener("click", (e) => {
		e.preventDefault();
		tipo = obj.id;
		datosMenor();
		document.querySelectorAll(".b_menores").forEach(obj => obj.style.backgroundColor = "white");
		obj.style.backgroundColor = "lightgray";
	});
	
});

// inicia la página en do mayor:
tonalidad = "C";
datosMayor(tonalidad);