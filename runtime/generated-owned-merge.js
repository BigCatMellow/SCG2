function normalizeLookup(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
}

export function mergeGeneratedOwnedCollection(localItems, generatedItems, ownerField, discriminatorFields = []) {
  if (!Array.isArray(localItems) || !Array.isArray(generatedItems) || generatedItems.length === 0) {
    return localItems;
  }

  const merged = [...localItems];

  for (const generatedItem of generatedItems) {
    if (!generatedItem) continue;

    const generatedOwner = normalizeLookup(generatedItem[ownerField]);
    const generatedName = normalizeLookup(generatedItem.name);
    const generatedDiscriminators = discriminatorFields.map(field => normalizeLookup(generatedItem[field]));

    const matchIndex = merged.findIndex(localItem => {
      if (normalizeLookup(localItem?.[ownerField]) !== generatedOwner) {
        return false;
      }
      if (normalizeLookup(localItem?.name) !== generatedName) {
        return false;
      }

      return discriminatorFields.every((field, index) => {
        return normalizeLookup(localItem?.[field]) === generatedDiscriminators[index];
      });
    });

    if (matchIndex >= 0) {
      merged[matchIndex] = {
        ...merged[matchIndex],
        ...generatedItem,
      };
      continue;
    }

    merged.push(generatedItem);
  }

  localItems.splice(0, localItems.length, ...merged);
  return localItems;
}
