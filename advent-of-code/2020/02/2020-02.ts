import { assertEquals, readPuzzleInput, countItem } from '../../_utility/utility.ts';

interface PasswordPolicy {
  min: number;
  max: number;
  character: string;
}

type PasswordPolicyValidator = (passwd: string, policy: PasswordPolicy) => boolean;

async function getPasswordPuzzleInput(filename: string ) {
  const input = await readPuzzleInput(filename);

  return input.reduce((result: { [k: string]: PasswordPolicy }, l: string) => {
    const [policyString, passwd] = l.split(': ');
    const [minMax, character] = policyString.split(' ');
    const [min, max] = minMax.split('-');

    const policy: PasswordPolicy = {
      min: +min,
      max: +max,
      character
    }
    return { ...result, [passwd]: policy };
  }, {});
}

function sledPasswordPolicyValidator(passwd: string, policy: PasswordPolicy): boolean {
  const count = countItem(passwd.split(''), policy.character);

  return count >= policy.min && count <= policy.max;
}

function sledRegexPasswordPolicyValidator(passwd: string, policy: PasswordPolicy): boolean {
  const count = passwd.match(new RegExp(policy.character, 'g'))?.length ?? 0;

  return count >= policy.min && count <= policy.max;
}

// XOR, index 1
function tobogganPasswordPolicyValidator(passwd: string, policy: PasswordPolicy): boolean {
  return RegExp(`^.{${policy.min - 1}}[${policy.character}]`).test(passwd) !==
    RegExp(`^.{${policy.max - 1}}[${policy.character}]`).test(passwd);
}

function findValidPasswords(puzzleInput: { [k: string]: PasswordPolicy }, validator: PasswordPolicyValidator) {
  return Object.entries(puzzleInput).reduce((result, [passwd, policy]) => {
    if (validator(passwd, policy)) {
      return (result ?? 0) + 1;
    }
    return result;
  }, 0);
}

Deno.test("Sample", async () => {
  const puzzleInput = await getPasswordPuzzleInput('./2020-02-sample.txt');

  assertEquals(findValidPasswords(puzzleInput, sledPasswordPolicyValidator), 2);
  assertEquals(findValidPasswords(puzzleInput, sledRegexPasswordPolicyValidator), 2);
  assertEquals(findValidPasswords(puzzleInput, tobogganPasswordPolicyValidator), 1);
});

Deno.test("Puzzle", async () => {
  const puzzleInput = await getPasswordPuzzleInput('./2020-02.txt');

  assertEquals(findValidPasswords(puzzleInput, sledPasswordPolicyValidator), 465);
  assertEquals(findValidPasswords(puzzleInput, sledRegexPasswordPolicyValidator), 465);
  assertEquals(findValidPasswords(puzzleInput, tobogganPasswordPolicyValidator), 294);
});

