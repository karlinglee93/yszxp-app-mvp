// Manually define the types that will be returned from the database
export type Transaction = {
    id: string,
    category: string,
    timestamp: string,
    amount: number,
    account: string,
    ledger: string,
    currency: string,
    description: string
}