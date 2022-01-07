import React from 'react';
import { PropTypes } from 'prop-types';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
	return (
		<div>
			<p>Something went wrong:</p>
			<pre>{error.message}</pre>
			<button onClick={resetErrorBoundary}>Try again</button>
		</div>
	);
};

ErrorFallback.propTypes = {
	error: PropTypes.object.isRequired,
	resetErrorBoundary: PropTypes.func.isRequired,
};

export default ErrorFallback;
