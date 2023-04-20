//HTML Elements
//Create
const createTeacherForm = document.getElementById("createTeacherForm");
//Delete
const deleteTeacherForm = document.getElementById("deleteTeacherForm");
//Update
const selectTeacherForm = document.getElementById("selectTeacherForm");
const teacherId = document.getElementById("TeacherId");
const teacherFname = document.getElementById("TeacherFname");
const teacherLname = document.getElementById("TeacherLname");
const teacherEmployeeNumber = document.getElementById("TeacherEmployeeNumber");
const teacherHireDate = document.getElementById("TeacherHireDate");
const teacherSalary = document.getElementById("TeacherSalary");
//Edit
const updateTeacherForm = document.getElementById("updateTeacherForm");
var idForPostRequest;

if (createTeacherForm) {
  //On Submit Event Listener For Create Teacher Form
  createTeacherForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(createTeacherForm);
    const data = Object.fromEntries(formData.entries());
    // Convert form data to a JSON object
    const jsonData = JSON.stringify(data);
    createTeacher(jsonData);
  });
}

if (deleteTeacherForm) {
  //On Submit Event Listener For Delete Teacher Form
  deleteTeacherForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(deleteTeacherForm);
    const data = Object.fromEntries(formData.entries());
    deleteTeacher(data);
  });
}

if (selectTeacherForm) {
  //On Submit Event Listener For Select Teacher Form
  selectTeacherForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(selectTeacherForm);
    const updateData = Object.fromEntries(formData.entries());
    idForPostRequest = updateData["TeacherId"];
    getTeacher(updateData);
  });
}

if (updateTeacherForm) {
  //On Submit Event Listener For Update Teacher Form
  updateTeacherForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(updateTeacherForm);
    const editData = Object.fromEntries(formData.entries());
    // Convert form data to a JSON object
    const jsonData = JSON.stringify(editData);
    updateTeacher(jsonData);
  });
}

//AJAX Create Teacher POST Request With Data From Create Form
function createTeacher(jsonData) {
  let URL = "http://localhost:59934/api/TeacherData/AddTeacher/";
  let rq = new XMLHttpRequest();

  rq.onreadystatechange = function () {
    if (rq.readyState === 4) {
      //Either the API returns or not
      if (rq.status === 200 || rq.status === 204) {
        console.log("Post successfully created!");
      } else {
        console.error("Error creating teacher:", rq.status, rq.statusText);
      }
    }
  };

  rq.open("POST", URL);
  rq.setRequestHeader("Content-type", "application/json");

  console.log("Sending data:", jsonData);
  rq.send(jsonData);
}

//AJAX Delete Teacher POST Request With Data From Delete Form
function deleteTeacher(data) {
  let URL =
    "http://localhost:59934/api/TeacherData/DeleteTeacher/" + data["TeacherId"];
  let rq = new XMLHttpRequest();

  rq.onreadystatechange = function () {
    if (rq.readyState === 4) {
      //Either the API returns or not
      if (rq.status === 200 || rq.status === 204) {
        console.log("Post successfully created!");
      } else {
        console.error("Error creating teacher:", rq.status, rq.statusText);
      }
    }
  };

  rq.open("POST", URL);
  rq.setRequestHeader("Content-type", "text/plain");

  console.log("sending " + data["TeacherId"]);
  rq.send(data["TeacherId"]);
}

//AJAX Find Teacher GET Request With Data From Select Form
function getTeacher(updateData) {
  let URL =
    "http://localhost:59934/api/TeacherData/FindTeacher/" +
    updateData["TeacherId"];
  let rq = new XMLHttpRequest();

  rq.onreadystatechange = function () {
    if (rq.readyState === 4) {
      //Either the API returns
      if (rq.status === 200) {
        const responseData = rq.response;
        console.log("Successfully found teacher!" + responseData);
        //Put the API response into the the form values
        teacherFname.value = responseData.TeacherFname;
        teacherLname.value = responseData.TeacherLname;
        teacherEmployeeNumber.value = responseData.TeacherEmployeeNumber;
        teacherHireDate.value = responseData.FormattedHireDate;
        teacherSalary.value = responseData.TeacherSalary;
      } else {
        console.error("Error:", rq.status, rq.statusText);
      }
    }
  };
  rq.open("GET", URL);
  rq.responseType = "json";
  rq.send(null);
}

//AJAX Edit Teacher POST Request With Data From Update Form
function updateTeacher(jsonData) {
  let URL =
    "http://localhost:59934/api/TeacherData/UpdateTeacher/" + idForPostRequest;
  let rq = new XMLHttpRequest();

  rq.onreadystatechange = function () {
    if (rq.readyState === 4) {
      //Either the API returns or not
      if (rq.status === 200 || rq.status === 204) {
        console.log("Post successfully updated!");
      } else {
        console.error("Error updating teacher:", rq.status, rq.statusText);
      }
    }
  };

  rq.open("POST", URL);
  rq.setRequestHeader("Content-type", "application/json");

  console.log("Sending data:", jsonData);
  rq.send(jsonData);
}
