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

selectTeacherForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(selectTeacherForm);
  const updateData = Object.fromEntries(formData.entries());
  idForPostRequest = updateData["TeacherId"];
  getTeacher(updateData);
});

function getTeacher(updateData) {
  let URL =
    "http://localhost:59934/api/TeacherData/FindTeacher/" +
    updateData["TeacherId"];
  let rq = new XMLHttpRequest();

  rq.onreadystatechange = function () {
    if (rq.readyState === 4) {
      if (rq.status === 200) {
        const responseData = rq.response;
        console.log("Successfully found teacher!" + responseData);
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

updateTeacherForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(updateTeacherForm);
  const editData = Object.fromEntries(formData.entries());
  // Convert form data to a JSON object
  const jsonData = JSON.stringify(editData);
  updateTeacher(jsonData);
});

function updateTeacher(jsonData) {
  let URL =
    "http://localhost:59934/api/TeacherData/UpdateTeacher/" + idForPostRequest;
  let rq = new XMLHttpRequest();

  rq.onreadystatechange = function () {
    if (rq.readyState === 4) {
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
