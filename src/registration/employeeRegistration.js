import axios from 'axios';
import React, { Component } from 'react'
import EmployeeTable from '../table/EmployeeTable';
import Common from './CommmonAdd';
import Education from './Education';
import { withRouter } from 'react-router-dom'

import { encodeData, decodeData } from '../utilsFunction/encodeData'

class EmployeeRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
      loading: true,
     values: {
       id: "",
      firstName: "",
      lastName: "",
      employeeSalary: "",
      isActive: true,
      dateOfBirth: "",
   },
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

      validations: {
        firstName: {
          required: true,
          touched: false,
          invalid: true,
          validationMessage: ' First Name is required',
        },
        lastName: {
          required: true,
          touched: false,
          invalid: true,
          validationMessage: 'last name is required',
        },
        employeeSalary: {
          required: true,
          touched: false,
          invalid: true,
          validationMessage: 'salary is required',
        },
        dateOfBirth: {
          required: true,
          touched: false,
          invalid: true,
          validationMessage: 'dateOfBirth is required',
        },
      },




    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange = (event) => {
    if (["designation",
    "officeName",
    "salary",
    "workDuration"].includes(event.target.name)) {
   
      let workHistoryDtos = [...this.state.workHistoryDtos]
      workHistoryDtos[event.target.dataset.id][event.target.name] = event.target.value;
    }

    else if ([ "boardName",
    "obtainedGrade",
    "passedLevel",
    "passedYear"].includes(event.target.name)) {
      let educationDetailDtos = [...this.state.educationDetailDtos]
      educationDetailDtos[event.target.dataset.id][event.target.name] = event.target.value;
    }else{
    this.setState({[event.target.name]: event.target.value });

    }
  

    this.setState(
      (prevState) => ({
        ...prevState,
        values: {
          ...prevState.values,
          [event.target.name]: event.target.value,
        },
        validations: {
          ...prevState.validations,
          [event.target.name]: {
            ...prevState.validations[event.target.name],
            touched: true,
          },
        },
      }),
      () => {
        this.setState((prevState) => ({
          ...prevState,
          values: {
            ...prevState.values,
            [event.target.name]: event.target.value,
          },
          validations: {
            ...prevState.validations,
            [event.target.name]: {
              ...prevState.validations[event.target.name],
              invalid: this.state.values[event.target.name].length > 0 || false,
            },
          },
        }));
      }
    );

  }


  addNewRow = () => {
   this.setState((prevState) => ({
      workHistoryDtos: [...prevState.workHistoryDtos, {
        designation: "",
        officeName: "",
        salary: "",
        workDuration: ""
      }],
    }));

  }

  addNewEducationRow = () => {
    this.setState((prevState) => ({
      educationDetailDtos: [...prevState.educationDetailDtos, {
        index: Math.random(), education: "",
        board: "",
        institute: "",
        grade: "",
        percentage: "",
        passedYear: "",
      }],
    }));
  }




  clickOnDelete(record) {
    this.setState({
      workHistoryDtos: this.state.workHistoryDtos.filter(r => r !== record)
    });

    this.setState({
      educationDetailDtos: this.state.educationDetailDtos.filter(r => r !== record)
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const {
      id,
      firstName,
      lastName,
      employeeSalary,
      isActive,
      dateOfBirth, 
    } = this.state.values
    const {
      educationDetailDtos,
      payrollHistoryDtos,
      workHistoryDtos,
    } = this.state

    const reqData = {
      firstName,
      lastName,
      salary :employeeSalary ,
      isActive,
      dateOfBirth,
      educationDetailDtos,
      payrollHistoryDtos,
      workHistoryDtos,

    }
    await axios.post("https://infocomapy.herokuapp.com/save", reqData);
    this.props.history.push("/");
  }

  render() {
    const {
      values,
      validations: { firstName, lastName, employeeSalary, dateOfBirth },
      workHistoryDtos,
      educationDetailDtos,
      handleChange
    } = this.state;
    return (
      <>
        <form className="form mr-4 ml-4" onSubmit={this.handleSubmit}>

          <div className="row">
            <div className="col">
              <label className="font-weight-bold" for="name">First Name</label>
              <input type="text"
               name="firstName" 
               value={this.state.firstName}
                className="form-control border"
                 placeholder="Name"
                 id='name'
                onChange={this.handleChange} 
                onFocus={this.handleChange}/>
                 {firstName.touched && firstName.required && !firstName.invalid && (
                          <div className='validation' style={{color: "red"}}>
                            {firstName.validationMessage}
                          </div>
                        )}
            </div>
           
            <div className="col">
              <label className="font-weight-bold" for="lastName">Last Name</label>
              <input type="text" name="lastName" value={this.state.lastName}
                className="form-control border" placeholder="Last Name"
                 onChange={this.handleChange} 
                 onFocus={this.handleChange}
                 />
                 {lastName.touched && lastName.required && !lastName.invalid && (
                          <div className='validation' style={{color: "red"}}>
                            {lastName.validationMessage}
                          </div>
                        )}

            </div>

          </div>

          <div className="row mt-4">
            <div className="col">
              <label className="font-weight-bold" for="salary">Salary</label>
              <input type="number" name="employeeSalary" value={values.employeeSalary}
                className="form-control border" placeholder="Salary"
                 onChange={this.handleChange}
                 onFocus={this.handleChange} />
                 {employeeSalary.touched && employeeSalary.required && !employeeSalary.invalid && (
                          <div className='validation' style={{color: "red"}}>
                            {employeeSalary.validationMessage}
                          </div>
                        )}

            </div>
            <div className="col">
              <label className="font-weight-bold" for="dateOfBirth">Date Of Birth</label>
              <input type="date" name="dateOfBirth" value={this.state.dateOfBirth}
                className="form-control border" placeholder="dateOfBirth"
                 onChange={this.handleChange}
                 onFocus={this.handleChange}
                 />
                  {dateOfBirth.touched && dateOfBirth.required && !dateOfBirth.invalid && (
                          <div className='validation' style={{color: "red"}}>
                            {dateOfBirth.validationMessage}
                          </div>
                        )}

            </div>

          </div>

          <div className="col mt-4">
            <label className="font-weight-bold" for="workHistoryDtos">workHistoryDtos</label>
          </div>
          <table className="table table-hover">
            <thead className="thead-light">
              <tr>
                <th>Company Name</th>
                <th>workDuration</th>
                <th>designation</th>
                <th>Salary</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <Common
                add={this.addNewRow}
                delete={this.clickOnDelete.bind(this)}
                workHistoryDtos={this.state.workHistoryDtos}
                onChange={this.handleChange} />

            </tbody>
          </table>


          <div className="col mt-4">
            <label className="font-weight-bold" for="education">Education</label>
          </div>
          <table className="table table-hover">
            <thead className="thead-light">
              <tr>
                <th>Institute Name</th>
                <th>obtainedGrade</th>
                <th>passedLevel</th>
                <th>Passed Year</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <Education add={this.addNewEducationRow}
                delete={this.clickOnDelete.bind(this)}
                educationDetailDtos={this.state.educationDetailDtos}
                onChange={this.handleChange} />

            </tbody>
          </table>
          <div className="text-right mr-4">
            <button type="submit" 
            class="btn btn-primary"
            disabled={
              !values.firstName || !values.lastName || !values.salary || !values.dateOfBirth }
            >Submit</button>
          </div>
        </form>
      </>
    );
  }
}

export default withRouter(EmployeeRegistration);