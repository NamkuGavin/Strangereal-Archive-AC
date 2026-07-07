// Mock data for the Strangereal Archive — fan-made, no official assets/names beyond fictional universe references.

export type ID = string;

export type Aircraft = {
  id: ID;
  name: string;
  role: "Fighter" | "Multirole" | "Attacker" | "Experimental" | "Prototype";
  appearances: string[];
  weapons: ID[];
  squadrons: ID[];
  pilots: ID[];
  status: "Playable" | "Legendary" | "Experimental" | "Classified";
  stats: {
    speed: number;
    mobility: number;
    stability: number;
    defense: number;
    air: number;
    ground: number;
  };
  lore: string;
};

export type Squadron = {
  id: ID;
  name: string;
  affiliation: ID;
  conflict: ID;
  pilots: ID[];
  aircraft: ID[];
  status: "Legendary" | "Allied Unit" | "Enemy Ace" | "Mercenary" | "Classified";
  description: string;
};

export type Nation = {
  id: ID;
  name: string;
  region: string;
  conflicts: ID[];
  squadrons: ID[];
  relevance: string;
  status: "Superpower" | "Kingdom" | "Federation" | "Former Enemy" | "Small Allied Nation";
  summary: string;
};

export type Conflict = {
  id: ID;
  name: string;
  year: string;
  era: "1990s" | "2000s" | "2010s" | "2020s";
  nations: ID[];
  squadrons: ID[];
  pilots: ID[];
  aircraft: ID[];
  weapons: ID[];
  summary: string;
  result: string;
  events: { year: string; text: string }[];
  aftermath: string;
};

export type Pilot = {
  id: ID;
  callsign: string;
  type: "Player Ace" | "Enemy Ace" | "Rival" | "Supporting Character" | "Commander";
  affiliation: ID;
  squadron: ID;
  aircraft: ID;
  conflict: ID;
  status: "Active" | "MIA" | "KIA" | "Retired" | "Classified";
  role: string;
  description: string;
  classified?: boolean;
};

export type Weapon = {
  id: ID;
  name: string;
  type: "Standard" | "Air-to-Air" | "Air-to-Ground" | "Special" | "Experimental";
  function: string;
  bestUse: string;
  compatible: ID[];
  strength: number;
  range: number;
  difficulty: number;
  notes: string;
  limitations: string;
};

export const nations: Nation[] = [
  {
    id: "osea",
    name: "Osea",
    region: "Osean Continent",
    conflicts: ["belkan", "circum", "lighthouse"],
    squadrons: ["wardog", "razgriz", "strider"],
    relevance: "Leading superpower and stabilizing force across the Osean continent.",
    status: "Superpower",
    summary:
      "A vast federal republic with a dominant air force. Historically at the center of nearly every major continental conflict.",
  },
  {
    id: "yuktobania",
    name: "Yuktobania",
    region: "Verusa Continent",
    conflicts: ["circum"],
    squadrons: ["gault"],
    relevance: "Rival superpower with elite naval aviation.",
    status: "Former Enemy",
    summary:
      "A vast eastern federation. Once a wartime rival to Osea, now bound by a fragile peace.",
  },
  {
    id: "erusea",
    name: "Erusea",
    region: "Usea Continent",
    conflicts: ["continental", "lighthouse"],
    squadrons: ["sol", "mihaly"],
    relevance: "Kingdom-turned-republic with cutting-edge aerospace R&D.",
    status: "Kingdom",
    summary:
      "A proud kingdom on the Usean continent. Home to advanced experimental airframes and drone programs.",
  },
  {
    id: "belka",
    name: "Belka",
    region: "Northern Osean Continent",
    conflicts: ["belkan"],
    squadrons: ["grabacr", "ofnir", "schnee"],
    relevance: "Fallen military powerhouse; birthplace of many aces.",
    status: "Former Enemy",
    summary:
      "A once-mighty federation whose collapse triggered decades of shadow conflicts and aces-for-hire.",
  },
  {
    id: "ustio",
    name: "Ustio",
    region: "Northern Osean Continent",
    conflicts: ["belkan"],
    squadrons: ["galm"],
    relevance: "Small mountainous state defended by mercenary aces.",
    status: "Small Allied Nation",
    summary:
      "A small alpine republic whose survival depended on foreign pilots and hard mountain terrain.",
  },
  {
    id: "sapin",
    name: "Sapin",
    region: "Osean Continent",
    conflicts: ["belkan"],
    squadrons: [],
    relevance: "Coastal ally with strong naval air arm.",
    status: "Small Allied Nation",
    summary:
      "A coastal nation known for its mediterranean climate and modest but disciplined air force.",
  },
  {
    id: "usea",
    name: "Usean Federation",
    region: "Usea Continent",
    conflicts: ["continental", "lighthouse"],
    squadrons: ["mobius"],
    relevance: "Loose federation of Usean states.",
    status: "Federation",
    summary:
      "A federation of allied Usean nations formed to counter aggression across the continent.",
  },
  {
    id: "north-osea",
    name: "North Osea",
    region: "Former Belkan Territory",
    conflicts: ["belkan", "circum"],
    squadrons: [],
    relevance: "Post-war annexed region of former Belka.",
    status: "Former Enemy",
    summary: "A ceded region of former Belka. Culturally divided, politically volatile.",
  },
];

export const conflicts: Conflict[] = [
  {
    id: "belkan",
    name: "Belkan War",
    year: "1995",
    era: "1990s",
    nations: ["belka", "ustio", "osea", "sapin", "north-osea"],
    squadrons: ["galm", "schnee"],
    pilots: ["cipher", "pixy"],
    aircraft: ["f15c", "adfx01"],
    weapons: ["msl", "xmaa", "mpbm"],
    summary:
      "A short but catastrophic war triggered by Belkan expansion. Mercenary aces from Ustio pushed the front back into Belkan territory.",
    result:
      "Belkan surrender; seven nuclear detonations on their own soil; birth of the shadow-war era.",
    events: [
      { year: "1988", text: "Belkan economic collapse begins." },
      { year: "1995-03", text: "Belka invades neighbors." },
      { year: "1995-05", text: "Ustio counteroffensive led by mercenary aces." },
      { year: "1995-06", text: "Waldreich detonations." },
      { year: "1995-12", text: "Ceasefire signed at Lumen." },
    ],
    aftermath:
      "Splintered Belkan factions continue destabilizing continental politics for decades.",
  },
  {
    id: "continental",
    name: "Continental War",
    year: "2004",
    era: "2000s",
    nations: ["erusea", "usea"],
    squadrons: ["mobius", "yellow"],
    pilots: ["mobius1", "yellow13"],
    aircraft: ["su37", "f22"],
    weapons: ["qaam", "saam", "tls"],
    summary:
      "Erusean forces seized the majority of the Usean continent following the impact of a large celestial object. A lone pilot turned the tide.",
    result: "Erusean defeat; superweapon dismantled; peace restored to the Usean federation.",
    events: [
      { year: "2003", text: "Ulysses impact aftermath destabilizes region." },
      { year: "2004-03", text: "Erusean invasion begins." },
      { year: "2004-09", text: "Mobius 1 emerges as decisive ace." },
      { year: "2005-06", text: "Superweapon destroyed." },
    ],
    aftermath: "Usean federation reformed with stronger continental defense doctrine.",
  },
  {
    id: "circum",
    name: "Circum-Pacific War",
    year: "2010",
    era: "2010s",
    nations: ["osea", "yuktobania", "belka", "north-osea"],
    squadrons: ["wardog", "razgriz", "gault"],
    pilots: ["blaze", "nagase", "bartlett"],
    aircraft: ["f14d", "su37"],
    weapons: ["xmaa", "lasm", "sffs"],
    summary:
      "A manufactured war between Osea and Yuktobania orchestrated by rogue Belkan elements to reignite total war.",
    result: "Conspiracy exposed; both superpowers reconcile.",
    events: [
      { year: "2010-09", text: "Yuktobania declares war on Osea." },
      { year: "2010-11", text: "Wardog Squadron branded traitors, reborn as Razgriz." },
      { year: "2011-03", text: "SOLG deorbits over capital." },
    ],
    aftermath: "A new era of Osean-Yuktobanian cooperation begins.",
  },
  {
    id: "lighthouse",
    name: "Lighthouse War",
    year: "2019",
    era: "2010s",
    nations: ["osea", "erusea"],
    squadrons: ["strider", "sol", "mihaly"],
    pilots: ["trigger", "mihaly", "avril"],
    aircraft: ["f22", "x02s", "adf11f"],
    weapons: ["8aam", "lagm", "eml"],
    summary:
      "A war ignited over the International Space Elevator, fought across a battlefield increasingly dominated by autonomous drones.",
    result: "Drone command network destroyed; Erusean monarchy restored to constitutional role.",
    events: [
      { year: "2019-09", text: "Erusean forces seize the Lighthouse." },
      { year: "2019-11", text: "Strider Squadron formed from penal aviation unit." },
      { year: "2020-04", text: "Final battle within the space elevator." },
    ],
    aftermath: "Autonomous drone warfare becomes the defining question of the era.",
  },
];

export const squadrons: Squadron[] = [
  {
    id: "mobius",
    name: "Mobius Squadron",
    affiliation: "usea",
    conflict: "continental",
    pilots: ["mobius1"],
    aircraft: ["f22"],
    status: "Legendary",
    description:
      "A lone-wolf squadron of one, credited with turning the Continental War single-handedly.",
  },
  {
    id: "wardog",
    name: "Wardog Squadron",
    affiliation: "osea",
    conflict: "circum",
    pilots: ["blaze", "nagase", "bartlett"],
    aircraft: ["f14d"],
    status: "Legendary",
    description: "Osean naval aviators whose exploits over the front lines became modern legend.",
  },
  {
    id: "razgriz",
    name: "Razgriz Squadron",
    affiliation: "osea",
    conflict: "circum",
    pilots: ["blaze", "nagase"],
    aircraft: ["f14d", "su37"],
    status: "Legendary",
    description:
      "Reborn from Wardog after being falsely branded traitors, symbolized by the demon of the north sea.",
  },
  {
    id: "galm",
    name: "Galm Team",
    affiliation: "ustio",
    conflict: "belkan",
    pilots: ["cipher", "pixy"],
    aircraft: ["f15c", "adfx01"],
    status: "Mercenary",
    description:
      "A two-ship mercenary flight whose combat record shaped the outcome of the Belkan War.",
  },
  {
    id: "strider",
    name: "Strider Squadron",
    affiliation: "osea",
    conflict: "lighthouse",
    pilots: ["trigger", "avril"],
    aircraft: ["f22", "x02s"],
    status: "Allied Unit",
    description:
      "Formed from convicted aviators sent to a penal unit; rebuilt into an elite flight.",
  },
  {
    id: "sol",
    name: "Sol Squadron",
    affiliation: "erusea",
    conflict: "lighthouse",
    pilots: ["mihaly"],
    aircraft: ["x02s", "adf11f"],
    status: "Enemy Ace",
    description: "Erusean elite led by a veteran ace of three continental wars.",
  },
  {
    id: "yellow",
    name: "Yellow Squadron",
    affiliation: "erusea",
    conflict: "continental",
    pilots: ["yellow13"],
    aircraft: ["su37"],
    status: "Enemy Ace",
    description: "Erusean aces flying forked-tail terminators, feared across the continent.",
  },
  {
    id: "grabacr",
    name: "Grabacr Squadron",
    affiliation: "belka",
    conflict: "circum",
    pilots: [],
    aircraft: ["su37"],
    status: "Enemy Ace",
    description:
      "Belkan remnants operating under Yuktobanian colors; masters of coordinated ambush.",
  },
  {
    id: "ofnir",
    name: "Ofnir Squadron",
    affiliation: "belka",
    conflict: "circum",
    pilots: [],
    aircraft: ["su37"],
    status: "Enemy Ace",
    description: "A wolf-marked Belkan remnant squadron notorious for airfield strikes.",
  },
  {
    id: "gault",
    name: "Gault Team",
    affiliation: "yuktobania",
    conflict: "circum",
    pilots: ["bartlett"],
    aircraft: ["f14d"],
    status: "Allied Unit",
    description: "Yuktobanian aviators who defected once the shadow war was exposed.",
  },
  {
    id: "wizard",
    name: "Wizard Squadron",
    affiliation: "erusea",
    conflict: "lighthouse",
    pilots: [],
    aircraft: ["su57"],
    status: "Enemy Ace",
    description: "Elite Erusean guard unit assigned to strategic superweapon defense.",
  },
  {
    id: "sorcerer",
    name: "Sorcerer Squadron",
    affiliation: "erusea",
    conflict: "lighthouse",
    pilots: [],
    aircraft: ["su57"],
    status: "Enemy Ace",
    description: "Sister flight to Wizard, specializing in high-altitude interception.",
  },
  {
    id: "espada",
    name: "Espada Team",
    affiliation: "erusea",
    conflict: "continental",
    pilots: [],
    aircraft: ["mirage"],
    status: "Enemy Ace",
    description: "Erusean fighters known for aggressive low-level attack runs.",
  },
  {
    id: "schnee",
    name: "Schnee Squadron",
    affiliation: "belka",
    conflict: "belkan",
    pilots: [],
    aircraft: ["adfx01"],
    status: "Enemy Ace",
    description: "Belkan test pilots stationed at high-altitude research facilities.",
  },
  {
    id: "mihaly",
    name: "Mihaly Flight",
    affiliation: "erusea",
    conflict: "lighthouse",
    pilots: ["mihaly"],
    aircraft: ["x02s"],
    status: "Enemy Ace",
    description: "The personal wing of a legendary Erusean ace, called to service one final time.",
  },
];

export const pilots: Pilot[] = [
  {
    id: "mobius1",
    callsign: "Mobius 1",
    type: "Player Ace",
    affiliation: "usea",
    squadron: "mobius",
    aircraft: "f22",
    conflict: "continental",
    status: "Classified",
    role: "Sole surviving ace of Mobius Squadron; credited with breaking the Erusean front.",
    description:
      "A pilot whose identity remains sealed. Combat footage exists; the callsign does not.",
    classified: true,
  },
  {
    id: "blaze",
    callsign: "Blaze",
    type: "Player Ace",
    affiliation: "osea",
    squadron: "razgriz",
    aircraft: "f14d",
    conflict: "circum",
    status: "Classified",
    role: "Flight lead of Razgriz Squadron.",
    description:
      "Wardog Four turned Razgriz One. Silent in every debrief. Decisive in every engagement.",
  },
  {
    id: "cipher",
    callsign: "Cipher",
    type: "Player Ace",
    affiliation: "ustio",
    squadron: "galm",
    aircraft: "f15c",
    conflict: "belkan",
    status: "MIA",
    role: "Galm One. The Demon Lord of the Round Table.",
    description:
      "A mercenary whose kill count broke every Ustio air arm record. Vanished after the war.",
    classified: true,
  },
  {
    id: "trigger",
    callsign: "Trigger",
    type: "Player Ace",
    affiliation: "osea",
    squadron: "strider",
    aircraft: "f22",
    conflict: "lighthouse",
    status: "Active",
    role: "Strider One. Called the Three-Strikes Ace.",
    description:
      "Falsely convicted, sent to a penal squadron, and reborn as one of the most feared pilots of the drone era.",
  },
  {
    id: "pixy",
    callsign: "Pixy",
    type: "Rival",
    affiliation: "belka",
    squadron: "galm",
    aircraft: "adfx01",
    conflict: "belkan",
    status: "MIA",
    role: "Galm Two turned adversary.",
    description:
      "Once a wingman. Later a masked ace piloting the ADFX-01 in defense of a doctrine that killed millions.",
  },
  {
    id: "yellow13",
    callsign: "Yellow 13",
    type: "Enemy Ace",
    affiliation: "erusea",
    squadron: "yellow",
    aircraft: "su37",
    conflict: "continental",
    status: "KIA",
    role: "Squadron lead of Yellow.",
    description:
      "A veteran Erusean ace revered even by his enemies. Died in the closing days of the Continental War.",
  },
  {
    id: "mihaly",
    callsign: "Mihaly",
    type: "Enemy Ace",
    affiliation: "erusea",
    squadron: "mihaly",
    aircraft: "x02s",
    conflict: "lighthouse",
    status: "KIA",
    role: "Three-war ace and Erusean royal aviator.",
    description:
      "A veteran of three continental conflicts. Called out of retirement to face a new generation of aces and drones.",
  },
  {
    id: "nagase",
    callsign: "Edge",
    type: "Supporting Character",
    affiliation: "osea",
    squadron: "wardog",
    aircraft: "f14d",
    conflict: "circum",
    status: "Active",
    role: "Wardog Two.",
    description:
      "Wingman to Blaze; a steady voice on the flight net across the entire circum-Pacific campaign.",
  },
  {
    id: "bartlett",
    callsign: "Heartbreak One",
    type: "Commander",
    affiliation: "osea",
    squadron: "wardog",
    aircraft: "f14d",
    conflict: "circum",
    status: "Active",
    role: "Original Wardog flight lead.",
    description:
      "Veteran commander of Wardog. Captured, presumed lost, later found flying under Gault colors.",
  },
  {
    id: "avril",
    callsign: "Scrap Queen",
    type: "Supporting Character",
    affiliation: "osea",
    squadron: "strider",
    aircraft: "x02s",
    conflict: "lighthouse",
    status: "Active",
    role: "Airframe technician turned pilot.",
    description:
      "A gifted mechanic who rebuilt derelict fighters from junkyards and eventually flew one into combat.",
  },
  {
    id: "torres",
    callsign: "Torres",
    type: "Commander",
    affiliation: "osea",
    squadron: "strider",
    aircraft: "f22",
    conflict: "lighthouse",
    status: "Retired",
    role: "Strider Squadron commander.",
    description:
      "A hardened veteran who inherited a penal unit and forged them into an elite flight.",
  },
];

export const aircraft: Aircraft[] = [
  {
    id: "f22",
    name: "F-22A Raptor",
    role: "Fighter",
    appearances: ["AC4", "AC5", "AC Zero", "AC7"],
    weapons: ["msl", "xmaa", "qaam"],
    squadrons: ["mobius", "strider"],
    pilots: ["mobius1", "trigger"],
    status: "Legendary",
    stats: { speed: 92, mobility: 88, stability: 82, defense: 75, air: 95, ground: 60 },
    lore: "The definitive air-superiority platform of the modern archive. Preferred mount of top-scoring aces.",
  },
  {
    id: "f15c",
    name: "F-15C Eagle",
    role: "Fighter",
    appearances: ["AC Zero", "AC5", "AC7"],
    weapons: ["msl", "xmaa"],
    squadrons: ["galm"],
    pilots: ["cipher"],
    status: "Playable",
    stats: { speed: 82, mobility: 78, stability: 88, defense: 70, air: 90, ground: 45 },
    lore: "Twin-tail heavyweight. A dependable frame for pilots who prefer energy fighting over knife fights.",
  },
  {
    id: "su37",
    name: "Su-37 Terminator",
    role: "Fighter",
    appearances: ["AC4", "AC5", "AC Zero"],
    weapons: ["qaam", "4aam"],
    squadrons: ["yellow", "razgriz", "grabacr", "ofnir"],
    pilots: ["yellow13"],
    status: "Legendary",
    stats: { speed: 85, mobility: 96, stability: 74, defense: 68, air: 92, ground: 55 },
    lore: "Forked-tail thrust-vectoring predator. Preferred mount of continental aces.",
  },
  {
    id: "x02s",
    name: "X-02S Strike Wyvern",
    role: "Multirole",
    appearances: ["AC7"],
    weapons: ["8aam", "lagm", "qaam"],
    squadrons: ["sol", "strider", "mihaly"],
    pilots: ["mihaly", "avril"],
    status: "Experimental",
    stats: { speed: 90, mobility: 92, stability: 78, defense: 80, air: 94, ground: 82 },
    lore: "Erusean stealth swept-wing marvel. Rebuilt by Osean engineers into a multirole terror.",
  },
  {
    id: "adfx01",
    name: "ADFX-01 Morgan",
    role: "Prototype",
    appearances: ["AC Zero"],
    weapons: ["mpbm", "tls"],
    squadrons: ["galm", "schnee"],
    pilots: ["pixy"],
    status: "Experimental",
    stats: { speed: 88, mobility: 84, stability: 76, defense: 90, air: 88, ground: 92 },
    lore: "Belkan prototype outfitted with an experimental burst missile. Only a handful ever flew.",
  },
  {
    id: "adf11f",
    name: "ADF-11F Raven",
    role: "Experimental",
    appearances: ["AC7"],
    weapons: ["eml", "8aam"],
    squadrons: ["sol"],
    pilots: [],
    status: "Classified",
    stats: { speed: 94, mobility: 90, stability: 70, defense: 85, air: 96, ground: 88 },
    lore: "Autonomous drone airframe with detachable cockpit. The centerpiece of drone-era doctrine.",
  },
  {
    id: "cfa44",
    name: "CFA-44 Nosferatu",
    role: "Multirole",
    appearances: ["AC7"],
    weapons: ["adm", "6aam"],
    squadrons: [],
    pilots: [],
    status: "Classified",
    stats: { speed: 91, mobility: 89, stability: 76, defense: 82, air: 96, ground: 78 },
    lore: "Delta-wing prototype with rear-facing missiles. Rumored to have been deployed only twice.",
  },
  {
    id: "su57",
    name: "Su-57",
    role: "Multirole",
    appearances: ["AC7"],
    weapons: ["8aam", "lagm"],
    squadrons: ["wizard", "sorcerer"],
    pilots: [],
    status: "Playable",
    stats: { speed: 89, mobility: 90, stability: 78, defense: 76, air: 92, ground: 74 },
    lore: "Fifth-generation multirole with heavy internal payload. Standard mount for elite eastern guard flights.",
  },
  {
    id: "f14d",
    name: "F-14D Super Tomcat",
    role: "Multirole",
    appearances: ["AC5", "AC7"],
    weapons: ["xmaa", "lasm"],
    squadrons: ["wardog", "razgriz", "gault"],
    pilots: ["blaze", "nagase", "bartlett"],
    status: "Legendary",
    stats: { speed: 84, mobility: 74, stability: 90, defense: 78, air: 88, ground: 82 },
    lore: "Two-seat swing-wing icon of naval aviation. Backbone of Osean carrier air wings for a generation.",
  },
  {
    id: "mirage",
    name: "Mirage 2000-5",
    role: "Multirole",
    appearances: ["AC4", "AC5"],
    weapons: ["msl", "saam"],
    squadrons: ["espada"],
    pilots: [],
    status: "Playable",
    stats: { speed: 80, mobility: 82, stability: 80, defense: 68, air: 84, ground: 72 },
    lore: "Delta-wing continental staple. Nimble, forgiving, and widely licensed.",
  },
];

export const weapons: Weapon[] = [
  {
    id: "msl",
    name: "MSL",
    type: "Standard",
    function: "Standard air-to-air missile",
    bestUse: "General engagements",
    compatible: ["f22", "f15c", "f14d", "mirage"],
    strength: 55,
    range: 70,
    difficulty: 20,
    notes: "Baseline loadout carried by every combat airframe.",
    limitations: "Modest tracking; countered by chaff.",
  },
  {
    id: "gun",
    name: "GUN",
    type: "Standard",
    function: "Internal cannon",
    bestUse: "Close-in dogfights and strafing",
    compatible: ["f22", "f15c", "su37", "f14d", "mirage"],
    strength: 40,
    range: 20,
    difficulty: 60,
    notes: "Always available; unlimited engagement window at gun range.",
    limitations: "Requires nose-on aim; low burst damage.",
  },
  {
    id: "qaam",
    name: "QAAM",
    type: "Air-to-Air",
    function: "High-agility short-range AAM",
    bestUse: "Turning fights against agile targets",
    compatible: ["f22", "su37", "x02s"],
    strength: 78,
    range: 45,
    difficulty: 40,
    notes: "Extreme off-boresight tracking.",
    limitations: "Small magazine.",
  },
  {
    id: "saam",
    name: "SAAM",
    type: "Air-to-Air",
    function: "Semi-active radar-guided AAM",
    bestUse: "Long-range picks on distant contacts",
    compatible: ["f22", "mirage"],
    strength: 72,
    range: 90,
    difficulty: 55,
    notes: "Requires target painted in radar cone.",
    limitations: "Break lock and the missile goes stupid.",
  },
  {
    id: "xmaa",
    name: "XMAA",
    type: "Air-to-Air",
    function: "Multi-target long-range AAM",
    bestUse: "Sweeping multiple contacts",
    compatible: ["f22", "f15c", "f14d"],
    strength: 74,
    range: 88,
    difficulty: 45,
    notes: "Locks up to four targets simultaneously.",
    limitations: "Damage reduced per missile in salvo.",
  },
  {
    id: "4aam",
    name: "4AAM",
    type: "Air-to-Air",
    function: "Quad-launch short/medium AAM",
    bestUse: "Formation strikes",
    compatible: ["su37"],
    strength: 70,
    range: 55,
    difficulty: 40,
    notes: "Four-round salvo.",
    limitations: "Small overall magazine.",
  },
  {
    id: "6aam",
    name: "6AAM",
    type: "Air-to-Air",
    function: "Six-target salvo AAM",
    bestUse: "Breaking enemy formations",
    compatible: ["cfa44"],
    strength: 76,
    range: 70,
    difficulty: 50,
    notes: "Six-round parallel launch.",
    limitations: "Long reload.",
  },
  {
    id: "8aam",
    name: "8AAM",
    type: "Air-to-Air",
    function: "Eight-target salvo AAM",
    bestUse: "Drone swarms",
    compatible: ["x02s", "adf11f", "su57"],
    strength: 80,
    range: 78,
    difficulty: 55,
    notes: "Eight-round parallel launch.",
    limitations: "Very long reload.",
  },
  {
    id: "lasm",
    name: "LASM",
    type: "Air-to-Ground",
    function: "Long-range anti-ship missile",
    bestUse: "Naval and hardened static targets",
    compatible: ["f14d"],
    strength: 88,
    range: 92,
    difficulty: 40,
    notes: "High single-hit damage.",
    limitations: "Slow projectile; slow reload.",
  },
  {
    id: "lagm",
    name: "LAGM",
    type: "Air-to-Ground",
    function: "Long-range air-to-ground missile",
    bestUse: "Deep-strike SEAD",
    compatible: ["x02s", "su57"],
    strength: 82,
    range: 90,
    difficulty: 45,
    notes: "Multi-target ground salvo.",
    limitations: "Payload capacity limited.",
  },
  {
    id: "ugb",
    name: "UGB",
    type: "Air-to-Ground",
    function: "Unguided iron bomb",
    bestUse: "Static area targets",
    compatible: ["f14d", "mirage"],
    strength: 78,
    range: 15,
    difficulty: 70,
    notes: "Cheap and devastating in salvo.",
    limitations: "Requires overflight; ballistic aim.",
  },
  {
    id: "sffs",
    name: "SFFS",
    type: "Air-to-Ground",
    function: "Self-forging fragment sub-munition",
    bestUse: "Vehicle columns",
    compatible: ["f14d"],
    strength: 84,
    range: 40,
    difficulty: 55,
    notes: "Wide dispersal pattern.",
    limitations: "Poor against hardened targets.",
  },
  {
    id: "tls",
    name: "TLS",
    type: "Special",
    function: "Tactical laser system",
    bestUse: "Sustained precision engagements",
    compatible: ["adfx01"],
    strength: 92,
    range: 60,
    difficulty: 65,
    notes: "Zero travel time.",
    limitations: "Massive power draw; heat management.",
  },
  {
    id: "eml",
    name: "EML",
    type: "Experimental",
    function: "Electromagnetic launcher",
    bestUse: "Superweapon and armored engagements",
    compatible: ["adf11f"],
    strength: 96,
    range: 85,
    difficulty: 60,
    notes: "Hypersonic slug.",
    limitations: "Long reload; single shot.",
  },
  {
    id: "mpbm",
    name: "MPBM",
    type: "Experimental",
    function: "Multi-purpose burst missile",
    bestUse: "Nuclear-scale area denial",
    compatible: ["adfx01"],
    strength: 99,
    range: 60,
    difficulty: 40,
    notes: "One of the most destructive munitions ever fielded.",
    limitations: "Politically catastrophic to deploy.",
  },
  {
    id: "adm",
    name: "ADMM",
    type: "Special",
    function: "All-direction multi-missile",
    bestUse: "Encirclement scenarios",
    compatible: ["cfa44"],
    strength: 82,
    range: 60,
    difficulty: 45,
    notes: "Fires missiles on all vectors including rearward.",
    limitations: "Restricted to one airframe.",
  },
];

// helpers
export const byId = <T extends { id: ID }>(list: T[], id: ID | undefined) =>
  list.find((x) => x.id === id);
export const manyById = <T extends { id: ID }>(list: T[], ids: ID[]) =>
  ids.map((id) => byId(list, id)).filter(Boolean) as T[];

export const catalog = { aircraft, squadrons, nations, conflicts, pilots, weapons };
