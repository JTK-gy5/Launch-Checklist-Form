// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
window.addEventListener('load', () => {
   const checklistForm = document.getElementById("launchForm");
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then(function(json) {
          console.log(json[3]);
          planetChoice = json[3];
          document.getElementById("missionTarget").innerHTML = `
          <h2>Mission Destination</h2>
          <ol>
             <li>Name: ${json[3].name}</li>
             <li>Diameter: ${json[3].diameter}</li>
             <li>Star: ${json[3].star}</li>
             <li>Distance from Earth: ${json[3].distance}</li>
             <li>Number of Moons: ${json[3].moons}</li>
          </ol>
          <img src="${json[3].image}">
          `;
      })
   })
   checklistForm.addEventListener("submit", (event) => {
      event.preventDefault();
      validateFormInput();
      updateRequirements();
      
   });
});


function validateFormInput (){
   const pilotNameInput = document.querySelector("[name = pilotName]").value;
   const copilotNameInput = document.querySelector("[name = copilotName]").value;
   const fuelLevelInput = document.querySelector("[name = fuelLevel]").value;
   const cargoMassInput = document.querySelector("[name = cargoMass]").value;
   
   if (pilotNameInput == "" || copilotNameInput == "" || fuelLevelInput == "" || cargoMassInput == "") {
      alert('Please fill out all fields.');
      return
   }
   if (!isNaN(pilotNameInput) ||
       !isNaN(copilotNameInput)) {
         alert('Please enter text for names.');
         return
   }
   if (isNaN(fuelLevelInput) ||
       isNaN(cargoMassInput)) {
         alert('Please enter numbers for fuel level and cargo mass.');
         return
   }
}

function updateRequirements () {
   const pilotNameInput = document.querySelector("[name=pilotName]").value;
   const copilotNameInput = document.querySelector("[name = copilotName]").value;
   const fuelLevelInput = document.querySelector("[name = fuelLevel]").value;
   const cargoMassInput = document.querySelector("[name = cargoMass]").value;
   
   const listItems = document.getElementById("faultyItems");
   const launchReadyness = document.getElementById("launchStatus");
   
   const listPilot = document.getElementById('pilotStatus')
   const listCoPilot = document.getElementById('copilotStatus')
   const listFuel = document.getElementById('fuelStatus')
   const listMass = document.getElementById('cargoStatus')

   if (listItems && launchReadyness && listPilot && listCoPilot && listFuel && listMass) {
       launchReadyness.innerHTML = 'Shuttle is ready for launch.'
       launchReadyness.style.color = 'green'
       listItems.style.visibility = 'hidden'
       listPilot.innerHTML = `Pilot ${pilotNameInput} is ready for launch.`
       listCoPilot.innerHTML = `Co-pilot ${copilotNameInput} is ready for launch.`
       listFuel.innerHTML = 'Fuel level high enough for launch.'
       listMass.innerHTML = 'Cargo mass low enough for launch.'

       if (Number(fuelLevelInput) < 10000) {
           listItems.style.visibility = 'visible'
           launchReadyness.innerHTML = 'Shuttle not ready for launch!'
           launchReadyness.style.color = 'red'
           listFuel.innerHTML = 'Fuel level too low for launch!'
       }

       if (Number(cargoMassInput) > 10000) {
           listItems.style.visibility = 'visible'
           launchReadyness.innerHTML = 'Shuttle not ready for launch!'
           launchReadyness.style.color = 'red'
           listMass.innerHTML = 'Shuttle mass too heavy for launch!'
       }
   } else {
       console.log('document elements not found!')
   }
   return
}
