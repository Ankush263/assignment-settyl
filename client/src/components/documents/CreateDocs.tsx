import { Box, Flex, Text } from '@mantine/core';
import { createDocs } from '../../api';
import { fetchToken } from '../../api/token';
import { useHistory } from 'react-router-dom';

function CreateDocs() {
	const history = useHistory();

	const handleClick = async () => {
		try {
			const token = fetchToken();

			const docs = await createDocs({ contents: {} }, token as string);
			history.push(`/documents/${docs.data.data.document._id}`);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Flex
			direction={'column'}
			justify={'space-between'}
			align={'center'}
			ml={10}
		>
			<Box
				h={100}
				w={80}
				style={{ border: '1px solid black', cursor: 'pointer' }}
				onClick={handleClick}
			></Box>
			<Text fz={15} fw={400}>
				Create a blank document
			</Text>
		</Flex>
	);
}

export default CreateDocs;
