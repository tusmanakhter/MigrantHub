import React from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { IntlProvider, addLocaleData } from 'react-intl';
import localesEN from 'react-intl/locale-data/en';
import localesFR from 'react-intl/locale-data/fr';
import messagesEN from 'locales/en.json';
import messagesFR from 'locales/fr.json';
import { withCookies, Cookies } from 'react-cookie';
import moment from 'moment';
import 'moment/locale/fr';

addLocaleData([...localesEN, ...localesFR]);

const { Provider, Consumer } = React.createContext();

class IntlProviderWrapper extends React.Component {
  constructor(props) {
    super(props);

    const { cookies } = props;

    this.switchToEnglish = () => {
      cookies.set('locale', 'en', { path: '/' });
      moment.locale('en');
      this.setState(
        { locale: 'en', messages: messagesEN },
      );
    };

    this.switchToFrench = () => {
      cookies.set('locale', 'fr', { path: '/' });
      moment.locale('fr');
      this.setState(
        { locale: 'fr', messages: messagesFR },
      );
    };

    let locale = cookies.get('locale');
    if (!locale) {
      cookies.set('locale', 'en', { path: '/' });
      locale = 'en';
    }
    moment.locale(locale);

    let messages = messagesEN;
    if (locale === 'fr') {
      messages = messagesFR;
    }

    this.state = {
      locale,
      messages,
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
  cookies: instanceOf(Cookies).isRequired,
};

const WrappedIntlProvider = withCookies(IntlProviderWrapper);
export { WrappedIntlProvider as IntlProvider, Consumer as IntlConsumer };
