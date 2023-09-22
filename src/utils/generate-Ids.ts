import { randomUUID } from 'crypto';
import { v4 as uuidV4 } from 'uuid';
import { ALPHABET } from '../constants';

function customUUIDAlphabet(alphabet: string, length: number): string {
  const uuid = uuidV4().replace(/-/g, '');
  let result = '';

  for (let i = 0; i < length; i++) {
    const charIndex = parseInt(uuid[i], 16) % alphabet.length;
    result += alphabet[charIndex];
  }

  return result;
}

export const generateTrackingId = function () {
  return customUUIDAlphabet(ALPHABET, 9);
};
export const generateShortId = function () {
  customUUIDAlphabet(ALPHABET, 9);
};
export const generateUUID = () => randomUUID();
