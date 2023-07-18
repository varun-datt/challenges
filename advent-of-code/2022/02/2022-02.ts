import { readPuzzleInput, assertEquals, sum } from "../../_utility/utility.ts";

const rockPaperScissorsMap = new Map([
  ['Rock', 1],
  ['Paper', 2],
  ['Scissors', 3],
]);

function normalizeRps(value: string) {
  if (['A', 'X'].includes(value)) {
    return 'Rock';
  } else if (['B', 'Y'].includes(value)) {
    return 'Paper';
  } else if (['C', 'Z'].includes(value)) {
    return 'Scissors';
  }
  return '';
}

function normalizeGameEnd(value: string) {
  switch (value) {
    case 'X':
      return 0;
    case 'Y':
      return 3;
    case 'Z':
      return 6;
  }
}

function rpsGameRules(opponentValue: string, userValue: string) {
  const opponentNum = rockPaperScissorsMap.get(opponentValue);
  const userNum = rockPaperScissorsMap.get(userValue);
  if (opponentNum === userNum) {
    return 3;
  } else {
    if (opponentValue === 'Rock' && userValue === 'Scissors') {
      return 0;
    } else if (opponentValue === 'Scissors' && userValue === 'Rock') {
      return 6;
    } else {
      return userNum! > opponentNum! ? 6 : 0;
    }
  }
}

Deno.test("Sample", async () => {
  const puzzleInput = await readPuzzleInput('./2022-02-sample.txt');
  const results1 = puzzleInput.map((line: string) => {
    const [opponentValue, userValue] = line.split(' ').map(normalizeRps);
    return rockPaperScissorsMap.get(userValue)! + rpsGameRules(opponentValue, userValue);
  });
  const results2 = puzzleInput.map((line: string) => {
    const [opponentValue, userValue] = line.split(' ');

    return rockPaperScissorsMap.get(userValue)! + rpsGameRules(opponentValue, userValue);
  });

  assertEquals(sum(results1), 15);
});

Deno.test("Puzzle", async () => {
  const puzzleInput = await readPuzzleInput('./2022-02.txt');
  const results = puzzleInput.map((line: string) => {
    const [opponentValue, userValue] = line.split(' ').map(normalizeRps);
    return rockPaperScissorsMap.get(userValue)! + rpsGameRules(opponentValue, userValue);
  });
  assertEquals(sum(results), 13924);
});
