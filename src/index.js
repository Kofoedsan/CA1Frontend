import "./style.css";
import "bootstrap/dist/css/bootstrap.css";
import * as bootstrap from "bootstrap";
import "@popperjs/core";
import "./jokeFacade";
import jokeFacade from "./jokeFacade";
fetchAllPersons();

document.getElementById("all-content").style.display = "block";

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

/* JS For Exercise-3 below */

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
