const tonalidades = [
{
	"nombre": "C",
	"notas": ["C","D","E","F","G","A","B"],
},
{
	"nombre": "G",
	"notas": ["G","A","B","C","D","E","F#"],
},
{
	"nombre": "D",
	"notas": ["D","E","F#","G","A","B","C#"],
},
{
	"nombre": "A",
	"notas": ["A","B","C#","D","E","F#","G#"],
},
{
	"nombre": "E",
	"notas": ["E","F#","G#","A","B","C#","D#"],
},
{
	"nombre": "B",
	"notas": ["B","C#","D#","E","F#","G#","A#"],
},
{
	"nombre": "F#",
	"notas": ["F#","G#","A#","B","C#","D#","E#"],
},
{
	"nombre": "Gb",
	"notas": ["Gb","Ab","Bb","Cb","Db","Eb","F"],
},
{
	"nombre": "Db",
	"notas": ["Db","Eb","F","Gb","Ab","Bb","C"],
},
{
	"nombre": "Ab",
	"notas": ["Ab","Bb","C","Db","Eb","F","G"],
},
{
	"nombre": "Eb",
	"notas": ["Eb","F","G","Ab","Bb","C","D"],
},
{
	"nombre": "Bb",
	"notas": ["Bb","C","D","Eb","F","G","A"],
},
{
	"nombre": "F",
	"notas": ["F","G","A","Bb","C","D","E"],
},
{
	"nombre": "C#",
	"notas": ["C#","D#","E#","F#","G#","A#","B#"],
},
{
	"nombre": "G#",
	"notas": ["G#","A#","B#","C#","D#","E#","F##"],
},
]


const escalas = [
{
	"nombre": "mayor",
	"alteraciones": ["","","","","","",""],
	"modos": ["jonico","dorico","frigio","lidio","mixolidio","eolico","locrio"],
	"acordes": ["maj7","-7","-7","maj7","7","-7","-7(b5)"],
},
{
	"nombre": "menor",
	"alteraciones":   ["","","b","","","b","b"],
	"modos": ["eolico","locrio","jonico","dorico","frigio","lidio","mixolidio"],
	"acordes": ["-7","-7(b5)","maj7","-7","-7","maj7","7"],
},
{
	"nombre": "menor_arm",
	"alteraciones": ["","","b","","","b",""],
	"modos": ["menor_arm","locrio_#13","aumentada","dorico_#9","frigio_dom","lidio_#9","locrio_b11_n7"],
	"acordes": ["-maj7","-7","+maj7","7","7","-7(b5)","-7(b5)"],
},
{
	"nombre": "menor_mel",
	"alteraciones": ["","","b","","","",""],
	"modos": ["menor_mel","dorico_b9","lidio_aum","lidio_dom","mixolidio_b13","locrio_#9","alterada"],
	"acordes": ["-maj7","-7(b5)","+maj7","-7","7","maj7","dim"],
}
]

const acordes = [
{
	"nombre": "maj7",
	"grados": ["","","",""]
},
{
	"nombre": "-7",
	"grados": ["","b","","b"]
},
{
	"nombre": "7",
	"grados": ["","","","b"]
},
{
	"nombre": "-7(b5)",
	"grados": ["","b","b","b"]
},
{
	"nombre": "dim",
	"grados": ["","b","b","bb"]
},
{
	"nombre": "+",
	"grados": ["","","#",""]
},
]

// devuelve las notas de una tonalidad mayor:
const notasTonalidad = (nota) => {
	tonalidades.forEach(obj => {
		if(obj.nombre == nota) {
			escala = obj.notas;
		};
	});

	return escala;
};

// devuelve las notas de una tonalidad mayor, menor, menor armónica (menor_arm) o menor melódica (menor_mel):
const alterar = (tonalidad,alt) => {
	let alterado = [];
	let escala = notasTonalidad(tonalidad);
	escalas.forEach(obj => {
		if(obj.nombre == alt){
			let i = 0;
			escala.forEach(nota => {
				if(nota == "F##"){
					if(obj.alteraciones[i] == "b") alterado.push("F#");
					else alterado.push("F&#119082");
				} else{
					if(nota.includes("#") && obj.alteraciones[i] == "b") alterado.push(nota.substring(0,1));
					else alterado.push(nota + obj.alteraciones[i]);
				}
				i++;
			});
		};
	});

	return alterado
};

// devuelve el modo (del 1 al 7) de una tonalidad mayor, menor, menor armónica (menor_arm) o menor melódica (menor_mel):
const modo = (nota,tonalidad,modo) => {
	let notasModo = (alterar(nota,tonalidad));

	console.log(notasModo)
	for (let i=1; i<=modo-1; i++) {
		grado = notasModo.shift(); 	// devuelve el primer elemento
		notasModo.push(grado);		// mete el elemento al final
	}

	return notasModo; 
};

console.log(modo("D","menor_arm",7));