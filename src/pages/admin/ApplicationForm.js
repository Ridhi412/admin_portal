import React, { Component } from 'react';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import {
    Row,
    Col,
    Card,
    CardBody,
    CustomInput,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    Button,
    Table,
} from 'reactstrap';
import PageTitle from '../../components/PageTitle';
import { components } from 'react-select';
import MaskedInput from 'react-text-mask';
import { db, auth, storage } from '../../helpers/firebase';

class ExamCenter extends Component {
    state = {
        centerNo: '',
        centerName: '',
        centerAddress: '',
        centerCity: '',
        centerVacancies: '',
    };

    sendData = (event) => {
        console.log('sendData function', this.state);
        event.preventDefault();
        try {
            var data = db.collection('Admin_Exam_Centre').doc();
            data.set({
                centerNo: this.state.centerNo,
                centerName: this.state.centerName,
                centerAddress: this.state.centerAddress,
                centerCity: this.state.centerCity,
                centerVacancies: this.state.centerVacancies,
            });

            window.location.reload();
        } catch (error) {
            console.log('Admin_Exam_Centre');
            console.log(error);
            alert(error.message);
        }
        // this.applicationForm1();
    };

    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col>
                        <Card>
                            <h4 className="header-title mt-2 mb-2">Set Exam Centers</h4>
                            <CardBody>
                                <FormGroup row>
                                    <Label for="fname" md={3}>
                                        Exam Center No.
                                    </Label>
                                    <Col md={9}>
                                        <Input
                                            type="text"
                                            name="centerNo"
                                            id="centerNo"
                                            placeholder="Enter Exam Center No."
                                            value={this.state.centerNo}
                                            onChange={(e) => {
                                                this.setState({ centerNo: e.target.value });
                                                console.log(e.target.value);
                                            }}
                                        />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="fname" md={3}>
                                        Exam Center Name
                                    </Label>
                                    <Col md={9}>
                                        <Input
                                            type="text"
                                            name="centerName"
                                            id="centerName"
                                            placeholder="Enter Exam Center Name"
                                            value={this.state.centerName}
                                            onChange={(e) => {
                                                this.setState({ centerName: e.target.value });
                                                console.log(e.target.value);
                                            }}
                                        />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="fname" md={3}>
                                        Exam Center Address
                                    </Label>
                                    <Col md={9}>
                                        <Input
                                            type="textarea"
                                            name="centerAddress"
                                            id="centerAddress"
                                            placeholder="Enter Exam Center Address"
                                            value={this.state.centerAddress}
                                            onChange={(e) => {
                                                this.setState({ centerAddress: e.target.value });
                                                console.log(e.target.value);
                                            }}
                                        />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="fname" md={3}>
                                        Exam Center City
                                    </Label>
                                    <Col md={9}>
                                        <Input
                                            type="text"
                                            name="centerCity"
                                            id="centerCity"
                                            placeholder="Enter Exam Center City"
                                            value={this.state.centerCity}
                                            onChange={(e) => {
                                                this.setState({ centerCity: e.target.value });
                                                console.log(e.target.value);
                                            }}
                                        />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="fname" md={3}>
                                        Exam Center Vacancies
                                    </Label>
                                    <Col md={9}>
                                        <Input
                                            type="text"
                                            name="centerVacancies"
                                            id="centerVacancies"
                                            placeholder="Enter Exam Center Vacancies"
                                            value={this.state.centerVacancies}
                                            onChange={(e) => {
                                                this.setState({ centerVacancies: e.target.value });
                                                console.log(e.target.value);
                                            }}
                                        />
                                    </Col>
                                </FormGroup>

                                <div className="text-right">
                                    <Button className="pull-right" onClick={this.sendData} color="success">
                                        Add
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

class ExamFees extends Component {
    state = {
        onePaperFeesGM: '',
        twoPaperFeesGM: '',
        onePaperFeesOthers: '',
        twoPaperFeesOthers: '',
    };

    sendData = (event) => {
        console.log('sendData function', this.state);
        event.preventDefault();
        try {
            var data = db.collection('Global_Variables').doc('applicationFees');
            data.set({
                onePaperFeesGM: this.state.onePaperFeesGM,
                twoPaperFeesGM: this.state.twoPaperFeesGM,
                onePaperFeesOthers: this.state.onePaperFeesOthers,
                twoPaperFeesOthers: this.state.twoPaperFeesOthers,
            });

            window.location.reload();
        } catch (error) {
            console.log('Global_Variables applicationFees');
            console.log(error);
            alert(error.message);
        }
        // this.applicationForm1();
    };

    render() {
        return (
            <React.Fragment>
                {/* <Row className="page-title d-print-none">
                    <Col md={12}>
                        <PageTitle
                            breadCrumbItems={[
                                { label: 'Pages', path: '/pages/invoice' },
                                { label: 'Invoice', path: '/pages/invoice', active: true },
                            ]}
                            title={'Generate Admit Card'}
                        />
                    </Col>
                </Row> */}

                <Row>
                    <Col>
                        <Card>
                            <h4 className="header-title mt-2 mb-2">Set Exam Fees</h4>
                            <CardBody>
                                <FormGroup row>
                                    <Label for="fname" md={3}>
                                        Fees for GM Candidate
                                    </Label>
                                    <Col md={9}>
                                        <Row>
                                            <Col md={6}>
                                                <Input
                                                    type="text"
                                                    name="onePaperFeesGM"
                                                    id="onePaperFeesGM"
                                                    placeholder="Enter one paper Fees for GM"
                                                    value={this.state.onePaperFeesGM}
                                                    onChange={(e) => {
                                                        this.setState({ onePaperFeesGM: e.target.value });
                                                        console.log(e.target.value);
                                                    }}
                                                />
                                            </Col>
                                            <Col md={6}>
                                                <Input
                                                    type="text"
                                                    name="twoPaperFeesGM"
                                                    id="twoPaperFeesGM"
                                                    placeholder="Enter two papers Fees for GM"
                                                    value={this.state.twoPaperFeesGM}
                                                    onChange={(e) => {
                                                        this.setState({ twoPaperFeesGM: e.target.value });
                                                        console.log(e.target.value);
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="fname" md={3}>
                                        Fees for OBC/SC/ST/PwD Candidates
                                    </Label>
                                    <Col md={9}>
                                        <Row>
                                            <Col md={6}>
                                                <Input
                                                    type="text"
                                                    name="onePaperFeesOthers"
                                                    id="onePaperFeesOthers"
                                                    placeholder="Enter one paper Fees for others"
                                                    value={this.state.onePaperFeesOthers}
                                                    onChange={(e) => {
                                                        this.setState({ onePaperFeesOthers: e.target.value });
                                                        console.log(e.target.value);
                                                    }}
                                                />
                                            </Col>
                                            <Col md={6}>
                                                <Input
                                                    type="text"
                                                    name="twoPaperFeesOthers"
                                                    id="twoPaperFeesOthers"
                                                    placeholder="Enter two papers Fees for others"
                                                    value={this.state.twoPaperFeesOthers}
                                                    onChange={(e) => {
                                                        this.setState({ twoPaperFeesOthers: e.target.value });
                                                        console.log(e.target.value);
                                                        console.log(this.state);
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                </FormGroup>

                                <div className="text-right">
                                    <Button className="pull-right" onClick={this.sendData} color="success">
                                        Set
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

class Projectss extends React.Component {
    render() {
        return (
            <div className="mt-4">
                <h4 className="header-title mt-4 mb-4">Application Form</h4>

                <Card>
                    <CardBody>
                        <ExamFees />
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <ExamCenter />
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default Projectss;
