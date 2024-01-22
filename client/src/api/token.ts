export const fetchToken = (): string | null => {
	if (typeof window !== 'undefined') {
		try {
			const tokenObj = localStorage.getItem('Token') || null;
			let Token;
			if (tokenObj) {
				Token = JSON.parse(tokenObj).value;
			}
			return Token || null;
		} catch (error) {
			console.log(error);
			return null;
		}
	} else {
		return null;
	}
};
