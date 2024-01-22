import { Box, Button, Flex, Text, TextInput } from '@mantine/core';
import CreateDocs from './documents/CreateDocs';
import GetDocs from './documents/GetDocs';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

function Home() {
	const history = useHistory();
	const [doc, setDoc] = useState('');
	return (
		<Box>
			<Flex
				w={'100%'}
				h={50}
				justify={'end'}
				align={'center'}
				bg={'blue'}
			></Flex>
			<Flex
				h={150}
				w={'100%'}
				mt={10}
				justify={'space-between'}
				align={'center'}
			>
				<CreateDocs />

				<Flex mr={30} direction={'column'}>
					<TextInput
						leftSectionPointerEvents="none"
						label="Paste the shared Id here"
						placeholder="Shared Id"
						onChange={(e) => setDoc(e.target.value)}
						value={doc}
						w={300}
					/>
					<Button
						mt={10}
						w={100}
						onClick={() => history.push(`/documents/${doc}`)}
					>
						Go
					</Button>
				</Flex>
			</Flex>
			<Flex direction={'column'} mt={10}>
				<Text ml={30} mt={40} fz={15} fw={500}>
					My Documents:
				</Text>
				<GetDocs />
			</Flex>
		</Box>
	);
}

export default Home;
