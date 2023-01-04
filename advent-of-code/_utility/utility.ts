export { assertEquals } from "https://deno.land/std@0.168.0/testing/asserts.ts";

export async function readPuzzleInput(filename: string) {
  return (await Deno.readTextFile(filename)).split('\n').filter((n: string) => !!n);
}

export function mapNumber(items: string[]): number[] {
  return items.map((n: string) => +n);
}

export function sum(items: number[] | null) {
  if (!items?.length) {
    return null;
  }
  return items.reduce((result, item) => result + item, 0);
}

export function multiply(items: number[] | null) {
  if (!items?.length) {
    return null;
  }
  return items.reduce((result, item) => result * item, 1);
}

export function countItem<T>(items: T[], value: T): number {
  return items.reduce((r, item) => {
    if (item === value) {
      return r + 1;
    }
    return r;
  }, 0);
}
