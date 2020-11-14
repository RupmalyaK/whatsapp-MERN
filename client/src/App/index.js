import React, { Component, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from '../layout/default';
import Loader from '../components/Loader';
import ScrollToTop from '../components/ScrollToTop';

import Aux from '../hoc/_Aux';

class App extends Component {
	render() {
		return (
			<Aux>
				<ScrollToTop>
					<Suspense fallback={<Loader />}>
						<Switch>
							<Route path="/" component={Layout} />
						</Switch>
					</Suspense>
				</ScrollToTop>
			</Aux>
		);
	}
}

export default App;