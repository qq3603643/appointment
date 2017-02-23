import React from 'react';
import ReactDom from 'react-dom';

import store from './store/store.jsx';
import App from './components/App.jsx';

const app_render = () =>
{
	ReactDom.render(
		<App store = { store }/>,
		document.querySelector('#root')
		);
}

app_render();
store.subscribe(app_render);