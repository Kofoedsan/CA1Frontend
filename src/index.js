import "./style.css";
import "bootstrap/dist/css/bootstrap.css";
import * as bootstrap from "bootstrap";
import "@popperjs/core";

document.getElementById("all-content").style.display = "block";
let editModalElement = document.getElementById("editPersonModal");
let editModal = new bootstrap.Modal(editModalElement);
let addModalElement = document.getElementById("addPersonModal");
let addModal = new bootstrap.Modal(addModalElement);
let result = "";

/* 
  Add your JavaScript for all exercises Below or in separate js-files, which you must the import above
*/

/* JS For Exercise-1 below */
document
  .getElementById("tablerowsAllPersons")
  .addEventListener("click", (event) => {
    event.preventDefault();
    const node = event.target;
    const name = node.getAttribute("name");
    const id = node.getAttribute("id");

    if (name == "edit") {
      editPerson(id);
    }
    if (name == "delete") {
      deletePerson(id);
    }
  });

function editPerson(id) {
  fetch("https://kofoednet.systems/CA1/api/person/" + id)
    .then(handleHttpErrors)
    .then((data) => {
      document.getElementById("edit_id").value = data.dto_id;
      document.getElementById("fName").value = data.dto_fName;
      document.getElementById("lName").value = data.dto_lName;
      document.getElementById("email").value = data.dto_email;
      document.getElementById("tlf").value = data.dto_phones
        .map((x) => x.dto_number)
        .join(",");
      document.getElementById("postnr").value = data.dto_zipCode;
      document.getElementById("gadenavn").value = data.dto_street;
      document.getElementById("by").value = data.dto_city;
      document.getElementById("hobby").value = data.dto_hobbies
        .map((x) => x.dto_name)
        .join(",");
      editModal.toggle();
    })
    .catch(errorHandling);
}

document.getElementById("formsave").addEventListener(`click`, updateperson);

function updateperson() {
  let dtoId = document.getElementById("edit_id").value;

  const personobj = {
    dto_fName: document.getElementById("fName").value,
    dto_lName: document.getElementById("lName").value,
    dto_email: document.getElementById("email").value,
    dto_phones: [
      {
        dto_number: document.getElementById("tlf").value,
      },
    ],
    dto_zipCode: document.getElementById("postnr").value,
    dto_street: document.getElementById("gadenavn").value,
    dto_city: document.getElementById("by").value,
    dto_hobbies: [
      {
        dto_name: document.getElementById("hobby").value,
      },
    ],
  };

  const options = makeOptions(`PUT`, personobj);

  fetch("https://kofoednet.systems/CA1/api/person/" + dtoId, options)
    .then(handleHttpErrors)
    .then((data) => {
      editModal.toggle();
      fetchAllPersons();
    })
    .catch(errorHandling);
}

function deletePerson(id) {
  const deloptions = makeOptions(`DELETE`);
  fetch("https://kofoednet.systems/CA1/api/person/" + id, deloptions)
    .then(handleHttpErrors)
    .then((removed) => {
      fetchAllPersons();
      alert("Brugeren med id " + id + " er fjernet");
    })
    .catch(errorHandling);
}

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
      <input id="${p.dto_id}" type="button" name="edit" value="edit"/>
      <input id="${p.dto_id}" type="button" name="delete" value="delete"/>
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
      document.getElementById("singlePerson").innerHTML =
        renderObjectToHTML(data);
    });
}

/* JS For Exercise-3 below */
document.getElementById("add").addEventListener("click", (event) => {
  event.preventDefault();
  addModal.toggle();
});

document.getElementById("addformsave").addEventListener(`click`, addPerson);

function addPerson() {
  const personData = {
    dto_fName: document.getElementById("addfName").value,
    dto_lName: document.getElementById("addlName").value,
    dto_email: document.getElementById("addemail").value,
    dto_phones: [
      {
        dto_number: document.getElementById("addtlf").value,
      },
    ],
    dto_zipCode: document.getElementById("addpostnr").value,
    dto_street: document.getElementById("addgadenavn").value,
    dto_city: document.getElementById("addby").value,
    dto_hobbies: [
      {
        dto_name: document.getElementById("addhobby").value,
      },
    ],
  };
  const addoptions = makeOptions(`POST`, personData);

  fetch("https://kofoednet.systems/CA1/api/person/", addoptions)
    .then(handleHttpErrors)
    .then((data) => {
      addModal.toggle();
      fetchAllPersons();
      hideAllShowOne("getAllPersons_html");
    })
    .catch(errorHandling);
}

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
  result = `Fornavn: ${myPersonObj.dto_fName}<br/>
  Efternavn: ${myPersonObj.dto_lName}<br/>
  Email: ${myPersonObj.dto_email}<br/>
  
Tlf: ${myPersonObj.dto_phones.map((x) => x.dto_number).join(",")}<br/>

  Postnr: ${myPersonObj.dto_zipCode}<br/>
  Gade: ${myPersonObj.dto_street}<br/>
  By: ${myPersonObj.dto_city}<br/>
    
  Hobbier: ${myPersonObj.dto_hobbies.map((x) => x.dto_name).join(",")}<br/>
  `;

  return result;
}

/* 
Do NOT focus on the code below, UNLESS you want to use this code for something different than
the Period2-week2-day3 Exercises
*/

function hideAllShowOne(idToShow) {
  document.getElementById("about_html").style = "display:none";
  document.getElementById("getAllPersons_html").style = "display:none";
  document.getElementById("getSinglePersonRef_html").style = "display:none";
  document.getElementById("addPerson_html").style = "display:none";
  document.getElementById(idToShow).style = "display:block";
}

function menuItemClicked(evt) {
  const id = evt.target.id;
  switch (id) {
    case "getAllPersons":
      hideAllShowOne("getAllPersons_html");
      fetchAllPersons();
      break;
    case "getSinglePersonRef":
      hideAllShowOne("getSinglePersonRef_html");
      break;
    case "addPerson":
      hideAllShowOne("addPerson_html");
      break;
    default:
      hideAllShowOne("about_html");
      break;
  }
  evt.preventDefault();
}
document.getElementById("menu").onclick = menuItemClicked;
hideAllShowOne("about_html");
