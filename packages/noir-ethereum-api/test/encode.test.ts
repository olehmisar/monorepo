import { describe, expect, it } from 'vitest';
import { decodeHexAddress, encodeBytes32 } from '../src/noir/encode.js';

describe('encodeBytes32', () => {
  it('zero', () => {
    expect(encodeBytes32(0n)).toStrictEqual([
      '0x0', '0x0', '0x0', '0x0',
      '0x0', '0x0', '0x0', '0x0',
      '0x0', '0x0', '0x0', '0x0',
      '0x0', '0x0', '0x0', '0x0',
      '0x0', '0x0', '0x0', '0x0',
      '0x0', '0x0', '0x0', '0x0',
      '0x0', '0x0', '0x0', '0x0',
      '0x0', '0x0', '0x0', '0x0'
    ]);
  });

  it('one', () => {
    expect(encodeBytes32(1n)).toStrictEqual([
      '0x0', '0x0', '0x0', '0x0',
      '0x0', '0x0', '0x0', '0x0',
      '0x0', '0x0', '0x0', '0x0',
      '0x0', '0x0', '0x0', '0x0',
      '0x0', '0x0', '0x0', '0x0',
      '0x0', '0x0', '0x0', '0x0',
      '0x0', '0x0', '0x0', '0x0',
      '0x0', '0x0', '0x0', '0x1'
    ])
  });

  it('4 bytes number', () => {
    expect(encodeBytes32(3000000019n)).toStrictEqual([
      '0x0', '0x0', '0x0', '0x0',
      '0x0', '0x0', '0x0', '0x0',
      '0x0', '0x0', '0x0', '0x0',
      '0x0', '0x0', '0x0', '0x0',
      '0x0', '0x0', '0x0', '0x0',
      '0x0', '0x0', '0x0', '0x0',
      '0x0', '0x0', '0x0', '0x0',
      '0xb2', '0xd0', '0x5e', '0x13'
    ])
  });

  it('MAX_INT_256', () => {
    expect(encodeBytes32(2n ** 256n - 1n)).toStrictEqual([
      '0xff', '0xff', '0xff', '0xff',
      '0xff', '0xff', '0xff', '0xff',
      '0xff', '0xff', '0xff', '0xff',
      '0xff', '0xff', '0xff', '0xff',
      '0xff', '0xff', '0xff', '0xff',
      '0xff', '0xff', '0xff', '0xff',
      '0xff', '0xff', '0xff', '0xff',
      '0xff', '0xff', '0xff', '0xff'
    ])
  });

  it('throws if negative value', () => {
    expect(() => encodeBytes32(-1n)).toThrow('Invalid Bytes32: Negative');
  });

  it('throws if overflows', () => {
    expect(() => encodeBytes32(2n ** 256n)).toThrow('Invalid Bytes32: Overflow');
  });
});

describe('decodeHexAddress', () => {
  it('success', () => {
    const arg = [
      '0x0000000000000000000000000000000000000000000000000000000000000030',
      '0x0000000000000000000000000000000000000000000000000000000000000078',
      '0x0000000000000000000000000000000000000000000000000000000000000065',
      '0x0000000000000000000000000000000000000000000000000000000000000039',
      '0x0000000000000000000000000000000000000000000000000000000000000063',
      '0x0000000000000000000000000000000000000000000000000000000000000033',
      '0x0000000000000000000000000000000000000000000000000000000000000031',
      '0x0000000000000000000000000000000000000000000000000000000000000032',
      '0x0000000000000000000000000000000000000000000000000000000000000033',
      '0x0000000000000000000000000000000000000000000000000000000000000065',
      '0x0000000000000000000000000000000000000000000000000000000000000034',
      '0x0000000000000000000000000000000000000000000000000000000000000063',
      '0x0000000000000000000000000000000000000000000000000000000000000066',
      '0x0000000000000000000000000000000000000000000000000000000000000033',
      '0x0000000000000000000000000000000000000000000000000000000000000034',
      '0x0000000000000000000000000000000000000000000000000000000000000038',
      '0x0000000000000000000000000000000000000000000000000000000000000063',
      '0x0000000000000000000000000000000000000000000000000000000000000036',
      '0x0000000000000000000000000000000000000000000000000000000000000036',
      '0x0000000000000000000000000000000000000000000000000000000000000062',
      '0x0000000000000000000000000000000000000000000000000000000000000032',
      '0x0000000000000000000000000000000000000000000000000000000000000030',
      '0x0000000000000000000000000000000000000000000000000000000000000061',
      '0x0000000000000000000000000000000000000000000000000000000000000039',
      '0x0000000000000000000000000000000000000000000000000000000000000038',
      '0x0000000000000000000000000000000000000000000000000000000000000035',
      '0x0000000000000000000000000000000000000000000000000000000000000061',
      '0x0000000000000000000000000000000000000000000000000000000000000066',
      '0x0000000000000000000000000000000000000000000000000000000000000032',
      '0x0000000000000000000000000000000000000000000000000000000000000036',
      '0x0000000000000000000000000000000000000000000000000000000000000034',
      '0x0000000000000000000000000000000000000000000000000000000000000038',
      '0x0000000000000000000000000000000000000000000000000000000000000039',
      '0x0000000000000000000000000000000000000000000000000000000000000031',
      '0x0000000000000000000000000000000000000000000000000000000000000066',
      '0x0000000000000000000000000000000000000000000000000000000000000063',
      '0x0000000000000000000000000000000000000000000000000000000000000030',
      '0x0000000000000000000000000000000000000000000000000000000000000061',
      '0x0000000000000000000000000000000000000000000000000000000000000034',
      '0x0000000000000000000000000000000000000000000000000000000000000034',
      '0x0000000000000000000000000000000000000000000000000000000000000031',
      '0x0000000000000000000000000000000000000000000000000000000000000061'
    ];
    expect(decodeHexAddress(arg)).toBe("0xe9c3123e4cf348c66b20a985af264891fc0a441a");
  });
})