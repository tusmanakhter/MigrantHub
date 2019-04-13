import React from 'react';
import { FormattedMessage } from 'react-intl';

export const statuses = [
  { value: 'open', label: <FormattedMessage id="open" /> },
  { value: 'closed', label: <FormattedMessage id="closed" /> },
  { value: 'resolved', label: <FormattedMessage id="resolved" /> },
  { value: 'unresolved', label: <FormattedMessage id="unresolved" /> },
  { value: 'duplicate', label: <FormattedMessage id="duplicate" /> },
  { value: 'ignore', label: <FormattedMessage id="ignore" /> },
];
