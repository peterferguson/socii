import { TransferResource } from "@socii/shared/alpaca"

export const transferToNTAActivity = (transfer: TransferResource) => ({
  id: transfer.id,
  status: transfer.status,
  activityType: `Transfer (${transfer.direction} ${transfer.type})`,
  date: transfer.updatedAt || transfer.createdAt,
  description: transfer.reason,
  netAmount: transfer.amount,
})
