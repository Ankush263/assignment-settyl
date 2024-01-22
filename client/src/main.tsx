import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '@mantine/core/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';
import HomePage from './components/HomePage.tsx';

const theme = createTheme({
	/** Put your mantine theme override here */
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<MantineProvider theme={theme}>
			<Router>
				<Switch>
					<Route path="/" exact>
						<HomePage />
					</Route>
					<Route path="/documents/:id">
						<App />
					</Route>
				</Switch>
			</Router>
		</MantineProvider>
	</React.StrictMode>
);
