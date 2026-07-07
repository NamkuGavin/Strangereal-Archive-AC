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
  era: "1990s" | "2000s" | "2010s" | "2020s" | "2040s";
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
    id: "skully-islands",
    name: "Skully Islands Insurrection",
    year: "1995",
    era: "1990s",
    nations: ["fcu", "skully-islands"],
    squadrons: ["scarface"],
    pilots: ["phoenix"],
    aircraft: ["f22", "su27", "mig29"],
    weapons: ["msl", "qaam", "xmaa"],
    summary:
      "A rebel insurrection in the Skully Islands where a well-armed militia overthrew the local government and seized military bases, refineries, and strategic facilities. The FCU military struggled to retake the island chain until Scarface Squadron was deployed.",
    result:
      "FCU/Unified Command victory; rebel forces were eliminated and the Skully Islands returned to Federation control.",
    events: [
      {
        year: "1995",
        text: "A militia force stages a coup d'état and takes control of the Skully Islands.",
      },
      {
        year: "1995",
        text: "The FCU launches repeated counterattacks but suffers setbacks from organized rebel defenses.",
      },
      {
        year: "1995-12-31",
        text: "Scarface Squadron defeats rebel forces and eliminates their base in the southern Usean island chain.",
      },
    ],
    aftermath:
      "The insurrection established Scarface Squadron's reputation and foreshadowed later Usean instability.",
  },

  {
    id: "belkan",
    name: "Belkan War",
    year: "1995",
    era: "1990s",
    nations: ["belka", "ustio", "osea", "sapin", "north-osea", "gebet", "recta"],
    squadrons: ["galm", "gault", "wizard", "sorcerer", "schnee", "espada", "gelb"],
    pilots: ["cipher", "pixy", "pj"],
    aircraft: ["f15c", "adfx01", "adfx02", "f14d", "su47", "mirage", "xb0"],
    weapons: ["msl", "xmaa", "qaam", "tls", "mpbm", "v2"],
    summary:
      "A brief but catastrophic war triggered by Belka's economic collapse, territorial resentment, and discovery of resources in Ustio. Belka launched a blitz campaign against neighboring states, but Allied Forces and Ustio's mercenary units reversed the invasion.",
    result:
      "Allied victory; Belka signed the Treaty of Lumen after detonating seven nuclear devices in the Waldreich Mountains. Later, extremist remnants formed A World With No Boundaries.",
    events: [
      {
        year: "1995-03-25",
        text: "The Belkan War begins as Belka invades Ustio, Osea, Sapin, and nearby former territories.",
      },
      {
        year: "1995-03-30",
        text: "Nearly all of Ustio falls under Belkan control, forcing Ustio to rely heavily on mercenary pilots.",
      },
      {
        year: "1995-04-01",
        text: "Ustio allies with Osea and begins organized resistance against Belka.",
      },
      {
        year: "1995-04-24",
        text: "Allied Forces launch Offensive Campaign No. 4101 to push Belka back and secure supply routes.",
      },
      {
        year: "1995-05-13",
        text: "Ustio's capital Directus is liberated from Belkan occupation.",
      },
      {
        year: "1995-05-23",
        text: "Allied Forces destroy Excalibur, Belka's anti-aircraft laser superweapon.",
      },
      {
        year: "1995-06-01",
        text: "Allied Forces bomb Hoffnung, an industrial Belkan city, deepening moral controversy around the war.",
      },
      {
        year: "1995-06-06",
        text: "Belka detonates seven nuclear weapons in the Waldreich Mountains to halt the Allied advance.",
      },
      {
        year: "1995-06-20",
        text: "The Treaty of Lumen is signed, officially ending the Belkan War.",
      },
      {
        year: "1995-12-25",
        text: "A World With No Boundaries launches a coup using the V2 launch system.",
      },
      {
        year: "1995-12-31",
        text: "Cipher defeats Pixy's ADFX-02 over Avalon Dam and prevents the V2 launch.",
      },
    ],
    aftermath:
      "Belka's defeat, partition, and humiliation created long-term resentment. Belkan conspirators later influenced the Circum-Pacific War, Usean instability, and several weapons programs.",
  },

  {
    id: "usean-coup",
    name: "Usean Coup d'état",
    year: "1997–1998",
    era: "1990s",
    nations: ["usea", "fcu", "osea"],
    squadrons: ["scarface", "lancer", "beast", "cocoon", "albireo"],
    pilots: ["phoenix"],
    aircraft: ["f22", "su35", "su37", "yf23"],
    weapons: ["msl", "qaam", "xmaa", "saam"],
    summary:
      "A large-scale coup across Usea organized by rebel extremists who opposed southern Usean countries signing a military pact with Osea. Rebel forces seized territory and military assets, forcing Unified Command to deploy Scarface Squadron.",
    result:
      "Unified Command victory; the coup was defeated through Scarface Squadron's campaign across Usea.",
    events: [
      {
        year: "1997-05-30",
        text: "Rebellion breaks out across Usea and a continent-wide coup d'état begins.",
      },
      {
        year: "1998-03-20",
        text: "Usean Rebel Forces attack Twinkle Islands, where Phoenix begins turning the tide for the Allied side.",
      },
      {
        year: "1998",
        text: "Scarface Squadron defeats multiple rebel ace units and dismantles the rebel military network.",
      },
    ],
    aftermath:
      "The conflict worsened Usean mistrust toward foreign military influence and added instability before the Ulysses disaster and Continental War.",
  },

  {
    id: "continental",
    name: "Continental War",
    year: "2003–2005",
    era: "2000s",
    nations: ["erusea", "isaf", "fcu", "san-salvacion"],
    squadrons: ["mobius", "yellow"],
    pilots: ["mobius1", "yellow13", "yellow4"],
    aircraft: ["f22", "su37"],
    weapons: ["qaam", "saam", "xmaa", "tls", "stonehenge"],
    summary:
      "A Usean war caused by post-Ulysses instability, refugee pressure, and Erusea's seizure of San Salvacion and Stonehenge. Erusea repurposed Stonehenge from an anti-asteroid railgun network into a continent-scale anti-air weapon, forcing ISAF into retreat before Mobius 1 helped reverse the war.",
    result:
      "ISAF victory; Stonehenge was destroyed, Farbanti fell, Erusea surrendered, and Megalith was destroyed after rogue Erusean officers attempted retaliation.",
    events: [
      {
        year: "1999-07-08",
        text: "Ulysses fragments devastate Usea, creating refugee and infrastructure crises.",
      },
      {
        year: "2003-Summer",
        text: "Erusea invades San Salvacion and seizes Stonehenge.",
      },
      {
        year: "2003-08-22",
        text: "FCU President Robert Sinclair establishes ISAF and demands Erusea withdraw.",
      },
      {
        year: "2003-09-14",
        text: "ISAF's first offensive against Stonehenge fails, forcing ISAF back to Los Canas.",
      },
      {
        year: "2004-09-16",
        text: "ISAF establishes headquarters at North Point and prepares a long counteroffensive.",
      },
      {
        year: "2004-11-23",
        text: "ISAF sinks Erusea's Aegir Fleet at Comberth Harbor.",
      },
      {
        year: "2004-12-31",
        text: "ISAF and Erusea clash in a large-scale air battle over the Comona Islands.",
      },
      {
        year: "2005-01-24",
        text: "ISAF lands on the Usean mainland and begins retaking territory.",
      },
      {
        year: "2005-04-02",
        text: "Mobius 1 destroys Stonehenge, breaking Erusea's air-denial advantage.",
      },
      {
        year: "2005-07-10",
        text: "ISAF liberates San Salvacion.",
      },
      {
        year: "2005-09-19",
        text: "Farbanti falls and Erusea surrenders to ISAF.",
      },
      {
        year: "2005-09-26",
        text: "Rogue Erusean officers seize Megalith, but Mobius Squadron destroys it.",
      },
    ],
    aftermath:
      "Usea remained unstable. Free Erusea insurgents continued resistance, and the continent's reconstruction later became tied to the International Space Elevator.",
  },

  {
    id: "free-erusea-2006",
    name: "Free Erusea Uprising",
    year: "2006",
    era: "2000s",
    nations: ["erusea", "isaf"],
    squadrons: ["mobius"],
    pilots: ["mobius1"],
    aircraft: ["f22", "su37", "f15c"],
    weapons: ["msl", "qaam", "xmaa"],
    summary:
      "A post-Continental War insurgency launched by Free Erusea, a network of former Erusean military officers opposed to ISAF oversight and Erusea's provisional government.",
    result: "ISAF victory; Mobius 1 defeated Free Erusea during Operation Katina.",
    events: [
      {
        year: "2006-09-26",
        text: "Free Erusea begins an armed insurrection and attacks targets across Usea.",
      },
      {
        year: "2006-09-26",
        text: "ISAF launches Operation Katina and deploys Mobius 1 with AWACS SkyEye.",
      },
      {
        year: "2006",
        text: "Mobius 1 defeats Free Erusea and ends the uprising.",
      },
    ],
    aftermath:
      "Free Erusea did not disappear completely; Erusean resentment and militarized nationalism resurfaced in later Usean conflicts.",
  },

  {
    id: "circum",
    name: "Circum-Pacific War",
    year: "2010",
    era: "2010s",
    nations: ["osea", "yuktobania", "belka", "north-osea"],
    squadrons: ["wardog", "razgriz", "grabacr", "ofnir"],
    pilots: ["blaze", "nagase", "grimm", "bartlett", "snow"],
    aircraft: ["f14d", "su47", "f15c", "arkbird"],
    weapons: ["msl", "xmaa", "lasm", "sffs", "8aam", "solg", "v2"],
    summary:
      "A large-scale Osea-Yuktobania war secretly engineered by Belkan nationalists known as the Grey Men. The war escalated from border incidents and false-flag attacks into naval battles, mainland invasions, terrorism, Arkbird weaponization, and the SOLG crisis.",
    result:
      "Osea-Yuktobania coalition victory; the Grey Men plot was exposed, Razgriz destroyed the SOLG, and peace between the superpowers was restored.",
    events: [
      {
        year: "2010-09-23",
        text: "Unidentified aircraft attack near Cape Landers, leaving Wardog Squadron with heavy losses.",
      },
      {
        year: "2010-09-27",
        text: "Yuktobania declares war on Osea and attacks Port Saint Hewlett.",
      },
      {
        year: "2010-09-30",
        text: "The Scinfaxi appears in combat and Osean carriers Vulture and Buzzard are sunk at Eaglin Straits.",
      },
      {
        year: "2010-10-04",
        text: "Wardog Squadron sinks the Scinfaxi near Sand Island.",
      },
      {
        year: "2010-10-25",
        text: "The Arkbird is sabotaged and rendered inoperable.",
      },
      {
        year: "2010-11-01",
        text: "Osea begins an invasion of the Yuktobanian mainland.",
      },
      {
        year: "2010-11-04",
        text: "Nerve gas is used in Bana and Apito International Airport is attacked, deepening the war's chaos.",
      },
      {
        year: "2010-12-07",
        text: "Wardog Squadron is framed and shot down while fleeing aboard training aircraft.",
      },
      {
        year: "2010-12-09",
        text: "President Harling is rescued from Stier Castle and Razgriz Squadron is formed.",
      },
      {
        year: "2010-12-19",
        text: "Razgriz shoots down the Arkbird after it is weaponized with a nuclear payload.",
      },
      {
        year: "2010-12-30",
        text: "Harling and Nikanor order both militaries to disarm; coalition forces raid Gründer facilities in Sudentor.",
      },
      {
        year: "2010-12-31",
        text: "Razgriz destroys Grabacr, Ofnir, and the falling SOLG above Oured.",
      },
    ],
    aftermath:
      "The war revealed Belkan manipulation through the Grey Men and transformed Razgriz into a legend. It also exposed the danger of military-industrial conspiracies and orbital weapons.",
  },

  {
    id: "emmeria-estovakia",
    name: "Emmeria-Estovakia War",
    year: "2015–2016",
    era: "2010s",
    nations: ["emmeria", "estovakia", "nordennavic"],
    squadrons: ["garuda", "strigon", "avalanche", "windhover"],
    pilots: ["talisman", "shamrock", "pasternak"],
    aircraft: ["f15e", "su33", "cfa44", "aigaion"],
    weapons: ["msl", "qaam", "xmaa", "admm", "railgun", "chandelier", "nimbus"],
    summary:
      "A major Anean war born from Estovakia's post-Ulysses collapse, civil war, military rule, and resentment toward Emmeria. Estovakia invaded Gracemeria using the Aerial Fleet and Nimbus cruise missiles, forcing Emmeria into a long retreat before Garuda Team spearheaded the counteroffensive.",
    result:
      "Emmerian victory; Gracemeria was liberated, the Aerial Fleet and Chandelier were destroyed, Estovakia's anti-government coup paralyzed the war effort, and a ceasefire followed.",
    events: [
      {
        year: "2007-06-30",
        text: "Estovakia's internal factions fall into civil war after the Lyes United Front suppresses resistance.",
      },
      {
        year: "2013-10-29",
        text: "The Estovakian Civil War ends after the Eastern Faction defeats the LUF.",
      },
      {
        year: "2015-08-30",
        text: "Estovakia invades Gracemeria; the P-1112 Aigaion and Strigon Team help overwhelm Emmerian defenses.",
      },
      {
        year: "2015-11-24",
        text: "Remaining Emmerian forces defend Vitoze from Estovakian bombers.",
      },
      {
        year: "2015-11-27",
        text: "Emmerian ground forces break through Sipli Field to begin retaking Khesed Island.",
      },
      {
        year: "2015-12-27",
        text: "Bartolomeo Fortress falls and Emmeria regains control of Khesed Island.",
      },
      {
        year: "2016-01-26",
        text: "Emmerian forces land on western Anea and establish a bridgehead.",
      },
      {
        year: "2016-02-20",
        text: "Garuda Team destroys the Aerial Fleet, restoring Emmerian air superiority.",
      },
      {
        year: "2016-03-31",
        text: "Emmeria liberates Gracemeria, but the city is targeted by cruise missiles that night.",
      },
      {
        year: "2016-04-01",
        text: "Emmerian forces destroy the Chandelier railgun on Sonne Island.",
      },
    ],
    aftermath:
      "The war ended with Estovakia's military government collapsing and Emmeria reclaiming its homeland, but Anea remained scarred by Ulysses-era instability.",
  },

  {
    id: "lighthouse",
    name: "Lighthouse War",
    year: "2019",
    era: "2010s",
    nations: ["osea", "erusea", "isaf", "iun", "shilage", "voslage"],
    squadrons: ["mage", "spare", "strider", "cyclops", "sol", "mihaly"],
    pilots: ["trigger", "count", "avril", "mihaly", "harling", "cossette"],
    aircraft: ["f15c", "f22", "x02s", "su30sm", "adf11f", "arsenal-bird"],
    weapons: ["msl", "qaam", "8aam", "eml", "uav", "xsdb", "stonehenge"],
    summary:
      "A war between Osea and Erusea over the International Space Elevator, shaped by container-launched drones, Arsenal Birds, information warfare, penal squadrons, satellite collapse, Erusean civil fragmentation, and autonomous ADF-11F aircraft.",
    result:
      "Coalition victory; the Lighthouse was recaptured, Arsenal Bird Justice and the ADF-11F drones were destroyed, and Osea and Erusea signed a ceasefire at the Expo City Conference.",
    events: [
      {
        year: "2019-05-15",
        text: "Erusea launches drone strikes against four Osean naval ports, declares war, and captures the International Space Elevator.",
      },
      {
        year: "2019-05-17",
        text: "Osea and the IUN Peacekeeping Force begin Operation Eastern Wind.",
      },
      {
        year: "2019-05-30",
        text: "Osea's two-pronged offensive toward Farbanti fails and the Kestrel II is sunk.",
      },
      {
        year: "2019-06-06",
        text: "Former President Harling dies during a failed rescue operation near the space elevator; Trigger is later blamed.",
      },
      {
        year: "2019-07",
        text: "Trigger is transferred to Spare Squadron, a penal unit used for high-risk operations.",
      },
      {
        year: "2019-08-10",
        text: "Osea forms the Long Range Strategic Strike Group to exploit a gap in Erusea's drone defense network.",
      },
      {
        year: "2019-08-19",
        text: "Osea reactivates Stonehenge and shoots down Arsenal Bird Liberty.",
      },
      {
        year: "2019-09",
        text: "Captain Matias Torres rebels with the Alicorn and attempts to force his own end to the war.",
      },
      {
        year: "2019-09-19",
        text: "Osea attacks Farbanti; satellite destruction cuts communications across Usea.",
      },
      {
        year: "2019-10-01",
        text: "Shilage and other territories annexed by Erusea declare independence, triggering internal conflict.",
      },
      {
        year: "2019-10-31",
        text: "Osean and Erusean coalition forces shoot down Arsenal Bird Justice and destroy the ADF-11F drones near the Lighthouse.",
      },
      {
        year: "2019-12-01",
        text: "Osea and Erusea sign a ceasefire at the Expo City Conference.",
      },
    ],
    aftermath:
      "Usea was left politically fractured, while autonomous drone warfare and AI-driven combat became the defining strategic threat of the era.",
  },

  {
    id: "aurelian",
    name: "Aurelian War",
    year: "2020",
    era: "2020s",
    nations: ["aurelia", "leasath"],
    squadrons: ["gryphus", "falco", "alect"],
    pilots: ["gryphus1", "navarro"],
    aircraft: ["f22", "su37", "x02", "fenrir", "gleipnir"],
    weapons: ["msl", "qaam", "xmaa", "shock-cannon", "swbm"],
    summary:
      "A South Osean conflict where Leasath invaded Aurelia after years of civil war and economic collapse. Diego Gaspar Navarro justified the invasion as retaliation for alleged exploitation, while secretly tying the war to weapons development and arms profiteering.",
    result:
      "Aurelian victory; Gryphus Squadron reversed Leasath's occupation, destroyed the Gleipnir and Archelon Fortress, liberated Griswall, and removed Navarro from power.",
    events: [
      {
        year: "2019",
        text: "The Leasath Civil War ends after roughly a decade of fighting, leaving Navarro in power.",
      },
      {
        year: "2020-10",
        text: "Leasath invades Aurelia using the Gleipnir aerial fortress and captures most of the country.",
      },
      {
        year: "2020-10",
        text: "Gryphus Squadron repels Leasath's attack on Aubrey Base, one of Aurelia's last surviving bases.",
      },
      {
        year: "2020-11",
        text: "Aurelian forces retake Port Patterson.",
      },
      {
        year: "2020-11",
        text: "Aurelia disables Gleipnir's stealth system and shoots down the aerial fortress, liberating Santa Elva.",
      },
      {
        year: "2020-12",
        text: "Aurelia retakes Sachana Air Base in the Raven Woods.",
      },
      {
        year: "2020-12",
        text: "Aurelian forces liberate Griswall while Leasath regroups at Archelon Fortress.",
      },
      {
        year: "2020-12",
        text: "Gryphus Squadron destroys Archelon Fortress and ends the war.",
      },
    ],
    aftermath:
      "Leasath's military regime collapsed, Navarro was removed, and Aurelia survived as an independent state after near-total occupation.",
  },

  {
    id: "corporate",
    name: "Corporate War",
    year: "2040",
    era: "2040s",
    nations: ["upeo", "general-resource", "neucom", "ouroboros"],
    squadrons: ["sarf"],
    pilots: ["nemo", "rena", "dision", "erich", "fiona", "cynthia"],
    aircraft: ["su37", "f22", "r101", "x49"],
    weapons: ["msl", "qaam", "laser", "electrosphere"],
    summary:
      "A simulated 2040 conflict from Ace Combat 3: Electrosphere, centered on the collapse of state authority in Usea and the rise of megacorporations General Resource and Neucom. UPEO attempts peacekeeping while Ouroboros manipulates the conflict through transhumanist and Electrosphere-related ambitions.",
    result:
      "Variable outcome depending on player route; in all simulated routes, Abyssal Dision dies. The simulation is used by Simon Orestes Cohen to test Dision's fate before Nemo is released into the real world.",
    events: [
      {
        year: "2036",
        text: "A General Resource control system failure sparks economic conflict with Neucom.",
      },
      {
        year: "2040",
        text: "Tensions between General Resource and Neucom erupt into the Faith Park Dispute.",
      },
      {
        year: "2040",
        text: "Neucom begins large-scale military operations against General Resource.",
      },
      {
        year: "2040",
        text: "UPEO's SARF conducts peacekeeping operations to contain the corporate war.",
      },
      {
        year: "2040",
        text: "Ceasefire negotiations repeatedly fail as both corporations exploit loopholes and launch covert attacks.",
      },
      {
        year: "2040",
        text: "Ouroboros emerges, led by the digital copy of Abyssal Dision, and stages a coup.",
      },
      {
        year: "2040",
        text: "Neucom, General Resource, and UPEO form an ad-hoc alliance against Ouroboros.",
      },
    ],
    aftermath:
      "The conflict frames Ace Combat 3's cyberpunk future: megacorporate militaries, weakened national governments, AI pilots, and consciousness uploaded into the Electrosphere.",
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
