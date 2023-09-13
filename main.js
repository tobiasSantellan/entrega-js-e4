//Capturo el input
const numero = document.getElementById("numero");
const form = document.getElementById("formulario");
const respuesta = document.getElementById("respuesta");

//Declaracion de variables
let dataPokemon;

//Hago la función que determina si un dato es numérico
const isNumber = (dato) => {
  console.log("isnumber");
  //Compruebo que el dato, si bien es texto, sea un número
  return dato === Number(dato).toString();
};

const renderCard = (dataPokemon) => {
  console.log(dataPokemon.types);
  const name = dataPokemon.forms[0].name;
  //const type = dataPokemon.types[0].type.name;
  let types = [];
  dataPokemon.types.map((eachType) => {
    types.push(eachType.type.name);
  });
  const height = dataPokemon.height;
  const weight = dataPokemon.weight;
  const imagen = dataPokemon.sprites.front_default;

  respuesta.innerHTML = `
  <div class="poke-card">
    <img src="${imagen}" alt="imagen de ${name}">
    <h2 class="nombre">${name}</h2>
    <p>Alto: ${height / 10} mts</p>
    <p>Peso: ${weight / 10} kgs</p>
  </div>
  `;
};

//Función que lee la API
const fetchApi = async (pokeNumber) => {
  const API_URL = "https://pokeapi.co/api/v2/pokemon/" + pokeNumber + "/";
  console.log("leo api ", API_URL);

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const renderMsg = (err) => {
  respuesta.innerHTML = `
  <div class="error-msg">
  <h2 class="nombre">${err}</h2>
  </div>
  `;
};

//Funcion que procesa el número ingresado
const numeroIngresado = async (e) => {
  e.preventDefault();
  const datoIngresado = e.target.numero.value;
  console.log(isNumber(datoIngresado));

  renderMsg("Un momento...");
  //Voy a asegurarme que ingresó un número
  if (isNumber(datoIngresado)) {
    //debo llamar a la pokeAPI a https://pokeapi.co/api/v2/pokemon/
    dataPokemon = await fetchApi(datoIngresado);
  }

  if (datoIngresado != "") {
    if (dataPokemon) {
      renderCard(dataPokemon);
    } else {
      renderMsg("No existe ese Pokemón...");
    }
  } else {
    renderMsg("Debe ingresar un número...");
  }

  formulario.reset();
};

//Función de inicio
const init = () => {
  formulario.addEventListener("submit", numeroIngresado);
  //si el numero no representa un pokemon dar error
};

//Ejecuto la funcion de inicio
init();