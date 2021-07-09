export class UI {
    constructor() {
       this.employeesTable = document.getElementById("employeesTable");
    }

    pushDataToUI(response){
        response.forEach(value => {
            this.employeesTable.innerHTML += '<tr><th scope="row">'+value.id+'</th><td>'+value.name+'</td><td>'+value.department+'</td><td>'+value.salary+'</td>' +
                '<td>' +
                '<button name="editButton" class="btn-success btn btn-sm">Düzenle</button>'+
                '<button name="deleteButton" class="btn-danger btn btn-sm ms-2">Delete</button>'+
                '</td>' +
                '</tr>';
        });
    }

    pushCreatedDataToUI(data){
        let newId;
        if(this.employeesTable.innerHTML === ""){
            newId = 1;
        }else{
            newId = Number(this.employeesTable.lastElementChild.firstChild.textContent) + 1;
        }
        this.employeesTable.innerHTML += '<tr><th scope="row">'+ newId + '</th><td>'+data.name+'</td><td>'+data.department+'</td><td>'+data.salary+'</td>' +
        '<td>' +
        '<button name="editButton" class="btn-success btn btn-sm">Düzenle</button>'+
        '<button name="deleteButton" class="btn-danger btn btn-sm ms-2">Delete</button>'+
        '</td>' +
        '</tr>';
    }

    removeDataFromUI(row){
        row.remove();
    }

    prepareUiForUpdateData(row){
        row.style.display = "none";
        const id = row.children[0].textContent;
        const name = row.children[1].textContent;
        const department = row.children[2].textContent;
        const salary = row.children[3].textContent;
        let newRow = document.createElement("tr");
        let newCol = document.createElement("td");
        newCol.setAttribute("colspan","5");
        newCol.innerHTML = '<form id="updateForm"><div class="input-group input-group-sm">' +
            '<input name="idUPD" type="hidden" class="form-control" value="' + id + '">' +
            '<input name="nameUPD" type="text" class="form-control" value="' + name + '">' +
            '<input name="departmentUPD" type="text" class="form-control" value="' + department + '">' +
            '<input name="salaryUPD" type="number" class="form-control" value="' + salary + '">' +
            '<button type="submit" name="updateButton" class="btn btn-sm btn-primary">Güncelle</button>' +
            '<button type="button" name="cancelButton" class="btn btn-sm btn-danger">Vazgeç</button>' +
            '</div></form>';
        newRow.appendChild(newCol);
        row.parentElement.insertBefore(newRow,row.nextElementSibling);
    }
    updateUIAfterUpdateDatabase(e,data){
        const updateInputs = e.target.parentElement.parentElement;
        const originalData = e.target.parentElement.parentElement.previousElementSibling;
        updateInputs.remove();
        originalData.style.display = "";
        originalData.children[1].textContent = data.name
        originalData.children[2].textContent = data.department
        originalData.children[3].textContent = data.salary
    }
    cancelUpdateProcessUI(e){
        const previousTrElement = e.target.parentElement.parentElement.parentElement.parentElement;
        const hiddenTrElement = e.target.parentElement.parentElement.parentElement.parentElement.previousElementSibling;
        hiddenTrElement.style.display = "";
        previousTrElement.remove();
    }

    showAlert(status){
        switch (status.status){
            case 200:
            case 201:
            case 204:
                console.log("Process Success");
                break;
            case 404:
                console.error("Process Failed, status code : ", status.status)
                break;
        }
    }
}