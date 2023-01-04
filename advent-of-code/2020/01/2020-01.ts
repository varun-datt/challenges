import { assertEquals, readPuzzleInput, sum, multiply, mapNumber } from '../../_utility/utility.ts';

function findAddends(items: number[], sumValue: number, addendCount: number, addends: number[] = []): number[] {
  if (items.length < addendCount) {
    return [];
  }

  const resultAddends = items.reduce((result, item, index) => {
    const potentialAddends: number[] = [...result, item];

    if (potentialAddends.length <= addendCount) {
      if (potentialAddends.length === addendCount) {
        if (sum(potentialAddends) === sumValue) {
          return potentialAddends;
        }
      } else {
        const remainingItems = [...items];
        remainingItems.splice(index, 1);

        const res = findAddends(remainingItems, sumValue, addendCount, potentialAddends);
        if (res.length === addendCount) {
          return res;
        }
      }
    }

    return result;
  }, addends);

  if (resultAddends.length !== addendCount) {
    return [];
  }

  return resultAddends;
}



Deno.test("Sample", async () => {
  const puzzleInput = mapNumber(await readPuzzleInput('./2020-01-sample.txt'));
  const expectedSum = 2020;
  const puzzle1 = {
    count: 2,
    expected: 514579,
  };
  const puzzle2 = {
    count: 3,
    expected: 241861950,
  };

  assertEquals(multiply(findAddends(puzzleInput, expectedSum, puzzle1.count)), puzzle1.expected);

  assertEquals(multiply(findAddends(puzzleInput, expectedSum, puzzle2.count)), puzzle2.expected);
});

Deno.test("Puzzle", async () => {
  const puzzleInput = mapNumber(await readPuzzleInput('./2020-01.txt'));
  const expectedSum = 2020;
  const puzzle1 = {
    count: 2,
    expected: 840324,
  };
  const puzzle2 = {
    count: 3,
    expected: 170098110,
  };

  assertEquals(multiply(findAddends(puzzleInput, expectedSum, puzzle1.count)), puzzle1.expected);

  assertEquals(multiply(findAddends(puzzleInput, expectedSum, puzzle2.count)), puzzle2.expected);
});
