import "./style.css";
import "bootstrap/dist/css/bootstrap.css";
import * as bootstrap from "bootstrap";
import "@popperjs/core";
getPerson();

document.getElementById("all-content").style.display = "block";
let result = "";
let phone = "";
let hobby = "";
/* 
  Add your JavaScript for all exercises Below or in separate js-files, which you must the import above
*/

/* JS For Exercise-1 below */

function fetchAllPersons() {
  let url = "https://kofoednet.systems/CA1/api/person/all";
  let allPersons = document.getElementById("allPersons");
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let newArray = data.all.map(
        (x) =>
          `<tr><td>${x.dto_fName}</td><td>${x.dto_lName}</td><td>${
            x.dto_email
          }</td><td>${x.dto_phones
            .map((x) => x.dto_number)
            .join(",")}</td><td>${x.dto_zipCode}</td><td>${
            x.dto_street
          }</td><td>${x.dto_city}</td><td>${x.dto_hobbies
            .map((x) => x.dto_name)
            .join(",")}</td></tr>`
      );
      allPersons.innerHTML = `<table>
                  <thead><th>Fornavn</th><th>Efternavn</th><th>Email</th><th>Tlf</th><th>zip</th><th>Gade</th><th>By</th><th>Hobbies</th></thead>
                  ${newArray.join("")}
              </table>`;
    });
}

/* JS For Exercise-2 below */
// function fetchSinglePersons() {
//   let url = "https://kofoednet.systems/CA1/api/person/all";
//   fetch(url)
//     .then((res) => res.json())
//     .then(users => {const userdata = users.map(user =>
//       `
//     <tr><td>${userdata.dto_fname}</td></tr>
//       `.join("");
//       document.getElementById("singlePerson").innerHTML = singlePerson;
//     });
// }

function getPerson() {
  let url = "https://kofoednet.systems/CA1/api/person/1";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let singlePersonRecord = document.getElementById("singlePerson");
      singlePersonRecord.innerHTML = renderObjectToHTML(data);
    });
}

/* JS For Exercise-3 below */

/*Help function */
function makeOptions(method, body) {
  var opts = {
    method: method,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
  };
  if (body) {
    opts.body = JSON.stringify(body);
  }
  return opts;
}

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

function errorHandling(err) {
  console.log(err);
  if (err.status) {
    err.fullError.then((e) => console.log(e.message));
  } else {
    console.log("Network error");
  }
}

function renderObjectToHTML(myPersonObj) {
  phones(myPersonObj);
  hobbies(myPersonObj);
  result = `Fornavn: ${myPersonObj.dto_fName}<br/>
  Efternavn: ${myPersonObj.dto_lName}<br/>
  Email: ${myPersonObj.dto_email}<br/>
  
Tlf: ${phone}<br/>

  Postnr: ${myPersonObj.dto_zipCode}<br/>
  Gade: ${myPersonObj.dto_street}<br/>
  By: ${myPersonObj.dto_city}<br/>
    
  Hobbier: ${hobby}<br/>
  `;

  return result;
}

function phones(myPersonObj) {
  const phonearray = myPersonObj.dto_phones;
  phonearray.forEach((element) => {
    phone = phone + element.dto_number;
  });
  phone;
}

function hobbies(myPersonObj) {
  const hobbyarray = myPersonObj.dto_hobbies;
  hobbyarray.forEach((element) => {
    hobby = hobby + element.dto_name;
  });
  hobby;
}

/* 
Do NOT focus on the code below, UNLESS you want to use this code for something different than
the Period2-week2-day3 Exercises
*/

function hideAllShowOne(idToShow) {
  document.getElementById("about_html").style = "display:none";
  document.getElementById("ex1_html").style = "display:none";
  document.getElementById("ex2_html").style = "display:none";
  document.getElementById("ex3_html").style = "display:none";
  document.getElementById(idToShow).style = "display:block";
}

function menuItemClicked(evt) {
  const id = evt.target.id;
  switch (id) {
    case "ex1":
      hideAllShowOne("ex1_html");
      fetchAllPersons();
      break;
    case "ex2":
      hideAllShowOne("ex2_html");
      break;
    case "ex3":
      hideAllShowOne("ex3_html");
      break;
    default:
      hideAllShowOne("about_html");
      break;
  }
  evt.preventDefault();
}
document.getElementById("menu").onclick = menuItemClicked;
hideAllShowOne("about_html");
