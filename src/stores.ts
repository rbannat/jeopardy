import { writable } from 'svelte/store';
import type { Question, TransformedSpreadsheetData } from './types/spreadsheetData.type';

export const spreadsheetData = writable<TransformedSpreadsheetData>({
	categories: [],
	questions: []
});
export const selectedQuestion = writable<Question | null>(null);
export const transformOrigin = writable<string>('50% 50%');
