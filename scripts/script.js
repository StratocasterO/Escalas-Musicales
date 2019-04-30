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

// animaciones para los botones de los modos menores:
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
	tonalidad = tonalidad.replace("#","<sup>&#9839</sup>");	
	tonalidad = tonalidad.replace("b","<sup>&#9837</sup>");
	tono.innerHTML = tonalidad;

	if (!tonalidad.includes("m")) datosMayor();
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

const datosMayor = () => {
	console.log(`datos de ${tonalidad} mayor`);
}

const datosMenor = () => {
	console.log(`datos de ${tonalidad} menor ${tipo}`);
}

// inicia la página en do mayor:
tonalidad = "C";
datosMayor(tonalidad);