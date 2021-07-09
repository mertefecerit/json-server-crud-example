export class Request {
    constructor(url) {
        this.url = "http://localhost:3000/employees";
    }
    async get(){
        return (await fetch(this.url)).json();
    }
    async post(data){
        return (await fetch(this.url,{
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-type":"application/json; charset=UTF-8"
            }
        }));
    }
    async put(id,data){
        return (await fetch(this.url + "/" + id,{
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                "Content-type":"application/json; charset=UTF-8"
            }
        }));
    }
    async delete(id){
        return (await fetch(this.url + "/" + id,{
            method: 'DELETE',
        }));
    }
}