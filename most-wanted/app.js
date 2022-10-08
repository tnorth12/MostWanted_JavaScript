"use strict"

function app(peopleArray) {
  let searchType = promptFor("Enter the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch (searchType) {
    case 'yes':
      searchResults = searchByName(peopleArray);
      mainMenu(searchResults, peopleArray);
      break;
    case 'no':
      searchResults = searchByTraits(peopleArray); 
      mainMenu(searchResults, peopleArray);
      break;
    default:
      app(peopleArray); 
      break;
  }
}

let personsSpouse = 0

function infoLookUpTool(person) {
  console.log("First Name: " + person.firstName);
  console.log("Last Name: " + person.lastName);
  console.log("ID Number: " + person.id);
  console.log("Gender: " + person.gender);
  console.log("Date of Birth: " + person.dob);
  console.log("Height: " + person.height);
  console.log("Weight: " + person.weight);
  console.log("Eye Color: " + person.eyeColor);
  console.log("Occupation: " + person.occupation);
  if (person.parents[0] == null) {
    console.log("No Parents found")
  }
  else if (person.parents[0] !== null && person.parents[1] == null)
    console.log("One parent found. Parent:" + person.parents[0])
  else {
    console.log("Parent 1: " + person.parents[0], "Parent 2: " + person.parents[1]);
  }
  if (person.currentSpouse == null) {
    console.log("No Spouse found")
  }
  else {
    console.log("Current Spouse: " + person.currentSpouse);
  }
}

function getPerson(id, peopleArray){
  let person = peopleArray.filter(function(el){
    if(el.id == id){
      return true;
    }else{
      return false;
    }
  });
  return person[0];
}

function getSpouse(person, peopleArray){ 
  if(person.currentSpouse == null){
    console.log("This person has no spouse.");
  }
  else{
    let spouse = getPerson(person.currentSpouse, peopleArray);
    console.log(`Spouse: ${spouse.firstName} ${spouse.lastName}`);
  }
}

function getParents(person, peopleArray){
  let parentOne = getPerson(person.parents[0], peopleArray)
  let parentTwo = getPerson(person.parents[1], peopleArray)
  if(person.parents.length < 1){
    console.log("This person has no parents");
  }
  else if(person.parents[1]==null){ 
    console.log(`Parents: ${parentOne.firstName} ${parentOne.lastName}`); 
  }
  else{
    console.log(`Parents: ${parentOne.firstName} ${parentOne.lastName} , ${parentTwo.firstName} ${parentTwo.lastName}`)
  }
}

function getDescendants(person, peopleArray){
 let children = peopleArray.filter(function(el){
   if(el.parents.includes(person.id)){
     return true;
   }
   else{
     return false;
   }
 });
for(let i =0; i < children.length; i++){
  children.concat(getDescendants(children[i],peopleArray));
}
  return children;
}  

