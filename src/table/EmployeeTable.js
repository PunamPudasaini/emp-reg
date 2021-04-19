import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import {encodeData, decodeData} from '../utilsFunction/encodeData'
import { Modal, Button } from 'react-bootstrap';


class EmployeeTable extends Component{
    constructor(props){
        super(props);
        this.showModal = this.showModal.bind(this);
       this.hideModal = this.hideModal.bind(this);
        this.state = {
            employees: [],
            masterData:[],
            sort: 'asc',
            dataSearch: "",
            show: false,
            handleClose: false,
            handleShow: false
        };
    } 
    
  

  showModal = (id) => {
    this.setState({ show: true ,id:id});
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  handleDelete = ()=> {
    this.deleteUser()
  }
      componentDidMount(){
        //   console.log(this.props)
        this.getData()
    
      }
        getData = async () => {
        const result = await axios.get("https://infocomapy.herokuapp.com/employee-list");
        this.setState({
          employees: result.data?.reverse(),
          masterData: result.data?.reverse()
        })
      
        
      };

       deleteUser = async () => {
        await axios.delete(`https://infocomapy.herokuapp.com/soft-delete/${this.state.id}`);
        this.getData();
        this.setState({ show: false });
      };

      onChange = (e) => {
        this.setState({ dataSearch: e.target.value });
      }

      
      onSort = sort => {
        this.setState({sort});
      }



   render(){
    // const { addedContactDetails } = props;
   // console.log(this.state.employees)

   let { employees , sort } = this.state;
     const { dataSearch } = this.state;
     

    const filteredEmployee = employees.filter( emp =>{
            return emp.firstName.toLowerCase().indexOf( dataSearch.toLowerCase() ) !== -1
        })

        const sorted = filteredEmployee.sort((a, b) => {
          const isReversed = (sort === 'asc')? 1 : -1;
          return isReversed * a.firstName.localeCompare(b.firstName)
        })


   
       return(
           <>    
   
           <div className="container">
             <button className="button btn btn-primary mt-4 " onClick={()=> this.onSort('asc')} >asc</button>
             <button className="button btn btn-primary ml-2 mt-4" onClick={()=> this.onSort('desc')}>desc</button>
           <div className="col-6  d-flex justify-content-end ml-auto mr-7  ">
              <div className="align-vertical-end">
               
                  <input type="text" 
                  placeholder="Search Employee"
                  className="form-control" 
                  value={this.dataSearch} 
                  onChange={this.onChange} />
               
              </div>
            </div>
      <div className="py-4">
        <table className="table border shadow">

          <thead >
            <tr>
              <th scope="col">SN</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>



            {sorted.map((employee, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.salary}</td>
                <td>
                  <Link to={`/employee/${employee.id}`} className="btn btn-primary mr-2">
                    View
                  </Link>
                  <Link
                 
                    to = {`/employee/edit/${employee.id}`}
                    className="btn btn-outline-primary mr-2"
                   >
                    Edit
                  </Link>
                  <Link
                    //  onClick={() => this.deleteUser(employee.id)}
                     onClick= {() =>this.showModal(employee.id)}
                    className="btn btn-danger"   
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    </div>
    
    <Modal show={this.state.show} handleClose={this.hideModal}>
        <Modal.Body>Are you Sure? You Want to Delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.hideModal}>
            cancel
          </Button>
          <Button variant="primary" onClick={this.handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
          
           </>
       )
   }
}

export default EmployeeTable