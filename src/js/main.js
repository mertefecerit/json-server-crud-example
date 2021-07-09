import {Request} from "./request";
import {UI} from "./ui";


const employeeForm = document.getElementById("employeeFrom");
const employeesTable = document.getElementById("employeesTable");

const req = new Request();
const ui = new UI();



document.addEventListener('DOMContentLoaded', function () {
    req.get()
        .then(response => ui.pushDataToUI(response))
        .catch(err => ui.showAlert(err));
});

employeeForm.addEventListener("submit",function (e){
    const data = {
        name : employeeForm.elements["name"].value,
        department : employeeForm.elements["department"].value,
        salary : Number(employeeForm.elements["salary"].value)
    }
    req.post(data).then(status => {
        ui.showAlert(status);
        ui.pushCreatedDataToUI(data);
        employeeForm.elements["name"].value = "";
        employeeForm.elements["department"].value = "";
        employeeForm.elements["salary"].value = "";
    }).catch(status => ui.showAlert(status));
    e.preventDefault();
});

employeesTable.addEventListener("click",function (e){
    const employeeId = e.target.parentElement.parentElement.firstChild.textContent;
    const row = e.target.parentElement.parentElement;
    switch (e.target.name){
        case "deleteButton":
            req.delete(employeeId).then(status => {
                ui.showAlert(status);
                ui.removeDataFromUI(row);
            }).catch(status => ui.showAlert(status));
            break;
        case "editButton":
            ui.prepareUiForUpdateData(row);
            break;
        case "cancelButton":
            ui.cancelUpdateProcessUI(e);
            break;
        case "updateButton":
            const updateForm = document.getElementById("updateForm");
            updateForm.addEventListener("submit",function (e){
                const id = updateForm.elements["idUPD"].value;
                const dataUPD = {
                    name : updateForm.elements["nameUPD"].value,
                    department : updateForm.elements["departmentUPD"].value,
                    salary : Number(updateForm.elements["salaryUPD"].value)
                }
                req.put(id,dataUPD)
                    .then(status => {
                        ui.updateUIAfterUpdateDatabase(e,dataUPD);
                        ui.showAlert(status);
                    })
                    .catch(err => console.error(err));
                e.preventDefault();
            });
            break;
    }
});