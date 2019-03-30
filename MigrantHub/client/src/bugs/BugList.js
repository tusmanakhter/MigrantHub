import React, { Component } from 'react';
import ReactTable from 'react-table';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import DetailIcon from '@material-ui/icons/Search';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import 'react-table/react-table.css';

class BugList extends Component {
  constructor(props) {
    super(props);

    this.state = { bugs: [] };
  }

  componentDidMount() {
    this.getBugs();
  }

  getBugs() {
    axios.get('/api/bugs/').then((response) => {
      if (response.status === 200) {
        this.setState({
          bugs: response.data,
        });
      }
    });
  }

  handleViewBug = (id) => {
    axios.delete(`/api/admins/${id}`)
      .then((response) => {
        if (response.status === 200) {
          this.getUsers();
        }
      });
  };

  render() {
    const { bugs } = this.state;
    const { intl } = this.props;

    const columns = [{
      Header: <FormattedMessage id="bug.title" />,
      accessor: 'bugName',
    }, {
      Header: <FormattedMessage id="bug.date" />,
      accessor: 'dateCreated',
    }, {
      id: 'modify',
      Header: <FormattedMessage id="Actions" />,
      accessor: row => row,
      Cell: ({ value }) => (
        <div>
          {(
            <IconButton aria-label="view" onClick={() => this.handleViewBug(value._id)}>
              <DetailIcon />
            </IconButton>
          )}
        </div>
      ),
    }];

    return (
      <React.Fragment>
        <ReactTable
          data={bugs}
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

BugList.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(BugList);
