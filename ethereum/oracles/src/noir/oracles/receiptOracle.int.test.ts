import { describe, expect, it } from 'vitest';
import { createMockMultiChainClient } from '../../ethereum/mockClient.js';
import { OFFSETS, getReceiptOracle } from './receiptOracle.js';
import { BYTES32_LEN, ZERO_PAD_VALUE } from './common/const.js';
import { padArray } from '../../util/array.js';
import { receiptProofConfigM } from './common/proofConfig/receipt.js';

describe('getReceiptOracle', () => {
  const mainnetChainIdInNoirFormat = '0x01';
  const cancunBlockNumberInNoirFormat = '0x12884e1';
  it('success', async () => {
    const chainLinkTransferTxIdInNoirFormat = '0x08';

    const stateRootInNoirFormat = new Array(BYTES32_LEN).fill('0x00');
    const mockFilePaths = [
      './fixtures/mainnet/cancun/small_block/alchemy_getTransactionReceipts_19432673.json',
      './fixtures/mainnet/cancun/small_block/eth_getBlockByHash_19432673.json'
    ];
    const multiChainClient = await createMockMultiChainClient(mockFilePaths);

    const receiptWithProof = await getReceiptOracle(multiChainClient, [
      [mainnetChainIdInNoirFormat],
      [cancunBlockNumberInNoirFormat],
      [chainLinkTransferTxIdInNoirFormat]
    ]);

    expect(receiptWithProof[OFFSETS.TX_TYPE]).toStrictEqual('0x02');
    expect(receiptWithProof[OFFSETS.STATUS]).toStrictEqual('0x01');
    expect(receiptWithProof[OFFSETS.STATUS_IS_SOME]).toStrictEqual('0x01');
    expect(receiptWithProof[OFFSETS.STATE_ROOT]).toStrictEqual(stateRootInNoirFormat);
    expect(receiptWithProof[OFFSETS.STATE_ROOT_IS_SOME]).toStrictEqual('0x00');
    expect(receiptWithProof[OFFSETS.CUMULATIVE_GAS_USED]).toStrictEqual('0x0a17e1');
    // prettier-ignore
    expect(receiptWithProof[OFFSETS.LOGS_BLOOM]).toStrictEqual([
      "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", 
      "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x10", "0x00",
      "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", 
      "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", 
      "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", 
      "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", 
      "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", 
      "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", 
      "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x10", 
      "0x40", "0x00", "0x00", "0x08", "0x00", "0x00", "0x00", "0x00", 
      "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", 
      "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", 
      "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", 
      "0x00", "0x00", "0x00", "0x00", "0x01", "0x00", "0x00", "0x00", 
      "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", 
      "0x00", "0x00", "0x00", "0x10", "0x00", "0x00", "0x00", "0x00", 
      "0x00", "0x00", "0x00", "0x00", "0x00", "0x02", "0x00", "0x00", 
      "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", 
      "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", 
      "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", 
      "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", 
      "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", 
      "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", 
      "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", 
      "0x00", "0x00", "0x00", "0x02", "0x00", "0x00", "0x00", "0x40", 
      "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x04", 
      "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x10", "0x00", 
      "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", 
      "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", 
      "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", 
      "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", 
      "0x00", "0x00", "0x00", "0x00", "0x02", "0x00", "0x00", "0x00"
    ]);

    const proofInputKeyPart = receiptWithProof[OFFSETS.PROOF_INPUT].slice(
      0,
      receiptProofConfigM.maxPrefixedKeyNibbleLen
    );
    const paddedKey = padArray(['0x08'], receiptProofConfigM.maxPrefixedKeyNibbleLen, ZERO_PAD_VALUE, 'left');
    expect(proofInputKeyPart).toStrictEqual(paddedKey);
  });

  it('transaction not found', async () => {
    const nonExistentTxId = '0xffff';
    const mockFilePaths = ['./fixtures/mainnet/cancun/small_block/alchemy_getTransactionReceipts_19432673.json'];
    const multiChainClient = await createMockMultiChainClient(mockFilePaths);

    await expect(
      async () =>
        await getReceiptOracle(multiChainClient, [
          [mainnetChainIdInNoirFormat],
          [cancunBlockNumberInNoirFormat],
          [nonExistentTxId]
        ])
    ).rejects.toThrowError(`Transaction receipt not found for txId: ${parseInt(nonExistentTxId, 16)}`);
  });
});
