// @flow
import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { modalify } from 'react-modalify';
import Highlight from 'react-highlight';
import 'highlight.js/styles/github.css';

const options = {
  modalStyles: {
    marginTop: '100px',
  },
};

export default class AlertBox extends Component {

  static askYesNo({ title, body, yes, no }) {
    return modalify(props => (
      <AlertBox title={title} yes={yes} no={no} {...props}>
        {body}
      </AlertBox>
    ), options)();
  }

  static error(error) {
    return modalify(props => (
      <AlertBox title={<i className="glyphicon glyphicon-exclamation-sign">Error</i>} yes={'ok'} {...props}>
        {error}
      </AlertBox>
    ), options)();
  }

  static viewJson({ title, json }) {
    const replacer = (k, v) => {
      if (typeof v === 'function') {
        return `function ${v.toString().replace(/{(.|\n)*/m, '').replace(/^function /, '')}{...}`;
      }
      return v;
    };
    return modalify(props => (
      <AlertBox title={title} yes={'ok'} {...props}>
        <Highlight className="androidstudio">
          {JSON.stringify(json, replacer, 2)}
        </Highlight>
      </AlertBox>
    ), options)();
  }

  constructor(props) {
    super(props);
    this.state = { show: true };
  }

  closeAndReturn(result) {
    this.setState({ show: false });
    this.props.close(result);
  }

  render() {
    const { yes, no } = this.props;

    return (
      <div>
        <Modal.Header>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {this.props.children}
        </Modal.Body>

        <Modal.Footer>
          {
            yes &&
              <Button
                onClick={this.closeAndReturn.bind(this, yes)}
                bsStyle="primary"
              >
                {yes}
              </Button>
          }
          {
            no &&
              <Button
                onClick={this.closeAndReturn.bind(this, no)}
              >
                {no}
              </Button>
          }
        </Modal.Footer>
      </div>
    );
  }

}

AlertBox.propTypes = {
  close: PropTypes.func.isRequired,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  yes: PropTypes.string,
  no: PropTypes.string,
  children: PropTypes.element,
};
