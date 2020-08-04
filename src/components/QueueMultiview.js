import React from 'react';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Table,
} from 'reactstrap';

import InQueueMini from '../components/InQueueMini.js';
import graphQLFetch from '../GraphQLFetch.js';
import Expandable from './Expandable.js';

class QueueMultiview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queueHistory: [],
    };
    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const queryForItems = `query {
      itemMany(filter:{
          status: Complete,
          user: "${this.props.userId}",
      }) {
       _id
      }
    }`;

    const queryForQueue = `query {
      queueMany(filter:{
        status: Closed,
        items:[{
          user: "${this.props.userId}",
          status: Complete
        }]
      }) {
        title
      }
    }`;

    const data = await graphQLFetch(queryForItems);
    console.log(data);
    if (data.itemMany.length > 0) {
      const queueData = await graphQLFetch(queryForQueue);
      console.log(queueData);
      const queueHistory = [];
      queueData.queueMany.forEach((queue) => {
        queueHistory.push(queue);
      });
      this.setState({
        queueHistory,
      });
    }
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle tag='h5'>My Queue History</CardTitle>
        </CardHeader>
        <CardBody>
          <Table hover>
            <tbody>
              <tr>
                <td>
                  <InQueueMini queue={this.state.queueHistory[0]} />
                </td>
              </tr>
              <tr>
                <td>
                  <InQueueMini queue={this.state.queueHistory[1]} />
                </td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
        <CardFooter>
          <Expandable />
        </CardFooter>
      </Card>
    );
  }
}

export default QueueMultiview;
