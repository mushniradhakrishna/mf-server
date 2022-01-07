import React, { lazy, Suspense, useState } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
//import { useTranslation } from "react-i18next";
import { createBrowserHistory } from 'history';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './services/ErrorFallback.jsx';
import ThemeSwitcher from 'react-css-vars';
import Progress from './components/molecules/Progress.jsx';
import Header from './components/organisms/Header/Header.jsx';
import PageNotFound from './components/pages/PageNotFound/PageNotFound.jsx';
import { themes } from './styles/themes';

const AuthLazy = lazy(() => import('./components/templates/AuthApp'));
const OrdersLazy = lazy(() => import('./components/templates/OrdersApp'));

const history = createBrowserHistory();

const App = () => {
	const [theme, setTheme] = useState('default-light');

	const errorHandler = (error, errorInfo) => {
		console.log('Log error =>', error, errorInfo);
	};

	return (
		<ThemeSwitcher theme={theme != null ? themes[theme] : null} elementId="root">
			<ErrorBoundary FallbackComponent={ErrorFallback} onError={errorHandler}>
				<Router history={history}>
					<div className="container">
						<Header />
						<Suspense fallback={<Progress />}>
							<Switch>
								<Route path="/orders">
									<OrdersLazy />
								</Route>
								<Route path="/">
									<AuthLazy />
								</Route>
								<Route component={PageNotFound} />
							</Switch>
						</Suspense>
					</div>
				</Router>
			</ErrorBoundary>
		</ThemeSwitcher>
	);
};

export default App;
