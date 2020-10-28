import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    Label,
    FormGroup,
    Button,
    Alert,
    InputGroup,
    InputGroupAddon,
    CustomInput,
} from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Mail, Lock, User } from 'react-feather';

import { registerUser } from '../../redux/actions';
import { isUserAuthenticated, registerUserFirebase } from '../../helpers/authUtils';
import { db } from '../../helpers/firebase';

import Loader from '../../components/Loader';
import logo from '../../assets/images/logo.png';

class Register extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.handleValidSubmit = this.handleValidSubmit.bind(this);

        this.state = {
            email: '',
            phone: '',
            fname: '',
            lname: '',
            password: '',
        };
    }

    // registerQuery = async (email, password, displayName) => {
    //     try {

    //         let input = this.state;

    //         var dataTest = db.collection('users').doc(firebase.auth().currentUser.uid);

    //         dataTest.set({
    //             "email": this.email,
    //             "password": this.phone,
    //             "fname": this.fname,
    //             "lname":this.lname,
    //             "role":1
    //         });

    //         window.location.reload();
    //     } catch (error) {
    //         console.log('here');
    //         console.log(error);
    //         alert(error.message);
    //     }
    // };

    componentDidMount() {
        this._isMounted = true;
        document.body.classList.add('authentication-bg');
    }

    componentWillUnmount() {
        this._isMounted = false;
        document.body.classList.remove('authentication-bg');
    }

    /**
     * Handles the submit
     */
    handleValidSubmit = (event, values) => {
        this.props.registerUser(values.fullname, values.email, values.password);
    };

    /**
     * Redirect to root
     */
    renderRedirectToRoot = () => {
        const isAuthTokenValid = isUserAuthenticated();
        if (isAuthTokenValid) {
            return <Redirect to="/" />;
        }
    };

    /**
     * Redirect to confirm
     */
    renderRedirectToConfirm = () => {
        return <Redirect to="/account/confirm" />;
    };

    registerUser = () => {
        registerUserFirebase(
            this.state.email,
            this.state.phone,
            this.state.fname,
            this.state.lname,
            this.state.password
        );
    };

    render() {
        const isAuthTokenValid = isUserAuthenticated();
        return (
            <React.Fragment>
                {this.renderRedirectToRoot()}

                {Object.keys(this.props.user || {}).length > 0 && this.renderRedirectToConfirm()}

                {(this._isMounted || !isAuthTokenValid) && (
                    <div className="account-pages mt-5 mb-5">
                        <Container>
                            <Row className="justify-content-center">
                                <Col xl={10}>
                                    <Card className="">
                                        <CardBody className="p-0">
                                            <Row>
                                                <Col md={6} className="p-5 position-relative">
                                                    {/* preloader */}
                                                    {this.props.loading && <Loader />}

                                                    <div className="mx-auto mb-5">
                                                        <a href="/">
                                                            <img src={logo} alt="" height="24" />
                                                            <h3 className="d-inline align-middle ml-1 text-logo">
                                                                Shreyu
                                                            </h3>
                                                        </a>
                                                    </div>

                                                    <h6 className="h5 mb-0 mt-4">Welcome back!</h6>
                                                    <p className="text-muted mt-1 mb-4">
                                                        Enter your email address and password to access admin panel.
                                                    </p>

                                                    {this.props.error && (
                                                        <Alert color="danger" isOpen={this.props.error ? true : false}>
                                                            <div>{this.props.error}</div>
                                                        </Alert>
                                                    )}

                                                    <AvForm className="authentication-form">
                                                        <AvGroup className="">
                                                            <Label for="fname">First Name</Label>
                                                            <InputGroup>
                                                                <InputGroupAddon addonType="prepend">
                                                                    <span className="input-group-text">
                                                                        <User className="icon-dual" />
                                                                    </span>
                                                                </InputGroupAddon>
                                                                <AvInput
                                                                    type="text"
                                                                    name="fname"
                                                                    id="fname"
                                                                    placeholder="Enter Name"
                                                                    required
                                                                    value={this.state.fname}
                                                                    onChange={(e) =>
                                                                        this.setState({ fname: e.target.value })
                                                                    }
                                                                />
                                                            </InputGroup>

                                                            <AvFeedback>This field is invalid</AvFeedback>
                                                        </AvGroup>
                                                        <AvGroup className="">
                                                            <Label for="lname">Last Name</Label>
                                                            <InputGroup>
                                                                <InputGroupAddon addonType="prepend">
                                                                    <span className="input-group-text">
                                                                        <Mail className="icon-dual" />
                                                                    </span>
                                                                </InputGroupAddon>
                                                                <AvInput
                                                                    type="lname"
                                                                    name="lname"
                                                                    id="lname"
                                                                    placeholder="Enter your last name"
                                                                    required
                                                                    value={this.state.lname}
                                                                    onChange={(e) =>
                                                                        this.setState({ lname: e.target.value })
                                                                    }
                                                                />
                                                            </InputGroup>

                                                            <AvFeedback>This field is invalid</AvFeedback>
                                                        </AvGroup>
                                                        <AvGroup className="mb-3">
                                                            <Label for="email">email</Label>
                                                            <InputGroup>
                                                                <InputGroupAddon addonType="prepend">
                                                                    <span className="input-group-text">
                                                                        <Lock className="icon-dual" />
                                                                    </span>
                                                                </InputGroupAddon>
                                                                <AvInput
                                                                    type="email"
                                                                    name="email"
                                                                    id="email"
                                                                    placeholder="Enter your email"
                                                                    required
                                                                    value={this.state.email}
                                                                    onChange={(e) =>
                                                                        this.setState({ email: e.target.value })
                                                                    }
                                                                />
                                                            </InputGroup>
                                                            <AvFeedback>This field is invalid</AvFeedback>
                                                        </AvGroup>

                                                        <AvGroup className="mb-3">
                                                            <Label for="phone">Phone</Label>
                                                            <InputGroup>
                                                                <InputGroupAddon addonType="prepend">
                                                                    <span className="input-group-text">
                                                                        <Lock className="icon-dual" />
                                                                    </span>
                                                                </InputGroupAddon>
                                                                <AvInput
                                                                    type="phone"
                                                                    name="phone"
                                                                    id="phone"
                                                                    placeholder="Enter your phone"
                                                                    required
                                                                    value={this.state.phone}
                                                                    onChange={(e) =>
                                                                        this.setState({ phone: e.target.value })
                                                                    }
                                                                />
                                                            </InputGroup>
                                                            <AvFeedback>This field is invalid</AvFeedback>
                                                        </AvGroup>

                                                        <AvGroup className="mb-3">
                                                            <Label for="password">Password</Label>
                                                            <InputGroup>
                                                                <InputGroupAddon addonType="prepend">
                                                                    <span className="input-group-text">
                                                                        <Lock className="icon-dual" />
                                                                    </span>
                                                                </InputGroupAddon>
                                                                <AvInput
                                                                    type="password"
                                                                    name="password"
                                                                    id="password"
                                                                    placeholder="Enter your password"
                                                                    required
                                                                    value={this.state.password}
                                                                    onChange={(e) =>
                                                                        this.setState({ password: e.target.value })
                                                                    }
                                                                />
                                                            </InputGroup>
                                                            <AvFeedback>This field is invalid</AvFeedback>
                                                        </AvGroup>

                                                        <AvGroup check className="mb-4">
                                                            <CustomInput
                                                                type="checkbox"
                                                                id="terms"
                                                                defaultChecked="true"
                                                                className="pl-1"
                                                                label="I accept Terms and Conditions"
                                                            />
                                                        </AvGroup>

                                                        <FormGroup
                                                            className="form-group mb-0 text-center"
                                                            onClick={this.registerUser}>
                                                            <Button color="primary" className="btn-block">
                                                                Sign Up
                                                            </Button>
                                                        </FormGroup>
                                                    </AvForm>
                                                </Col>

                                                <Col md={6} className="d-none d-md-inline-block">
                                                    <div className="auth-page-sidebar">
                                                        <div className="overlay"></div>
                                                        <div className="auth-user-testimonial">
                                                            <p className="font-size-24 font-weight-bold text-white mb-1">
                                                                I simply love it!
                                                            </p>
                                                            <p className="lead">
                                                                "It's a elegent templete. I love it very much!"
                                                            </p>
                                                            <p>- Admin User</p>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>

                            <Row className="mt-1">
                                <Col className="col-12 text-center">
                                    <p className="text-muted">
                                        Already have an account?{' '}
                                        <Link to="/account/login" className="text-primary font-weight-bold ml-1">
                                            Sign In
                                        </Link>
                                    </p>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const { user, loading, error } = state.Auth;
    return { user, loading, error };
};

export default connect(mapStateToProps, { registerUser })(Register);
