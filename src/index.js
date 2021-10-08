import "./style.css";
import "bootstrap/dist/css/bootstrap.css";
import * as bootstrap from "bootstrap";
import "@popperjs/core";

document.getElementById("all-content").style.display = "block";
let result = "";
let phone = "";
let hobby = "";
/* 
  Add your JavaScript for all exercises Below or in separate js-files, which you must the import above
*/

/* JS For Exercise-1 below */

function fetchAllPersons() {
  fetch(`https://kofoednet.systems/CA1/api/person/all`)
    .then(handleHttpErrors)
    .then((data) => {
      const allRows = data.all.map((p) => getPersonTableRow(p));
      document.getElementById("tablerowsAllPersons").innerHTML =
        allRows.join("");
    })
    .catch(errorHandling);
}

function getPersonTableRow(p) {
  return `<tr>
    <td>${p.dto_id}</td>
    <td>${p.dto_fName}</td>
    <td>${p.dto_lName}</td>
    <td>${p.dto_email}</td>
    <td>${p.dto_phones.map((x) => x.dto_number).join(",")}</td>
    <td>${p.dto_zipCode}</td>
    <td>${p.dto_street}</td>
    <td>${p.dto_city}</td>
    <td>${p.dto_hobbies.map((x) => x.dto_name).join(",")}</td>
    <td>
      <input id="${p.id}" type="button" name="edit" value="edit"/>
      <input id="${p.id}" type="button" name="delete" value="delete"/>
    </td>
    </tr>`;
}

/* JS For Exercise-2 below */

let singlePersonID = document.getElementById("singlePersonID");

singlePersonID.addEventListener("click", (event) => {
  event.preventDefault();
  let getSinglePerson = document.getElementById("getSinglePerson");
  getPerson(getSinglePerson.value);
});

function getPerson(id) {
  let url = "https://kofoednet.systems/CA1/api/person/" + id;
  fetch(url)
    .then(invalidURL)
    .then((data) => {
      let singlePersonRecord = document.getElementById("singlePerson");
      singlePersonRecord.innerHTML = renderObjectToHTML(data);
    });
}

/* JS For Exercise-3 below */

/*Help function */

function invalidURL(res) {
  if (!res.ok) {
    let singlePersonRecord = document.getElementById("singlePerson");
    singlePersonRecord.innerHTML = "Ingen person med dette ID fundet";
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

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
  phone = "";
  const phonearray = myPersonObj.dto_phones;
  phonearray.forEach((element) => {
    phone = phone + element.dto_number + ",";
  });
  phone;
}

function hobbies(myPersonObj) {
  hobby = "";
  const hobbyarray = myPersonObj.dto_hobbies;
  hobbyarray.forEach((element) => {
    hobby = hobby + element.dto_name + ",";
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
