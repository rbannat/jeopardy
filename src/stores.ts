import { writable } from 'svelte/store';
import type { TransformedSpreadsheetData } from './types/spreadsheetData.type';

export const spreadsheetData = writable<TransformedSpreadsheetData>();
