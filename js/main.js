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

  document.querySelector(".overlay-container h1").innerHTML =
    selectedPlanet.name;
  document.querySelector(".overlay-container h2").innerHTML =
    selectedPlanet.latinName;
  document.querySelector(".overlay-container p").innerHTML =
    selectedPlanet.desc;

  document.querySelector("#omkrets").innerHTML =
    selectedPlanet.circumference + " km";
  document.querySelector("#solen").innerHTML = selectedPlanet.distance + " km";
  document.querySelector("#mint").innerHTML = selectedPlanet.temp.night + " °C";
  document.querySelector("#maxt").innerHTML = selectedPlanet.temp.day + " °C";

  const moonListRoot = document.querySelector(".info-satelites ul");
  moonListRoot.innerHTML = "";

  for (let index = 0; index < selectedPlanet.moons.length; index++) {
    const moonName = selectedPlanet.moons[index];
    const addLi = document.createElement("li");
    const addH3 = document.createElement("h3");
    addH3.innerHTML = moonName;
    addLi.appendChild(addH3);
    const addSpan = document.createElement("span");
    addSpan.innerHTML = moonName;
    addLi.appendChild(addSpan);
    moonListRoot.appendChild(addLi);
  }

  /* 
            <li>
                <h3>OMKRETS</h3>
                <span>40 075 km</span>
              </li>
  
  */

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