import React from 'react';
import { withRouter } from 'react-router';

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0)
      if (window.$ !== undefined) {
        const page = window.$('#root').length ? window.$('#root') : (window.$('#app').length ? window.$('#app') : null)
        if (page) {
          page.animate({ scrollTop: 0 }, 100);
        }
      }
    }
  }

  render() {
    return this.props.children
  }
}

export default withRouter(ScrollToTop);