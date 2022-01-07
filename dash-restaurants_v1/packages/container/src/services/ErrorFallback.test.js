import React from 'react';
import { mount } from 'enzyme';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback.jsx';

describe('ErrorBoundary', () => {
	it('should show the fallback when there is an error', () => {
		const ComponentWithError = () => null;

		const wrapper = mount(
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<ComponentWithError />
			</ErrorBoundary>,
		);

		const error = new Error('test');

		wrapper.find(ComponentWithError).simulateError(error);

		expect(wrapper.find(ErrorFallback).length).toBe(1);
		//console.log(wrapper.debug());
	});
});
