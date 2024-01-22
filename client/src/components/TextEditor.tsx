import { useCallback, useEffect, useState } from 'react';
import Quill, { Sources } from 'quill';
import 'quill/dist/quill.snow.css';
import { Socket, io } from 'socket.io-client';
import { useParams } from 'react-router-dom';

interface ParamsInterface {
	id: string;
}

const option = [
	[{ header: [1, 2, 3, 4, 5, 6, false] }],
	[{ font: [] }],
	[{ list: 'ordered' }, { list: 'bullet' }],
	['bold', 'italic', 'underline'],
	[{ color: [] }, { background: [] }],
	[{ script: 'sub' }, { script: 'super' }],
	[{ align: [] }],
	['image', 'blockquote', 'code-block'],
	['clean'],
];

export default function TextEditor() {
	const { id: documentId } = useParams<ParamsInterface>();
	const [socket, setSocket] = useState<Socket>();
	const [quill, setQuill] = useState<Quill>();

	useEffect(() => {
		const s = io('http://localhost:5000');
		setSocket(s);

		return () => {
			s.disconnect();
		};
	}, []);

	useEffect(() => {
		if (socket == null || quill == null) return;

		socket?.once('load-document', (document) => {
			quill.setContents(document);
			quill.enable();
		});

		socket.emit('get-document', documentId);
	}, [socket, quill, documentId]);

	useEffect(() => {
		if (socket == null || quill == null) return;

		const interval = setInterval(() => {
			socket.emit('save-document', quill.getContents());
		}, 2000);

		return () => {
			clearInterval(interval);
		};
	}, [socket, quill]);

	useEffect(() => {
		if (socket == null || quill == null) return;

		const handler = (delta: unknown) => {
			quill.updateContents(delta);
		};
		socket.on('receive-changes', handler);

		return () => {
			socket.off('receive-changes', handler);
		};
	}, [socket, quill]);

	useEffect(() => {
		if (socket == null || quill == null) return;

		const handler = (delta: unknown, _oldDelta: unknown, source: Sources) => {
			if (source !== 'user') return;
			socket.emit('send-changes', delta);
		};
		quill.on('text-change', handler);

		return () => {
			quill.off('text-change', handler);
		};
	}, [socket, quill]);

	const wrapperRef = useCallback(
		(
			wrapper: {
				innerHTML: string;
				append: (arg0: HTMLDivElement) => void;
			} | null
		) => {
			if (wrapper == null) return;

			wrapper.innerHTML = '';
			const editor = document.createElement('div');
			wrapper.append(editor);
			const q = new Quill(editor, {
				theme: 'snow',
				modules: { toolbar: option },
			});
			q.disable();
			q.setText('Loading...');
			setQuill(q);
		},
		[]
	);
	return <div className="container" ref={wrapperRef}></div>;
}
