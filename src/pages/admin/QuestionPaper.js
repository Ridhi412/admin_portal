import React, {Component} from 'react';
import { Row, Col, Card, CardBody, TabContent, TabPane, Nav, NavItem, NavLink, FormGroup, Label, Input, Button,UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, CustomInput } from 'reactstrap';
import classnames from 'classnames';
import PageTitle from '../../components/PageTitle';

// import { Document, Page } from 'react-pdf';

import samplePDF from './QuestionPaper.pdf';
import SinglePagePDFViewer from "./PDF/single-page";
import AllPagesPDFViewer from "./PDF/all-pages";

import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class GenerateAdmitCard extends Component {
    
    state = {
        questionPaper:"",
        isQuestionPaperAvailable: false
    }

    render(){
        return (
            <React.Fragment>

                <h4 className="header-title">Upload Question Paper</h4>
                
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                            <FormGroup row>
                                <Label for="questionPaper" md={3}>
                                    Upload Question Paper
                                </Label>
                                <Col md={9}>
                                    <Input
                                        type="file"
                                        name="questionPaper"
                                        id="questionPaper"
                                        // placeholder="enter register no."
                                        value={this.state.questionPaper}
                                            onChange={e => {
                                            this.setState({questionPaper: e.target.value})
                                            console.log(e.target.value);
                                            }
                                        }
                                    />
                                </Col>
                            </FormGroup>
                            
                            
                            <div className="text-right">
                                <Button className="pull-right" onClick={this.sendData} color="success">Upload</Button>
                            </div>                                        

                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <hr style={{height:"1px", color:"black", background:"black"}}/>

                <div class="row mt-5 mx-2">
                    <table className="table table-bordered" style={{border: "1px solid #000"}}>
                        <Row>
                            {console.log(this.state)}
                            <Col md={9}>
                                <h5 className="ml-3">Provide access to Question Paper for all Candidates</h5>
                            </Col>
                            <Col md={3}>
                                <CustomInput
                                    type="switch"
                                    id="exampleCustomSwitch"
                                    name="customSwitch"
                                    className="mt-2 mr-2 text-right"
                                    value={this.state.isQuestionPaperAvailable}
                                    onChange={e => {
                                        this.setState({isQuestionPaperAvailable: !this.state.isQuestionPaperAvailable
                                        })
                                        console.log(e.target.value);
                                        alert('Global State Changed')
                                    }
                                    }
                                    // label="Turn on this custom switch"
                                />  
                            </Col>
                        </Row>
                    </table>

                </div>

                
            </React.Fragment>
        );
    }
    
};

const RenderQuestionPaper = () => {
    return (
        <React.Fragment>
            {/* <h4 className="header-title">Question Paper</h4> */}
            <div className="all-page-container">
                <AllPagesPDFViewer pdf={samplePDF} />
            </div>
        </React.Fragment>
    );
};

    class QuestionPaper extends Component {
        constructor(props) {
            super(props);
            this.state = { activeTab: '1' };
            this.toggle = this.toggle.bind(this);
        }
    
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
                    title: 'Upload Question Paper',
                    icon: 'uil-home-alt',
                    text:
                        <GenerateAdmitCard/>
                },
                {
                    id: '2',
                    title: 'View Question Paper',
                    icon: 'uil-user',
                    text:
                        <RenderQuestionPaper/>
                },
            ];
    
            return (
                <React.Fragment>
                    <h3 className="header-title mb-3 mt-3">Question Paper</h3>
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

export default QuestionPaper;
