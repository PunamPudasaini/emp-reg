import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const EditEmployee = () => {
  let history = useHistory();
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    id: "",
    salary: "",  
     isActive: true,
     dateOfBirth: "",

  educationDetailDtos: [{
   boardName: "",
   obtainedGrade: "",
   passedLevel: "",
   passedYear: ""
 }],
 payrollHistoryDtos: [{
   paidAmount: "",
   paidDate: ""
 }],
 workHistoryDtos: [{
   designation: "",
   officeName: "",
   salary: "",
   workDuration: ""
 }],
  });

  const { firstName, lastName, salary,educationDetailDtos,isActive,dateOfBirth,payrollHistoryDtos,workHistoryDtos } = employee;
  const onInputChange = e => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    const data = {
      id: +id,...employee
    }
    await axios.post(`https://infocomapy.herokuapp.com/save`, data);
    history.push("/");
  };

  const loadUser = async () => {
    const result = await axios.get(`https://infocomapy.herokuapp.com/view-by-id/${id}`);

       setEmployee({
        firstName: result.data[0].firstName,
        lastName:result.data[0].lastName,
        salary:result.data[0].salary, 
        isActive,
        dateOfBirth,
        educationDetailDtos,
        payrollHistoryDtos,
        workHistoryDtos


       });
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit Employee</h2>
        
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="firstName"
              name="firstName"
              value={firstName}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Last Name"
              name="lastName"
              value={lastName}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Salary"
              name="salary"
              value={salary}
              onChange={e => onInputChange(e)}
            />
          </div>

          <button className="btn btn-warning ">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
