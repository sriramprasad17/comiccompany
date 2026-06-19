// Helper to generate dynamic, high-fidelity SVG panel graphics programmatically
// This ensures that all 14 books have 5 distinct, high-quality, and themed visual panels.
function generatePanelSVG(genre, page, title) {
  let bgColor = '#0f172a';
  let primaryColor = '#ff3333';
  let secondaryColor = '#9d4edd';
  let pathD = '';
  let extraElements = '';

  if (genre === 'Marvel') {
    bgColor = '#1e1b4b';
    primaryColor = '#ef4444'; // Marvel Red
    secondaryColor = '#3b82f6'; // Spider-man Blue
    if (title.includes('Spider-Man')) {
      pathD = 'M50 100 H150 M100 50 V150 M65 65 L135 135 M65 135 L135 65'; // web
      extraElements = `<circle cx="100" cy="100" r="${20 + page * 5}" stroke="${primaryColor}" stroke-width="2" fill="none" opacity="0.3"/>`;
    } else if (title.includes('Iron Man')) {
      primaryColor = '#f59e0b'; // Gold
      secondaryColor = '#ef4444'; // Hot Rod Red
      pathD = 'M100 60 L80 90 H120 Z'; // triangular chest repulsor
      extraElements = `<circle cx="100" cy="90" r="${15 + page * 3}" fill="#fff" filter="drop-shadow(0 0 8px #ff3333)"/>`;
    } else if (title.includes('Wolverine')) {
      primaryColor = '#eab308'; // Yellow
      secondaryColor = '#1d4ed8'; // Blue
      pathD = 'M60 40 L65 160 M100 40 L100 160 M140 40 L135 160'; // three claws slash
      extraElements = `<path d="M40 100 L160 100" stroke="#ef4444" stroke-width="8" opacity="0.15"/>`;
    } else if (title.includes('Captain America')) {
      primaryColor = '#3b82f6'; // Captain America Blue
      secondaryColor = '#ef4444'; // Red
      pathD = 'M100 50 A50 50 0 1 0 100 150 A50 50 0 1 0 100 50 Z'; // Shield outer ring
      extraElements = `<circle cx="100" cy="100" r="35" stroke="#fff" stroke-width="6" fill="none"/>
                      <circle cx="100" cy="100" r="20" fill="#3b82f6"/>
                      <polygon points="100,85 105,95 115,95 107,102 110,112 100,105 90,112 93,102 85,95 95,95" fill="#fff"/>`;
    } else if (title.includes('Thor')) {
      primaryColor = '#22d3ee'; // Lightning Cyan
      secondaryColor = '#94a3b8'; // Hammer Silver
      pathD = 'M80 70 H120 V110 H80 Z M100 110 V150'; // Mjolnir simple shape
      extraElements = `<path d="M50 80 L80 90 M150 80 L120 90 M70 140 L90 120 M130 140 L110 120" stroke="#22d3ee" stroke-width="2" opacity="0.8"/>`;
    } else {
      // Avengers
      primaryColor = '#3b82f6';
      secondaryColor = '#fff';
      pathD = 'M100 40 L70 140 H95 L100 110 H115 L100 40 Z'; // A logo
      extraElements = `<circle cx="100" cy="100" r="60" stroke="${primaryColor}" stroke-width="6" fill="none"/>`;
    }
  } else if (genre === 'DC') {
    bgColor = '#090514';
    primaryColor = '#1e1b4b'; // Deep Dark
    secondaryColor = '#eab308'; // Batman Yellow
    if (title.includes('Batman')) {
      pathD = 'M60 100 C80 90 90 70 100 100 C110 70 120 90 140 100 C120 120 80 120 60 100 Z'; // bat symbol
      extraElements = `<circle cx="100" cy="100" r="50" fill="none" stroke="${secondaryColor}" stroke-width="2" stroke-dasharray="4 4"/>`;
    } else if (title.includes('Superman')) {
      primaryColor = '#ef4444';
      secondaryColor = '#2563eb';
      pathD = 'M100 40 L150 70 V130 L100 160 L50 130 V70 Z'; // S shield pentagon
      extraElements = `<text x="90" y="115" fill="${primaryColor}" font-family="sans-serif" font-weight="900" font-size="40">S</text>`;
    } else if (title.includes('Wonder Woman')) {
      primaryColor = '#eab308'; // Gold
      secondaryColor = '#ef4444'; // Red
      pathD = 'M60 70 L100 110 L140 70 L160 130 H40 Z'; // W symbol
      extraElements = `<circle cx="100" cy="100" r="${30 + page * 8}" stroke="${primaryColor}" stroke-width="2" stroke-dasharray="2 3" fill="none"/>`;
    } else if (title.includes('Green Lantern')) {
      primaryColor = '#10b981'; // Green Lantern Emerald
      secondaryColor = '#064e3b';
      pathD = 'M100 70 A30 30 0 1 0 100 130 A30 30 0 1 0 100 70 Z M70 70 H130 M70 130 H130'; // Ring / lantern shape
      extraElements = `<circle cx="100" cy="100" r="15" fill="#10b981" filter="drop-shadow(0 0 10px #10b981)"/>`;
    } else {
      // Flash
      primaryColor = '#f59e0b'; // Gold lightning
      secondaryColor = '#dc2626'; // Lightning Red
      pathD = 'M120 30 L60 110 H110 L90 170 L150 90 H100 Z'; // lightning bolt
      extraElements = `<circle cx="100" cy="100" r="50" stroke="${primaryColor}" stroke-width="4" fill="none"/>`;
    }
  } else if (genre === 'Disney') {
    bgColor = '#fffbeb'; // friendly bright
    primaryColor = '#3b82f6';
    secondaryColor = '#f43f5e';
    if (title.includes('Mickey')) {
      pathD = 'M100 70 C80 50 60 70 80 90 C90 100 110 100 120 90 C140 70 120 50 100 70 Z'; // mickey head mask
      extraElements = `<circle cx="65" cy="65" r="18" fill="#000"/><circle cx="135" cy="65" r="18" fill="#000"/><circle cx="100" cy="100" r="30" fill="#000"/>`;
    } else if (title.includes('Donald')) {
      primaryColor = '#0284c7'; // Sailor Blue
      secondaryColor = '#ea580c'; // Orange bill
      pathD = 'M60 120 Q100 80 140 120 Z'; // sailor hat
      extraElements = `<circle cx="100" cy="100" r="35" fill="#fff" stroke="#0284c7" stroke-width="4"/><polygon points="90,105 110,105 100,130" fill="${secondaryColor}"/>`;
    } else if (title.includes('Aladdin')) {
      primaryColor = '#8b5cf6'; // Genie Purple
      secondaryColor = '#fbbf24'; // Magic Lamp Gold
      pathD = 'M60 120 Q100 90 140 120 L160 100 H40 Z'; // magic carpet
      extraElements = `<ellipse cx="100" cy="90" rx="30" ry="12" fill="${secondaryColor}" stroke="#b45309" stroke-width="2"/>`;
    } else if (title.includes('Frozen')) {
      primaryColor = '#38bdf8'; // Ice Blue
      secondaryColor = '#e0f2fe';
      pathD = 'M100 50 V150 M50 100 H150 M65 65 L135 135 M65 135 L135 65'; // Ice star
      extraElements = `<circle cx="100" cy="100" r="${15 + page * 4}" stroke="${primaryColor}" stroke-width="2" fill="none" opacity="0.5"/>`;
    } else {
      // Lion King
      primaryColor = '#ea580c'; // savannah sun
      secondaryColor = '#b45309';
      pathD = 'M100 40 A60 60 0 1 0 100 160 A60 60 0 1 0 100 40 Z'; // sun outline
      extraElements = `<circle cx="100" cy="100" r="45" fill="${primaryColor}" opacity="0.8"/><path d="M70 120 Q100 80 130 120" stroke="${secondaryColor}" stroke-width="6" stroke-linecap="round"/>`;
    }
  } else if (genre === 'Fantasy') {
    bgColor = '#06130d';
    primaryColor = '#10b981'; // Magic Green
    secondaryColor = '#fbbf24'; // Relic Gold
    pathD = 'M100 30 L60 170 H140 Z'; // Spire triangle
    extraElements = `<polygon points="100,60 110,90 100,120 90,90" fill="${secondaryColor}" filter="drop-shadow(0 0 12px ${secondaryColor})"/>`;
  } else if (genre === 'Adventure') {
    bgColor = '#062016'; // Deep jungle green
    primaryColor = '#f59e0b'; // Amber Gold
    secondaryColor = '#10b981'; // Emerald Green
    if (title.includes('Indiana Jones') || title.includes('Lost City')) {
      pathD = 'M100 50 A30 30 0 1 0 100 110 A30 30 0 1 0 100 50 Z'; // compass
      extraElements = `<line x1="100" y1="80" x2="100" y2="55" stroke="#fbbf24" stroke-width="4" stroke-linecap="round"/>
                      <polygon points="96,82 104,82 100,70" fill="#ef4444"/>`;
    } else if (title.includes('Tomb Raider')) {
      pathD = 'M60 140 L100 60 L140 140 Z'; // tomb triangle
      extraElements = `<circle cx="100" cy="105" r="10" fill="#10b981" filter="drop-shadow(0 0 8px #10b981)"/>`;
    } else {
      pathD = 'M50 130 Q100 60 150 130'; // mountain outline
      extraElements = `<circle cx="130" cy="80" r="12" fill="#fbbf24"/>`;
    }
  } else if (genre === 'Crime Thriller') {
    bgColor = '#0c0a0f'; // Dark City Night
    primaryColor = '#ef4444'; // Laser red
    secondaryColor = '#eab308'; // Caution yellow
    if (title.includes('Detective') || title.includes('Sherlock')) {
      pathD = 'M80 80 A20 20 0 1 0 120 80 A20 20 0 1 0 80 80 M115 95 L145 125'; // magnifying glass
      extraElements = `<circle cx="100" cy="80" r="8" fill="#fff" opacity="0.2"/>
                      <path d="M40 40 L160 160" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 3"/>`;
    } else if (title.includes('Sin City')) {
      pathD = 'M40 150 H160 V170 H40 Z'; // city skyline
      extraElements = `<rect x="70" y="90" width="8" height="60" fill="#ef4444"/>
                      <path d="M110 50 L130 150" stroke="#fbbf24" stroke-width="8" opacity="0.1"/>`;
    } else {
      pathD = 'M40 80 H160 M40 110 H160'; // police line tape lines
      extraElements = `<text x="50" y="95" fill="#eab308" font-family="monospace" font-weight="bold" font-size="8">CRIME SCENE</text>`;
    }
  } else {
    // Horror
    bgColor = '#09050d';
    primaryColor = '#7f1d1d'; // Crimson
    secondaryColor = '#000000';
    pathD = 'M50 140 Q100 80 150 140 V200 H50 Z'; // creepy window arch
    extraElements = `<circle cx="85" cy="110" r="4" fill="#ef4444"/><circle cx="115" cy="115" r="4" fill="#ef4444"/><path d="M20 200 Q50 130 80 200" stroke="#000" stroke-width="6"/>`;
  }

  return `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="200" fill="${bgColor}"/>
    <path d="${pathD}" stroke="${primaryColor}" stroke-width="3" stroke-linecap="round" fill="none"/>
    ${extraElements}
    <text x="10" y="190" fill="rgba(255,255,255,0.15)" font-family="monospace" font-size="8">PAGE ${page} PANEL</text>
  </svg>`;
}

// Expanded Mock Comic Database
export const COMICS_DATABASE = [
  // ================= MARVEL BOOKS =================
  {
    id: 'spider-man-web',
    title: 'Spider-Man: Web of Shadows',
    author: 'Stan Lee & Steve Ditko',
    category: 'Marvel',
    cover: '/assets/cover_spiderman.png',
    rating: 4.9,
    reviews: 512,
    pages: 5,
    synopsis: 'A mysterious symbiote outbreak is spreading across Manhattan. As Spider-Man fights to protect his city, he is forced to make a difficult choice: stick to his moral code, or harness the dark strength of the black suit to stop the symbiote hive once and for all.',
    panels: [
      {
        page: 1,
        label: 'Spider-Man swings through the high-rise skyscrapers of Manhattan.',
        bubbles: [
          { text: 'Another day, another swing. The city looks quiet from up here...', position: 'bubble-top-left' },
          { text: 'Wait! What is that purple goo growing on the Chrysler Building?', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Marvel', 1, 'Spider-Man')
      },
      {
        page: 2,
        label: 'A dark symbiote cluster attacks him, attempting to bond.',
        bubbles: [
          { text: 'Ugh! It is alive! It is trying to crawl under my mask!', position: 'bubble-top-right' },
          { text: 'Let go of me, you alien sludge!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Marvel', 2, 'Spider-Man')
      },
      {
        page: 3,
        label: 'Spider-Man yields to the black symbiote suit, transforming.',
        bubbles: [
          { text: 'The strength... it is overwhelming. I feel... unstoppable.', position: 'bubble-top-left' },
          { text: 'No, Peter! Resist it! The suit is corrupting you!', position: 'bubble-top-right' }
        ],
        svg: generatePanelSVG('Marvel', 3, 'Spider-Man')
      },
      {
        page: 4,
        label: 'Symbiote Spider-Man slams Venom into a concrete wall.',
        bubbles: [
          { text: 'Is this all you got, Brock? I thought you were stronger!', position: 'bubble-top-left' },
          { text: 'You fool! The suit is only using you to destroy us!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Marvel', 4, 'Spider-Man')
      },
      {
        page: 5,
        label: 'He rips the symbiote off, restoring the red-and-blue suit.',
        bubbles: [
          { text: 'Get... off... of... ME! I am Spider-Man!', position: 'bubble-top-left' },
          { text: 'He did it. The hero has returned. Tomorrow is a new fight.', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Marvel', 5, 'Spider-Man')
      }
    ]
  },
  {
    id: 'ironman-armor',
    title: 'Iron Man: Armor Wars',
    author: 'David Michelinie',
    category: 'Marvel',
    cover: '/assets/cover_ironman.svg',
    rating: 4.7,
    reviews: 189,
    pages: 5,
    synopsis: 'Tony Stark discovers that his top-secret armor technology has been stolen and sold to corporate villains. To protect his legacy and the world, Iron Man embarks on a global manhunt to neutralize anyone using his tech, even if it puts him in conflict with the government.',
    panels: [
      {
        page: 1,
        label: 'Tony Stark monitors stolen tech signals in the lab.',
        bubbles: [
          { text: 'My designs... leaked on the dark net. This is bad.', position: 'bubble-top-left' },
          { text: 'Jarvis, trace the encryption signature. Find out who sold my armor!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Marvel', 1, 'Iron Man')
      },
      {
        page: 2,
        label: 'Iron Man flies to Tokyo tracking a rogue buyer.',
        bubbles: [
          { text: 'Signal locked. He is in the warehouse district.', position: 'bubble-top-right' },
          { text: 'Let us see how their copied armor stands against the original!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Marvel', 2, 'Iron Man')
      },
      {
        page: 3,
        label: 'Iron Man faces a corporate mech using repulsor jets.',
        bubbles: [
          { text: 'Target acquired. Repulsor charge at 80%!', position: 'bubble-top-left' },
          { text: 'Initiate tech-negator pulse! Shut them down!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Marvel', 3, 'Iron Man')
      },
      {
        page: 4,
        label: 'Rogue mech crashes down, its armor deactivated.',
        bubbles: [
          { text: 'No! My circuits... completely fried!', position: 'bubble-top-right' },
          { text: 'Your armor is Stark tech. And I am taking it back.', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Marvel', 4, 'Iron Man')
      },
      {
        page: 5,
        label: 'Tony Stark locks the stolen cores inside Wayne Manor vault.',
        bubbles: [
          { text: 'Five databases cleared. Three more to go.', position: 'bubble-top-left' },
          { text: 'This war is far from over. I will secure my tech at all costs.', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Marvel', 5, 'Iron Man')
      }
    ]
  },
  {
    id: 'wolverine-x',
    title: 'Wolverine: Weapon X',
    author: 'Barry Windsor-Smith',
    category: 'Marvel',
    cover: '/assets/cover_wolverine.svg',
    rating: 4.8,
    reviews: 322,
    pages: 5,
    synopsis: 'Kidnapped by a clandestine military research group, Logan is subjected to a painful surgical experiment to bond indestructible Adamantium to his skeleton. The experiment succeeds, but they unleash a feral weapon they cannot control.',
    panels: [
      {
        page: 1,
        label: 'Logan is submerged inside a green chemical tube.',
        bubbles: [
          { text: 'Subject Logan... vitals spikes high. Commencing bonding.', position: 'bubble-top-left' },
          { text: 'Aaaargh! The metal... it feels like liquid fire!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Marvel', 1, 'Wolverine')
      },
      {
        page: 2,
        label: 'The adamantium bonding completes. Logan goes feral.',
        bubbles: [
          { text: 'Warning! Neural override failing! He is breaking free!', position: 'bubble-top-right' },
          { text: 'SNIKT! Claws extended!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Marvel', 2, 'Wolverine')
      },
      {
        page: 3,
        label: 'Wolverine slices through the laboratory security locks.',
        bubbles: [
          { text: 'Fire! Shoot him down! He is moving too fast!', position: 'bubble-top-left' },
          { text: 'Nothing stands in my way. Nothing!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Marvel', 3, 'Wolverine')
      },
      {
        page: 4,
        label: 'Wolverine escapes into the snowy Canadian mountains.',
        bubbles: [
          { text: 'The facility is in ruins. Logan has vanished into the storm.', position: 'bubble-top-right' },
          { text: 'I am Logan. And I am the best at what I do.', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Marvel', 4, 'Wolverine')
      },
      {
        page: 5,
        label: 'Wolverine looks back at the burning military complex.',
        bubbles: [
          { text: 'They tried to turn me into a monster. A mindless beast.', position: 'bubble-top-left' },
          { text: 'They failed. I am free.', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Marvel', 5, 'Wolverine')
      }
    ]
  },

  // ================= DC BOOKS =================
  {
    id: 'batman-knightfall',
    title: 'Batman: Knightfall',
    author: 'Bob Kane & Bill Finger',
    category: 'DC',
    cover: '/assets/cover_batman.png',
    rating: 4.8,
    reviews: 423,
    pages: 5,
    synopsis: 'Bane has orchestrated a mass breakout from Arkham Asylum, exhausting Batman to his physical limits. As the Dark Knight forces himself to round up the criminals, Bane waits in the shadows of Wayne Manor to execute his final crushing blow.',
    panels: [
      {
        page: 1,
        label: 'Batman patrols the dark rooftops of Gotham City in rain.',
        bubbles: [
          { text: 'Arkham has fallen. Joker, Crane, Nygma... they are all out.', position: 'bubble-top-left' },
          { text: 'I am exhausted. But Gotham needs its protector.', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('DC', 1, 'Batman')
      },
      {
        page: 2,
        label: 'Batman returns to the Batcave, confronted by Bane.',
        bubbles: [
          { text: 'Who... who are you? How did you get down here?!', position: 'bubble-top-right' },
          { text: 'I am Bane. I am Gotham’s reckoning. And I have come to break you.', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('DC', 2, 'Batman')
      },
      {
        page: 3,
        label: 'Bane lifts Batman over his head, prepare to strike.',
        bubbles: [
          { text: 'Your utility belt cannot save you now, Bruce Wayne!', position: 'bubble-top-left' },
          { text: 'No... my spine... I cannot move...', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('DC', 3, 'Batman')
      },
      {
        page: 4,
        label: 'Bane breaks Batman’s back over his knee.',
        bubbles: [
          { text: 'CRACK!', position: 'bubble-top-left' },
          { text: 'Gotham is mine! The Batman is broken!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('DC', 4, 'Batman')
      },
      {
        page: 5,
        label: 'Bane stands victorious, throwing the cowl onto Gotham’s streets.',
        bubbles: [
          { text: 'Without Batman, Gotham belongs to the shadows.', position: 'bubble-top-right' },
          { text: 'A new Dark Knight must rise... but who?', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('DC', 5, 'Batman')
      }
    ]
  },
  {
    id: 'superman-steel',
    title: 'Superman: Man of Steel',
    author: 'Jerry Siegel & Joe Shuster',
    category: 'DC',
    cover: '/assets/cover_superman.svg',
    rating: 4.9,
    reviews: 302,
    pages: 5,
    synopsis: 'A gigantic meteoric crystal of red Kryptonite is heading towards Metropolis. Under its chaotic radiation, Superman’s powers fluctuate wildly. Lex Luthor seizes the opportunity to deploy a Kryptonian-killer mech to eliminate the weakened hero.',
    panels: [
      {
        page: 1,
        label: 'Superman flies above Metropolis watching the meteor crash.',
        bubbles: [
          { text: 'The meteor... it is glowing bright red. Kryptonite!', position: 'bubble-top-left' },
          { text: 'Ugh... my vision is blurring. My strength... is fading!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('DC', 1, 'Superman')
      },
      {
        page: 2,
        label: 'Lex Luthor launches the mech from LexCorp penthouse.',
        bubbles: [
          { text: 'The Kryptonian is weak! Launch the mech immediately!', position: 'bubble-top-right' },
          { text: 'Today, the world learns that humanity doesn’t need a god.', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('DC', 2, 'Superman')
      },
      {
        page: 3,
        label: 'Superman clashes with the LexCorp mech in mid-air.',
        bubbles: [
          { text: 'Your energy shields are failing, Superman! Give up!', position: 'bubble-top-left' },
          { text: 'I... will never... yield Metropolis to you, Luthor!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('DC', 3, 'Superman')
      },
      {
        page: 4,
        label: 'Superman gathers his remaining strength for a final punch.',
        bubbles: [
          { text: 'Just one... clean hit. Commencing core overload!', position: 'bubble-top-right' },
          { text: 'SMAAAASH!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('DC', 4, 'Superman')
      },
      {
        page: 5,
        label: 'The mech explodes as Superman flies the meteor into deep space.',
        bubbles: [
          { text: 'The city is safe. The meteor is pushed out of orbit.', position: 'bubble-top-left' },
          { text: 'Superman has won. Metropolis remains under the protection of the Man of Steel.', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('DC', 5, 'Superman')
      }
    ]
  },
  {
    id: 'flash-point',
    title: 'The Flash: Flashpoint',
    author: 'Geoff Johns',
    category: 'DC',
    cover: '/assets/cover_flash.svg',
    rating: 4.8,
    reviews: 298,
    pages: 5,
    synopsis: 'Barry Allen wakes up in a completely different timeline. His mother is alive, he has no speed powers, and a brutal war between Aquaman’s Atlantis and Wonder Woman’s Themyscira is tearing the world apart. Barry must recover his speed to reset history.',
    panels: [
      {
        page: 1,
        label: 'Barry Allen wakes up in his office, realizing things are wrong.',
        bubbles: [
          { text: 'Mom? You are alive? But... how?', position: 'bubble-top-left' },
          { text: 'And my ring... it is empty. I don’t have my suit. I don’t have my speed!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('DC', 1, 'Flash')
      },
      {
        page: 2,
        label: 'Barry seeks help from a cynical, older Batman (Thomas Wayne).',
        bubbles: [
          { text: 'You are not Bruce... you are his father! Bruce died in Crime Alley?', position: 'bubble-top-right' },
          { text: 'This timeline is broken, kid. And I am going to help you fix it.', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('DC', 2, 'Flash')
      },
      {
        page: 3,
        label: 'Barry sits in an electric chair to recreate his speed accident.',
        bubbles: [
          { text: 'Pull the lever, Batman! Recreate the lightning strike!', position: 'bubble-top-left' },
          { text: 'Zap! Electricity surges through his veins!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('DC', 3, 'Flash')
      },
      {
        page: 4,
        label: 'The Flash runs faster than light, breaching the Speed Force.',
        bubbles: [
          { text: 'It worked! I can feel the Speed Force! I am running out of time!', position: 'bubble-top-right' },
          { text: 'I need to run faster! Save the future! Reset the world!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('DC', 4, 'Flash')
      },
      {
        page: 5,
        label: 'The timeline merges as Barry Allen delivers a letter to Bruce Wayne.',
        bubbles: [
          { text: 'A letter from your father... he wanted you to have this.', position: 'bubble-top-left' },
          { text: 'Thank you, Barry. You are the fastest man alive.', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('DC', 5, 'Flash')
      }
    ]
  },

  // ================= DISNEY BOOKS =================
  {
    id: 'mickey-mouse-magic',
    title: 'Mickey Mouse & The Magic Glove',
    author: 'Walt Disney',
    category: 'Disney',
    cover: '/assets/cover_mickey.png',
    rating: 4.7,
    reviews: 312,
    pages: 5,
    synopsis: 'Mickey finds a magical white glove inside Yen Sid’s sorcery tower. But the glove has a mischievous mind of its own, turning the entire magic workshop upside down! Mickey must find a counter-spell before the wizard returns.',
    panels: [
      {
        page: 1,
        label: 'Mickey explores the wizard’s study room, spotting the glove.',
        bubbles: [
          { text: 'Gosh! Look at that sparkly white glove on the pedestal!', position: 'bubble-top-left' },
          { text: 'Yen Sid said not to touch anything... but just one quick try won’t hurt!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Disney', 1, 'Mickey')
      },
      {
        page: 2,
        label: 'Mickey wears the glove, triggering floaty spells.',
        bubbles: [
          { text: 'Aha! It fits perfectly! Wait... why are my ears tingling?', position: 'bubble-top-right' },
          { text: 'Oh no! The books are starting to float!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Disney', 2, 'Mickey')
      },
      {
        page: 3,
        label: 'The glove starts dragging Mickey around the room.',
        bubbles: [
          { text: 'Whoa! Stop! Not that way! The wizard’s crystal vase!', position: 'bubble-top-left' },
          { text: 'Help! The glove has its own gravity!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Disney', 3, 'Mickey')
      },
      {
        page: 4,
        label: 'Mickey reads the counter-spell book just in time.',
        bubbles: [
          { text: 'Okay, page 42... "To calm the glove, tickle the palm!"', position: 'bubble-top-right' },
          { text: 'Haha! Tickle tickle! It is working!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Disney', 4, 'Mickey')
      },
      {
        page: 5,
        label: 'The glove falls asleep, and Mickey puts it back safely.',
        bubbles: [
          { text: 'Phew! Safe and sound on the table.', position: 'bubble-top-left' },
          { text: 'A close call... I think I will stick to cheese and crackers for now!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Disney', 5, 'Mickey')
      }
    ]
  },
  {
    id: 'donald-treasure',
    title: 'Donald Duck: Treasure of the Andes',
    author: 'Carl Barks',
    category: 'Disney',
    cover: '/assets/cover_donald.svg',
    rating: 4.6,
    reviews: 145,
    pages: 5,
    synopsis: 'Uncle Scrooge recruits Donald Duck and his nephews Huey, Dewey, and Louie for an expedition to search for the legendary gold coins of the Incan Empire. But a group of rival bandits are tailing them into the deep mountain cliffs!',
    panels: [
      {
        page: 1,
        label: 'Scrooge shows Donald a map of the Andes mountains.',
        bubbles: [
          { text: 'Look here, Donald! The lost valley of gold is in Sector 4!', position: 'bubble-top-left' },
          { text: 'Aw, phooey! Why do I always have to carry the heavy backpacks?', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Disney', 1, 'Donald')
      },
      {
        page: 2,
        label: 'Donald and the nephews climb a rope bridge across a canyon.',
        bubbles: [
          { text: 'Careful, Uncle Donald! The bridge looks super old!', position: 'bubble-top-right' },
          { text: 'Waah! The rope is snapping! Help!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Disney', 2, 'Donald')
      },
      {
        page: 3,
        label: 'Donald slips and falls, landing directly inside a gold vault.',
        bubbles: [
          { text: 'Ouch! My feathers! Where am I?', position: 'bubble-top-left' },
          { text: 'Moly! Uncle Donald found the golden vault of the Incas!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Disney', 3, 'Donald')
      },
      {
        page: 4,
        label: 'Scrooge swims in Incan gold coins while bandits engage.',
        bubbles: [
          { text: 'Gold! Beautiful ancient gold coins! Mine!', position: 'bubble-top-right' },
          { text: 'Not so fast, ducks! Hand over the gold!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Disney', 4, 'Donald')
      },
      {
        page: 5,
        label: 'Donald triggers a boulder trap, chasing the bandits away.',
        bubbles: [
          { text: 'Who is laughing now, you crooks? Run!', position: 'bubble-top-left' },
          { text: 'Another successful adventure. Good job, Donald!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Disney', 5, 'Donald')
      }
    ]
  },
  {
    id: 'aladdin-lamp',
    title: 'Aladdin & The Magic Lamp',
    author: 'Arabian Nights',
    category: 'Disney',
    cover: '/assets/cover_aladdin.svg',
    rating: 4.8,
    reviews: 211,
    pages: 5,
    synopsis: 'Trapped inside the Cave of Wonders by the evil Jafar, street-thief Aladdin rubs a dusty brass lamp and releases a cosmic Genie who offers him three magic wishes. Can Aladdin win the heart of Princess Jasmine and escape the cave?',
    panels: [
      {
        page: 1,
        label: 'Aladdin is locked inside the treasure cave with Abu.',
        bubbles: [
          { text: 'Jafar betrayed us... we are trapped forever!', position: 'bubble-top-left' },
          { text: 'Squeak! Abu points to a dusty golden lamp on the floor.', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Disney', 1, 'Aladdin')
      },
      {
        page: 2,
        label: 'Aladdin rubs the lamp, releasing purple smoke.',
        bubbles: [
          { text: 'It has some writing... let me clean it. Rub rub.', position: 'bubble-top-right' },
          { text: 'POOF! Ethereal purple smoke explodes from the nozzle!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Disney', 2, 'Aladdin')
      },
      {
        page: 3,
        label: 'The giant Genie materializes inside the cavern.',
        bubbles: [
          { text: 'Ten thousand years in a lamp gives you such a crick in the neck!', position: 'bubble-top-left' },
          { text: 'You are... a genie? And I get three wishes?', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Disney', 3, 'Aladdin')
      },
      {
        page: 4,
        label: 'Aladdin wishes to be a prince, flying on the magic carpet.',
        bubbles: [
          { text: 'Wish number one: Make me a prince! Let us leave this cave!', position: 'bubble-top-right' },
          { text: 'You got it, kid! Hang onto your carpet!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Disney', 4, 'Aladdin')
      },
      {
        page: 5,
        label: 'Aladdin and Jasmine fly over Agrabah under a starry sky.',
        bubbles: [
          { text: 'Do you trust me, Jasmine?', position: 'bubble-top-left' },
          { text: 'A whole new world... it is beautiful.', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Disney', 5, 'Aladdin')
      }
    ]
  },

  // ================= FANTASY BOOKS =================
  {
    id: 'chronicles-aethelgard',
    title: 'Chronicles of Aethelgard: The Broken Relic',
    author: 'Lyra Moonstone',
    category: 'Fantasy',
    cover: '/assets/cover_fantasy.png',
    rating: 4.9,
    reviews: 204,
    pages: 5,
    synopsis: 'The ancient magical barrier protecting Aethelgard has shattered. An adventurous young mage named Valen must journey into the Whispering Woods to recover the shards of the Solar Relic, before the Shadow Lords consume the realm.',
    panels: [
      {
        page: 1,
        label: 'Valen stands before the ancient ruins of the Solar Spire.',
        bubbles: [
          { text: 'The spire... it has completely collapsed. The wards are gone.', position: 'bubble-top-left' },
          { text: 'I can feel the dark magic creeping in from the border.', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Fantasy', 1, 'Aethelgard')
      },
      {
        page: 2,
        label: 'Valen enters the Whispering Woods, greeted by spirits.',
        bubbles: [
          { text: 'Who goes there? A mortal dares enter the Whispering Woods?', position: 'bubble-top-right' },
          { text: 'I am Valen of the Spire. I seek the first shard of the Solar Relic!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Fantasy', 2, 'Aethelgard')
      },
      {
        page: 3,
        label: 'Valen fights off a shadow beast using light magic.',
        bubbles: [
          { text: 'Valen, watch out! The shadow beast strikes!', position: 'bubble-top-left' },
          { text: 'Lux Aeterna! Dissolve the shadows!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Fantasy', 3, 'Aethelgard')
      },
      {
        page: 4,
        label: 'Valen finds the first Relic shard glowing inside an ancient tree.',
        bubbles: [
          { text: 'There it is! The Sol-Shard. It still radiates heat.', position: 'bubble-top-right' },
          { text: 'But it is guarded by a spell... I must channel my own life force.', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Fantasy', 4, 'Aethelgard')
      },
      {
        page: 5,
        label: 'Valen recovers the Sol-Shard as a dark figure watches from the canopy.',
        bubbles: [
          { text: 'One shard down. Three more to go.', position: 'bubble-top-left' },
          { text: 'Foolish boy. You are only collecting them for me.', position: 'bubble-top-right' }
        ],
        svg: generatePanelSVG('Fantasy', 5, 'Aethelgard')
      }
    ]
  },

  // ================= HORROR BOOKS =================
  {
    id: 'whispering-shadows',
    title: 'The Whispering Shadows',
    author: 'Frank Miller Jr.',
    category: 'Horror',
    cover: '/assets/cover_horror.png',
    rating: 4.8,
    reviews: 219,
    pages: 5,
    synopsis: 'A haunted mental hospital on the outskirts of Arkham has been abandoned for decades. An investigative journalist ventures inside after hearing phantom whispers on his recorder—only to discover that the shadows on the wall are alive, hungry, and seeking a new host.',
    panels: [
      {
        page: 1,
        label: 'A journalist stands in front of the creepy asylum gates.',
        bubbles: [
          { text: 'The old asylum... they say the spirits of the patients still whisper here.', position: 'bubble-top-left' },
          { text: 'Screeech... the iron gate is opening by itself...', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Horror', 1, 'Whispers')
      },
      {
        page: 2,
        label: 'He enters the corridor, flashlight revealing shadows.',
        bubbles: [
          { text: 'Hello? Is anyone there? My recorder is picking up high-frequency hums.', position: 'bubble-top-right' },
          { text: 'Wait... that shadow on the wall... it is moving in the opposite direction of my light!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Horror', 2, 'Whispers')
      },
      {
        page: 3,
        label: 'The door slams shut, locking him in the basement.',
        bubbles: [
          { text: 'BANG! No! The door is locked from the outside!', position: 'bubble-top-left' },
          { text: 'The whispers are getting louder... "Help... us... join... us..."', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Horror', 3, 'Whispers')
      },
      {
        page: 4,
        label: 'Creepy shadow hands rise from the floor boards, wrapping his legs.',
        bubbles: [
          { text: 'Arrgh! They are cold! They are pulling me down!', position: 'bubble-top-right' },
          { text: 'No... let me go!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Horror', 4, 'Whispers')
      },
      {
        page: 5,
        label: 'The flashlight lies dropped on the floor, illuminating an empty room.',
        bubbles: [
          { text: 'Shhh... the whispers have stopped.', position: 'bubble-top-left' },
          { text: 'He is one of us now.', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Horror', 5, 'Whispers')
      }
    ]
  },
  // ================= MARVEL BOOKS (CONTINUED) =================
  {
    id: 'captain-america-sentinel',
    title: 'Captain America: Sentinel of Liberty',
    author: 'Ed Brubaker',
    category: 'Marvel',
    cover: '/assets/cover_captainamerica.svg',
    rating: 4.8,
    reviews: 241,
    pages: 5,
    synopsis: 'Steve Rogers faces his greatest challenge yet as a ghost from his past returns as the deadly Winter Soldier. Armed with his vibranium shield and unwavering courage, Captain America battles to save his former partner from the clutches of Soviet brainwashing.',
    panels: [
      {
        page: 1,
        label: 'Captain America stands in front of a giant liberty star emblem.',
        bubbles: [
          { text: 'A storm is coming. I can feel it in my bones.', position: 'bubble-top-left' },
          { text: 'We must protect the country, no matter what shields we have to break.', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Marvel', 1, 'Captain America')
      },
      {
        page: 2,
        label: 'A metal-armed assassin launches an attack in the city.',
        bubbles: [
          { text: 'Who is that guy? His metal arm... it is incredibly strong!', position: 'bubble-top-right' },
          { text: 'Target locked: Steve Rogers. Terminating program.', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Marvel', 2, 'Captain America')
      },
      {
        page: 3,
        label: 'Captain America clashes his shield against the metal arm.',
        bubbles: [
          { text: 'Bucky?! Is that really you? You survived the fall?!', position: 'bubble-top-left' },
          { text: 'I do not know any Bucky. My name is the Winter Soldier!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Marvel', 3, 'Captain America')
      },
      {
        page: 4,
        label: 'Captain America refuses to fight his best friend.',
        bubbles: [
          { text: 'I will not fight you, Bucky. You are my brother.', position: 'bubble-top-right' },
          { text: 'You are my mission! Focus on the mission!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Marvel', 4, 'Captain America')
      },
      {
        page: 5,
        label: 'The Winter Soldier hesitates, dropping his weapon and vanishing.',
        bubbles: [
          { text: 'He remembered. There is still hope for Bucky.', position: 'bubble-top-left' },
          { text: 'I will find him. No matter how long it takes.', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Marvel', 5, 'Captain America')
      }
    ]
  },
  {
    id: 'thor-thunder',
    title: 'Thor: God of Thunder',
    author: 'Jason Aaron',
    category: 'Marvel',
    cover: '/assets/cover_thor.svg',
    rating: 4.9,
    reviews: 310,
    pages: 5,
    synopsis: 'A cosmic serial killer known as the God Butcher is traversing timelines, slaying deities across the universe. Thor must unite with his past and future selves to stop this existential threat and protect the heavens from turning to ash.',
    panels: [
      {
        page: 1,
        label: 'Thor raises Mjolnir high as blue lightning arcs around him.',
        bubbles: [
          { text: 'By Odin’s beard! The skies of Asgard are weeping lightning.', position: 'bubble-top-left' },
          { text: 'Mjolnir, guide my strike! Show me the butcher!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Marvel', 1, 'Thor')
      },
      {
        page: 2,
        label: 'Thor discovers a ruined temple of fallen gods.',
        bubbles: [
          { text: 'Another pantheon... completely silenced. This is madness.', position: 'bubble-top-right' },
          { text: 'Gorr... you shall pay for this desecration with your life!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Marvel', 2, 'Thor')
      },
      {
        page: 3,
        label: 'The God Butcher emerges from the necro-shadows.',
        bubbles: [
          { text: 'Ah, the Odinson. The loudest of the parasites.', position: 'bubble-top-left' },
          { text: 'Face the wrath of the God of Thunder, monster!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Marvel', 3, 'Thor')
      },
      {
        page: 4,
        label: 'Thor crashes Mjolnir onto Gorr, exploding in cosmic light.',
        bubbles: [
          { text: 'Taste Asgardian steel and electric fire!', position: 'bubble-top-right' },
          { text: 'Your thunder... is nothing compared to my shadows!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Marvel', 4, 'Thor')
      },
      {
        page: 5,
        label: 'Thor stands victorious, lightning receding as dawn rises.',
        bubbles: [
          { text: 'The butcher is defeated, but the cosmos is scarred.', position: 'bubble-top-left' },
          { text: 'As long as I draw breath, the heavens shall stand.', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Marvel', 5, 'Thor')
      }
    ]
  },

  // ================= DC BOOKS (CONTINUED) =================
  {
    id: 'wonder-woman-spirit',
    title: 'Wonder Woman: Spirit of Truth',
    author: 'Paul Dini & Alex Ross',
    category: 'DC',
    cover: '/assets/cover_wonderwoman.svg',
    rating: 4.8,
    reviews: 198,
    pages: 5,
    synopsis: 'Diana of Themyscira struggles to understand her role as an ambassador to the human world. When a regional conflict threatens innocent lives, she must use both her strength and the Lasso of Truth to inspire humanity to choose peace over war.',
    panels: [
      {
        page: 1,
        label: 'Diana looks out at the mortal world from Themyscira cliffs.',
        bubbles: [
          { text: 'The world of men... so full of wonder, yet so broken.', position: 'bubble-top-left' },
          { text: 'I must show them that love is stronger than steel.', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('DC', 1, 'Wonder Woman')
      },
      {
        page: 2,
        label: 'Wonder Woman blocks incoming tank fire with her bracelets.',
        bubbles: [
          { text: 'CEASE FIRE! I am not your enemy!', position: 'bubble-top-right' },
          { text: 'CLANG! The shells bounce off her silver bracelets!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('DC', 2, 'Wonder Woman')
      },
      {
        page: 3,
        label: 'She binds a corrupt warlord with the golden Lasso of Truth.',
        bubbles: [
          { text: 'The lasso forces you to speak. What is your true motive?', position: 'bubble-top-left' },
          { text: 'I... I only wanted the gold! The war was just a distraction!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('DC', 3, 'Wonder Woman')
      },
      {
        page: 4,
        label: 'Wonder Woman addresses a crowd of villagers, restoring hope.',
        bubbles: [
          { text: 'Do not fear the warlords. Your courage is your true shield.', position: 'bubble-top-right' },
          { text: 'She speaks the truth. We will rebuild our home together.', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('DC', 4, 'Wonder Woman')
      },
      {
        page: 5,
        label: 'Diana flies towards the horizon, lasso glowing in the clouds.',
        bubbles: [
          { text: 'Truth is a journey, not a destination.', position: 'bubble-top-left' },
          { text: 'I am Diana, Princess of the Amazons. And my mission continues.', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('DC', 5, 'Wonder Woman')
      }
    ]
  },
  {
    id: 'green-lantern-twilight',
    title: 'Green Lantern: Emerald Twilight',
    author: 'Ron Marz',
    category: 'DC',
    cover: '/assets/cover_greenlantern.svg',
    rating: 4.7,
    reviews: 185,
    pages: 5,
    synopsis: 'Following the destruction of Coast City, Hal Jordan is consumed by grief and madness. In a desperate bid to rebuild his home, he decimates the Green Lantern Corps and absorbs the central power battery, transforming into the villain Parallax.',
    panels: [
      {
        page: 1,
        label: 'Hal Jordan stands in the ashes of his destroyed city.',
        bubbles: [
          { text: 'Coast City... gone. Millions of lives, vanished in an instant.', position: 'bubble-top-left' },
          { text: 'The Guardians told me to accept it. They told me to move on. Never.', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('DC', 1, 'Green Lantern')
      },
      {
        page: 2,
        label: 'Hal flies to Oa, defeating fellow Green Lanterns.',
        bubbles: [
          { text: 'Hal, stop! You are violating the Green Lantern oath!', position: 'bubble-top-right' },
          { text: 'I need more rings! I need the power to rewrite history!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('DC', 2, 'Green Lantern')
      },
      {
        page: 3,
        label: 'Hal Jordan plunges his hands into the Central Power Battery.',
        bubbles: [
          { text: 'The energy... it is flooding my mind! Yes! MORE!', position: 'bubble-top-left' },
          { text: 'Warning! Emerald energy overload in progress!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('DC', 3, 'Green Lantern')
      },
      {
        page: 4,
        label: 'Hal Jordan emerges from the battery clad in dark armor as Parallax.',
        bubbles: [
          { text: 'Hal Jordan is dead. I am Parallax. I will fix the universe.', position: 'bubble-top-right' },
          { text: 'No... what have you become, Hal?!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('DC', 4, 'Green Lantern')
      },
      {
        page: 5,
        label: 'Parallax flies into the cosmos, leaving a dark trail of energy.',
        bubbles: [
          { text: 'A new dawn is coming. One that I will control.', position: 'bubble-top-left' },
          { text: 'The green light has flickered out. A new Lantern must rise.', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('DC', 5, 'Green Lantern')
      }
    ]
  },

  // ================= DISNEY BOOKS (CONTINUED) =================
  {
    id: 'lion-king-destiny',
    title: 'The Lion King: Pride Lands Destiny',
    author: 'Disney Books',
    category: 'Disney',
    cover: '/assets/cover_lionking.svg',
    rating: 4.9,
    reviews: 350,
    pages: 5,
    synopsis: 'Tricked by his uncle Scar, the young lion cub Simba flees the Pride Lands, leaving his home in ruins. Years later, guided by the wise shaman Rafiki and his childhood friend Nala, Simba must return to face his past and claim his rightful place as king.',
    panels: [
      {
        page: 1,
        label: 'Simba runs away into a dusty desert wasteland.',
        bubbles: [
          { text: 'It was my fault... my father is gone because of me.', position: 'bubble-top-left' },
          { text: 'I can never go back to the Pride Lands. Never.', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Disney', 1, 'Lion King')
      },
      {
        page: 2,
        label: 'Simba lives a carefree life with Timon and Pumbaa.',
        bubbles: [
          { text: 'Hakuna Matata, kid! It means no worries!', position: 'bubble-top-right' },
          { text: 'This is the life... just eating bugs and sleeping under the stars.', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Disney', 2, 'Lion King')
      },
      {
        page: 3,
        label: 'Rafiki shows Simba his reflection in a jungle pool.',
        bubbles: [
          { text: 'Look closer, Simba. He lives in you.', position: 'bubble-top-left' },
          { text: 'Father? You are... you are watching me from the stars?', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Disney', 3, 'Lion King')
      },
      {
        page: 4,
        label: 'Simba battles Scar atop the burning Pride Rock cliff.',
        bubbles: [
          { text: 'Give up, Simba! I am the king now!', position: 'bubble-top-right' },
          { text: 'You killed my father! Run away, Scar, and never return!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Disney', 4, 'Lion King')
      },
      {
        page: 5,
        label: 'Simba climbs Pride Rock and roars under the clearing skies.',
        bubbles: [
          { text: 'ROAAAAAR!', position: 'bubble-top-left' },
          { text: 'The king has returned. The Circle of Life continues.', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Disney', 5, 'Lion King')
      }
    ]
  },
  {
    id: 'frozen-ice-queen',
    title: 'Frozen: The Ice Queen',
    author: 'Disney Books',
    category: 'Disney',
    cover: '/assets/cover_frozen.svg',
    rating: 4.8,
    reviews: 280,
    pages: 5,
    synopsis: 'After accidentally trapping her kingdom in an eternal winter, Queen Elsa flees into the mountains to embrace her ice powers. Her sister Anna sets off on a dangerous journey to find her, accompanied by the rugged ice harvester Kristoff.',
    panels: [
      {
        page: 1,
        label: 'Elsa flees Arendelle, her footprints freezing the fjord.',
        bubbles: [
          { text: 'They know my secret... they know about my magic.', position: 'bubble-top-left' },
          { text: 'Don’t feel, don’t let it show. I must go!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Disney', 1, 'Frozen')
      },
      {
        page: 2,
        label: 'Elsa builds her glowing ice palace in the mountains.',
        bubbles: [
          { text: 'Let it go! Let it go! I am one with the wind and sky!', position: 'bubble-top-right' },
          { text: 'An ice palace rises from the snowy peaks!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Disney', 2, 'Frozen')
      },
      {
        page: 3,
        label: 'Anna finds Elsa in the giant ice palace.',
        bubbles: [
          { text: 'Elsa! You have to come back! Arendelle is frozen!', position: 'bubble-top-left' },
          { text: 'I can’t, Anna! I don’t know how to stop it! Just leave me!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Disney', 3, 'Frozen')
      },
      {
        page: 4,
        label: 'Anna blocks Hans’ sword strike, freezing solid.',
        bubbles: [
          { text: 'No! Leave my sister alone!', position: 'bubble-top-right' },
          { text: 'CLANG! Anna turns into pure solid ice, shattering Hans’ sword!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Disney', 4, 'Frozen')
      },
      {
        page: 5,
        label: 'Elsa hugs Anna, and the warmth of true love thaws her.',
        bubbles: [
          { text: 'Anna! No... please wake up! I love you.', position: 'bubble-top-left' },
          { text: 'An act of true love will thaw a frozen heart. Summer returns!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Disney', 5, 'Frozen')
      }
    ]
  },

  // ================= ADVENTURE BOOKS =================
  {
    id: 'indiana-jones-lost',
    title: 'Indiana Jones: The Lost Covenant',
    author: 'George Lucas',
    category: 'Adventure',
    cover: '/assets/cover_indianajones.svg',
    rating: 4.8,
    reviews: 172,
    pages: 5,
    synopsis: 'Renowned archaeologist Indiana Jones travels deep into the Peruvian jungle in search of a golden covenant relic. Dodging booby traps, poisonous darts, and rival treasure hunters, Indy must solve the riddle of the ancient stone altar.',
    panels: [
      {
        page: 1,
        label: 'Indiana Jones chops through thick vines in a dark jungle.',
        bubbles: [
          { text: 'According to the journal, the temple entrance is right behind this waterfall.', position: 'bubble-top-left' },
          { text: 'Snakes... why did it have to be snakes?', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Adventure', 1, 'Indiana Jones')
      },
      {
        page: 2,
        label: 'Indy stands before a gold idol on a stone pedestal.',
        bubbles: [
          { text: 'There it is. The covenant key. Solid gold.', position: 'bubble-top-right' },
          { text: 'I need to swap it with this bag of sand. Exactly the same weight.', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Adventure', 2, 'Indiana Jones')
      },
      {
        page: 3,
        label: 'A giant round stone sphere begins rolling down the tunnel.',
        bubbles: [
          { text: 'RUMBLE! The pressure plates triggered!', position: 'bubble-top-left' },
          { text: 'RUN! The ceiling is collapsing!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Adventure', 3, 'Indiana Jones')
      },
      {
        page: 4,
        label: 'Indy leaps across a deep pit, whip grabbing a branch.',
        bubbles: [
          { text: 'Hang on, Indy! Jump!', position: 'bubble-top-right' },
          { text: 'CRACK! The whip catches the branch just in time!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Adventure', 4, 'Indiana Jones')
      },
      {
        page: 5,
        label: 'Indy escapes into a waiting seaplane, clutching the golden idol.',
        bubbles: [
          { text: 'Start the engine, Jock! They are right behind us!', position: 'bubble-top-left' },
          { text: 'This belongs in a museum! Another day, another adventure.', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Adventure', 5, 'Indiana Jones')
      }
    ]
  },
  {
    id: 'tomb-raider-legend',
    title: 'Tomb Raider: Legend of the Amulet',
    author: 'Toby Gard',
    category: 'Adventure',
    cover: '/assets/cover_tombraider.svg',
    rating: 4.7,
    reviews: 154,
    pages: 5,
    synopsis: 'Lara Croft tracks the coordinates of the legendary Sun Amulet to an active volcanic island in the Pacific. Battling heavy mercenaries and climbing treacherous ruins, she must stop a secret syndicate from activating the artifact.',
    panels: [
      {
        page: 1,
        label: 'Lara Croft stands on a cliff overlooking an island temple.',
        bubbles: [
          { text: 'The island of Yamatai. The amulet should be in the central chambers.', position: 'bubble-top-left' },
          { text: 'Mercenaries are patrolling the shore. I need to sneak past them.', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Adventure', 1, 'Tomb Raider')
      },
      {
        page: 2,
        label: 'Lara climbs a crumbling brick tower using climbing axes.',
        bubbles: [
          { text: 'The bricks are sliding! I need to be fast.', position: 'bubble-top-right' },
          { text: 'Ugh! That was close. The gate is just ahead.', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Adventure', 2, 'Tomb Raider')
      },
      {
        page: 3,
        label: 'Lara finds the glowing green amulet inside a stone sarcophagus.',
        bubbles: [
          { text: 'The Sun Amulet... it is humming with raw solar energy.', position: 'bubble-top-left' },
          { text: 'Wait! The volcanic tremors are worsening! The island is unstable!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Adventure', 3, 'Tomb Raider')
      },
      {
        page: 4,
        label: 'Lara escapes through collapsing temple halls.',
        bubbles: [
          { text: 'Stop her! Do not let her leave with the amulet!', position: 'bubble-top-right' },
          { text: 'I don’t think so, boys! Dodge this!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Adventure', 4, 'Tomb Raider')
      },
      {
        page: 5,
        label: 'Lara rides a motorcycle away from the exploding temple.',
        bubbles: [
          { text: 'The temple is dust, but the amulet is safe with me.', position: 'bubble-top-left' },
          { text: 'Onto the next mystery. Adventure is waiting.', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Adventure', 5, 'Tomb Raider')
      }
    ]
  },

  // ================= CRIME THRILLER BOOKS =================
  {
    id: 'detective-noir-clue',
    title: 'Detective Noir: The Crimson Clue',
    author: 'Raymond Chandler',
    category: 'Crime Thriller',
    cover: '/assets/cover_detectivenoir.svg',
    rating: 4.8,
    reviews: 195,
    pages: 5,
    synopsis: 'Private investigator Jack Marlow takes on a case to find a missing heiress in a rain-soaked city. As he follows a trail of clues through underground clubs, he realizes she is the key witness to a high-profile corporate murder.',
    panels: [
      {
        page: 1,
        label: 'Jack Marlow sits in his dark office, looking at a photo.',
        bubbles: [
          { text: 'Rain drumming on the window. A typical Tuesday in the city.', position: 'bubble-top-left' },
          { text: 'A wealthy client walked in with a photo. The girl vanished two days ago.', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Crime Thriller', 1, 'Detective Jack')
      },
      {
        page: 2,
        label: 'Jack interrogates a shady bartender in a neon-lit alley.',
        bubbles: [
          { text: 'Look, detective, I don’t want any trouble. She was here, talking to a guy in a suit.', position: 'bubble-top-right' },
          { text: 'Give me a name, or you will be talking to the precinct.', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Crime Thriller', 2, 'Detective Jack')
      },
      {
        page: 3,
        label: 'Jack finds a blood-stained keycard in an abandoned warehouse.',
        bubbles: [
          { text: 'A keycard to LexCorp... and a fresh stain. This is no simple runaway.', position: 'bubble-top-left' },
          { text: 'Wait! Footsteps behind me! Someone was waiting for me.', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Crime Thriller', 3, 'Detective Jack')
      },
      {
        page: 4,
        label: 'Jack ducks behind crates as gunfire sparks in the dark.',
        bubbles: [
          { text: 'BANG! BANG! Metal sparks fly off the pillars!', position: 'bubble-top-right' },
          { text: 'You should have stayed out of this, Marlow! You are dead!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Crime Thriller', 4, 'Detective Jack')
      },
      {
        page: 5,
        label: 'Jack stands over a disarmed thug, calling the police.',
        bubbles: [
          { text: 'Case solved. The witness is safe and the thug is cuffed.', position: 'bubble-top-left' },
          { text: 'This city never sleeps. And neither do its shadows.', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Crime Thriller', 5, 'Detective Jack')
      }
    ]
  },
  {
    id: 'sherlock-holmes-blue',
    title: 'Sherlock Holmes: The Blue Carbuncle',
    author: 'Arthur Conan Doyle',
    category: 'Crime Thriller',
    cover: '/assets/cover_sherlock.svg',
    rating: 4.9,
    reviews: 220,
    pages: 5,
    synopsis: 'A rare blue gemstone is stolen from a hotel suite, and a poor plumber is wrongly accused. Sherlock Holmes and Dr. Watson follow a bizarre trail of clues starting from a lost Christmas goose to find the true culprit and recover the gem.',
    panels: [
      {
        page: 1,
        label: 'Sherlock Holmes examines a blue gem under a magnifying glass.',
        bubbles: [
          { text: 'The Blue Carbuncle, Watson. A gem of priceless value and sinister history.', position: 'bubble-top-left' },
          { text: 'But how did it end up inside a Christmas goose, Holmes?', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Crime Thriller', 1, 'Sherlock Holmes')
      },
      {
        page: 2,
        label: 'Holmes and Watson trace the dealer in Covent Garden market.',
        bubbles: [
          { text: 'Who sold you this bird, merchant? Speak quickly.', position: 'bubble-top-right' },
          { text: 'Get out! I won’t have you ruining my business!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Crime Thriller', 2, 'Sherlock Holmes')
      },
      {
        page: 3,
        label: 'Holmes confronts a nervous hotel attendant at Baker Street.',
        bubbles: [
          { text: 'Sit down, Mr. Ryder. You look like you’ve seen a ghost.', position: 'bubble-top-left' },
          { text: 'No... how did you find out? I... I didn’t mean to steal it!', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Crime Thriller', 3, 'Sherlock Holmes')
      },
      {
        page: 4,
        label: 'Ryder confesses, crying on his knees.',
        bubbles: [
          { text: 'I hid it in the goose’s throat! Please don’t send me to jail!', position: 'bubble-top-right' },
          { text: 'The innocent plumber shall go free. Your fate is in the hands of the law.', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Crime Thriller', 4, 'Sherlock Holmes')
      },
      {
        page: 5,
        label: 'Holmes puts the gem in a secure box as Watson smiles.',
        bubbles: [
          { text: 'A neat little puzzle, Watson. Elementary, of course.', position: 'bubble-top-left' },
          { text: 'Magnificent, Holmes! The mystery is solved.', position: 'bubble-bottom-center' }
        ],
        svg: generatePanelSVG('Crime Thriller', 5, 'Sherlock Holmes')
      }
    ]
  }
];

export default COMICS_DATABASE;
