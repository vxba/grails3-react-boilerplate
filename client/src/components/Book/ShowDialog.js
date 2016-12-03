import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import ModalForm from './ModalForm';
import * as api from '../../util/api';

/**
 * Show Domain class on a modal dialog.
 */
export default class ShowDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: null,
    };
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.selectedBookId !== this.props.selectedBookId) {
      const resp = await api.getBook(nextProps.selectedBookId);
      const json = await resp.json();
      this.setState({ formData: json });
    }
  }

  render() {
    const schema = {
      title: "Show Book",
      type: "object",
      required: ["title", "price"],
      properties: {
        title: {type: "string", title: "Title", default: "no title"},
        price: {type: "number", title: "Price", default: 0},
      },
    };

    const uiSchema = {
      "ui:readonly": true,
    };

    return (
      <ModalForm
        show={this.props.show}
        formData={this.state.formData}
        onClose={this.props.onClose}
        schema={schema}
        uiSchema={uiSchema}>
        <span>
          <Button bsStyle="primary" onClick={this.props.onEditButtonClicked}>Edit</Button>
          <Button onClick={this.props.onClose}>Close</Button>
        </span>
      </ModalForm>
    );
  }
}

ShowDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  selectedBookId: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};
