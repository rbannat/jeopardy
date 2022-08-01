import { JWT, type Credentials } from 'google-auth-library';
import 'dotenv/config';

export async function auth(): Promise<Credentials> {
	const client = new JWT({
		email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
		key: process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
		scopes: ['https://www.googleapis.com/auth/spreadsheets']
	});
	try {
		const credentials = await client.authorize();
		return credentials;
	} catch {
		throw new Error('Authorization failed');
	}
}
