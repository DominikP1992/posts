import React from 'react';
import PropTypes from 'prop-types';

const App = ({ children }) => <div>{children}</div>;

App.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
};

export default App;
