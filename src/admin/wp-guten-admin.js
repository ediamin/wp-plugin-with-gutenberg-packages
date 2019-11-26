/**
 * WordPress dependencies
 */
import { render } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './style.scss';
import App from './App';

render(
    <App />,
    document.getElementById( 'wp-guten' )
);
