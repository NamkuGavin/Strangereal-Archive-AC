// Strangereal Archive data — corrected fan-made catalog.
// Sources used for lore/data sanity-checking: Acepedia / Ace Combat Wiki and Bandai Namco ACES WEB.
// Note:
// - "stats" are normalized UI values for this project, not official in-game numeric stats.
// - "weapons" mixes standard and notable special weapons so the detail pages can show a compact loadout.
// - Some Ace Combat protagonists do not have a single strict canon aircraft in gameplay; representative aircraft are used.

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
    name: "Osean Federation",
    region: "Osean Continent",
    conflicts: ["belkan", "circum", "lighthouse"],
    squadrons: ["wardog", "razgriz", "spare", "strider"],
    relevance:
      "Major superpower and recurring central state in the Belkan, Circum-Pacific, and Lighthouse conflicts.",
    status: "Superpower",
    summary:
      "A vast federal republic and one of Strangereal's major superpowers. Its military power and foreign interventions make it central to several modern wars.",
  },
  {
    id: "yuktobania",
    name: "Union of Yuktobanian Republics",
    region: "Verusan Continent",
    conflicts: ["circum"],
    squadrons: [],
    relevance: "Osea's peer superpower and principal belligerent during the Circum-Pacific War.",
    status: "Superpower",
    summary:
      "A large federation on the Verusan continent. It fought Osea during the Circum-Pacific War before both powers discovered the Belkan conspiracy behind the conflict.",
  },
  {
    id: "erusea",
    name: "Kingdom of Erusea",
    region: "Usean Continent",
    conflicts: ["continental", "lighthouse"],
    squadrons: ["yellow", "sol", "mihaly"],
    relevance:
      "Expansionist Usean power associated with Stonehenge, Arsenal Birds, drone warfare, and elite ace units.",
    status: "Kingdom",
    summary:
      "A Usean state that acted as a principal antagonist in the Continental War and Lighthouse War. Its military history is tied to advanced aerospace programs and the royal family's turbulent politics.",
  },
  {
    id: "belka",
    name: "Principality of Belka",
    region: "Northern Osean Continent",
    conflicts: ["belkan", "circum"],
    squadrons: ["gault", "wizard", "sorcerer", "schnee", "grabacr", "ofnir"],
    relevance:
      "Former military power whose post-war extremists triggered several later shadow conflicts.",
    status: "Former Enemy",
    summary:
      "A once-dominant northern state whose defeat in 1995 and the Waldreich nuclear detonations left deep political scars across the Osean continent.",
  },
  {
    id: "ustio",
    name: "Republic of Ustio",
    region: "Northern Osean Continent",
    conflicts: ["belkan"],
    squadrons: ["galm"],
    relevance: "Small Belkan neighbor defended largely by mercenary pilots during the Belkan War.",
    status: "Small Allied Nation",
    summary:
      "A mountainous republic invaded by Belka in 1995. Ustio's survival became closely associated with mercenary air units such as Galm Team.",
  },
  {
    id: "sapin",
    name: "Kingdom of Sapin",
    region: "Osean Continent",
    conflicts: ["belkan"],
    squadrons: ["espada"],
    relevance:
      "Allied nation in the coalition against Belka, represented in the air by Espada Team.",
    status: "Kingdom",
    summary:
      "A southwestern Osean nation that joined the Allied Forces in the Belkan War and fielded notable ace units.",
  },
  {
    id: "isaf",
    name: "Independent State Allied Forces",
    region: "Usean Continent",
    conflicts: ["continental"],
    squadrons: ["mobius"],
    relevance: "Usean coalition force that resisted Erusean expansion during the Continental War.",
    status: "Federation",
    summary:
      "A military coalition formed by Usean states against Erusea. Its counteroffensive was symbolized by the rise of Mobius 1.",
  },
  {
    id: "north-osea",
    name: "North Osea",
    region: "Former Belkan Territory",
    conflicts: ["belkan", "circum"],
    squadrons: [],
    relevance:
      "Former Belkan territory tied to post-war industry, Gründer Industries, and later Grey Men activity.",
    status: "Former Enemy",
    summary:
      "A ceded region of former Belka. It became strategically significant through South Belkan / Gründer aerospace projects and post-war intrigue.",
  },
];

export const conflicts: Conflict[] = [
  {
    id: "belkan",
    name: "Belkan War",
    year: "1995",
    era: "1990s",
    nations: ["belka", "ustio", "osea", "sapin", "north-osea"],
    squadrons: ["galm", "gault", "wizard", "sorcerer", "schnee", "espada"],
    pilots: ["cipher", "pixy", "pj"],
    aircraft: ["f15c", "adfx01", "adfx02", "f14d", "su47", "mirage"],
    weapons: ["msl", "xmaa", "qaam", "tls", "mpbm"],
    summary:
      "A 1995 war caused by Belkan expansion against its neighbors. Ustio's mercenary squadrons and the Allied Forces pushed Belka back until the conflict escalated into nuclear catastrophe.",
    result:
      "Allied victory; Belka surrendered after the Waldreich nuclear detonations and later splinter groups formed A World With No Boundaries and the Grey Men.",
    events: [
      {
        year: "1995-03",
        text: "Belka launches offensives against neighboring states including Ustio.",
      },
      {
        year: "1995-04",
        text: "Ustio hires mercenary pilots; Galm Team begins reversing Belkan gains.",
      },
      {
        year: "1995-05",
        text: "Allied Forces advance through Belkan-held territory and destroy major strategic assets.",
      },
      {
        year: "1995-06-06",
        text: "Belka detonates seven nuclear weapons in the Waldreich Mountains to halt the Allied advance.",
      },
      {
        year: "1995-12-31",
        text: "A World With No Boundaries is defeated over Avalon Dam after Pixy's ADFX-02 is shot down.",
      },
    ],
    aftermath:
      "Belka's defeat and territorial losses created long-running resentment that fed later conspiracies in the Circum-Pacific War and other shadow conflicts.",
  },
  {
    id: "continental",
    name: "Continental War",
    year: "2003–2005",
    era: "2000s",
    nations: ["erusea", "isaf"],
    squadrons: ["mobius", "yellow"],
    pilots: ["mobius1", "yellow13", "yellow4"],
    aircraft: ["f22", "su37"],
    weapons: ["qaam", "saam", "xmaa", "tls"],
    summary:
      "A Usean war in which Erusea seized much of the continent and used Stonehenge as a strategic anti-air and anti-asteroid weapon. ISAF's counteroffensive eventually centered on the ace Mobius 1.",
    result:
      "ISAF victory; Stonehenge and Megalith were destroyed, Erusea surrendered, and Free Erusea remnants continued sporadic insurgency afterward.",
    events: [
      {
        year: "1999",
        text: "Ulysses impacts destabilize Usea and leave Stonehenge as a decisive military asset.",
      },
      { year: "2003", text: "Erusea begins the war and forces ISAF into retreat." },
      {
        year: "2004",
        text: "ISAF regains momentum after operations across Usea and the rise of Mobius 1.",
      },
      { year: "2005-09-19", text: "Erusea officially surrenders after ISAF destroys Megalith." },
    ],
    aftermath:
      "Usea remained politically unstable, with Free Erusea uprisings and unresolved Erusean grievances feeding later conflicts.",
  },
  {
    id: "circum",
    name: "Circum-Pacific War",
    year: "2010",
    era: "2010s",
    nations: ["osea", "yuktobania", "belka", "north-osea"],
    squadrons: ["wardog", "razgriz", "grabacr", "ofnir"],
    pilots: ["blaze", "nagase", "grimm", "bartlett", "snow"],
    aircraft: ["f14d", "su47", "f15c"],
    weapons: ["msl", "xmaa", "lasm", "sffs", "8aam"],
    summary:
      "A large-scale war between the Osean Federation and the Union of Yuktobanian Republics, later revealed to be orchestrated by Belkan nationalists known as the Grey Men.",
    result:
      "Osea-Yuktobania coalition victory; the Grey Men were defeated and peace between the two superpowers was restored.",
    events: [
      {
        year: "2010-09-27",
        text: "Yuktobania declares war on Osea and the Circum-Pacific War begins.",
      },
      {
        year: "2010-11",
        text: "Wardog Squadron is framed as traitors and later resurfaces as Razgriz Squadron.",
      },
      {
        year: "2010-12-30",
        text: "Razgriz raids the SOLG control facility at Sudentor, exposing the Grey Men plot.",
      },
      {
        year: "2010-12-31",
        text: "Razgriz destroys the falling SOLG over Oured Bay, ending the immediate crisis.",
      },
    ],
    aftermath:
      "The war weakened both superpowers but also revealed the Grey Men conspiracy and turned Razgriz into a modern legend.",
  },
  {
    id: "lighthouse",
    name: "Lighthouse War",
    year: "2019",
    era: "2010s",
    nations: ["osea", "erusea", "isaf"],
    squadrons: ["spare", "strider", "sol", "mihaly"],
    pilots: ["trigger", "count", "avril", "mihaly"],
    aircraft: ["f15c", "f22", "x02s", "su30sm", "adf11f"],
    weapons: ["msl", "qaam", "8aam", "eml", "uav", "xsdb"],
    summary:
      "A war between Osea and Erusea over the International Space Elevator, marked by container-launched drones, Arsenal Birds, satellite collapse, and autonomous aircraft.",
    result:
      "Osean-Erusean coalition elements recaptured the Lighthouse, the advanced drone threat was destroyed, and a ceasefire was signed at the Expo City Conference.",
    events: [
      {
        year: "2019-05-15",
        text: "Erusea launches surprise attacks on Osean ports and captures the International Space Elevator.",
      },
      {
        year: "2019-07",
        text: "Trigger is transferred from Mage to Spare Squadron after being falsely accused in Harling's death.",
      },
      { year: "2019-08", text: "Osea destroys Arsenal Bird Liberty using Stonehenge." },
      {
        year: "2019-09",
        text: "Farbanti falls and the satellite network collapse throws Usea into chaos.",
      },
      {
        year: "2019-10",
        text: "A coalition destroys Arsenal Bird Justice and the ADF-11F drones around the Lighthouse.",
      },
      { year: "2019-12", text: "A ceasefire is signed at the Expo City Conference." },
    ],
    aftermath:
      "The war left Usea fractured and made autonomous drone warfare the defining strategic problem of the era.",
  },
];

export const squadrons: Squadron[] = [
  {
    id: "mobius",
    name: "Mobius Squadron",
    affiliation: "isaf",
    conflict: "continental",
    pilots: ["mobius1"],
    aircraft: ["f22"],
    status: "Legendary",
    description:
      "ISAF's legendary ace unit effectively represented by Mobius 1, the pilot credited with breaking Erusea's air dominance during the Continental War.",
  },
  {
    id: "wardog",
    name: "Wardog Squadron",
    affiliation: "osea",
    conflict: "circum",
    pilots: ["blaze", "nagase", "chopper", "grimm", "bartlett"],
    aircraft: ["f5e", "f14d"],
    status: "Legendary",
    description:
      "The 108th Tactical Fighter Squadron from Sand Island, later framed as traitors before its surviving pilots resurfaced as Razgriz.",
  },
  {
    id: "razgriz",
    name: "Razgriz Squadron",
    affiliation: "osea",
    conflict: "circum",
    pilots: ["blaze", "nagase", "grimm", "snow"],
    aircraft: ["f14d"],
    status: "Legendary",
    description:
      "The reborn Wardog unit operating from the OFS Kestrel under the Razgriz legend during the final phase of the Circum-Pacific War.",
  },
  {
    id: "galm",
    name: "Galm Team",
    affiliation: "ustio",
    conflict: "belkan",
    pilots: ["cipher", "pixy", "pj"],
    aircraft: ["f15c", "adfx02"],
    status: "Mercenary",
    description:
      "Ustio's two-ship mercenary flight led by Cipher and Pixy, feared as decisive aces of the Belkan War.",
  },
  {
    id: "spare",
    name: "Spare Squadron",
    affiliation: "osea",
    conflict: "lighthouse",
    pilots: ["trigger", "count"],
    aircraft: ["f15c"],
    status: "Allied Unit",
    description:
      "The Osean Air Force Base 444 penal unit, used for high-risk sorties before several members were transferred to regular service.",
  },
  {
    id: "strider",
    name: "Strider Squadron",
    affiliation: "osea",
    conflict: "lighthouse",
    pilots: ["trigger", "count"],
    aircraft: ["f22"],
    status: "Allied Unit",
    description:
      "A Long Range Strategic Strike Group squadron led by Trigger after his transfer out of Spare Squadron.",
  },
  {
    id: "sol",
    name: "Sol Squadron",
    affiliation: "erusea",
    conflict: "lighthouse",
    pilots: ["mihaly"],
    aircraft: ["su30sm", "x02s"],
    status: "Enemy Ace",
    description:
      "An Erusean elite unit associated with Mister X, flying advanced Sukhoi aircraft and later supporting Mihaly's X-02S sorties.",
  },
  {
    id: "mihaly",
    name: "Mihaly Flight",
    affiliation: "erusea",
    conflict: "lighthouse",
    pilots: ["mihaly"],
    aircraft: ["x02s"],
    status: "Enemy Ace",
    description:
      "The personal combat profile of Mihaly A. Shilage, the veteran ace whose flight data became central to Erusea's drone program.",
  },
  {
    id: "yellow",
    name: "Yellow Squadron",
    affiliation: "erusea",
    conflict: "continental",
    pilots: ["yellow13", "yellow4"],
    aircraft: ["su37"],
    status: "Enemy Ace",
    description:
      "The Erusean 156th Tactical Fighter Wing, famous for its yellow-marked Su-37s and its respected leader Yellow 13.",
  },
  {
    id: "grabacr",
    name: "Grabacr Squadron",
    affiliation: "belka",
    conflict: "circum",
    pilots: [],
    aircraft: ["su47"],
    status: "Enemy Ace",
    description:
      "A Belkan remnant unit operating under Osean cover as the 8492nd Squadron during the Circum-Pacific War conspiracy.",
  },
  {
    id: "ofnir",
    name: "Ofnir Squadron",
    affiliation: "belka",
    conflict: "circum",
    pilots: [],
    aircraft: ["su47"],
    status: "Enemy Ace",
    description:
      "A Belkan remnant unit operating from the Yuktobanian side, later destroyed with Grabacr during the SOLG crisis.",
  },
  {
    id: "gault",
    name: "Gault Team",
    affiliation: "belka",
    conflict: "belkan",
    pilots: [],
    aircraft: ["su47"],
    status: "Enemy Ace",
    description:
      "A Belkan ace team encountered in the Round Table during the Belkan War, remembered for high-skill coordinated tactics.",
  },
  {
    id: "wizard",
    name: "Wizard Squadron",
    affiliation: "belka",
    conflict: "belkan",
    pilots: [],
    aircraft: ["f15c"],
    status: "Enemy Ace",
    description:
      "A World With No Boundaries ace squadron that opposed Allied forces after Belka's formal surrender.",
  },
  {
    id: "sorcerer",
    name: "Sorcerer Squadron",
    affiliation: "belka",
    conflict: "belkan",
    pilots: [],
    aircraft: ["su47"],
    status: "Enemy Ace",
    description:
      "A Belkan War ace squadron associated with A World With No Boundaries and post-ceasefire resistance.",
  },
  {
    id: "schnee",
    name: "Schnee Squadron",
    affiliation: "belka",
    conflict: "belkan",
    pilots: [],
    aircraft: ["f14d"],
    status: "Enemy Ace",
    description:
      "A Belkan ace squadron encountered during the Belkan War, remembered for disciplined long-range engagement tactics.",
  },
  {
    id: "espada",
    name: "Espada Team",
    affiliation: "sapin",
    conflict: "belkan",
    pilots: [],
    aircraft: ["mirage"],
    status: "Allied Unit",
    description:
      "Sapin's ace team during the Belkan War, fighting alongside the Allied Forces rather than Erusea.",
  },
];

export const pilots: Pilot[] = [
  {
    id: "mobius1",
    callsign: "Mobius 1",
    type: "Player Ace",
    affiliation: "isaf",
    squadron: "mobius",
    aircraft: "f22",
    conflict: "continental",
    status: "Classified",
    role: "ISAF's decisive ace during the Continental War.",
    description:
      "A pilot whose identity remains sealed but whose combat record includes Stonehenge, Megalith, and the collapse of Erusean air superiority.",
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
    role: "Wardog and later Razgriz flight lead.",
    description:
      "The silent ace at the center of the Circum-Pacific War, leading Wardog before resurfacing as Razgriz 1.",
    classified: true,
  },
  {
    id: "nagase",
    callsign: "Edge",
    type: "Supporting Character",
    affiliation: "osea",
    squadron: "razgriz",
    aircraft: "f14d",
    conflict: "circum",
    status: "Retired",
    role: "Wardog 2 and later Razgriz 2.",
    description:
      "Kei Nagase, a composed Osean pilot and Blaze's trusted wingman throughout the Circum-Pacific War.",
  },
  {
    id: "chopper",
    callsign: "Chopper",
    type: "Supporting Character",
    affiliation: "osea",
    squadron: "wardog",
    aircraft: "f14d",
    conflict: "circum",
    status: "KIA",
    role: "Wardog 3.",
    description:
      "Alvin H. Davenport, an outspoken Wardog pilot killed during the stadium evacuation over November City.",
  },
  {
    id: "grimm",
    callsign: "Archer",
    type: "Supporting Character",
    affiliation: "osea",
    squadron: "razgriz",
    aircraft: "f14d",
    conflict: "circum",
    status: "Retired",
    role: "Wardog 4 and later Razgriz 4.",
    description:
      "Hans Grimm, a young Osean pilot who joined Wardog during the war and remained with the group through its Razgriz phase.",
  },
  {
    id: "snow",
    callsign: "Swordsman",
    type: "Supporting Character",
    affiliation: "osea",
    squadron: "razgriz",
    aircraft: "f14d",
    conflict: "circum",
    status: "Retired",
    role: "Kestrel naval aviator and Razgriz support pilot.",
    description:
      "Marcus Snow, the Kestrel pilot who helped Wardog fake their deaths and later fought alongside Razgriz.",
  },
  {
    id: "bartlett",
    callsign: "Heartbreak One",
    type: "Commander",
    affiliation: "osea",
    squadron: "wardog",
    aircraft: "f5e",
    conflict: "circum",
    status: "Retired",
    role: "Original Wardog flight lead.",
    description:
      "Jack Bartlett, veteran Osean instructor and Wardog's original commander, later connected to anti-Grey Men operations.",
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
    role: "Galm 1, the Demon Lord of the Round Table.",
    description:
      "A mercenary ace whose record shaped the Belkan War and whose post-war fate remains unknown.",
    classified: true,
  },
  {
    id: "pixy",
    callsign: "Pixy",
    type: "Rival",
    affiliation: "ustio",
    squadron: "galm",
    aircraft: "adfx02",
    conflict: "belkan",
    status: "Active",
    role: "Galm 2 turned A World With No Boundaries ace.",
    description:
      "Larry Foulke, Cipher's former wingman, deserted after the Waldreich detonations and later confronted Cipher in the ADFX-02 Morgan.",
  },
  {
    id: "pj",
    callsign: "PJ",
    type: "Supporting Character",
    affiliation: "osea",
    squadron: "galm",
    aircraft: "f15c",
    conflict: "belkan",
    status: "KIA",
    role: "Osean pilot attached to Galm Team.",
    description:
      "Patrick James Beckett joined Galm after Pixy's desertion and was killed by Pixy during the final Avalon Dam operation.",
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
    role: "Leader of Yellow Squadron.",
    description:
      "A respected Erusean ace and commander of the yellow-marked Su-37 unit during the Continental War.",
  },
  {
    id: "yellow4",
    callsign: "Yellow 4",
    type: "Enemy Ace",
    affiliation: "erusea",
    squadron: "yellow",
    aircraft: "su37",
    conflict: "continental",
    status: "KIA",
    role: "Yellow Squadron wingman.",
    description:
      "A skilled Erusean pilot close to Yellow 13, killed during the ISAF counteroffensive.",
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
    role: "Strider 1, the Three Strikes ace.",
    description:
      "Falsely convicted and sent to Spare Squadron, Trigger later became Strider Squadron's flight lead and a decisive ace of the Lighthouse War.",
  },
  {
    id: "count",
    callsign: "Count",
    type: "Supporting Character",
    affiliation: "osea",
    squadron: "strider",
    aircraft: "f15c",
    conflict: "lighthouse",
    status: "Active",
    role: "Spare pilot later transferred to Strider Squadron.",
    description:
      "An ex-penal unit pilot who began as Trigger's rival in Spare Squadron and later flew with him in the LRSSG.",
  },
  {
    id: "avril",
    callsign: "Scrap Queen",
    type: "Supporting Character",
    affiliation: "osea",
    squadron: "spare",
    aircraft: "f104c",
    conflict: "lighthouse",
    status: "Active",
    role: "Mechanic and narrator figure of the Lighthouse War.",
    description:
      "Avril Mead rebuilt an F-104C, was shot down at the start of the war, and became a mechanic at the Osean 444th Air Base.",
  },
  {
    id: "mihaly",
    callsign: "Mister X",
    type: "Enemy Ace",
    affiliation: "erusea",
    squadron: "sol",
    aircraft: "x02s",
    conflict: "lighthouse",
    status: "Retired",
    role: "Veteran Erusean ace and flight data source for the drone program.",
    description:
      "Mihaly A. Shilage, an aging ace who flew with Sol Squadron and later piloted the X-02S Strike Wyvern against Trigger.",
  },
];

export const aircraft: Aircraft[] = [
  {
    id: "f22",
    name: "F-22A Raptor",
    role: "Fighter",
    appearances: ["AC04", "AC5", "AC Zero", "AC6", "AC7"],
    weapons: ["msl", "qaam", "8aam", "xsdb"],
    squadrons: ["mobius", "strider"],
    pilots: ["mobius1", "trigger"],
    status: "Legendary",
    stats: { speed: 92, mobility: 88, stability: 82, defense: 75, air: 95, ground: 68 },
    lore: "A fifth-generation stealth air-superiority fighter and one of the franchise's iconic ace aircraft, associated with Mobius 1 and later high-end Osean combat records.",
  },
  {
    id: "f15c",
    name: "F-15C Eagle",
    role: "Fighter",
    appearances: ["AC04", "AC5", "AC Zero", "AC6", "AC7"],
    weapons: ["msl", "4aam", "sasm", "plsl"],
    squadrons: ["galm", "spare", "wizard"],
    pilots: ["cipher", "pj", "count"],
    status: "Playable",
    stats: { speed: 84, mobility: 78, stability: 88, defense: 70, air: 90, ground: 45 },
    lore: "A twin-engine air-superiority fighter strongly associated with Galm Team and the energy-fighting style of Belkan War aces.",
  },
  {
    id: "su37",
    name: "Su-37 Terminator",
    role: "Fighter",
    appearances: ["AC04", "AC5", "AC Zero", "AC7"],
    weapons: ["msl", "4aam", "hcaa", "tls"],
    squadrons: ["yellow"],
    pilots: ["yellow13", "yellow4"],
    status: "Legendary",
    stats: { speed: 86, mobility: 96, stability: 74, defense: 68, air: 92, ground: 55 },
    lore: "A thrust-vectoring air-superiority aircraft made legendary by Erusea's Yellow Squadron during the Continental War.",
  },
  {
    id: "x02s",
    name: "X-02S Strike Wyvern",
    role: "Multirole",
    appearances: ["AC7"],
    weapons: ["msl", "4aam", "lasm", "eml"],
    squadrons: ["sol", "mihaly"],
    pilots: ["mihaly"],
    status: "Experimental",
    stats: { speed: 90, mobility: 92, stability: 78, defense: 80, air: 94, ground: 82 },
    lore: "A modernized Erusean variable-sweep stealth fighter derived from the X-02 Wyvern line, most prominently flown by Mihaly in the Lighthouse War.",
  },
  {
    id: "adfx01",
    name: "ADFX-01 Morgan",
    role: "Prototype",
    appearances: ["AC Zero", "AC Infinity", "AC7"],
    weapons: ["msl", "mpbm", "tls", "iews"],
    squadrons: [],
    pilots: [],
    status: "Experimental",
    stats: { speed: 88, mobility: 84, stability: 76, defense: 90, air: 88, ground: 92 },
    lore: "A South Belkan experimental fighter and playable counterpart to Pixy's ADFX-02 Morgan, equipped for exotic weapons such as TLS and MPBM.",
  },
  {
    id: "adfx02",
    name: "ADFX-02 Morgan",
    role: "Prototype",
    appearances: ["AC Zero"],
    weapons: ["msl", "mpbm", "tls"],
    squadrons: ["galm"],
    pilots: ["pixy"],
    status: "Classified",
    stats: { speed: 90, mobility: 86, stability: 74, defense: 92, air: 90, ground: 95 },
    lore: "Pixy's final aircraft, a more advanced Morgan variant used during the Avalon Dam confrontation with Cipher.",
  },
  {
    id: "adf11f",
    name: "ADF-11F Raven",
    role: "Experimental",
    appearances: ["AC7"],
    weapons: ["msl", "qaam", "tls", "uav"],
    squadrons: [],
    pilots: [],
    status: "Classified",
    stats: { speed: 94, mobility: 90, stability: 70, defense: 85, air: 96, ground: 78 },
    lore: "An advanced unmanned fighter system linked to the drone warfare crisis at the end of the Lighthouse War.",
  },
  {
    id: "cfa44",
    name: "CFA-44 Nosferatu",
    role: "Multirole",
    appearances: ["AC6", "AC Infinity", "AC7"],
    weapons: ["msl", "admm", "eml", "iews"],
    squadrons: [],
    pilots: [],
    status: "Classified",
    stats: { speed: 91, mobility: 89, stability: 76, defense: 82, air: 96, ground: 78 },
    lore: "An Estovakian experimental multirole fighter known for the All-Direction Multi-Purpose Missile system and high-end ace combat performance.",
  },
  {
    id: "su57",
    name: "Su-57",
    role: "Multirole",
    appearances: ["AC7"],
    weapons: ["msl", "4aam", "gpb", "plsl"],
    squadrons: [],
    pilots: [],
    status: "Playable",
    stats: { speed: 89, mobility: 90, stability: 78, defense: 76, air: 92, ground: 74 },
    lore: "A fifth-generation multirole fighter with strong air-to-air performance and access to advanced precision weapons.",
  },
  {
    id: "su30sm",
    name: "Su-30SM",
    role: "Multirole",
    appearances: ["AC7"],
    weapons: ["msl", "qaam", "4aam", "lagm"],
    squadrons: ["sol"],
    pilots: ["mihaly"],
    status: "Playable",
    stats: { speed: 84, mobility: 88, stability: 82, defense: 76, air: 88, ground: 74 },
    lore: "A two-seat multirole fighter used by Sol Squadron and strongly associated with Mihaly before his transition to the X-02S.",
  },
  {
    id: "su47",
    name: "Su-47 Berkut",
    role: "Fighter",
    appearances: ["AC5", "AC Zero", "AC7"],
    weapons: ["msl", "qaam", "saam", "ugb"],
    squadrons: ["grabacr", "ofnir", "gault", "sorcerer"],
    pilots: [],
    status: "Playable",
    stats: { speed: 82, mobility: 93, stability: 72, defense: 70, air: 90, ground: 62 },
    lore: "A forward-swept-wing fighter often used by elite enemy units and Belkan-aligned ace squadrons.",
  },
  {
    id: "f14d",
    name: "F-14D Super Tomcat",
    role: "Multirole",
    appearances: ["AC5", "AC Zero", "AC6", "AC7"],
    weapons: ["msl", "laam", "8aam", "gpb"],
    squadrons: ["wardog", "razgriz", "schnee"],
    pilots: ["blaze", "nagase", "chopper", "grimm", "snow"],
    status: "Legendary",
    stats: { speed: 84, mobility: 74, stability: 90, defense: 78, air: 88, ground: 70 },
    lore: "A two-seat swing-wing naval fighter strongly associated with Wardog and Razgriz in Ace Combat 5.",
  },
  {
    id: "f5e",
    name: "F-5E Tiger II",
    role: "Fighter",
    appearances: ["AC5", "AC Zero"],
    weapons: ["msl", "ugb"],
    squadrons: ["wardog"],
    pilots: ["bartlett"],
    status: "Playable",
    stats: { speed: 68, mobility: 74, stability: 78, defense: 55, air: 68, ground: 58 },
    lore: "A lightweight fighter used as an early training and frontline aircraft in several Osean records.",
  },
  {
    id: "f104c",
    name: "F-104C Starfighter",
    role: "Fighter",
    appearances: ["AC7"],
    weapons: ["msl", "hpaa", "grkt"],
    squadrons: [],
    pilots: ["avril"],
    status: "Playable",
    stats: { speed: 86, mobility: 58, stability: 62, defense: 45, air: 64, ground: 48 },
    lore: "A high-speed legacy interceptor made memorable in Ace Combat 7 through Avril Mead's restored airframe.",
  },
  {
    id: "mirage",
    name: "Mirage 2000-5",
    role: "Multirole",
    appearances: ["AC04", "AC5", "AC Zero", "AC6", "AC7"],
    weapons: ["msl", "4aam", "lasm", "gpb"],
    squadrons: ["espada"],
    pilots: [],
    status: "Playable",
    stats: { speed: 80, mobility: 82, stability: 80, defense: 68, air: 84, ground: 72 },
    lore: "A delta-wing multirole aircraft used across multiple conflicts and suitable for both interception and strike missions.",
  },
];

export const weapons: Weapon[] = [
  {
    id: "msl",
    name: "MSL",
    type: "Standard",
    function: "Standard missile",
    bestUse: "General engagements",
    compatible: [
      "f22",
      "f15c",
      "su37",
      "x02s",
      "adfx01",
      "adfx02",
      "adf11f",
      "cfa44",
      "su57",
      "su30sm",
      "su47",
      "f14d",
      "f5e",
      "f104c",
      "mirage",
    ],
    strength: 55,
    range: 70,
    difficulty: 20,
    notes: "Baseline missile carried by playable combat aircraft.",
    limitations: "Average damage and tracking compared with special weapons.",
  },
  {
    id: "gun",
    name: "GUN",
    type: "Standard",
    function: "Internal cannon",
    bestUse: "Close-in dogfights and strafing",
    compatible: [
      "f22",
      "f15c",
      "su37",
      "x02s",
      "adfx01",
      "adfx02",
      "adf11f",
      "cfa44",
      "su57",
      "su30sm",
      "su47",
      "f14d",
      "f5e",
      "f104c",
      "mirage",
    ],
    strength: 40,
    range: 20,
    difficulty: 60,
    notes: "Always available in most playable aircraft and useful at close range.",
    limitations: "Requires direct aim and short engagement distance.",
  },
  {
    id: "qaam",
    name: "QAAM",
    type: "Air-to-Air",
    function: "Quick Maneuver Air-to-Air Missile",
    bestUse: "Close-range turning fights against agile aircraft",
    compatible: ["f22", "su37", "adf11f", "su30sm", "su47"],
    strength: 78,
    range: 45,
    difficulty: 42,
    notes: "High agility and strong tracking make it dangerous in dogfights.",
    limitations: "Magazine size and range are limited compared with long-range AAMs.",
  },
  {
    id: "saam",
    name: "SAAM",
    type: "Air-to-Air",
    function: "Semi-active air-to-air missile",
    bestUse: "Maintained-lock shots on high-value targets",
    compatible: ["su47"],
    strength: 72,
    range: 85,
    difficulty: 58,
    notes: "Powerful when the pilot keeps the target inside the guidance circle.",
    limitations: "Break lock and the missile loses effectiveness.",
  },
  {
    id: "xmaa",
    name: "XMAA",
    type: "Air-to-Air",
    function: "Advanced multi-target air-to-air missile",
    bestUse: "Formation interception",
    compatible: ["f15c", "f14d"],
    strength: 74,
    range: 88,
    difficulty: 45,
    notes: "Legacy multi-lock missile frequently associated with earlier Ace Combat titles.",
    limitations: "Not every modern aircraft carries this specific variant.",
  },
  {
    id: "4aam",
    name: "4AAM",
    type: "Air-to-Air",
    function: "Four-target air-to-air missile salvo",
    bestUse: "Breaking fighter formations",
    compatible: ["f15c", "su37", "x02s", "su57", "su30sm", "mirage"],
    strength: 70,
    range: 62,
    difficulty: 40,
    notes: "Can attack several targets or saturate a single group quickly.",
    limitations: "Reload and magazine management matter in long sorties.",
  },
  {
    id: "6aam",
    name: "6AAM",
    type: "Air-to-Air",
    function: "Six-target air-to-air missile salvo",
    bestUse: "Large fighter groups",
    compatible: [],
    strength: 76,
    range: 70,
    difficulty: 50,
    notes: "A heavier multi-target missile family used by selected aircraft.",
    limitations: "No currently catalogued aircraft in this dataset uses it.",
  },
  {
    id: "8aam",
    name: "8AAM",
    type: "Air-to-Air",
    function: "Eight-target air-to-air missile salvo",
    bestUse: "Drone swarms and dense air groups",
    compatible: ["f22", "f14d"],
    strength: 80,
    range: 78,
    difficulty: 55,
    notes: "Useful when many aircraft are inside lock range at once.",
    limitations: "Long reload and potential overkill against scattered targets.",
  },
  {
    id: "laam",
    name: "LAAM",
    type: "Air-to-Air",
    function: "Long-range air-to-air missile",
    bestUse: "Opening shots against distant aircraft",
    compatible: ["f14d"],
    strength: 76,
    range: 94,
    difficulty: 42,
    notes: "Excellent standoff range for intercepting high-value targets.",
    limitations: "Less effective once the fight collapses into close turns.",
  },
  {
    id: "hcaa",
    name: "HCAA",
    type: "Air-to-Air",
    function: "High-capacity air-to-air missile",
    bestUse: "Sustained dogfighting",
    compatible: ["su37"],
    strength: 68,
    range: 55,
    difficulty: 35,
    notes: "Fast reload and large count encourage aggressive close-range play.",
    limitations: "Lower impact per shot than heavier AAMs.",
  },
  {
    id: "sasm",
    name: "SASM",
    type: "Air-to-Air",
    function: "Short-range aerial suppression missile",
    bestUse: "Close-airburst pressure against fighters",
    compatible: ["f15c"],
    strength: 66,
    range: 42,
    difficulty: 45,
    notes: "Airburst effect helps against evasive targets.",
    limitations: "Short effective range.",
  },
  {
    id: "hpaa",
    name: "HPAA",
    type: "Air-to-Air",
    function: "High-power air-to-air missile",
    bestUse: "Heavy single-target damage",
    compatible: ["f104c"],
    strength: 86,
    range: 58,
    difficulty: 50,
    notes: "Simple but very hard-hitting missile.",
    limitations: "Limited ammo and fewer tactical options.",
  },
  {
    id: "lasm",
    name: "LASM",
    type: "Air-to-Ground",
    function: "Long-range anti-ship missile",
    bestUse: "Naval targets and hardened surface units",
    compatible: ["x02s", "mirage"],
    strength: 88,
    range: 92,
    difficulty: 40,
    notes: "Heavy standoff anti-ship weapon.",
    limitations: "Less useful against fast aircraft or dispersed light ground targets.",
  },
  {
    id: "lagm",
    name: "LAGM",
    type: "Air-to-Ground",
    function: "Long-range air-to-ground missile",
    bestUse: "Standoff strikes against ground targets",
    compatible: ["su30sm"],
    strength: 82,
    range: 90,
    difficulty: 45,
    notes: "Useful for destroying targets before entering dense air defenses.",
    limitations: "Magazine size and lock timing restrict spam.",
  },
  {
    id: "ugb",
    name: "UGB",
    type: "Air-to-Ground",
    function: "Unguided bomb",
    bestUse: "Static area targets",
    compatible: ["su47", "f5e"],
    strength: 78,
    range: 15,
    difficulty: 70,
    notes: "High damage when dropped accurately.",
    limitations: "Requires overflight and manual bombing judgment.",
  },
  {
    id: "gpb",
    name: "GPB",
    type: "Air-to-Ground",
    function: "Guided penetration bomb",
    bestUse: "Precision ground strikes",
    compatible: ["su57", "f14d", "mirage"],
    strength: 80,
    range: 35,
    difficulty: 46,
    notes: "More forgiving than unguided bombs against point targets.",
    limitations: "Lower area coverage than cluster or submunition weapons.",
  },
  {
    id: "xsdb",
    name: "XSDB",
    type: "Air-to-Ground",
    function: "Advanced small diameter bomb",
    bestUse: "Multiple ground targets",
    compatible: ["f22"],
    strength: 82,
    range: 42,
    difficulty: 44,
    notes: "Allows simultaneous attacks on multiple ground targets.",
    limitations: "Best against clustered ground units rather than aircraft.",
  },
  {
    id: "sffs",
    name: "SFFS",
    type: "Air-to-Ground",
    function: "Self-forging fragment submunition",
    bestUse: "Vehicle columns and wide ground target areas",
    compatible: ["f14d"],
    strength: 84,
    range: 40,
    difficulty: 55,
    notes: "Wide dispersal pattern can wipe dense ground formations.",
    limitations: "Poor against airborne targets and requires attack angle planning.",
  },
  {
    id: "grkt",
    name: "GRKT",
    type: "Air-to-Ground",
    function: "Guided rocket launcher",
    bestUse: "Sustained attacks on ground clusters",
    compatible: ["f104c"],
    strength: 70,
    range: 38,
    difficulty: 48,
    notes: "Good for repeated passes against soft targets.",
    limitations: "Less decisive against hardened targets.",
  },
  {
    id: "tls",
    name: "TLS",
    type: "Special",
    function: "Tactical laser system",
    bestUse: "Precision line-of-sight attacks",
    compatible: ["su37", "adfx01", "adfx02", "adf11f"],
    strength: 92,
    range: 72,
    difficulty: 68,
    notes: "A signature advanced weapon in several Ace Combat super-fighter records.",
    limitations: "Requires steady aim and careful firing windows.",
  },
  {
    id: "eml",
    name: "EML",
    type: "Experimental",
    function: "Electromagnetic launcher",
    bestUse: "High-speed precision strikes",
    compatible: ["x02s", "cfa44"],
    strength: 96,
    range: 85,
    difficulty: 65,
    notes: "A railgun-like weapon capable of devastating single-shot damage.",
    limitations: "Single-shot aim and reload timing make misses costly.",
  },
  {
    id: "mpbm",
    name: "MPBM",
    type: "Experimental",
    function: "Multi-purpose burst missile",
    bestUse: "Large-area damage",
    compatible: ["adfx01", "adfx02"],
    strength: 99,
    range: 60,
    difficulty: 40,
    notes: "Morgan-family signature weapon with huge blast effect.",
    limitations: "Slow reload and extreme collateral risk.",
  },
  {
    id: "admm",
    name: "ADMM",
    type: "Special",
    function: "All-direction multi-purpose missile",
    bestUse: "Mass target saturation",
    compatible: ["cfa44"],
    strength: 88,
    range: 72,
    difficulty: 48,
    notes: "CFA-44 signature weapon capable of firing a large missile spread.",
    limitations: "Restricted to specialized airframes.",
  },
  {
    id: "iews",
    name: "IEWS",
    type: "Special",
    function: "Integrated electronic warfare system",
    bestUse: "Missile support and defense disruption",
    compatible: ["adfx01", "cfa44"],
    strength: 65,
    range: 68,
    difficulty: 50,
    notes: "Electronic warfare support instead of direct damage.",
    limitations: "Depends on surrounding engagement context.",
  },
  {
    id: "uav",
    name: "UAV",
    type: "Experimental",
    function: "Deployable unmanned attack craft",
    bestUse: "Autonomous pressure against aircraft",
    compatible: ["adf11f"],
    strength: 84,
    range: 70,
    difficulty: 55,
    notes: "Drone-era weapon associated with Raven technology.",
    limitations: "Restricted to highly advanced unmanned airframes.",
  },
  {
    id: "plsl",
    name: "PLSL",
    type: "Experimental",
    function: "Pulse laser",
    bestUse: "High-speed precision fire",
    compatible: ["f15c", "su57"],
    strength: 82,
    range: 62,
    difficulty: 62,
    notes: "Fast projectile-like laser fire with strong damage potential.",
    limitations: "Requires direct aim and sustained accuracy.",
  },
];

// helpers
export const byId = <T extends { id: ID }>(list: T[], id: ID | undefined) =>
  list.find((x) => x.id === id);

export const manyById = <T extends { id: ID }>(list: T[], ids: ID[]) =>
  ids.map((id) => byId(list, id)).filter(Boolean) as T[];

export const catalog = { aircraft, squadrons, nations, conflicts, pilots, weapons };
