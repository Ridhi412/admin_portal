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
} from 'reactstrap';
import classnames from 'classnames';
import PageTitle from '../../components/PageTitle';

// import { Document, Page } from 'react-pdf';

import samplePDF from './KeyAnswer.pdf';
import SinglePagePDFViewer from './PDF/single-page';
import AllPagesPDFViewer from './PDF/all-pages';

import { Document, Page, pdfjs } from 'react-pdf';
import { db, auth, storage } from '../../helpers/firebase';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const applicationForm1Query = async (isKeyAnswerAvailable) => {};

export const applicationForm2Query = async (isKeyAnswersChallengeable) => {
    try {
        var data = db.collection('Global_Variables').doc('keyAnswersChallengeable');

        console.log('success state changed');
        data.set({
            isKeyAnswersChallengeable: isKeyAnswersChallengeable,
        });
        // window.location.reload();
    } catch (error) {
        console.log('not success');
        console.log(error);
        alert(error.message);
    }
};

class GenerateKeyAnswer extends Component {
    state = {
        keyAnswers: '',
        isKeyAnswerAvailable: '',
        isKeyAnswersChallengeable: true,
        file1: [],
        uid: '',
    };

    componentDidMount = () => {
        db
            .collection('Global_Variables')
            .doc('keyAnswersAvailable')
            .get()
            .then((res) => {
                this.setState({ isKeyAnswerAvailable: res.data().isKeyAnswerAvailable });
                console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa00', this.state.isKeyAnswerAvailable);
            }).catch = (err) => {
            console.log('error');
        };
        this.state.uid = localStorage.getItem('uid');
        console.log(this.state.uid);
    };

    upload = () => {
        // alert(this.state.file, this.state.file.name);
        const uploadTask = storage.ref(`${this.state.uid}/${this.state.file1.name}`).put(this.state.file1);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // progress function ...
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                // this.setState({ progress });
                console.log(progress);
            },
            (error) => {
                // Error function ...
                console.log(error);
            },
            () => {
                // complete function ...
                storage
                    .ref(`${this.state.uid}`)
                    .child(this.state.file1.name)
                    .getDownloadURL()
                    .then((url) => {
                        console.log('url', url);
                    });
            }
        );
    };

    applicationForm1 = () => {
        try {
            var data = db.collection('Global_Variables').doc('keyAnswersAvailable');

            console.log('success state changed');
            data.set({
                isKeyAnswerAvailable: this.state.isKeyAnswerAvailable,
            });
        } catch (error) {
            console.log('not success');
            console.log(error);
            alert(error.message);
        }
    };

    applicationForm2 = () => {
        applicationForm2Query(this.state.isKeyAnswersChallengeable);
    };

    sendState1 = (event) => {
        console.log('sendData function', this.state);
        // event.preventDefault();
        this.applicationForm1();
    };

    sendState2 = (event) => {
        console.log('sendData function', this.state);
        // event.preventDefault();
        this.applicationForm2();
    };

    render() {
        return (
            <React.Fragment>
                <h4 className="header-title">Upload Key Answers</h4>

                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <FormGroup row>
                                    <Label for="keyAnswers" md={3}>
                                        Upload Key Answers
                                    </Label>
                                    <Col md={9}>
                                        <Input
                                            type="file"
                                            // name="keyAnswers"
                                            // id="keyAnswers"
                                            // placeholder="enter register no."
                                            // value={this.state.keyAnswers}
                                            onChange={(e) => {
                                                this.setState({ file1: e.target.files[0] });
                                                console.log(this.state.file1);
                                            }}
                                        />
                                    </Col>
                                </FormGroup>

                                <div className="text-right">
                                    <Button className="pull-right" onClick={this.upload} color="success">
                                        Upload
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <hr style={{ height: '1px', color: 'black', background: 'black' }} />

                <div class="row mt-5 mx-2">
                    <table className="table table-bordered" style={{ border: '1px solid #000' }}>
                        <Row>
                            {console.log(this.state)}
                            <Col md={9}>
                                <h5 className="ml-3">Provide access to Key Answers for all Candidates</h5>
                            </Col>
                            <Col md={3}>
                                <CustomInput
                                    type="switch"
                                    id="isKeyAnswerAvailable"
                                    name="isKeyAnswerAvailable"
                                    className="mt-2 mr-2 text-right"
                                    value={this.state.isKeyAnswerAvailable}
                                    onChange={(e) => {
                                        this.setState({ isKeyAnswerAvailable: !this.state.isKeyAnswerAvailable });
                                        console.log(e.target.value);
                                        this.sendState1();
                                        // alert('Global State Changed')
                                    }}
                                    // label="Turn on this custom switch"
                                />
                            </Col>
                        </Row>
                    </table>
                </div>

                <div class="row mt-3 mx-2">
                    <table className="table table-bordered" style={{ border: '1px solid #000' }}>
                        <Row>
                            <Col md={9}>
                                <h5 className="ml-3">Accept Key Answers Challenges from Candidates</h5>
                            </Col>
                            <Col md={3}>
                                <CustomInput
                                    type="switch"
                                    id="isKeyAnswersChallengeable"
                                    name="isKeyAnswersChallengeable"
                                    className="mt-2 mr-2 text-right"
                                    value={this.state.isKeyAnswersChallengeable}
                                    onChange={(e) => {
                                        this.setState({
                                            isKeyAnswersChallengeable: !this.state.isKeyAnswersChallengeable,
                                        });
                                        console.log(e.target.value);
                                        this.sendState2();
                                        // alert('Global State Changed')
                                    }}
                                    // label="Turn on this custom switch"
                                />
                            </Col>
                            {console.log(this.state)}
                        </Row>
                    </table>
                </div>
            </React.Fragment>
        );
    }
}

const RenderKeyAnswer = () => {
    return (
        <React.Fragment>
            {/* <h4 className="header-title">Key Answers</h4> */}
            <div className="all-page-container">
                <AllPagesPDFViewer pdf={samplePDF} />
            </div>
        </React.Fragment>
    );
};

const TableRow = ({ id, title, priority, type, complete, remove }) => (
    <tr>
        <td>{id}</td>
        <td>{title}</td>
        <td>{priority}</td>
        <td>{type}</td>
        <td>{complete}</td>
        <td className="remove">
            <button type="button" class="btn btn-danger" href="#" onClick={() => remove(id)}>
                Delete
            </button>
        </td>
    </tr>
);

const KeyAnswerChallenge = ({ data }) => {
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
                                <th scope="col">Paper</th>
                                <th scope="col">Question No</th>
                                <th scope="col">Expected Key</th>
                                <th scope="col">Reason</th>
                                {/* <th scope="col">Handle</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((elem, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{elem.paper}</td>
                                    <td>{elem.questionNo}</td>
                                    <td>{elem.expectedKey}</td>
                                    <td>{elem.reason}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Col>
            </Row>
        </React.Fragment>
    );
};

class KeyAnswers extends Component {
    constructor(props) {
        super(props);
        this.state = { activeTab: '1', notificationVar: [] };
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount = () => {
        db.collection('ChallengeKeyAnswer')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var data = {
                        paper: doc.data().paper,
                        questionNo: doc.data().questionNo,
                        expectedKey: doc.data().expectedKey,
                        reason: doc.data().reason,
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
                title: 'Upload Key Answers',
                icon: 'uil-home-alt',
                text: <GenerateKeyAnswer />,
            },
            {
                id: '2',
                title: 'View Key Answers',
                icon: 'uil-user',
                text: <RenderKeyAnswer />,
            },
            {
                id: '3',
                title: 'View Key Answer Challenges',
                icon: 'uil-user',
                text: <KeyAnswerChallenge data={this.state.notificationVar} />,
            },
        ];

        return (
            <React.Fragment>
                <h3 className="header-title mb-3 mt-3">Key Answers</h3>
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

export default KeyAnswers;
