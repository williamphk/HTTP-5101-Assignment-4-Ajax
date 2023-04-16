const deleteTeacherForm = document.getElementById("deleteTeacherForm");

deleteTeacherForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(deleteTeacherForm);
  const data = Object.fromEntries(formData.entries());
  deleteTeacher(data);
});

function deleteTeacher(data) {
  let URL =
    "http://localhost:59934/api/TeacherData/DeleteTeacher/" + data["TeacherId"];
  let rq = new XMLHttpRequest();

  rq.onreadystatechange = function () {
    if (rq.readyState === 4) {
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
