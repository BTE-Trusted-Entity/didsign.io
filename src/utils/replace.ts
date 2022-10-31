export function replace<Item>(
  array: Item[],
  old: Item,
  replacement: Item,
): Item[] {
  return array.map((item) => (item === old ? replacement : item));
}
