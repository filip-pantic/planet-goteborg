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

  const detailsTitle = document.querySelector(".overlay-container h1");
  const detailsTitleSub = document.querySelector(".overlay-container h2");
  const detailsDescription = document.querySelector(".overlay-container p");

  detailsTitle.innerHTML = selectedPlanet.name;
  detailsTitleSub.innerHTML = selectedPlanet.latinName;
  detailsDescription.innerHTML = selectedPlanet.desc;
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
