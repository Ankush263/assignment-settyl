import { Button, Flex, TextInput, rem, Text } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import { useState } from 'react';
import { login, signup } from '../../api';

function AuthComponent() {
	const [signedup, setSignUp] = useState<boolean>(false);
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const handleLogin = async () => {
		try {
			const res = await login({ email, password });
			const token = res.data.token;
			const expire =
				new Date().getTime() + Number(import.meta.env.VITE_TOKEN_EXPIRE_TIME);
			localStorage.setItem(
				'Token',
				JSON.stringify({ value: `${token}`, expires: expire })
			);
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	const handleSignup = async () => {
		try {
			const res = await signup({ email, password });
			const token = res.data.token;
			const expire =
				new Date().getTime() + Number(import.meta.env.VITE_TOKEN_EXPIRE_TIME);
			localStorage.setItem(
				'Token',
				JSON.stringify({ value: `${token}`, expires: expire })
			);
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	const icon = <IconAt style={{ width: rem(16), height: rem(16) }} />;
	return (
		<>
			{signedup ? (
				<Flex direction={'column'} justify={'center'} align={'center'} mt={20}>
					<Text fz={18} fw={500}>
						Signup
					</Text>
					<TextInput
						leftSectionPointerEvents="none"
						leftSection={icon}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						label="Email"
						placeholder="Your email"
						w={300}
					/>
					<TextInput
						leftSectionPointerEvents="none"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						label="Password"
						type="password"
						placeholder="Your password"
						w={300}
					/>
					<Button w={300} mt={10} onClick={handleSignup}>
						Signup
					</Button>
					<Text
						style={{ cursor: 'pointer' }}
						onClick={() => setSignUp(false)}
					>{`Click here to Login>`}</Text>
				</Flex>
			) : (
				<Flex direction={'column'} justify={'center'} align={'center'} mt={20}>
					<Text fz={18} fw={500}>
						Login
					</Text>
					<TextInput
						leftSectionPointerEvents="none"
						leftSection={icon}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						label="Email"
						placeholder="Your email"
						w={300}
					/>
					<TextInput
						leftSectionPointerEvents="none"
						value={password}
						type="password"
						onChange={(e) => setPassword(e.target.value)}
						label="Password"
						placeholder="Your password"
						w={300}
					/>
					<Button w={300} mt={10} onClick={handleLogin}>
						Login
					</Button>
					<Text
						style={{ cursor: 'pointer' }}
						onClick={() => setSignUp(true)}
					>{`Click here to signup>`}</Text>
				</Flex>
			)}
		</>
	);
}

export default AuthComponent;
