export type SpreadsheetData = { range: string; majorDimension: string; values: string[][] }[];
export type Question = {
	category: string;
	amount: number;
	question: string;
	answer: string;
	answered: boolean;
};
export type TransformedSpreadsheetData = {
	categories: string[];
	questions: Question[];
};
