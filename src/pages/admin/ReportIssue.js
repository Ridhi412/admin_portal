import React, { Component } from 'react';
import { Row, Col, Card, CardBody, TabContent, TabPane, Nav, NavItem, NavLink, FormGroup, Label, Input, Button,UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, CustomInput, Form } from 'reactstrap';
import classnames from 'classnames';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import MaskedInput from 'react-text-mask';
import { db, auth, storage } from '../../helpers/firebase';

// import {firebase} from '../../helpers/authUtils'
// const db = firebase.firestore();
// const auth = firebase.auth();

class Result extends Component {
    constructor(props) {
        super(props);
        this.state = { activeTab: '1',issueVar: [], };
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount = () => {
        db.collection('Issues')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var data = {
                        subject: doc.data().subject,
                        body: doc.data().body,
                    };
                    this.state.issueVar.push(data);
                });
                console.log('componentDidMount', this.state.issueVar);
            });
    };

    /**
     * Toggle the tab
     */
    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    };

    render() {
        const tabContents = [
            {
                id: '1',
                title: 'Send Issues',
                icon: 'uil-home-alt',
                text:"NA"
                    // <Issues/>
            },
            {
                id: '2',
                title: 'View Issues',
                icon: 'uil-user',
                text:
                    <GenerateIssue data={this.state.issueVar}/>
            },
        ];

        return (
            <React.Fragment>
				<h3 className="header-title mb-3 mt-3">Issues</h3>
                <Card>
                    <CardBody>
                        {/* <h5 className="header-title mb-3 mt-0">Nav Pills</h5> */}
                        <Nav className="nav nav-pills navtab-bg nav-justified">
                            {tabContents.map((tab, index) => {
                                return (
                                    <NavItem key={index}>
                                        <NavLink
                                            href="#"
                                            className={classnames({ active: this.state.activeTab === tab.id })}
                                            onClick={() => {
                                                this.toggle(tab.id);
                                            }}>
                                            <i
                                                className={classnames(
                                                    tab.icon,
                                                    'd-sm-none',
                                                    'd-block',
                                                    'mr-1'
                                                )}></i>
                                            <span className="d-none d-sm-block" >{tab.title}</span>
                                        </NavLink>
                                    </NavItem>
                                );
                            })}
                        </Nav>

                        <TabContent activeTab={this.state.activeTab}>
                            {tabContents.map((tab, index) => {
                                return (
                                    <TabPane tabId={tab.id} key={index}>
                                        <Row>
                                            <Col sm="12">
                                                <p className="mt-2">{tab.text}</p>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                );
                            })}
                        </TabContent>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

const GenerateIssue = ({data}) => {
    return (
        <React.Fragment>
            {/* <h4 className="header-title mt-2">Generated Result</h4> */}

            <Row>
                <Col>
                    {/* <AdvancedTable /> */}
                    <table class="table table-striped">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Subject</th>
                            <th scope="col">Body</th>
                            {/* <th scope="col">Handle</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((elem,index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td className="font-weight-bold">{elem.subject}</td>
                                    <td>{elem.body}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Col>
            </Row>

        </React.Fragment>
    );
};

export default Result;
