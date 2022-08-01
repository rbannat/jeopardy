import { auth } from '$lib/api/auth';
import { getSpreadsheet } from '$lib/api/get-spreadsheet';
import type { Credentials } from 'google-auth-library';

const { VITE_SPREADSHEET_ID: spreadsheetId, VITE_SHEET_NAME: sheetName } = import.meta.env;

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET() {
	let credentials: Credentials;
	try {
		credentials = await auth();
	} catch {
		return {
			status: 500,
			body: new Error('Authorization failed')
		};
	}

	try {
		return getSpreadsheet({ spreadsheetId, sheetName, credentials });
	} catch {
		return {
			status: 500,
			body: new Error('Could not load spreadsheet data')
		};
	}
}
