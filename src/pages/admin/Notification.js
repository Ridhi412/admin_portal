import React, { Component } from 'react';
import {
    Row,
    Col,
    Card,
    CardBody,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    FormGroup,
    Label,
    Input,
    Button,
    UncontrolledDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    CustomInput,
    Form,
} from 'reactstrap';
import classnames from 'classnames';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import MaskedInput from 'react-text-mask';

import { db, auth, storage } from '../../helpers/firebase';

class SendNotification extends Component {
    state = {
        to: 'Everyone',
        subject: '',
        body: '',
    };

    constructor(props) {
        super(props);
        this.state = {
            notificationVar: [],
        };
    }

    componentDidMount = () => {
        db.collection('Notifcations')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var data = {
                        subject: doc.data().subject,
                        body: doc.data().body,
                    };
                    this.state.notificationVar.push(data);
                });
                console.log('componentDidMount', this.state.notificationVar);
            });
    };

    sendData = (event) => {
        console.log('sendData function', this.state);

        event.preventDefault();
        try {
            var data = db.collection('Notifcations').doc();
            data.set({
                // uid: auth.currentUser.uid,
                to: this.state.to,
                subject: this.state.subject,
                body: this.state.body,
            });
            alert('Notification added');
            window.location.reload();
        } catch (error) {
            console.log('Notification');
            console.log(error);
            alert(error.message);
        }
    };

    render() {
        console.log(this.state);
        return (
            <div>
                <Row className="page-title align-items-center">
                    <Col sm={4} xl={6}>
                        <h4 className="mb-1 mt-0">Send Notifications</h4>
                    </Col>
                </Row>
                <Card>
                    <CardBody>
                        <div>
                            <Form>
                                {/* <h4 className="header-title mt-0 mb-4">Personal Details</h4> */}

                                <FormGroup row>
                                    <Label for="exampleEmail" md={3}>
                                        To
                                    </Label>
                                    <Col md={9}>
                                        <Input
                                            type="text"
                                            name="to"
                                            id="to"
                                            placeholder="enter email"
                                            value={this.state.to}
                                            onChange={(e) => {
                                                this.setState({ to: e.target.value });
                                                console.log(e.target.value);
                                            }}
                                        />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="phone" md={3}>
                                        Subject
                                    </Label>
                                    <Col md={9}>
                                        <Input
                                            type="text"
                                            name="subject"
                                            id="subject"
                                            placeholder="Enter Subject"
                                            value={this.state.subject}
                                            onChange={(e) => {
                                                this.setState({ subject: e.target.value });
                                                console.log(e.target.value);
                                            }}
                                        />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="phone" md={3}>
                                        Body
                                    </Label>
                                    <Col md={9}>
                                        <Input
                                            type="textarea"
                                            name="body"
                                            id="body"
                                            rows="6"
                                            placeholder="Enter Body of the message"
                                            value={this.state.body}
                                            onChange={(e) => {
                                                this.setState({ body: e.target.value });
                                                console.log(e.target.value);
                                            }}
                                        />
                                    </Col>
                                </FormGroup>

                                <ul className="list-inline wizard mb-0">
                                    <li className="next list-inline-item float-right">
                                        <Button onClick={this.sendData} color="success">
                                            Submit
                                        </Button>
                                    </li>
                                </ul>
                            </Form>
                        </div>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

class Result extends Component {
    constructor(props) {
        super(props);
        this.state = { activeTab: '1', notificationVar: [] };
        this.toggle = this.toggle.bind(this);
    }

    // constructor(props) {
    //     super(props);
    //     this.state = {

    //     };
    // }

    componentDidMount = () => {
        db.collection('Notifcations')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var data = {
                        subject: doc.data().subject,
                        body: doc.data().body,
                    };
                    this.state.notificationVar.push(data);
                });
                console.log('componentDidMount', this.state.notificationVar);
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
                title: 'Send Notification',
                icon: 'uil-home-alt',
                text: <SendNotification />,
            },
            {
                id: '2',
                title: 'View Notifications',
                icon: 'uil-user',
                text: <GeneratedCards data={this.state.notificationVar} />,
            },
        ];

        return (
            <React.Fragment>
                <h3 className="header-title mb-3 mt-3">Notifications</h3>
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
                                            <i className={classnames(tab.icon, 'd-sm-none', 'd-block', 'mr-1')}></i>
                                            <span className="d-none d-sm-block">{tab.title}</span>
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

const GeneratedCards = ({ data }) => {
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
                            {data.map((elem, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
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
