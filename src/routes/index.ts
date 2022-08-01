import { auth } from '$lib/auth';

const { VITE_SPREADSHEET_ID: spreadsheetId, VITE_SHEET_NAME: sheetName } = import.meta.env;

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET() {
	const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?ranges=${sheetName}!A2:E31&ranges=${sheetName}!G2:G7`;

	try {
		const credentials = await auth();
		const response = await fetch(url, {
			headers: {
				Authorization: 'Bearer ' + credentials.access_token
			}
		});

		return {
			status: 200,
			headers: {
				'access-control-allow-origin': '*'
			},
			body: {
				valueRanges: response.ok && (await response.json()).valueRanges,
				credentials
			}
		};
	} catch {
		return {
			status: 500,
			body: new Error('Could not load spreadsheet data')
		};
	}
}
