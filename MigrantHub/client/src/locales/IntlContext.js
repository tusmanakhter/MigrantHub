import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, addLocaleData } from 'react-intl';
import localesEN from 'react-intl/locale-data/en';
import localesFR from 'react-intl/locale-data/fr';
import messagesEN from 'locales/en.json';
import messagesFR from 'locales/fr.json';

addLocaleData([...localesEN, ...localesFR]);

const { Provider, Consumer } = React.createContext();

class IntlProviderWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.switchToEnglish = () => this.setState({ locale: 'en', messages: messagesEN });
    this.switchToFrench = () => this.setState({ locale: 'fr', messages: messagesFR });

    this.state = {
      locale: 'en',
      messages: messagesEN,
      switchToEnglish: this.switchToEnglish, 
      switchToFrench: this.switchToFrench,
    };
  }

  render() {
    const { children } = this.props;
    const { locale, messages } = this.state;
    return (
      <Provider value={this.state}>
        <IntlProvider
          key={locale}
          locale={locale}
          messages={messages}
          defaultLocale="en"
        >
          {children}
        </IntlProvider>
      </Provider>
    );
  }
}

IntlProviderWrapper.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export { IntlProviderWrapper as IntlProvider, Consumer as IntlConsumer };
