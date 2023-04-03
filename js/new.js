const createTeacherForm = document.getElementById('createTeacherForm');

createTeacherForm.addEventListener('submit', function (event) {
    event.preventDefault();
    createTeacher();
});

function createTeacher() {
    let URL = "http://localhost:59934/api/TeacherData/AddTeacher/";
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
    rq.setRequestHeader('Content-type', 'application/json');

    // Convert form data to a JSON object
    const formData = new FormData(createTeacherForm);
    const data = Object.fromEntries(formData.entries());
    const jsonData = JSON.stringify(data);

    console.log("Sending data:", jsonData);
    rq.send(jsonData);
}