// Using the Free Dictionary API
const API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

// List of fallback words
const FALLBACK_WORDS = [
  {
    word: 'serendipity',
    definition:
      'The occurrence of events by chance in a happy or beneficial way.',
    example: 'Winning the lottery was pure serendipity.',
  },
  {
    word: 'eloquent',
    definition: 'Fluent or persuasive in speaking or writing.',
    example: 'The author’s eloquent prose captured the audience’s attention.',
  },
  {
    word: 'mellifluous',
    definition: 'Sweet or musical; pleasant to hear.',
    example: 'She had a mellifluous voice that soothed everyone.',
  },
  {
    word: 'ephemeral',
    definition: 'Lasting for a very short time.',
    example: 'The ephemeral sunset quickly faded into darkness.',
  },
  {
    word: 'ubiquitous',
    definition: 'Present, appearing, or found everywhere.',
    example: 'Smartphones are now ubiquitous across the globe.',
  },
  {
    word: 'resilient',
    definition:
      'Able to withstand or recover quickly from difficult conditions.',
    example: 'Children can be amazingly resilient after facing hardships.',
  },
  {
    word: 'quintessential',
    definition:
      'Representing the most perfect or typical example of a quality or class.',
    example:
      'She’s the quintessential entrepreneur—passionate, driven, and fearless.',
  },
  {
    word: 'luminous',
    definition: 'Emitting or reflecting light; shining brightly.',
    example: 'The luminous stars lit up the night sky.',
  },
  {
    word: 'cathartic',
    definition:
      'Providing psychological relief through the open expression of strong emotions.',
    example: 'Crying can be a cathartic experience during tough times.',
  },
  {
    word: 'placid',
    definition: 'Calm and peaceful, with little movement or activity.',
    example: 'The placid lake was perfect for kayaking.',
  },
  {
    word: 'gregarious',
    definition: 'Fond of company; sociable.',
    example: 'He’s a gregarious guy who loves hosting parties.',
  },
  {
    word: 'sonder',
    definition:
      'The realization that each passerby has a life as vivid and complex as your own.',
    example:
      'Experiencing sonder can make you more empathetic toward strangers.',
  },
  {
    word: 'petrichor',
    definition: 'The pleasant, earthy smell after rain falls on dry soil.',
    example: 'The petrichor was refreshing after a long drought.',
  },
  {
    word: 'ethereal',
    definition:
      'Extremely delicate and light in a way that seems too perfect for this world.',
    example: 'The ethereal beauty of the northern lights was mesmerizing.',
  },
  {
    word: 'solitude',
    definition: 'The state of being alone, often by choice and for reflection.',
    example: 'He sought solitude in the mountains to clear his mind.',
  },
  {
    word: 'epiphany',
    definition: 'A sudden realization or insight.',
    example: 'During meditation, she had an epiphany about her career path.',
  },
  {
    word: 'zenith',
    definition: 'The highest point reached by a celestial or other object.',
    example: 'At the zenith of her career, she was known internationally.',
  },
  {
    word: 'aesthetic',
    definition: 'Concerned with beauty or the appreciation of beauty.',
    example: 'The minimalist aesthetic of the apartment was calming.',
  },
  {
    word: 'ambivalent',
    definition:
      'Having mixed feelings or contradictory ideas about something or someone.',
    example: 'She felt ambivalent about moving to a new city.',
  },
  {
    word: 'lucid',
    definition: 'Expressed clearly; easy to understand.',
    example: 'His explanation was so lucid that even beginners understood.',
  },
  {
    word: 'altruism',
    definition:
      'The belief in or practice of selfless concern for the well-being of others.',
    example: 'Her altruism was evident in her volunteer work.',
  },
  {
    word: 'idyllic',
    definition: 'Like an idyll; extremely happy, peaceful, or picturesque.',
    example: 'They lived an idyllic life in the countryside.',
  },
  {
    word: 'profound',
    definition: 'Very great or intense; having deep meaning.',
    example: 'His words had a profound impact on the audience.',
  },
];

// Random fallback word
const getRandomFallbackWord = () => {
  const randomIndex = Math.floor(Math.random() * FALLBACK_WORDS.length);
  return FALLBACK_WORDS[randomIndex];
};

// List of words to pick for API call
const WORD_LIST = [
  'aberration', 'benevolent', 'cacophony', 'deleterious', 'epitome',
  'fortuitous', 'garrulous', 'harbinger', 'iconoclast', 'juxtapose',
  'kaleidoscope', 'labyrinth', 'magnanimous', 'nefarious', 'obfuscate',
  'paradigm', 'quintessential', 'resilient', 'sycophant', 'taciturn',
  'ubiquitous', 'venerate', 'wanderlust', 'xenial', 'yearning', 'zealous',
  'altruism', 'boisterous', 'candor', 'dubious', 'eloquent', 
  'fervent', 'grandiose', 'hypocrisy', 'ineffable', 'jubilant',
  'kinetic', 'lucid', 'mellifluous', 'nostalgia', 'obstinate',
  'pragmatic', 'quagmire', 'ravenous', 'serendipity', 'tenacious',
  'unprecedented', 'vivacious', 'wistful', 'xenophobia', 'yonder', 'zephyr',
  'audacity', 'brevity', 'camaraderie', 'diligent', 'eclectic',
  'fractious', 'guile', 'heretic', 'immutable', 'jocular',
  'keen', 'lethargic', 'meticulous', 'nuance', 'ostracize',
  'placate', 'quell', 'reverence', 'sagacious', 'trepidation',
  'undulate', 'voracious', 'wary', 'yearn', 'zenith'
];


// Random word from list
const getRandomWordFromList = () => {
  const randomIndex = Math.floor(Math.random() * WORD_LIST.length);
  return WORD_LIST[randomIndex];
};

// Helper: fetch with timeout
const fetchWithTimeout = (url, options = {}, timeout = 7000) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('Request timed out'));
    }, timeout);

    fetch(url, options)
      .then(response => {
        clearTimeout(timer);
        resolve(response);
      })
      .catch(err => {
        clearTimeout(timer);
        reject(err);
      });
  });
};

// Final: fetch word of the day
export const fetchWordOfTheDay = async () => {
  try {
    const randomWord = getRandomWordFromList();
    const response = await fetchWithTimeout(`${API_URL}${randomWord}`);

    if (!response.ok) {
      throw new Error('Failed to fetch word');
    }

    const data = await response.json();

    return {
      word: data[0].word,
      definition: data[0].meanings[0].definitions[0].definition,
      example:
        data[0].meanings[0].definitions[0].example ||
        `Example for ${data[0].word} not available`,
    };
  } catch (error) {
    // console.error('Error fetching word (using fallback):', error.message);
    // Use fallback word if fetch fails or takes too long
    return getRandomFallbackWord();
  }
};
