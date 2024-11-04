import { BYTES32_LEN, U64_LEN } from '../../../common/const.js';
import { getProofConfig } from '../proofConfig.js';
import { getMaxRlpEncodedSize } from '../util.js';

const KEY_LEN: u32 = BYTES32_LEN; // Key is a hash of Ethereum address.
const MAX_VALUE_CONTENT_LEN =
  getMaxRlpEncodedSize(U64_LEN) /* Nonce */ +
  getMaxRlpEncodedSize(BYTES32_LEN) /* Balance */ +
  getMaxRlpEncodedSize(BYTES32_LEN) /* Storage root */ +
  getMaxRlpEncodedSize(BYTES32_LEN); /* Code hash */
const MAX_VALUE_LEN: u32 = getMaxRlpEncodedSize(MAX_VALUE_CONTENT_LEN);
const MAX_PROOF_LEVELS = 11; // Empirically correct values to be determined after we scan ethereum state trie.

export const accountProofConfig = getProofConfig(KEY_LEN, MAX_VALUE_LEN, MAX_PROOF_LEVELS);
