export function formatWalletAddress(address: string, chars = 4): string {
  if (!address || address.length < chars * 2 + 2) return address;
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
