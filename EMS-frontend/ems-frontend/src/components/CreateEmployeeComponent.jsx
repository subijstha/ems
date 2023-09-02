// import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';


// class CreateEmployeeComponent extends Component {

//     constructor(props){
//         super(props)

//         this.state = {
//                 firstName: '',
//                 lastName: '',
//                 emailId: ''
//         }

//         this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
//         this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
//         this.changeEmailIdHandler = this.changeEmailIdHandler.bind(this);
//         this.saveEmployee = this.saveEmployee.bind(this);
//     }

//     saveEmployee =(e)=>{
//         e.preventDefault();

//         let employee = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId};
//         console.log('employee => ' + JSON.stringify(employee));

//     }

//     changeFirstNameHandler=(event) =>{
//         this.setState({
//             firstName: event.target.value
//         });
//     }

//     changeLastNameHandler=(event) =>{
//         this.setState({
//             lastName: event.target.value
//         });
//     }

//     changeEmailIdHandler=(event) => {
//         this.setState({
//             emailId: event.target.value
//         });
//     }

//     cancel= () =>{
//         this.props.history.push('/employees');
//     }


//     render() {
//         return (
//             <div>
//                 <div className="container">
//                     <div className="row">
//                         <div className='card col-md-6 offset-md-3 offset-md-3'>
//                             <h3 className="text-center">Add Employee</h3>

//                             <div className="card-body">
//                                 <form>
//                                     <div className="form-group">
//                                         <label>First Name</label>
//                                         <input placeholder="First Name" name="firstName" className='form-control' value={this.state.firstName} onChange={this.changeFirstNameHandler} />
//                                     </div>

//                                     <div className="form-group">
//                                         <label>Last Name</label>
//                                         <input placeholder="Last Name" name="lastName" className='form-control' value={this.state.lastName} onChange={this.changeLastNameHandler} />
//                                     </div>

//                                      <div className="form-group">
//                                         <label>Email</label>
//                                         <input placeholder="Email Address" name="emailId" className='form-control' value={this.state.emailId} onChange={this.changeEmailIdHandler} />
//                                     </div>

//                                     <button className="btn btn-success" onClick={this.saveEmployee}>Save</button>
                                    
//                                     <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>

//                                 </form>

//                             </div>
//                         </div>
//                     </div>
//                 </div>
                
//             </div>
//         );
//     }
// }

// export default CreateEmployeeComponent;

// import React, { useState, useEffect } from 'react';
// import { useNavigate,useParams } from 'react-router-dom';
// import EmployeeService from '../services/EmployeeService'
// function CreateEmployeeComponent() {
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [emailId, setEmailId] = useState('');

//   useEffect(() => {
//     if (id === '_add') {
//       return
//     }else{
//       // Fetch the existing employee data using the ID
//       EmployeeService.getEmployeeById(id).then((res) => {
//         const employee = res.data;
//         setFirstName(employee.firstName);
//         setLastName(employee.lastName);
//         setEmailId(employee.emailId);
//       });
//     }
//   }, [id]);


//   const saveOrUpdateEmployee = (e) => {
//     e.preventDefault();

//     let employee = { firstName, lastName, emailId };
//     console.log('employee => ' + JSON.stringify(employee));
//     if(id=== '_add'){

    
//     EmployeeService.createEmployee(employee).then(res =>{
//         navigate('/employees');
//     });
//   }else{
//      EmployeeService.updateEmployee(employee, id).then(res => {
//         navigate('/employees')
//     })
//   }
//   };

//   const cancel = () => {
//     navigate('/employees');
//   };

//   const getTitle =()=>{
//     if(id === '_add'){
//       return <h3 className="text-center">Add Employee</h3>
//     }else{
//        return <h3 className="text-center">Update Employee</h3>
//     }
//     return;
//   }

//   return (
//     <div>
//       <div className="container">
//         <div className="row">
//           <div className='card col-md-6 offset-md-3 offset-md-3'>
//            {
//             getTitle()
//            }

//             <div className="card-body">
//               <form>
//                 <div className="form-group">
//                   <label>First Name</label>
//                   <input placeholder="First Name" name="firstName" className='form-control' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
//                 </div>

//                 <div className="form-group">
//                   <label>Last Name</label>
//                   <input placeholder="Last Name" name="lastName" className='form-control' value={lastName} onChange={(e) => setLastName(e.target.value)} />
//                 </div>

//                 <div className="form-group">
//                   <label>Email</label>
//                   <input placeholder="Email Address" name="emailId" className='form-control' value={emailId} onChange={(e) => setEmailId(e.target.value)} />
//                 </div>

//                 <button className="btn btn-success" onClick={saveOrUpdateEmployee}>Save</button>

//                 <button className="btn btn-danger" onClick={cancel} style={{ marginLeft: "10px" }}>Cancel</button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CreateEmployeeComponent;


import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

function CreateEmployeeComponent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
  });

  useEffect(() => {
    EmployeeService.getEmployees().then((res) => {
      const sortedEmployees = res.data.sort((a, b) => a.id - b.id);
      setEmployees(sortedEmployees);
    });

    if (id === '_add') {
      // When adding a new employee, initialize state with empty values
      setEmployee({
        firstName: '',
        lastName: '',
        emailId: '',
      });
    } else {
      // Fetch the existing employee data using the ID
      EmployeeService.getEmployeeById(id).then((res) => {
        const employeeData = res.data;
        setEmployee(employeeData);
      });
    }
  }, [id]);

  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();

    const { firstName, lastName, emailId } = employee;
    const newEmployee = { firstName, lastName, emailId };

    if (id === '_add') {
      // Adding a new employee
      EmployeeService.createEmployee(newEmployee).then((res) => {
        navigate('/employees');
      });
    } else {
      // Updating an existing employee
      EmployeeService.updateEmployee(newEmployee, id).then((res) => {
        navigate('/employees');
      });
    }
  };

  const cancel = () => {
    navigate('/employees');
  };

  const getTitle = () => {
    if (id === '_add') {
      return <h3 className="text-center">Add Employee</h3>;
    } else {
      return <h3 className="text-center">Update Employee</h3>;
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {getTitle()}

            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    placeholder="First Name"
                    name="firstName"
                    className="form-control"
                    value={employee.firstName}
                    onChange={(e) =>
                      setEmployee({ ...employee, firstName: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    placeholder="Last Name"
                    name="lastName"
                    className="form-control"
                    value={employee.lastName}
                    onChange={(e) =>
                      setEmployee({ ...employee, lastName: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    placeholder="Email Address"
                    name="emailId"
                    className="form-control"
                    value={employee.emailId}
                    onChange={(e) =>
                      setEmployee({ ...employee, emailId: e.target.value })
                    }
                  />
                </div>

                <button
                  className="btn btn-success"
                  onClick={saveOrUpdateEmployee}
                >
                  {id === '_add' ? 'Save' : 'Update'}
                </button>

                <button
                  className="btn btn-danger"
                  onClick={cancel}
                  style={{ marginLeft: '10px' }}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateEmployeeComponent;

