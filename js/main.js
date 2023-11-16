const listOfPlanets = [
  "Sun",
  "Mercury",
  "Venus",
  "Earth",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
  "Pluto",
];

// API requests
var main = function () {
  var allPlanets = document.querySelectorAll(".planet");

  

  for (let i = 0; i < allPlanets.length; i++) {
    document.addEventListener("click", getPlanetDetails);
  }

  console.log("filip nasao:", allPlanets);
};

document.addEventListener("DOMContentLoaded", main, false);
