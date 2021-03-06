import React, { useState } from 'react';
import {
  Collapse,
  Button,
  Table,
  Badge,
  UncontrolledTooltip,
} from 'reactstrap';

const ExpandableTable = (props) => {
  const [collapse, setCollapse] = useState(false);
  const [status, setStatus] = useState('Closed');

  const onEntering = () => setStatus('Opening...');

  const onEntered = () => setStatus('Opened');

  const onExiting = () => setStatus('Closing...');

  const onExited = () => setStatus('Closed');

  const onServing = (itemId, email, name) => {
    props.serveUser(props._id, props.title, itemId, email, name);
  };

  const markCompleted = (itemId, email, name) => {
    props.markUserCompleted(props._id, props.title, itemId, email, name);
  };

  const toggle = () => setCollapse(!collapse);

  return (
    <div>
      <Button color='primary' onClick={toggle} style={{ marginBottom: '1rem' }}>
        Table View
      </Button>
      <Collapse
        isOpen={collapse}
        onEntering={onEntering}
        onEntered={onEntered}
        onExiting={onExiting}
        onExited={onExited}
      >
        <Table responsive hover>
          <thead className='text-primary'>
            <tr>
              <th>Position</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              {/* No phone number functionality at the moment - Tim
              <th>Phone</th> */}
              {/* No remaining time calculation for now - Tim */}
              {/* <th className='text-right'>Time Remaining</th> */}
              <th className='text-right'>Actions</th>
            </tr>
          </thead>
          <tbody key='tbody'>
            {props.items.length === 0 ? (
              <tr>
                <td>
                  <h6>No participants enqueued!</h6>
                </td>
              </tr>
            ) : (
              props.items
                // Tim: Removed status so that queue creator sees all queue items
                // .filter((item) => {
                //   return item.status === 'Waiting' || item.status === 'Serving';
                // })
                .map((item, i) => {
                  return [item, props.createdUsers[i]];
                })
                .map((zipped, i) => {
                  return [
                    <tr key={'row' + i}>
                      <td key={'postion' + i}>{i + 1}</td>
                      <td key={'username' + i}>{zipped[1].username}</td>
                      <td key={'email' + i}>{zipped[1].email}</td>
                      <td key={'status' + i}>{zipped[0].status}</td>
                      {/* No phone number functionality at the moment - Tim*/}
                      {/* <td>(555) 555-5555</td> */}
                      {/* No remaining time calculation for now - Tim */}
                      {/* <td className='text-right' key={'time estimate' + i}>
                        {(i + 1) * 5} mins
                      </td> */}
                      <td className='text-right' key={'buttons' + i}>
                        <Badge
                          style={{ marginRight: 10, cursor: 'pointer' }}
                          color='success'
                          id='serving'
                          key={'serving badge' + i}
                          onClick={() =>
                            onServing(
                              zipped[0]._id,
                              zipped[1].email,
                              zipped[1].username
                            )
                          }
                        >
                          <UncontrolledTooltip
                            key={'tooltip serving icon' + i}
                            placement='bottom'
                            target='serving'
                          >
                            Mark Serving Now
                          </UncontrolledTooltip>
                          <i
                            key={'servingicon' + i}
                            className='nc-icon nc-check-2'
                          />
                        </Badge>
                        <Badge
                          key={'completebadge' + i}
                          color='danger'
                          id='complete'
                          onClick={() =>
                            markCompleted(
                              zipped[0]._id,
                              zipped[1].email,
                              zipped[1].username
                            )
                          }
                          style={{ cursor: 'pointer' }}
                        >
                          <UncontrolledTooltip
                            key={'completetooltip' + i}
                            placement='bottom'
                            target='complete'
                          >
                            Mark Participant as Complete
                          </UncontrolledTooltip>
                          <i
                            key={'removeicon' + i}
                            className='nc-icon nc-simple-remove'
                          />
                        </Badge>
                      </td>
                    </tr>,
                  ];
                })
            )}
          </tbody>
        </Table>
      </Collapse>
    </div>
  );
};

export default ExpandableTable;
