import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ViewEmployee = () => {
  const [employee, setEmployee] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);



  const loadUser = async () => {
    const res = await axios.get(`https://infocomapy.herokuapp.com/view-by-id/${id}`);
    setEmployee(res.data)
   

  };
  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/">
        back to Table
      </Link>
      <h1 className="display-6">Employee Id: {id}</h1>
      <hr />
     


      {employee.length>0 && employee.map((data, index) => (
        <div>
       
        <div className="border border-light mt-3">
        <label>First Name: </label>
          <span className="ml-4">{data.firstName}</span>
          </div>
          <div className="border border-light mt-3">
        <label >Last Name: </label>
          <span className="ml-4">{data.lastName}</span>
          </div>
          <div className="border border-light mt-3">
        <label>Salary: </label>
          <span className="ml-4">{data.salary}</span>
          </div>
          <div className="border border-light mt-3">
        <label>Date of Birth: </label>
          <span className="ml-4">{data.dateOfBirth}</span>
          </div>
          
          <h2>Education Details</h2>
            <div className="border border-light mt-3">
              <table className="table">
                <thead>
                  <tr>
                    <th>SN</th>
                    <th scope="col">Board</th>
                    <th scope="col">Passed Level</th>
                    <th scope="col">Passed Year</th>
                    <th scope="col">Grade</th>
                  </tr>
                </thead>
          {data.educationDetails.map((dataa) => (
                <tbody>
                  <tr>
                  <th>{index + 1}</th>
                    <th scope="row">{dataa.boardName}</th>
                    <td>{dataa.passedLevel}</td>
                    <td>{dataa.passedYear}</td>
                    <td>{dataa.obtainedGrade}</td>
                  </tr>

                </tbody>
                   ))}
              </table>
            </div>
       

          <hr />

          <h2>Working Experience</h2>
            <div className="border border-light mt-3">
              <table className="table">
                <thead>
                  <tr>
                    <th>SN</th>
                    <th scope="col">Company Name</th>
                    <th scope="col">Designation</th>
                    <th scope="col">Work Duration</th>
                    <th scope="col">Salary</th>
                  </tr>
                </thead>
                {data.workHistories.map((data1, index) => (
                <tbody>

                  <tr>
                    <th>{index + 1}</th>
                    <th scope="row">{data1.officeName}</th>
                    <td>{data1.designation}</td>
                    <td>{data1.workDuration}</td>
                    <td>{data1.salary}</td>
                  </tr>

                </tbody>
                  ))}
              </table>
            </div>
        

          <hr />
          <h2>PayRoll Details</h2>

            <div className="border border-light mt-3">
              <table className="table">
                <thead>
                  <tr>
                    <th>SN</th>
                    <th scope="col">Paid Amount</th>
                    <th scope="col">Paid Date</th>

                  </tr>
                </thead>
          {data.payrollHistories.map((data2, index) => (

                <tbody>

                  <tr>
                  <th>{index + 1}</th>
                    <th scope="row">{data2.paidAmount}</th>
                    <td>{data2.paidDate}</td>

                  </tr>

                </tbody>
                  ))}
              </table>
            </div>
        
        </div>
      ))}
    </div>
  );
};

export default ViewEmployee;
