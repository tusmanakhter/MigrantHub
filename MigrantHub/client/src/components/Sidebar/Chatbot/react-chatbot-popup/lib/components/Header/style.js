'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _variables = require('../../styles/variables');

var styles = {
  header: {
    backgroundColor: _variables.colors.lightBlue,
    borderRadius: '5px 5px 0 0',
    color: _variables.colors.white,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    padding: '5px 10px 5px'
  },
  fullscreenHeader: {
    borderRadius: 0,
    flexShrink: 0,
    position: 'relative'
  },

  title: {
    fontSize: '24px',
    margin: 0,
    padding: '15px 0'
  },
  fullscreenTitle: {
    padding: '0 0 15px 0'
  },

  closeButton: {
    display: 'none'
  },
  closeIcon: {
    width: '15px',
    height: '15px'
  },
  fullscreenCloseButton: {
    backgroundColor: _variables.colors.turqois1,
    border: 0,
    display: 'block',
    position: 'absolute',
    right: '0px',
    top: '0',
    padding: '10px',
    width: '40px'
  },
  headerTitles: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
};

exports.default = styles;