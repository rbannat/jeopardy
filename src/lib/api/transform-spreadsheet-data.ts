import type {
	Question,
	SpreadsheetData,
	TransformedSpreadsheetData
} from 'src/types/spreadsheetData.type';

export function transformSpreadsheetData(valueRanges: SpreadsheetData): TransformedSpreadsheetData {
	if (!valueRanges?.length) {
		return {
			categories: [],
			questions: []
		};
	}

	const categories = [...valueRanges[1].values].flat();

	const questions = valueRanges[0].values.map((row) => ({
		category: row[0],
		amount: +row[1],
		question: row[2],
		answer: row[3],
		answered: row[4] === 'TRUE' ? true : false
	}));

	return { categories, questions };
}

export function transformToValueRange(questions: Question[]): string[][] {
	return questions.map(({ category, amount, question, answer, answered }) => [
		category,
		amount.toString(),
		question,
		answer,
		answered ? 'TRUE' : 'FALSE'
	]);
}

export function generateTableRows({
	categories,
	questions
}: {
	categories: string[];
	questions: Question[];
}): Question[][] {
	const rows: Question[][] = [[]];

	for (const question of questions) {
		const categoryIndex = categories.indexOf(question.category);
		rows[categoryIndex] = [...(rows[categoryIndex] ? rows[categoryIndex] : []), question];
	}

	return transpose(rows);
}

function transpose(array: Question[][]) {
	return array[0].map((_, colIndex) => array.map((row) => row[colIndex]));
}
