import { readPuzzleInput, assertEquals, sum, mapNumber } from "../../_utility/utility.ts";

function groupCalorieCounts(lines: string[]) {
  return mapNumber(lines)
    .reduce((result: number[], value: number) => {
      if (value !== null) {
        result[0] += value;
      } else {
        result.unshift(0);
      }
      return result;
    }, [0])
    .sort((a: number, b: number) => b - a)
}

Deno.test("Sample", async () => {
  const result = groupCalorieCounts(await readPuzzleInput('./2022-01-sample.txt'));

  assertEquals(sum(result.slice(0, 1)), 24000);

  assertEquals(sum(result.slice(0, 3)), 45000);
});

Deno.test("Puzzle", async () => {
  const result = groupCalorieCounts(await readPuzzleInput('./2022-01.txt'));

  assertEquals(sum(result.slice(0, 1)), 66719);

  assertEquals(sum(result.slice(0, 3)), 198551);
});
