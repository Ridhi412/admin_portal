// @flow
import React, {Component} from 'react';
import { Row, Col, Card, CardBody, Progress, UncontrolledTooltip, Button } from 'reactstrap';

import { storage, auth, db } from '../../helpers/firebase';

class Projects extends Component {

    state = {
        notificationVar: [],
        new:''
    }

    componentDidMount() {
        db.collection('Candidate_Profile')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var data = {
                        // subject: doc.data().subject,
                        // body: doc.data().body,
                        // name: localStorage.getItem("Name"),
                        // name: localStorage.getItem("Name"),
                        father_fname: doc.data().father_fname,
                        mother_fname: doc.data().mother_fname,
                        gender: doc.data().gender,
                        dob: doc.data().dob,
                        category: doc.data().category,
                        address: doc.data().address,
                        district: doc.data().district,
                        State: doc.data().State,
                        pincode: doc.data().pincode,
                    };
                    
                    this.state.notificationVar.push(data);
                });
                let content=this.state.notificationVar.map((elem,index) => (
                    <tr key={index}>
                        <td>{index+1}</td>
                        {/* <td className="font-weight-bold">demo {index+1}</td> */}
                        <td>{elem.father_fname}</td>
                        {/* <td>{elem.mother_fname}</td> */}
                        <td>{elem.gender}</td>
                        <td>{elem.dob}</td>
                        <td>{elem.category}</td>
                        <td>{elem.address}</td>
                        <td>{elem.State}</td>
                        <td>{elem.district}</td>
                        <td>{elem.pincode}</td>
                </tr>
                ))
                this.setState({new:content})
                console.log('componentDidMount', this.state.notificationVar);
            });
    };

    render(){
        return (
            <>
            <Row className="page-title">
                <Col md={3} xl={6}>
                    <h4 className="mb-1 mt-0">Candidate Details</h4>
                </Col>
            </Row>

            <Card>
                <CardBody>
                    
                    <Row>
                        {console.log("notificationVar",this.state.notificationVar)}
                       
                        <table class="table thead-dark table-striped">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            {/* <th scope="col">Name</th> */}
                            <th scope="col">Name</th>
                            {/* <th scope="col">Mother Name</th> */}
                            <th scope="col">Gender</th>
                            <th scope="col">DOB</th>
                            <th scope="col">Category</th>
                            <th scope="col">Address</th>
                            <th scope="col">District</th>
                            <th scope="col">State</th>
                            <th scope="col">Pin Code</th>
                            {/* <th scope="col">Handle</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.new}
                        </tbody>
                        </table>
                    </Row>
                </CardBody>
            </Card>
                
            </>

        );
    }
    
};

export default Projects;