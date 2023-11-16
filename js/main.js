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
  document.querySelector(".solaris-details_overlay").classList.toggle("hidden");

  console.log(
    "eve",
    event.target
      ?.querySelector("span.planet-description")
      ?.textContent?.toLowerCase(),
    planetAllData
  );
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
