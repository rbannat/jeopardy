import type { Credentials } from 'google-auth-library';

export async function getSpreadsheet({
	spreadsheetId,
	sheetName,
	credentials
}: {
	spreadsheetId: string;
	sheetName: string;
	credentials: Credentials;
}) {
	const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?ranges=${sheetName}!A2:E31&ranges=${sheetName}!G2:G7`;

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
}
