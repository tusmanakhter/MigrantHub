import React from 'react';
import { FormattedMessage } from 'react-intl';

  export const pinServiceTour = [
    {
      selector: '[data-tut="reactour__iso"]',
      content: () => (
        <div>
          <h4 color="#e5e5e5">
            <FormattedMessage id="tour.guidedTour.welcome" />
          </h4>
          <p color="#373737" size=".7em" style={{ marginTop: ".7em" }}>
            <FormattedMessage id="tour.pinServiceTour.1.1" />
          </p>
        </div>
      ),
    },
    {
      selector: '[data-tut="reactour__pinnedService"]',
      content: () => (
        <div>
          <h3>
           <FormattedMessage id="tour.pinServiceTour.2" />
          </h3>
          <p>
           <FormattedMessage id="tour.pinServiceTour.2.1" />
          </p>
        </div>
      ),
    },
    {
      selector: '[data-tut="reactour__selectService"]',
      content: () => (
        <div>
          <h4 color="#e5e5e5">
            <FormattedMessage id="tour.pinServiceTour.3" />
          </h4>
          <p color="#373737" size=".7em" style={{ marginTop: ".7em" }}>
            <FormattedMessage id="tour.pinServiceTour.3.1" />
          </p>
        </div>
      ),
    },
    {
      selector: '[data-tut="reactour__selectAllServices"]',
      content: () => (
        <div>
          <p color="#373737" size=".7em" style={{ marginTop: ".7em" }}>
            <FormattedMessage id="tour.pinServiceTour.4" />
          </p>
        </div>
      )
    },
    {
      selector: '[data-tut="reactour__serviceList"]',
      content: () => (
        <div>
          <h3>
            <FormattedMessage id="tour.pinServiceTour.5" />
          </h3>
          <p>
            <FormattedMessage id="tour.pinServiceTour.5.1" />
          </p>
          <p>
            <FormattedMessage id="tour.pinServiceTour.5.2" />
          </p>
          <p>
            <FormattedMessage id="tour.pinServiceTour.5.3" />
          </p>
        </div>
      ),
      position: "top"
    },
    {
      selector: '[data-tut="reactour__pinService"]',
      content: () => (
        <div>
          <h3>
            <FormattedMessage id="tour.pinServiceTour.6" />
          </h3>
          <p>
            <FormattedMessage id="tour.pinServiceTour.6.1" />
          </p>
        </div>
      ),
    },
    {
      selector: '[data-tut="reactour__returnToDashboard"]',
      content: () => (
        <div>
          <h3>
            <FormattedMessage id="tour.pinServiceTour.7" />
          </h3>
        </div>
      ),
    },
    {
      selector: '[data-tut="reactour__pinnedService"]',
      content: () => (
        <div>
          <h3>
            <FormattedMessage id="tour.pinServiceTour.8" />
          </h3>
          <p>
            <FormattedMessage id="tour.pinServiceTour.8.1" />
          </p>
        </div>
      ),
    },
  ];

  export const viewServiceTour = [
    {
      selector: '[data-tut="reactour__iso"]',
      content: () => (
        <div>
          <h4 color="#e5e5e5">
            <FormattedMessage id="tour.guidedTour.welcome" />
          </h4>
          <p color="#373737" size=".7em" style={{ marginTop: ".7em" }}>
            <FormattedMessage id="tour.viewServiceTour.1.1" />
          </p>
        </div>
      ),
    },
    {
      selector: '[data-tut="reactour__selectService"]',
      content: () => (
        <div>
          <h4 color="#e5e5e5">
            <FormattedMessage id="tour.viewServiceTour.2" />
          </h4>
          <p color="#373737" size=".7em" style={{ marginTop: ".7em" }}>
            <FormattedMessage id="tour.viewServiceTour.2.1" />
          </p>
        </div>
      )
    },
    {
      selector: '[data-tut="reactour__selectAllServices"]',
      content: () => (
        <div>
          <p color="#373737" size=".7em" style={{ marginTop: ".7em" }}>
            <FormattedMessage id="tour.viewServiceTour.3" />
          </p>
        </div>
      )
    },
    {
      selector: '[data-tut="reactour__serviceList"]',
      content: () => (
        <div>
          <h3>
            <FormattedMessage id="tour.viewServiceTour.4" />
          </h3>
          <p>
            <FormattedMessage id="tour.viewServiceTour.4.1" />
          </p>
        </div>
      ),
      position: "top"
    }
  ];

  export const createServiceTour = [
    {
      selector: '[data-tut="reactour__iso"]',
      content: () => (
        <div>
          <h4 color="#e5e5e5">
            <FormattedMessage id="tour.guidedTour.welcome" />
          </h4>
          <p color="#373737" size=".7em" style={{ marginTop: ".7em" }}>
            <FormattedMessage id="tour.createServiceTour.1.1" />
          </p>
        </div>
      ),
    },
    {
      selector: '[data-tut="reactour__selectService"]',
      content: () => (
        <div>
          <h4 color="#e5e5e5">
            <FormattedMessage id="tour.createServiceTour.2" />
          </h4>
          <p color="#373737" size=".7em" style={{ marginTop: ".7em" }}>
            <FormattedMessage id="tour.createServiceTour.2.1" />
          </p>
        </div>
      )
    },
    {
      selector: '[data-tut="reactour__selectAllServices"]',
      content: () => (
        <div>
          <p color="#373737" size=".7em" style={{ marginTop: ".7em" }}>
            <FormattedMessage id="tour.createServiceTour.3" />
          </p>
        </div>
      )
    },
    {
      selector: '[data-tut="reactour__createServiceButton"]',
      content: () => (
        <div>
          <h3>
            <FormattedMessage id="tour.createServiceTour.4" />
          </h3>
          <p>
            <FormattedMessage id="tour.createServiceTour.4.1" />
          </p>
          <p>
            <FormattedMessage id="tour.createServiceTour.4.2" />
          </p>
        </div>
      ),
      position: "buttom"
    },
    {
      selector: '[data-tut="reactour__myAvatar"]',
      content: () => (
        <div>
          <h3>
            <FormattedMessage id="tour.createServiceTour.5" />
          </h3>
          <p>
            <FormattedMessage id="tour.createServiceTour.5.1" />
          </p>
        </div>
      ),
    },
    {
      selector: '[data-tut="reactour__myServices"]',
      content: () => (
        <div>
        <h3>
          <FormattedMessage id="tour.createServiceTour.5" />
        </h3>
        <p>
          <FormattedMessage id="tour.createServiceTour.5.1" />
        </p>
        </div>
      ),
    }
  ];

  export const mainTour = [
    {
      selector: '[data-tut="reactour__iso"]',
      content: () => (
        <div>
          <h4 color="#e5e5e5">
            <FormattedMessage id="tour.guidedTour.welcome" />
          </h4>
          <p color="#373737" size=".7em" style={{ marginTop: ".7em" }}>
            <FormattedMessage id="tour.mainTour.1.1" />
          </p>
        </div>
      ),
      stepInteraction: false,
    },
    {
      selector: '[data-tut="reactour__translate"]',
      content: () => (
        <div>
          <h3>
            <FormattedMessage id="tour.mainTour.2" />
          </h3>
          <p>
            <FormattedMessage id="tour.mainTour.2.1" />
          </p>
        </div>
      ),
      stepInteraction: false,
    },
    {
      selector: '[data-tut="reactour__sidebar"]',
      content: () => (
        <div>
          <h4 color="#e5e5e5">
            <FormattedMessage id="tour.mainTour.3" />
          </h4>
          <p color="#373737" size=".7em" style={{ marginTop: ".7em" }}>
            <FormattedMessage id="tour.mainTour.3.1" />
          </p>
        </div>
      ),
      stepInteraction: false,
    },
    {
      selector: '[data-tut="reactour__dashboard"]',
      content: () => (
        <div>
          <h4 color="#e5e5e5">
            <FormattedMessage id="tour.mainTour.4" />
          </h4>
        </div>
      ),
      stepInteraction: false,
    },
    {
      selector: '[data-tut="reactour__recommendedServices"]',
      content: () => (
        <div>
          <h4 color="#e5e5e5">
            <FormattedMessage id="tour.mainTour.5" />
          </h4>
          <p>
            <FormattedMessage id="tour.mainTour.5.1" />
          </p>
          <p>
            <FormattedMessage id="tour.mainTour.5.2" />
          </p>
        </div>
      ),
      stepInteraction: false,
    },
    {
      selector: '[data-tut="reactour__pinnedService"]',
      content: () => (
        <div>
          <h4 color="#e5e5e5">
            <FormattedMessage id="tour.mainTour.6" />
          </h4>
          <p>
            <FormattedMessage id="tour.mainTour.6.1" />
          </p>
          <p>
            <FormattedMessage id="tour.mainTour.6.2" />
          </p>
        </div>
      ),
      stepInteraction: false,
    },
    {
      selector: '[data-tut="reactour__jobs"]',
      content: () => (
        <div>
          <h4 color="#e5e5e5">
            <FormattedMessage id="tour.mainTour.7" />
          </h4>
          <p>
            <FormattedMessage id="tour.mainTour.7.1" />
          </p>
          <p>
            <FormattedMessage id="tour.mainTour.7.2" />
          </p>
        </div>
      ),
      stepInteraction: false,
    },
    {
      selector: '[data-tut="reactour__searchBar"]',
      content: () => (
        <div>
          <h4 color="#e5e5e5">
            <FormattedMessage id="tour.mainTour.8" />
          </h4>
          <p color="#373737" size=".7em" style={{ marginTop: ".7em" }}>
            <FormattedMessage id="tour.mainTour.8.1" />
          </p>
        </div>
      ),
      stepInteraction: false,
    },
    {
      selector: '[data-tut="reactour__myProfile"]',
      content: () => (
        <div>
          <h3>
            <FormattedMessage id="tour.mainTour.9" />
          </h3>
          <p>
            <FormattedMessage id="tour.mainTour.9.1" />
          </p>
        </div>
      ),
      position: "buttom",
      stepInteraction: false,
    },
    {
      selector: '[data-tut="reactour__onboarding"]',
      content: () => (
        <div>
          <h3>
            <FormattedMessage id="tour.mainTour.10" />
          </h3>
          <p>
            <FormattedMessage id="tour.mainTour.10.1" />
          </p>
        </div>
      ),
      position: "buttom",
      stepInteraction: false,
    },
  ];