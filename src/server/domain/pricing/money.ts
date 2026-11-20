export type MoneyMinor = number;

export function addMoney(...amounts: MoneyMinor[]): MoneyMinor {
  return amounts.reduce((total, amount) => total + amount, 0);
}

export function multiplyMoney(amount: MoneyMinor, quantity: number): MoneyMinor {
  if (!Number.isInteger(quantity) || quantity < 0) {
    throw new Error("Quantity must be a non-negative integer.");
  }

  return amount * quantity;
}
