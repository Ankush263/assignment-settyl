import { Box } from '@mantine/core';
import { fetchToken } from '../api/token';
import Home from './Home';
import AuthComponent from './auth/AuthComponent';

function HomePage() {
	return <Box>{fetchToken() === null ? <AuthComponent /> : <Home />}</Box>;
}

export default HomePage;
