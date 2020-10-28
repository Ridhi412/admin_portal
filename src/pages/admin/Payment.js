import React, { Component } from 'react';
import { Row, Col, Card, CardBody, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

const TableRow = ({id, title, priority, type, complete, remove}) => (
	<tr>
	  <td className="remove">
		  <button type="button" class="btn btn-secondary" href="#" onClick={() => remove(id)}>Approve</button>
	  </td>
	  <td>{id}</td>
	  <td>{title}</td>
	  <td>{priority}</td>
	  <td>{type}</td>    
	  <td>{complete}</td>    
	</tr>
  );
  
  class PendingTable extends React.Component {
	state = {
	  data: [
		{id: 403, title: 'Task 403', priority: 'High', type: 'Improvement', complete: 100}, 
		{id: 532, title: 'Task 532', priority: 'Medium', type: 'Improvement', complete: 30}, 
		{id: 240, title: 'Task 240', priority: 'High', type: 'Story', complete: 66},
		],
	  }; 

	remove = (rowId) => {
	  const arrayCopy = this.state.data.filter((row) => row.id !== rowId);
	  this.setState({data: arrayCopy});
	};
	  
	render() {
	  const rows = this.state.data.map( (rowData) => <TableRow remove={this.remove} {...rowData } />);
  
	  return (
		<table className="table">
		  <thead>
			<th className="remove"></th>
			<th>ID</th>
			<th>Title</th>
			<th>Priority</th>
			<th>Issue Type</th>
			<th>% Complete</th>
		  </thead>
		  <tbody>
			{rows}
		  </tbody>
		</table>
	  );
	}
  }
  

class Payment extends Component {
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
                title: 'Pending Offline Transactions',
                icon: 'uil-home-alt',
                text:
                    <PendingTable/>
            },
            {
                id: '2',
                title: 'Successful Transactions',
                icon: 'uil-user',
                text:
                    'Profile - Food truck quinoa dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.',
            },
        ];

        return (
            <React.Fragment>
                <Row>
				<h3 className="header-title mb-3 mt-3">Payment Details</h3>

                    <Col lg={12}>
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
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default Payment;
