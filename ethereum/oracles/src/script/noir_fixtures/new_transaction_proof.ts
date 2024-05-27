import { Proof } from '../../ethereum/proof.js';
import { txProofConfigM } from '../../noir/oracles/rpc/common/proofConfig/tx.js';
import { createNewTopLevelProofFixture } from './new_proof.js';

export function createNewTransactionProofFixture(proof: Proof): string {
  return createNewTopLevelProofFixture(proof, txProofConfigM);
}
