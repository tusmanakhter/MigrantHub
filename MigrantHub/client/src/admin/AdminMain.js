import React, { Component } from 'react';
import ReactTable from 'react-table';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/fr';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import RestoreIcon from '@material-ui/icons/Restore';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import 'react-table/react-table.css';

class AdminMain extends Component {
  constructor(props) {
    super(props);

    this.state = { users: [] };
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    axios.get('/api/admins/all').then((response) => {
      if (response.status === 200) {
        this.setState({
          users: response.data,
        });
      }
    });
  }

  handleDelete = (id) => {
    axios.delete(`/api/admins/${id}`)
      .then((response) => {
        if (response.status === 200) {
          this.getUsers();
        }
      });
  };

  handleAccept = (id) => {
    axios.put(`/api/admins/${id}/approve`)
      .then((response) => {
        if (response.status === 200) {
          this.getUsers();
        }
      });
  };

  handleReject = (id) => {
    axios.put(`/api/admins/${id}/reject`)
      .then((response) => {
        if (response.status === 200) {
          this.getUsers();
        }
      });
  };

  handleReactivate = (id) => {
    axios.put(`/api/admins/${id}/reactivate`)
      .then((response) => {
        if (response.status === 200) {
          this.getUsers();
        }
      });
  };

  render() {
    const { users } = this.state;
    const { intl } = this.props;

    const columns = [{
      Header: <FormattedMessage id="email" />,
      accessor: 'email',
    }, {
      Header: <FormattedMessage id="authorized" />,
      accessor: 'authorized',
      Cell: ({ value }) => {
        if (value) {
          return <FormattedMessage id="yes" />;
        }
        return <FormattedMessage id="no" />;
      },
    }, {
      Header: <FormattedMessage id="rejected" />,
      accessor: 'rejected',
      Cell: ({ value }) => {
        if (value) {
          return <FormattedMessage id="yes" />;
        }
        return <FormattedMessage id="no" />;
      },
    }, {
      Header: <FormattedMessage id="rejectedDate" />,
      accessor: 'rejectedDate',
      Cell: ({ value }) => {
        moment.locale(intl.locale);
        if (value) {
          return moment(value).format('ll');
        }
        return '';
      },
    }, {
      Header: <FormattedMessage id="deleted" />,
      accessor: 'deleted',
      Cell: ({ value }) => {
        if (value) {
          return <FormattedMessage id="yes" />;
        }
        return <FormattedMessage id="no" />;
      },
    }, {
      Header: <FormattedMessage id="deletedDate" />,
      accessor: 'deletedDate',
      Cell: ({ value }) => {
        moment.locale(intl.locale);
        if (value) {
          return moment(value).format('ll');
        }
        return '';
      },
    }, {
      id: 'modify',
      Header: <FormattedMessage id="Actions" />,
      accessor: row => row,
      Cell: ({ value }) => (
        <div>
          {((value.authorized === false || value.rejected === true) && value.deleted === false) && (
            <IconButton aria-label="accept" onClick={() => this.handleAccept(value._id)}>
              <CheckIcon />
            </IconButton>
          )}
          {(value.authorized === false && value.rejected === false && value.deleted === false) && (
            <IconButton aria-label="reject" onClick={() => this.handleReject(value._id)}>
              <CloseIcon />
            </IconButton>
          )}
          {(value.authorized === true && value.deleted === false) && (
            <IconButton aria-label="delete" onClick={() => this.handleDelete(value._id)}>
              <DeleteIcon />
            </IconButton>
          )}
          {value.deleted === true && (
            <IconButton aria-label="reactivate" onClick={() => this.handleReactivate(value._id)}>
              <RestoreIcon />
            </IconButton>
          )}
        </div>
      ),
    }];

    return (
      <React.Fragment>
        <ReactTable
          data={users}
          columns={columns}
          previousText={<FormattedMessage id="table.previous" />}
          nextText={<FormattedMessage id="table.next" />}
          loadingText={<FormattedMessage id="table.loading" />}
          ofText={<FormattedMessage id="table.of" />}
          rowsText={intl.formatMessage({ id: 'table.rows' })}
          noDataText={<FormattedMessage id="table.noData" />}
        />
      </React.Fragment>
    );
  }
}

AdminMain.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(AdminMain);
