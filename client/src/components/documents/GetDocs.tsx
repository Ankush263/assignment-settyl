import { Flex, Text } from '@mantine/core';
import { getMyDocs } from '../../api';
import { useEffect, useState } from 'react';
import { fetchToken } from '../../api/token';
import { useHistory } from 'react-router-dom';

interface Docs {
	id: string;
	contents: object;
	createdAt: string;
}

function GetDocs() {
	const [allDocs, getAllDocs] = useState([]);
	const history = useHistory();
	const fetch = async () => {
		try {
			const token = fetchToken();
			const docs = await getMyDocs(token as string);
			getAllDocs(docs.data.data.document);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetch();
	}, []);

	return (
		<Flex direction={'column'} align={'center'} mt={15} mb={10}>
			{allDocs?.map((doc: Docs) => {
				return (
					<Flex
						key={doc.id}
						justify={'space-between'}
						align={'center'}
						w={'95%'}
						p={20}
						mb={10}
						style={{
							cursor: 'pointer',
							backgroundColor: 'rgba(17, 213, 218, 0.14)',
							borderRadius: '10px',
						}}
						onClick={() => history.push(`/documents/${doc.id}`)}
					>
						<Text>{doc.id}</Text>
						<Text>{doc.createdAt}</Text>
					</Flex>
				);
			})}
		</Flex>
	);
}

export default GetDocs;
