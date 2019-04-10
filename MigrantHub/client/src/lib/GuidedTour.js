import React from 'react';

export const pinServiceTour = [
    {
      selector: '[data-tut="reactour__iso"]',
      content: () => (
        <div>
          <h4 color="#e5e5e5">
            Welcome to MigrantHub Guided Tour
          </h4>
          <p color="#373737" size=".7em" style={{ marginTop: ".7em" }}>
            Let us show you how to pin a service!
          </p>
        </div>
      ),
    },
    {
        selector: '[data-tut="reactour__pinnedService"]',
        content: () => (
          <div>
          <h3>
            This is your pinned services dashboard
          </h3>
          <p>
            Let's start filling up this section!
          </p>
          </div>
        ),
      },
    {
      selector: '[data-tut="reactour__selectService"]',
      content: () => (
        <div>
          <h4 color="#e5e5e5">
            First: Browse our services
          </h4>
          <p color="#373737" size=".7em" style={{ marginTop: ".7em" }}>
            Click on Services
          </p>
        </div>
      ),
    },
    {
      selector: '[data-tut="reactour__selectAllServices"]',
      content: () => (
        <div>
          <p color="#373737" size=".7em" style={{ marginTop: ".7em" }}>
            Explore all services
          </p>
        </div>
      )
    },
    {
      selector: '[data-tut="reactour__serviceList"]',
      content: () => (
        <div>
        <h3>
          This is a list of all services.
        </h3>
        <p>
          You may return at any time to explore the service details
        </p>
        <p>For now, we will pin a service to our dashboard!</p>
        <p>Press Next! -></p>
        </div>
      ),
      position: "top"
    },
    {
      selector: '[data-tut="reactour__pinService"]',
      content: () => (
        <div>
        <h3>
          Pin a service!
        </h3>
        <p>
          Select the pin button inside the service card!
        </p>
        </div>
      ),
    },
    {
      selector: '[data-tut="reactour__returnToDashboard"]',
      content: () => (
        <div>
        <h3>
          Return to your Dashboard
        </h3>
        </div>
      ),
    },
    {
      selector: '[data-tut="reactour__pinnedService"]',
      content:
        "Congratulation! You have pinned an item"
    },
  ];

  export const viewServiceTour = [
    {
      selector: '[data-tut="reactour__iso"]',
      content: () => (
        <div>
          <h4 color="#e5e5e5">
            Welcome to MigrantHub Guided Tour
          </h4>
          <p color="#373737" size=".7em" style={{ marginTop: ".7em" }}>
            Let us show you how to view all services.
          </p>
        </div>
      ),
    },
    {
      selector: '[data-tut="reactour__selectService"]',
      content: () => (
        <div>
          <h4 color="#e5e5e5">
            First: Browse our service categories
          </h4>
          <p color="#373737" size=".7em" style={{ marginTop: ".7em" }}>
            Click on Services
          </p>
        </div>
      )
    },
    {
      selector: '[data-tut="reactour__selectAllServices"]',
      content: () => (
        <div>
          <p color="#373737" size=".7em" style={{ marginTop: ".7em" }}>
            Explore all services
          </p>
        </div>
      )
    },
    {
      selector: '[data-tut="reactour__serviceList"]',
      content: () => (
        <div>
        <h3>
          This is a list of all services.
        </h3>
        <p>
          You may click on any services to view more details!
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
            Welcome to MigrantHub Guided Tour
          </h4>
          <p color="#373737" size=".7em" style={{ marginTop: ".7em" }}>
            Let us show you how to create a service.
          </p>
        </div>
      ),
    },
    {
      selector: '[data-tut="reactour__selectService"]',
      content: () => (
        <div>
          <h4 color="#e5e5e5">
            Browse our services section
          </h4>
          <p color="#373737" size=".7em" style={{ marginTop: ".7em" }}>
            Click here
          </p>
        </div>
      )
    },
    {
      selector: '[data-tut="reactour__selectAllServices"]',
      content: () => (
        <div>
          <p color="#373737" size=".7em" style={{ marginTop: ".7em" }}>
            Explore all services
          </p>
        </div>
      )
    },
    {
      selector: '[data-tut="reactour__createServiceButton"]',
      content: () => (
        <div>
        <h3>
          Two Options?
        </h3>
        <p> 1. You may <b>create</b> your own service for other users to see!</p>
        <p> 2. If you haven't found the service you'd like, why not <b>suggest</b> one?</p>
        </div>
      ),
      position: "buttom"
    },
    {
        selector: '[data-tut="reactour__myAvatar"]',
        content: () => (
          <div>
          <h3>
            My Services
          </h3>
          <p> Once created, you may edit/view your own services by visiting <b>My services</b></p>
          </div>
        ),
    },
    {
      selector: '[data-tut="reactour__myServices"]',
      content: () => (
        <div>
        <h3>
          My Services
        </h3>
        <p> Once created, you may edit/view your own services by visiting <b>My services</b></p>
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
            Welcome to MigrantHub
          </h4>
          <p color="#373737" size=".7em" style={{ marginTop: ".7em" }}>
            Let us show you how to nagivate through our platform.
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
            Translate
          </h3>
          <p>
            Dont speak english? No problem, we got you covered!
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
            Our Sidebar provides many features
          </h4>
          <p color="#373737" size=".7em" style={{ marginTop: ".7em" }}>
            You may view all services, events and job postings.
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
            This is your personal dashboard!
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
             Recommended Services!
          </h4>
          <p>In this section, you will find our recommendation</p>
          <p>Those recommendation are based upon your profile progress, service ratings and other factors</p>
        </div>
        ),
        stepInteraction: false,
    },
    {
      selector: '[data-tut="reactour__pinnedService"]',
      content: () => (
        <div>
        <h4 color="#e5e5e5">
           Pinned services!
        </h4>
        <p>In this section, you will find your pinned services</p>
        <p> As you browse, pin the services that you like for quick access</p>
        </div>
        ),
        stepInteraction: false,
    },
    {
      selector: '[data-tut="reactour__jobs"]',
      content: () => (
        <div>
        <h4 color="#e5e5e5">
          Saved Jobs!
        </h4>
        <p>In this section, you will find your saved jobs</p>
        <p>Found a job posting that interest you? Save it to your dashboard!</p>
        </div>
      ),
      stepInteraction: false,
    },
    {
      selector: '[data-tut="reactour__searchBar"]',
      content: () => (
        <div>
        <h4 color="#e5e5e5">
            Our Search Bar!
        </h4>
          <p color="#373737" size=".7em" style={{ marginTop: ".7em" }}>
            You had something in mind? Go ahead and search our platform for services, jobs, events and more!
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
          Your profile
        </h3>
        <p>The higher your profile progress, the better our recommendation will be!</p>
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
            Guided Tour
          </h3>
          <p>Learn to nagivate through our platform with simple use cases</p>
          </div>
      ),
      position: "buttom",
      stepInteraction: false,
    },
  ];