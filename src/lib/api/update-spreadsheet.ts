import type { Credentials } from 'google-auth-library';

export async function updateSpreadsheet({
	values,
	spreadsheetId,
	sheetName,
	credentials
}: {
	values: string[][];
	spreadsheetId: string;
	sheetName: string;
	credentials: Credentials;
}) {
	const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!A2:E31?valueInputOption=USER_ENTERED`;
	const response = await fetch(url, {
		method: 'PUT',
		body: JSON.stringify({
			range: `${sheetName}!A2:E31`,
			majorDimension: 'ROWS',
			values
		}),
		headers: {
			Authorization: 'Bearer ' + credentials.access_token
		}
	});
	return {
		status: response.status
	};
}
