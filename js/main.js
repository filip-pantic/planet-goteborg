const baseUrl = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com";
let requestKey = "";
let planetAllData = null;

const getCredentials = function () {
  let myHeaders = new Headers();

  myHeaders.append("x-zocom", "solaris-1Cqgm3S6nlMechWO");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(baseUrl + "/keys", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      requestKey = result.key;
      getPlanetDetails();
    })
    .catch((error) => console.log("error", error));
};

const getPlanetDetails = function (event) {
  let myHeaders = new Headers();

  myHeaders.append("x-zocom", requestKey);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(baseUrl + "/bodies", requestOptions)
    .then((response) => response.json())
    .then((result) => (planetAllData = result.bodies))
    .catch((error) => console.log("error", error));
};

const showPlanetDetails = (event) => {
  const planetIndex = event.target?.getAttribute("data-index");
  let selectedPlanet = null;

  if (planetIndex === null) {
    document.querySelector(".solaris-details_overlay").classList.add("hidden");
    return null;
  }

  document.querySelector(".solaris-details_overlay").classList.toggle("hidden");

  for (let i = 0; i < planetAllData.length; i++) {
    if (planetAllData[i].id === Number(planetIndex)) {
      selectedPlanet = planetAllData[i];
    }
  }

  document.querySelector(".overlay-container h1").innerHTML = selectedPlanet.name;
  document.querySelector(".overlay-container h2").innerHTML = selectedPlanet.latinName;
  document.querySelector(".overlay-container p").innerHTML = selectedPlanet.desc;


  document.querySelector("#omkrets").innerHTML = selectedPlanet.circumference + ' km';
  document.querySelector("#solen").innerHTML = selectedPlanet.distance + ' km';
  document.querySelector("#mint").innerHTML = selectedPlanet.temp.night + ' °C';
  document.querySelector("#maxt").innerHTML = selectedPlanet.temp.day + ' °C';

  // console.log(selectedPlanet);
};

var main = function () {
  // Get key and Details
  getCredentials();

  // Planet click
  const allPlanets = document.querySelectorAll(".planet");

  for (let i = 0; i < allPlanets.length; i++) {
    document.addEventListener("click", showPlanetDetails);
  }
};

document.addEventListener("DOMContentLoaded", main, false);

// {
//   "id": 5,
//   "type": "planet",
//   "name": "Jupiter",
//   "latinName": "Lovis",
//   "rotation": 0.4,
//   "circumference": 439264,
//   "temp": {
//       "day": -140,
//       "night": -140
//   },
//   "distance": 750290000,
//   "orbitalPeriod": 4324,
//   "desc": "Jupiter är den femte planeten från solen och är med stor marginal solsystemets största planet. Dess massa är 2,5 gånger så stor som alla de andra planeternas sammanlagda massa. Planeten är en så kallad gasjätte och man är inte säker på om planeten ens har en fast kärna.",
//   "moons": [
//       "Europa",
//       "Ganymedes",
//       "Io",
//       "Callisto",
//       "Amalthea",
//       "Himalia"
//   ]
// }