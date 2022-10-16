"use strict"

function app(peopleArray) {
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
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
    console.log("Found a parent. Parent:" + person.parents[0])
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

function mainMenu(person, peopleArray) {

  if (!person) {
    alert("Could not find that individual.");
    return app(peopleArray); 
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + "\nDo you want to know their 'info', 'family', or 'descendants'?\nType the option you want or 'restart' or 'quit'");

  switch (displayOption) {
    case "info":
      infoLookUpTool(person);
      break;
    case "family":
      getSpouse(person, peopleArray);
      getParents(person, peopleArray);
      break;
    case "descendants":
      let descendants = getDescendants(person,peopleArray);
      console.log(descendants);
      break;
    case "restart":
      app(peopleArray); 
      break;
    case "quit":
      return; 
    default:
      return mainMenu(person, peopleArray); 
  }
}

//make not dependent on case

function searchByName(peopleArray) {
  let firstName = promptFor("What's the person's first name?", chars);
  let lastName= promptFor("What's the person's last name?", chars);
  let foundPerson = peopleArray.filter(function (person) {
    if (person.firstName === firstName && person.lastName === lastName) {
      return true;
    }
    else {
      return false;
    }
  })
  return foundPerson[0];
}

function displaypeopleArray(peopleArray) {
  alert(peopleArray.map(function (person) {
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person) {
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  alert(personInfo);
}

function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));
  return response;
}

function yesNo(input) {
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

function chars(input) {
  return true; 
}

function searchByWeight(peopleArray) {            
  let weight = promptFor("What's the person's weight?", chars);
  let foundByWeight = peopleArray.filter(function (person) {             
    if (person.weight == weight) {;
      return true;
    }
    else {
      return false;
    }
  })
  console.log(foundByWeight);
  return foundByWeight;
}

function searchByHeight(peopleArray) {
  let height = promptFor("What's the person's height?", chars);
  let foundByHeight = peopleArray.filter(function (person) {
    if (person.height == height) {
      return true;
    }
    else {
      return false;
    }
  })
  console.log(foundByHeight);
  return foundByHeight;
}

function searchByEyeColor(peopleArray) {
  let eyecolor = promptFor("What's the person's eye color?", chars);
  let foundByEyeColor = peopleArray.filter(function (person) {
    if (person.eyeColor == eyecolor) {
      return true;
    }
    else {
      return false;
    }
  })
  console.log(foundByEyeColor);
  return foundByEyeColor;
}

function searchByGender(peopleArray) {
  let gender = promptFor("What's the person's gender?", chars);
  let foundByGender =  peopleArray.filter(function (person) {
    if (person.gender == gender) {
      return true;
    }
    else {
      return false;
    }
  })
  console.log(foundByGender);
  // let userAnswer = prompt("Is the person you're looking for in this list?","Yes or No")
  // if(userAnswer == 'Yes'){
  //   let enterName = prompt("Enter their name")
  //   displayPerson(userAnswer);
  
  return foundByGender;
}

function searchByTraits(peopleArray) {
  let yourChoice = prompt("What trait would you like to search by?", "Eye color, weight, height, or gender");
  let askAgain = false;
  let arr = peopleArray;
  while (arr.length > 1) {
    if (askAgain == true) {
      yourChoice = prompt(arr.length + " Matches Found! What trait would you like to search by for these cases?");
      
    }
    askAgain = true;
    if (yourChoice == "weight" ||yourChoice == "Weight") {
      arr = searchByWeight(arr); 
    } else if (yourChoice === "height" || yourChoice == "Height") {
      arr = searchByHeight(arr);
    } else if (yourChoice === "eyecolor" ||yourChoice == "eye color" || yourChoice == "Eye Color" || yourChoice =="Eye color") {
      arr = searchByEyeColor(arr);     
    } else if (yourChoice === "gender" || yourChoice == "Gender") {
      arr = searchByGender(arr);   
    }
  }
  return arr[0];
}