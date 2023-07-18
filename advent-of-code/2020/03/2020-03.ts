import { assertEquals, readPuzzleInput, countItem } from '../../_utility/utility.ts';

// (11 - 1) * 3
// (h - 1) * x

async function readMatrixPuzzleInput(filename: string) {
  return (await readPuzzleInput(filename)).map((line: string) => line.split(''));
}

function traverseMatrix(matrix: Array<string[]>, x: number, y: number) {
  let xStart = 0;
  let yStart = 1;
  for (let j = yStart; j < matrix.length; j+=y) {
    const line = matrix[j];

    for (let i = xStart; i < line.length; i= (i + x) % line.length) {
      const element = line[i];
      console.log('element: ', element, i, j);
    }
  }
}

Deno.test("Sample", async () => {
  const matrix = await readMatrixPuzzleInput('./2020-03-sample.txt');
  traverseMatrix(matrix, 3, 1);
});
