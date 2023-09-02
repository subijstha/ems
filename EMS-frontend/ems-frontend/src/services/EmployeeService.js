import axios from 'axios';

const instance = axios.create({
    maxRedirects: 0, // Disable automatic redirection
});


const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/v1/employees";

class EmployeeService {

    getEmployees() {
        return axios.get(EMPLOYEE_API_BASE_URL);

    }

    createEmployee(employee) {
        return axios.post(EMPLOYEE_API_BASE_URL, employee);
    }

    getEmployeeById(employeeId) {
        return instance.get(EMPLOYEE_API_BASE_URL).catch(error => {
            if (error.response.status === 302) {
                const newURL = error.response.headers.location;
                console.log('Redirect URL:', newURL);
            }
        });
        // return instance.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

    updateEmployee(employee, employeeId){
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId, employee);
    }

}

const employeeServiceInstance = new EmployeeService();
export default employeeServiceInstance;
// export default new EmployeeService();