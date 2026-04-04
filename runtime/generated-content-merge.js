function normalizeLookup(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
}

function tokenSignature(value) {
  return String(value || '')
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
    .sort()
    .join('|');
}

export function mergeGeneratedCollection(localItems, generatedItems) {
  if (!Array.isArray(localItems) || !Array.isArray(generatedItems) || generatedItems.length === 0) {
    return localItems;
  }

  const merged = [...localItems];

  for (const generatedItem of generatedItems) {
    if (!generatedItem) continue;

    const generatedId = normalizeLookup(generatedItem.id);
    const generatedName = normalizeLookup(generatedItem.name);
    const generatedSignature = tokenSignature(generatedItem.name);

    const matchIndex = merged.findIndex(localItem => {
      const localId = normalizeLookup(localItem?.id);
      const localName = normalizeLookup(localItem?.name);
      const localSignature = tokenSignature(localItem?.name);
      return (generatedId && localId === generatedId)
        || (generatedName && localName === generatedName)
        || (generatedSignature && localSignature === generatedSignature);
    });

      if (matchIndex >= 0) {
        const localItem = merged[matchIndex];
        merged[matchIndex] = {
          ...localItem,
          ...generatedItem,
          id: localItem.id || generatedItem.id,
          name: generatedItem.preserveName ? localItem.name : (generatedItem.name || localItem.name),
        };
        continue;
      }

    merged.push(generatedItem);
  }

  localItems.splice(0, localItems.length, ...merged);
  return localItems;
}
