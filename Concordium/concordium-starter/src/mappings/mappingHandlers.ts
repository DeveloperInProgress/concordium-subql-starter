import { AccountTransactionSummary, BlockSpecialEventBlockAccrueReward, TransferSummary, UpdatedEvent } from "@concordium/node-sdk";
import { Transfer, Updated, BlockAccrueReward } from "../types";
import { ConcordiumTransaction, ConcordiumTransactionEvent, ConcordiumSpecialEvent } from "@subql/types-concordium";

export async function handleTransaction(tx: ConcordiumTransaction) {
    logger.info(`handling transfer accountTransaction`)
    const record = Transfer.create({
        id: `${tx.block.blockHeight}-${tx.hash}`,
        block: tx.block.blockHeight,
        date: tx.block.blockReceiveTime,
        from: (tx as AccountTransactionSummary).sender,
        to: (tx as TransferSummary).transfer.to,
        value: (tx as TransferSummary).transfer.amount
    })

    await record.save();
}

export async function handleTransactionEvent(txEvent: ConcordiumTransactionEvent) {
    logger.info(`handling transferEvent`)
    const record = Updated.create({
        id: `${txEvent.transaction.hash}-${txEvent.id}`,
        block: txEvent.block.blockHeight,
        txHash: txEvent.transaction.hash,
        address: `${(txEvent as UpdatedEvent).address.subindex}-${(txEvent as UpdatedEvent).address.subindex}`,
        instigator: (txEvent as UpdatedEvent).instigator.address.toString()
    })

    await record.save();
}

export async function handleSpecialEvent(specialEvent: ConcordiumSpecialEvent) {
    logger.info(`handling specialEvent`)
    const record = BlockAccrueReward.create({
        id: `${specialEvent.block.blockHeight}-${specialEvent.id}`,
        block: specialEvent.block.blockHeight,
        baker: (specialEvent as BlockSpecialEventBlockAccrueReward).baker,
        bakerReward: (specialEvent as BlockSpecialEventBlockAccrueReward).bakerReward
    })

    await record.save();
}