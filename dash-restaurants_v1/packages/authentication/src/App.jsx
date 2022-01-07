import React, { useState } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
//import { useTranslation } from "react-i18next";
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './services/ErrorFallback.jsx';
import ThemeSwitcher from 'react-css-vars';
import HomePage from './components/pages/HomePage/HomePage.jsx';
import PageNotFound from './components/pages/PageNotFound/PageNotFound.jsx';
import { themes } from './styles/themes';

const App = () => {
	const [theme, setTheme] = useState('default-light');

	const errorHandler = (error, errorInfo) => {
		console.log('Log error =>', error, errorInfo);
	};

	return (
		<ThemeSwitcher theme={theme != null ? themes[theme] : null} elementId="root">
			<ErrorBoundary FallbackComponent={ErrorFallback} onError={errorHandler}>
				<div className="authentication">
					<Router history={history}>
						<Switch>
							<Route path="/" component={HomePage} />
							<Route component={PageNotFound} />
						</Switch>
					</Router>
				</div>
			</ErrorBoundary>
		</ThemeSwitcher>
	);
};

export default App;
