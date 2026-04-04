export const ENGAGEMENT_SCALES = [
  {
    id: 'skirmish',
    name: 'Skirmish',
    mineralLimit: 1000,
    vespeneRule: '10% of Minerals',
    battlefield: '36" x 36"',
  },
  {
    id: 'standard',
    name: 'Standard',
    mineralLimit: 2000,
    vespeneRule: '10% of Minerals',
    battlefield: '36" x 54"',
  },
  {
    id: 'grand-offensive',
    name: 'Grand Offensive',
    mineralLimit: null,
    mineralMinimum: 2001,
    vespeneRule: '10% of Minerals',
    battlefield: '36" x 72"',
  },
];

export const ARMY_BUILDING_RULES = {
  status: 'generated-from-rules',
  rules: {
    resources: {
      minerals: 'Spend Minerals to recruit Units and purchase Upgrades. The total Mineral cost must not exceed the Engagement Scale limit. Unspent Minerals are lost.',
      vespeneGas: 'Spend Vespene Gas exclusively on Tactical Cards. It cannot be converted into Minerals. Unspent Vespene Gas is lost.',
    },
    tacticalCards: {
      summary: 'Tactical Cards unlock additional Army Slots beyond those provided by the Faction Card and are purchased with Vespene Gas.',
      uniqueRule: 'If a Tactical Card is marked as Unique, only one copy may be included in the army.',
    },
    factionEligibility: {
      summary: 'Every tag on the Unit or Tactical Card must also appear on the selected Faction Card.',
    },
    upgrades: {
      summary: 'A player may purchase any number of different upgrades listed for a Unit. Specialist upgrades may only be taken once each and must be assigned to different models.',
    },
    summonedUnits: {
      summary: 'Summoned Units are not included in the army list during army building and do not occupy Army Slots.',
    },
  },
  sourceRefs: [
    'Rules/PART_9_PREPARING_FOR_BATTLE.html#9.1.1',
    'Rules/PART_9_PREPARING_FOR_BATTLE.html#9.1.2',
    'Rules/PART_9_PREPARING_FOR_BATTLE.html#9.1.3',
    'Rules/PART_9_PREPARING_FOR_BATTLE.html#9.1.4',
    'Rules/PART_9_PREPARING_FOR_BATTLE.html#9.1.5',
    'Rules/PART_9_PREPARING_FOR_BATTLE.html#9.1.6',
    'Rules/PART_9_PREPARING_FOR_BATTLE.html#9.1.7',
    'Rules/PART_9_PREPARING_FOR_BATTLE.html#9.1.9',
  ],
};

export function isCardEligibleForFaction(card, factionCard) {
  if (!card || !factionCard) return false;

  const normalize = value => String(value || '').trim().toLowerCase();
  const cardTags = (card.factionTags || []).map(normalize).filter(Boolean);
  const factionTags = new Set((factionCard.factionTags || []).map(normalize).filter(Boolean));

  if (cardTags.length === 0 && card.faction) {
    return factionTags.has(normalize(card.faction));
  }

  return cardTags.every(tag => factionTags.has(tag));
}
