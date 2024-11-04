export const MODULUS = 21888242871839275222246405745257275088696311157297823662689037894645226208583n;
export const BITS_IN_BYTE = 8n;
export const U1_LEN: u32 = 1;
export const BYTES32_LEN: u32 = 32;
export const ADDRESS_LEN: u32 = 20;
export const U64_LEN: u32 = 8;
// eslint-disable-next-line no-magic-numbers
export const U64_MAX = max_n_bit_value(64n);
export const MAX_U8 = 255;
export const MAX_TRIE_NODE_LEN: u32 = 532;
export const ZERO_PAD_VALUE = '0x00';
// eslint-disable-next-line no-magic-numbers
export const U128_MAX = max_n_bit_value(128n);

export function max_n_bit_value(bits: bigint): bigint {
  // eslint-disable-next-line no-magic-numbers
  return 2n ** bits - 1n;
}
