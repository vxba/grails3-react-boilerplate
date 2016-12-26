import React, { Component, PropTypes } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css';

class ModifiedBootstrapTable extends BootstrapTable {

  deleteSelected(callBack) {
    const selectedIds = this.store.getSelectedRowKeys();
    callBack(selectedIds);
    this.store.setSelectedRowKey([]);
  }

  render() {
    const result = super.render();
    return result;
  }
}

export default class Table extends Component {

  handleDeleteButtonClicked() {
    // eslint-disable-next-line
    this.refs.table.deleteSelected(
      ids => this.props.onDeleteButtonClicked(ids), // call delete API
    );
  }

  render() {
    const { tableData, onRowClicked, onCreateButtonClicked, onRefreshButtonClicked } = this.props;

    const Buttons = (
      <div style={{ marginLeft: 10 }}>
        <ButtonGroup>
          <Button onClick={onCreateButtonClicked}>
            <i className="glyphicon glyphicon-plus" />
            Create
          </Button>
          <Button onClick={this.handleDeleteButtonClicked.bind(this)}>
            <i className="glyphicon glyphicon-trash" />
            Delete
          </Button>
          <Button onClick={onRefreshButtonClicked}>
            <i className="glyphicon glyphicon-refresh" />
            Refresh
          </Button>
        </ButtonGroup>
      </div>
    );

    function resolveHeader(schema) {
      const result = Object.keys(schema.properties).filter(elem => elem !== 'version');
      return result;
    }

    const Header = (
      resolveHeader(this.props.schema).map(
        elem => (
          <TableHeaderColumn
            dataField={elem}
            dataSort
            isKey={elem === 'id'}
            {... ((elem === 'id') ? { width: '50%' } : {})}
            key={elem}
          >
            {elem}
          </TableHeaderColumn>))
    );

    return (
      <div>
        {Buttons}
        <ModifiedBootstrapTable
          // eslint-disable-next-line
          ref="table"
          data={tableData}
          hover
          condensed
          pagination
          selectRow={{
            mode: 'checkbox',
            bgColor: 'rgb(238, 193, 213)',
          }}
          options={{
            onRowClick: onRowClicked,
            sizePerPage: 20,
            sizePerPageList: [20, 30, 40],
          }}
        >
          {Header}
        </ModifiedBootstrapTable>
      </div>
    );
  }
}

Table.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object),
  onRowClicked: PropTypes.func,
  onCreateButtonClicked: PropTypes.func,
  onDeleteButtonClicked: PropTypes.func,
  onRefreshButtonClicked: PropTypes.func,
  schema: PropTypes.shape({
    properties: PropTypes.object,
  }).isRequired,
};
