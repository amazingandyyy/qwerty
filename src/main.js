        // Detect platform and update modifier key display
        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        const modifierKeyName = isMac ? 'Cmd' : 'Alt';

        // Update modifier key displays on page load
        window.addEventListener('DOMContentLoaded', () => {
            document.getElementById('modKey1').textContent = modifierKeyName;
            document.getElementById('modKey2').textContent = modifierKeyName;
            // Load default word bank
            loadWordBank('10k');
        });

        // Function to load word bank from Monkeytype
        async function loadWordBank(size) {
            const urls = {
                '1k': 'https://raw.githubusercontent.com/monkeytypegame/monkeytype/refs/heads/master/frontend/static/languages/english_1k.json',
                '10k': 'https://raw.githubusercontent.com/monkeytypegame/monkeytype/refs/heads/master/frontend/static/languages/english_10k.json',
                '25k': 'https://raw.githubusercontent.com/monkeytypegame/monkeytype/refs/heads/master/frontend/static/languages/english_25k.json',
                '450k': 'https://raw.githubusercontent.com/monkeytypegame/monkeytype/refs/heads/master/frontend/static/languages/english_450k.json'
            };

            try {
                const response = await fetch(urls[size]);
                const data = await response.json();
                realWords = data.words;
                wordBankSize = size;
                console.log(`Loaded ${realWords.length} words from ${size} word bank`);
            } catch (error) {
                console.error('Failed to load word bank, using fallback:', error);
                realWords = fallbackWords;
            }
        }

        const fingerMap = {
            'left-pinky': ['`', '1', 'q', 'a', 'z', 'tab', 'caps', 'shift'],
            'left-ring': ['2', 'w', 's', 'x'],
            'left-middle': ['3', 'e', 'd', 'c'],
            'left-index': ['4', '5', 'r', 't', 'f', 'g', 'v', 'b'],
            'right-index': ['6', '7', 'y', 'u', 'h', 'j', 'n', 'm'],
            'right-middle': ['8', 'i', 'k', ','],
            'right-ring': ['9', 'o', 'l', '.'],
            'right-pinky': ['0', '-', '=', 'p', '[', ']', '\\', ';', "'", '/', 'enter', 'backspace', 'shift-right']
        };

        // Fallback word list
        const fallbackWords = [
            'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this',
            'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so',
            'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take', 'people',
            'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back',
            'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us', 'is',
            'was', 'are', 'been', 'has', 'had', 'were', 'said', 'did', 'may', 'should', 'could', 'being', 'does', 'am', 'might', 'must', 'shall', 'having', 'been', 'able',
            'need', 'man', 'find', 'here', 'thing', 'give', 'many', 'well', 'only', 'those', 'tell', 'very', 'even', 'back', 'good', 'woman', 'through', 'us', 'life', 'child',
            'there', 'work', 'down', 'call', 'come', 'still', 'try', 'last', 'ask', 'need', 'too', 'feel', 'three', 'when', 'state', 'never', 'become', 'between', 'high', 'really',
            'something', 'most', 'another', 'much', 'family', 'own', 'leave', 'put', 'old', 'while', 'mean', 'keep', 'student', 'great', 'same', 'big', 'group', 'begin', 'seem', 'country',
            'help', 'talk', 'where', 'turn', 'problem', 'every', 'start', 'hand', 'might', 'show', 'part', 'against', 'place', 'over', 'such', 'again', 'few', 'case', 'week', 'company',
            'where', 'system', 'each', 'right', 'program', 'hear', 'question', 'during', 'work', 'play', 'government', 'run', 'small', 'number', 'off', 'always', 'move', 'night', 'live', 'point',
            'believe', 'hold', 'today', 'bring', 'happen', 'next', 'without', 'before', 'large', 'must', 'home', 'under', 'water', 'room', 'write', 'mother', 'area', 'money', 'story', 'young',
            'fact', 'month', 'different', 'lot', 'study', 'book', 'eye', 'job', 'word', 'though', 'business', 'issue', 'side', 'kind', 'four', 'head', 'far', 'black', 'long', 'both',
            'little', 'house', 'yes', 'since', 'provide', 'service', 'around', 'friend', 'important', 'father', 'sit', 'away', 'until', 'power', 'hour', 'game', 'often', 'yet', 'line', 'political',
            'end', 'among', 'ever', 'stand', 'bad', 'lose', 'however', 'member', 'pay', 'law', 'meet', 'car', 'city', 'almost', 'include', 'continue', 'set', 'later', 'community', 'name',
            'five', 'once', 'white', 'least', 'president', 'learn', 'real', 'change', 'team', 'minute', 'best', 'several', 'idea', 'kid', 'body', 'information', 'nothing', 'ago', 'lead', 'social',
            'understand', 'whether', 'watch', 'together', 'follow', 'around', 'parent', 'only', 'stop', 'face', 'anything', 'create', 'public', 'already', 'speak', 'others', 'read', 'level', 'allow', 'add',
            'office', 'spend', 'door', 'health', 'person', 'art', 'sure', 'war', 'history', 'party', 'within', 'grow', 'result', 'open', 'morning', 'walk', 'reason', 'low', 'win', 'research',
            'girl', 'guy', 'early', 'food', 'moment', 'himself', 'air', 'teacher', 'force', 'offer', 'enough', 'both', 'across', 'although', 'remember', 'foot', 'second', 'boy', 'maybe', 'toward',
            'able', 'age', 'policy', 'everything', 'love', 'process', 'music', 'including', 'consider', 'appear', 'actually', 'buy', 'probably', 'human', 'wait', 'serve', 'market', 'die', 'send', 'expect',
            'sense', 'build', 'stay', 'fall', 'oh', 'nation', 'plan', 'cut', 'college', 'interest', 'death', 'course', 'someone', 'experience', 'behind', 'reach', 'local', 'kill', 'six', 'remain',
            'effect', 'yeah', 'suggest', 'class', 'control', 'raise', 'care', 'perhaps', 'little', 'late', 'hard', 'field', 'else', 'pass', 'former', 'sell', 'major', 'sometimes', 'require', 'along',
            'development', 'themselves', 'report', 'role', 'better', 'economic', 'effort', 'decide', 'rate', 'strong', 'possible', 'heart', 'drug', 'leader', 'light', 'voice', 'wife', 'whole', 'police', 'mind',
            'finally', 'pull', 'return', 'free', 'military', 'price', 'less', 'according', 'decision', 'explain', 'son', 'hope', 'develop', 'view', 'relationship', 'carry', 'town', 'road', 'drive', 'arm',
            'true', 'federal', 'break', 'difference', 'thank', 'receive', 'value', 'international', 'building', 'action', 'full', 'model', 'join', 'season', 'society', 'tax', 'director', 'position', 'player', 'agree',
            'especially', 'record', 'pick', 'wear', 'paper', 'special', 'space', 'ground', 'form', 'support', 'event', 'official', 'whose', 'matter', 'everyone', 'center', 'couple', 'site', 'project', 'hit',
            'base', 'activity', 'star', 'table', 'court', 'produce', 'eat', 'teach', 'half', 'situation', 'easy', 'cost', 'industry', 'figure', 'street', 'image', 'itself', 'phone', 'either', 'data',
            'cover', 'quite', 'picture', 'clear', 'practice', 'piece', 'land', 'recent', 'describe', 'product', 'doctor', 'wall', 'patient', 'worker', 'news', 'test', 'movie', 'certain', 'north', 'simply',
            'third', 'technology', 'catch', 'step', 'baby', 'computer', 'type', 'attention', 'draw', 'film', 'Republican', 'tree', 'source', 'red', 'nearly', 'organization', 'choose', 'cause', 'hair', 'century',
            'evidence', 'window', 'difficult', 'listen', 'soon', 'culture', 'billion', 'chance', 'brother', 'energy', 'period', 'summer', 'realize', 'hundred', 'available', 'plant', 'likely', 'opportunity', 'term', 'short',
            'letter', 'condition', 'choice', 'place', 'single', 'rule', 'daughter', 'administration', 'south', 'husband', 'Congress', 'floor', 'campaign', 'material', 'population', 'economy', 'medical', 'hospital', 'church', 'close',
            'thousand', 'risk', 'current', 'fire', 'future', 'wrong', 'involve', 'defense', 'anyone', 'increase', 'security', 'bank', 'myself', 'certainly', 'west', 'sport', 'board', 'seek', 'per', 'subject',
            'officer', 'private', 'rest', 'behavior', 'deal', 'performance', 'fight', 'throw', 'top', 'quickly', 'past', 'goal', 'bed', 'order', 'author', 'fill', 'represent', 'focus', 'foreign', 'drop',
            'plan', 'blood', 'upon', 'agency', 'push', 'nature', 'color', 'recently', 'store', 'reduce', 'sound', 'note', 'fine', 'near', 'movement', 'page', 'enter', 'share', 'common', 'poor',
            'natural', 'race', 'concern', 'series', 'significant', 'similar', 'hot', 'language', 'each', 'usually', 'response', 'dead', 'rise', 'animal', 'factor', 'decade', 'article', 'shoot', 'east', 'save',
            'seven', 'artist', 'scene', 'stock', 'career', 'despite', 'central', 'eight', 'thus', 'treatment', 'beyond', 'happy', 'exactly', 'protect', 'approach', 'lie', 'size', 'dog', 'fund', 'serious',
            'occur', 'media', 'ready', 'sign', 'thought', 'list', 'individual', 'simple', 'quality', 'pressure', 'accept', 'answer', 'resource', 'identify', 'left', 'meeting', 'determine', 'prepare', 'disease', 'whatever',
            'success', 'argue', 'cup', 'particularly', 'amount', 'ability', 'staff', 'recognize', 'indicate', 'character', 'growth', 'loss', 'degree', 'wonder', 'attack', 'herself', 'region', 'television', 'box', 'TV',
            'training', 'pretty', 'trade', 'election', 'everybody', 'physical', 'lay', 'general', 'feeling', 'standard', 'bill', 'message', 'fail', 'outside', 'arrive', 'analysis', 'benefit', 'sex', 'forward', 'lawyer',
            'present', 'section', 'environmental', 'glass', 'skill', 'sister', 'PM', 'professor', 'operation', 'financial', 'crime', 'stage', 'compare', 'authority', 'miss', 'design', 'sort', 'act', 'ten', 'knowledge',
            'gun', 'station', 'blue', 'strategy', 'clearly', 'discuss', 'indeed', 'truth', 'song', 'example', 'democratic', 'check', 'environment', 'leg', 'dark', 'various', 'rather', 'laugh', 'guess', 'executive',
            'prove', 'hang', 'entire', 'rock', 'forget', 'claim', 'remove', 'manager', 'enjoy', 'network', 'legal', 'religious', 'cold', 'form', 'final', 'main', 'science', 'green', 'memory', 'card',
            'above', 'seat', 'cell', 'establish', 'nice', 'trial', 'expert', 'spring', 'firm', 'Democrat', 'radio', 'visit', 'management', 'avoid', 'imagine', 'tonight', 'huge', 'ball', 'finish', 'yourself',
            'theory', 'impact', 'respond', 'statement', 'maintain', 'charge', 'popular', 'traditional', 'onto', 'reveal', 'direction', 'weapon', 'employee', 'cultural', 'contain', 'peace', 'head', 'control', 'base', 'pain',
            'apply', 'play', 'measure', 'wide', 'shake', 'fly', 'interview', 'manage', 'chair', 'fish', 'particular', 'camera', 'structure', 'politics', 'perform', 'bit', 'weight', 'suddenly', 'discover', 'candidate',
            'production', 'treat', 'trip', 'evening', 'affect', 'inside', 'conference', 'unit', 'best', 'style', 'adult', 'worry', 'range', 'mention', 'rather', 'deep', 'edge', 'specific', 'writer', 'trouble',
            'necessary', 'throughout', 'challenge', 'fear', 'shoulder', 'institution', 'middle', 'sea', 'dream', 'bar', 'beautiful', 'property', 'instead', 'improve', 'stuff', 'claim', 'professor', 'else', 'magazine', 'hotel',
            'soldier', 'reflect', 'heavy', 'sexual', 'bag', 'heat', 'marriage', 'tough', 'sing', 'surface', 'purpose', 'exist', 'pattern', 'whom', 'skin', 'agent', 'owner', 'machine', 'gas', 'ahead',
            'generation', 'commercial', 'address', 'cancer', 'item', 'reality', 'coach', 'Mrs', 'yard', 'beat', 'violence', 'total', 'tend', 'investment', 'discussion', 'finger', 'garden', 'notice', 'collection', 'modern',
            'task', 'partner', 'positive', 'civil', 'kitchen', 'consumer', 'shot', 'budget', 'wish', 'painting', 'scientist', 'safe', 'agreement', 'capital', 'mouth', 'nor', 'victim', 'newspaper', 'threat', 'responsibility',
            'smile', 'attorney', 'score', 'account', 'interesting', 'break', 'audience', 'rich', 'dinner', 'figure', 'vote', 'western', 'relate', 'travel', 'debate', 'prevent', 'citizen', 'majority', 'none', 'front',
            'born', 'admit', 'senior', 'assume', 'wind', 'key', 'professional', 'mission', 'fast', 'alone', 'customer', 'suffer', 'speech', 'successful', 'option', 'participant', 'southern', 'fresh', 'eventually', 'forest',
            'video', 'global', 'reform', 'access', 'restaurant', 'judge', 'publish', 'cost', 'relation', 'like', 'release', 'own', 'bird', 'opinion', 'credit', 'critical', 'corner', 'concerned', 'recall', 'version',
            'stare', 'safety', 'effective', 'neighborhood', 'original', 'act', 'troop', 'income', 'directly', 'hurt', 'species', 'immediately', 'track', 'basic', 'strike', 'hope', 'freedom', 'absolutely', 'plane', 'nobody',
            'achieve', 'object', 'attitude', 'labor', 'refer', 'concept', 'client', 'powerful', 'perfect', 'nine', 'therefore', 'conduct', 'announce', 'conversation', 'examine', 'touch', 'please', 'attend', 'completely', 'vote',
            'variety', 'sleep', 'turn', 'involved', 'investigation', 'nuclear', 'researcher', 'press', 'conflict', 'spirit', 'replace', 'British', 'encourage', 'argument', 'by', 'once', 'camp', 'brain', 'feature', 'afternoon',
            'AM', 'weekend', 'dozen', 'possibility', 'insurance', 'department', 'battle', 'beginning', 'date', 'generally', 'African', 'very', 'sorry', 'crisis', 'complete', 'fan', 'stick', 'define', 'easily', 'through',
            'hole', 'element', 'vision', 'status', 'normal', 'Chinese', 'ship', 'solution', 'stone', 'slowly', 'scale', 'driver', 'attempt', 'park', 'spot', 'lack', 'ice', 'boat', 'drink', 'sun',
            'front', 'distance', 'wood', 'handle', 'truck', 'mountain', 'survey', 'supposed', 'tradition', 'winter', 'village', 'Soviet', 'refuse', 'sales', 'roll', 'communication', 'run', 'screen', 'gain', 'resident',
            'hide', 'gold', 'club', 'farm', 'potential', 'increase', 'middle', 'European', 'presence', 'independent', 'district', 'shape', 'reader', 'Ms', 'contract', 'crowd', 'Christian', 'express', 'apartment', 'willing',
            'strength', 'previous', 'band', 'obviously', 'horse', 'interested', 'target', 'prison', 'ride', 'guard', 'terms', 'demand', 'reporter', 'deliver', 'text', 'tool', 'wild', 'vehicle', 'observe', 'flight',
            'facility', 'understanding', 'average', 'emerge', 'advantage', 'quick', 'light', 'leadership', 'earn', 'pound', 'basis', 'bright', 'operate', 'guest', 'sample', 'contribute', 'tiny', 'block', 'protection', 'settle',
            'feed', 'collect', 'additional', 'while', 'highly', 'identity', 'title', 'mostly', 'lesson', 'faith', 'river', 'promote', 'living', 'count', 'unless', 'marry', 'tomorrow', 'technique', 'path', 'ear',
            'shop', 'folk', 'principle', 'survive', 'lift', 'border', 'competition', 'jump', 'gather', 'limit', 'fit', 'claim', 'cry', 'equipment', 'worth', 'associate', 'critic', 'warm', 'aspect', 'result',
            'insist', 'failure', 'annual', 'French', 'Christmas', 'comment', 'responsible', 'affair', 'procedure', 'regular', 'spread', 'chairman', 'baseball', 'soft', 'ignore', 'egg', 'belief', 'demonstrate', 'anybody', 'murder',
            'gift', 'religion', 'review', 'editor', 'engage', 'coffee', 'document', 'speed', 'cross', 'influence', 'anyway', 'threaten', 'commit', 'female', 'youth', 'wave', 'afraid', 'quarter', 'background', 'native',
            'broad', 'wonderful', 'deny', 'apparently', 'slightly', 'reaction', 'twice', 'suit', 'perspective', 'growing', 'blow', 'construction', 'kind', 'intelligence', 'destroy', 'cook', 'connection', 'burn', 'shoe', 'grade',
            'context', 'committee', 'hey', 'mistake', 'focus', 'smile', 'location', 'clothes', 'Indian', 'quiet', 'dress', 'promise', 'aware', 'neighbor', 'function', 'bone', 'active', 'extend', 'chief', 'combine',
            'wine', 'below', 'cool', 'voter', 'learning', 'bus', 'hell', 'dangerous', 'remind', 'moral', 'United', 'category', 'relatively', 'victory', 'academic', 'Internet', 'healthy', 'negative', 'following', 'historical',
            'medicine', 'tour', 'depend', 'photo', 'finding', 'grab', 'direct', 'classroom', 'contact', 'justice', 'participate', 'daily', 'fair', 'pair', 'famous', 'separate', 'quote', 'German', 'pound', 'double',
            'conversation', 'develop', 'seek', 'connection', 'works', 'brown', 'lead', 'trouble', 'action', 'propose', 'next', 'careful', 'driver', 'conservative', 'present', 'liberal', 'lip', 'launch', 'accurate', 'career',
            'dog', 'scene', 'peace', 'citizen', 'weapon', 'perspective', 'advantage', 'tone', 'ocean', 'signal', 'sentence', 'discipline', 'elsewhere', 'iron', 'perception', 'pack', 'contempor'
        ];

        // Real words - loaded from Monkeytype API
        let realWords = fallbackWords;
        let wordBankSize = '10k'; // Default to 10K

        let selectedKeys = new Set();
        let currentText = '';
        let currentPosition = 0;
        let errorCount = 0;
        let totalTyped = 0;
        let startTime = null;
        let lastWpmUpdate = 0;
        let timerInterval = null;
        let errorPositions = new Map(); // Track positions with errors and what was typed
        let timeLimit = 30;
        let isTimedMode = true;
        let isUnlimitedMode = false;

        // Settings
        let wordCount = 10;
        let includeNumbers = false;
        let useRealWords = true;
        let useCapitals = false;
        let includeSpecialChars = false;
        let includeSpaces = true;
        let errorMode = 'block'; // 'block', 'skip', 'backspace'
        let fontSize = 'medium'; // 'small', 'medium', 'large', 'xlarge'
        let soundFeedbackEnabled = true;
        let soundType = 'classic';

        // Sound presets
        const soundPresets = {
            classic: {
                correct: { freq: 800, type: 'sine', duration: 0.05, volume: 0.03 },
                error: { freq: 200, type: 'sawtooth', duration: 0.1, volume: 0.05 }
            },
            mechanical: {
                correct: { freq: 1200, type: 'square', duration: 0.03, volume: 0.02 },
                error: { freq: 150, type: 'square', duration: 0.08, volume: 0.04 }
            },
            soft: {
                correct: { freq: 600, type: 'sine', duration: 0.08, volume: 0.02 },
                error: { freq: 300, type: 'sine', duration: 0.15, volume: 0.03 }
            },
            minimal: {
                correct: { freq: 1000, type: 'sine', duration: 0.02, volume: 0.015 },
                error: { freq: 250, type: 'triangle', duration: 0.05, volume: 0.025 }
            }
        };

        // Audio Context for sound feedback
        let audioContext = null;

        function initAudioContext() {
            if (!audioContext) {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
        }

        function playCorrectSound() {
            if (!soundFeedbackEnabled) return;
            initAudioContext();

            const preset = soundPresets[soundType].correct;
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = preset.freq;
            oscillator.type = preset.type;

            gainNode.gain.setValueAtTime(preset.volume, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + preset.duration);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + preset.duration);
        }

        function playErrorSound() {
            if (!soundFeedbackEnabled) return;
            initAudioContext();

            const preset = soundPresets[soundType].error;
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = preset.freq;
            oscillator.type = preset.type;

            gainNode.gain.setValueAtTime(preset.volume, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + preset.duration);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + preset.duration);
        }

        function flashKey(keyChar, isCorrect) {
            const keyElement = document.querySelector(`.key[data-key="${keyChar.toLowerCase()}"]`);
            if (!keyElement) return;

            const className = isCorrect ? 'flash-correct' : 'flash-error';
            keyElement.classList.add(className);

            setTimeout(() => {
                keyElement.classList.remove(className);
            }, isCorrect ? 300 : 400);
        }

        // Stats tracking
        let typingStats = {
            totalSessions: 0,
            totalCharactersTyped: 0,
            totalErrors: 0,
            totalTimeSeconds: 0,
            keyErrorCounts: {}, // { 'a': 5, 'b': 3, ... }
            sessionHistory: [], // Array of session objects
            bestWPM: 0,
            bestAccuracy: 0,
            practiceDates: [], // Array of date strings (YYYY-MM-DD) when user practiced
            longestStreak: 0 // Longest consecutive days streak
        };
        let sessionKeyErrors = {}; // Track errors for current session

        // Practice Courses - Convenient key presets
        const lessons = [
            {
                id: 1,
                title: "Home Row",
                description: "Practice the foundation keys",
                keys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
                difficulty: "Beginner"
            },
            {
                id: 2,
                title: "Top Row",
                description: "QWERTY row practice",
                keys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
                difficulty: "Beginner"
            },
            {
                id: 3,
                title: "Bottom Row",
                description: "Complete alphabet practice",
                keys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
                difficulty: "Intermediate"
            },
            {
                id: 4,
                title: "Numbers",
                description: "Letters + number keys practice",
                keys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
                difficulty: "Intermediate"
            },
            {
                id: 5,
                title: "Full Keyboard",
                description: "All keys including special characters",
                keys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '`', '-', '=', '[', ']', '\\', "'"],
                difficulty: "Advanced"
            },
            {
                id: 6,
                title: "Left Hand",
                description: "Left hand keys only",
                keys: ['q', 'w', 'e', 'r', 't', 'a', 's', 'd', 'f', 'g', 'z', 'x', 'c', 'v', 'b', '1', '2', '3', '4', '5'],
                difficulty: "Intermediate"
            },
            {
                id: 7,
                title: "Right Hand",
                description: "Right hand keys only",
                keys: ['y', 'u', 'i', 'o', 'p', 'h', 'j', 'k', 'l', ';', 'n', 'm', ',', '.', '/', '6', '7', '8', '9', '0'],
                difficulty: "Intermediate"
            }
        ];

        let courseStats = {
            courseData: {} // { courseId: { bestWPM: 45, bestAccuracy: 92, sessions: 5 } }
        };

        let activeCourseId = null;

        function loadCourseStats() {
            const saved = localStorage.getItem('courseStats');
            if (saved) {
                try {
                    courseStats = JSON.parse(saved);
                } catch (e) {
                    console.error('Failed to load course stats', e);
                }
            }
        }

        function saveCourseStats() {
            localStorage.setItem('courseStats', JSON.stringify(courseStats));
        }

        // Custom courses management
        let customCourses = [];

        function loadCustomCourses() {
            const saved = localStorage.getItem('customCourses');
            if (saved) {
                try {
                    customCourses = JSON.parse(saved);
                } catch (e) {
                    console.error('Failed to load custom courses', e);
                    customCourses = [];
                }
            }
        }

        function saveCustomCourses() {
            localStorage.setItem('customCourses', JSON.stringify(customCourses));
        }

        function deleteCustomCourse(courseId) {
            customCourses = customCourses.filter(c => c.id !== courseId);
            saveCustomCourses();

            // Also remove stats for this course
            if (courseStats.courseData[courseId]) {
                delete courseStats.courseData[courseId];
                saveCourseStats();
            }

            renderLessons();
        }

        function toggleCourseCompletion(courseId) {
            // Initialize course data if it doesn't exist
            if (!courseStats.courseData[courseId]) {
                courseStats.courseData[courseId] = {
                    bestWPM: 0,
                    bestAccuracy: 0,
                    sessions: 0,
                    completed: false
                };
            }

            // Toggle completion status
            courseStats.courseData[courseId].completed = !courseStats.courseData[courseId].completed;
            saveCourseStats();
            renderLessons();
        }

        window.toggleCourseCompletion = toggleCourseCompletion;

        function getAllCourses() {
            return [...lessons, ...customCourses];
        }

        function createCustomCourseFromPlaceholder(title, description, difficulty) {
            // Validation
            if (!title || title.trim() === '' || title === 'New Custom Course') {
                alert('Please enter a course name');
                return false;
            }

            if (selectedKeys.size === 0) {
                alert('Please select at least one key for your course');
                return false;
            }

            // Create new course with unique ID
            const newCourse = {
                id: `custom-${Date.now()}`,
                title: title.trim(),
                description: description.trim() || 'Custom course',
                keys: Array.from(selectedKeys),
                difficulty: difficulty,
                custom: true
            };

            customCourses.push(newCourse);
            saveCustomCourses();
            renderLessons();
            return true;
        }

        window.deleteCustomCourse = deleteCustomCourse;
        window.createCustomCourseFromPlaceholder = createCustomCourseFromPlaceholder;

        function renderLessons() {
            const lessonsGrid = document.getElementById('lessonsGrid');
            if (!lessonsGrid) return;

            const allCourses = getAllCourses();

            lessonsGrid.innerHTML = allCourses.map(lesson => {
                const isActive = activeCourseId == lesson.id;
                const courseData = courseStats.courseData[lesson.id];
                const isCustom = lesson.custom === true;

                let cardClass = 'lesson-card';
                if (isActive) {
                    cardClass += ' active';
                }

                const keysDisplay = lesson.keys.slice(0, 18).join(' ').toUpperCase() + (lesson.keys.length > 18 ? ' ...' : '');

                // Check completion status
                const isCompleted = courseData && courseData.completed;

                let statsText = '';
                if (courseData) {
                    // Show stats
                    statsText = `
                        <div class="lesson-stats">
                            <div class="lesson-stat-item">
                                <span class="stat-icon">⚡</span>
                                <span class="stat-text">${courseData.bestWPM} WPM</span>
                            </div>
                            <div class="lesson-stat-item">
                                <span class="stat-icon">🎯</span>
                                <span class="stat-text">${courseData.bestAccuracy}%</span>
                            </div>
                            <div class="lesson-stat-item">
                                <span class="stat-icon">📊</span>
                                <span class="stat-text">${courseData.sessions} session${courseData.sessions !== 1 ? 's' : ''}</span>
                            </div>
                        </div>
                    `;

                    // Add completion action
                    if (isCompleted) {
                        statsText += `<button class="lesson-completed-badge" onclick="event.stopPropagation(); toggleCourseCompletion('${lesson.id}');">✓ Finished</button>`;
                    } else {
                        statsText += `<button class="lesson-mark-finished-btn" onclick="event.stopPropagation(); toggleCourseCompletion('${lesson.id}');">Mark as Finished</button>`;
                    }
                } else {
                    statsText = `<div class="lesson-new-badge">✨ Try this course</div>`;
                }

                let difficultyBadge = '';
                if (lesson.difficulty === 'Beginner') {
                    difficultyBadge = '<span class="lesson-badge difficulty-beginner">Beginner</span>';
                } else if (lesson.difficulty === 'Intermediate') {
                    difficultyBadge = '<span class="lesson-badge difficulty-intermediate">Intermediate</span>';
                } else if (lesson.difficulty === 'Advanced') {
                    difficultyBadge = '<span class="lesson-badge difficulty-advanced">Advanced</span>';
                }

                // Add custom badge and delete button for custom courses
                const customBadge = isCustom ? '<span class="lesson-badge" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">Custom</span>' : '';
                const deleteBtn = isCustom ? `<button class="lesson-delete-btn" onclick="event.stopPropagation(); deleteCustomCourse('${lesson.id}');" title="Delete custom course">×</button>` : '';

                return `
                    <div class="${cardClass}${isCompleted ? ' completed' : ''}" data-lesson-id="${lesson.id}" onclick="selectLesson('${lesson.id}')">
                        ${deleteBtn}
                        <div class="lesson-header-row">
                            <div class="lesson-title">${lesson.title}</div>
                            <div style="display: flex; gap: 6px;">
                                ${customBadge}
                                ${difficultyBadge}
                            </div>
                        </div>
                        <div class="lesson-description">${lesson.description}</div>
                        <div class="lesson-keys-count">${lesson.keys.length} keys</div>
                        <div class="lesson-keys">${keysDisplay}</div>
                        ${statsText}
                    </div>
                `;
            }).join('');

            // Add placeholder card for creating new custom course
            const keysDisplay = selectedKeys.size > 0
                ? Array.from(selectedKeys).slice(0, 18).join(' ').toUpperCase() + (selectedKeys.size > 18 ? ' ...' : '')
                : 'Select keys from keyboard first';

            const placeholderCard = `
                <div class="lesson-card lesson-card-placeholder" onclick="event.stopPropagation();">
                    <div class="lesson-header-row">
                        <div class="lesson-title" contenteditable="true" id="newCourseTitle" data-placeholder="New Custom Course">New Custom Course</div>
                        <span class="lesson-badge difficulty-intermediate difficulty-cycle-badge" id="difficultyCycleBadge" onclick="cycleDifficulty()" title="Click to cycle difficulty">Intermediate</span>
                    </div>
                    <div class="lesson-description" contenteditable="true" id="newCourseDescription" data-placeholder="Add a description...">Add a description...</div>
                    <div class="lesson-keys-count">${selectedKeys.size} keys</div>
                    <div class="lesson-keys">${keysDisplay}</div>
                    <button class="create-course-inline-btn" onclick="saveNewCourse()">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Create Course
                    </button>
                </div>
            `;

            lessonsGrid.innerHTML += placeholderCard;

            // Update progress badge on toggle button - show number of courses tried
            const progressBadge = document.getElementById('lessonProgress');
            if (progressBadge) {
                const triedCount = Object.keys(courseStats.courseData).length;
                if (triedCount > 0) {
                    progressBadge.textContent = `${triedCount}`;
                    progressBadge.style.display = 'flex';
                } else {
                    progressBadge.style.display = 'none';
                }
            }
        }

        let selectedDifficulty = 'Intermediate';
        const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced'];

        window.cycleDifficulty = function() {
            const badge = document.getElementById('difficultyCycleBadge');
            if (!badge) return;

            // Get current index and move to next
            const currentIndex = difficultyLevels.indexOf(selectedDifficulty);
            const nextIndex = (currentIndex + 1) % difficultyLevels.length;
            selectedDifficulty = difficultyLevels[nextIndex];

            // Update badge text
            badge.textContent = selectedDifficulty;

            // Update badge class
            badge.className = 'lesson-badge difficulty-cycle-badge';
            if (selectedDifficulty === 'Beginner') {
                badge.classList.add('difficulty-beginner');
            } else if (selectedDifficulty === 'Intermediate') {
                badge.classList.add('difficulty-intermediate');
            } else if (selectedDifficulty === 'Advanced') {
                badge.classList.add('difficulty-advanced');
            }
        };

        window.saveNewCourse = function() {
            const title = document.getElementById('newCourseTitle').textContent;
            const description = document.getElementById('newCourseDescription').textContent;

            if (createCustomCourseFromPlaceholder(title, description, selectedDifficulty)) {
                // Success - course was created and renderLessons was called
                selectedDifficulty = 'Intermediate'; // Reset to default
            }
        };

        function updatePlaceholderKeys() {
            const keysCountEl = document.querySelector('.lesson-card-placeholder .lesson-keys-count');
            const keysDisplayEl = document.querySelector('.lesson-card-placeholder .lesson-keys');

            if (!keysCountEl || !keysDisplayEl) return;

            // Update keys count
            keysCountEl.textContent = `${selectedKeys.size} keys`;

            // Update keys display
            const keysDisplay = selectedKeys.size > 0
                ? Array.from(selectedKeys).slice(0, 18).join(' ').toUpperCase() + (selectedKeys.size > 18 ? ' ...' : '')
                : 'Select keys from keyboard first';
            keysDisplayEl.textContent = keysDisplay;
        }

        window.selectLesson = function(lessonId) {
            const allCourses = getAllCourses();
            // Handle both string and number IDs (numeric IDs come as strings from onclick)
            const lesson = allCourses.find(l => l.id == lessonId);
            if (!lesson) return;

            activeCourseId = lessonId;

            // Update active course title display
            const activeCourseTitle = document.getElementById('activeCourseTitle');
            if (activeCourseTitle) {
                activeCourseTitle.textContent = lesson.title;
                activeCourseTitle.style.display = 'flex';
            }

            // Clear current selection
            selectedKeys.clear();
            document.querySelectorAll('.key.selected').forEach(key => {
                key.classList.remove('selected');
            });
            document.querySelectorAll('.finger-btn.active').forEach(btn => {
                btn.classList.remove('active');
            });

            // Select lesson keys
            lesson.keys.forEach(key => {
                selectedKeys.add(key);
                const keyEl = document.querySelector(`.key[data-key="${key}"]`);
                if (keyEl) keyEl.classList.add('selected');
            });

            // Auto-enable settings based on lesson
            if (lesson.keys.some(k => ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(k))) {
                includeNumbers = true;
                includeNumbersCheckbox.checked = true;
            }
            if (lesson.keys.some(k => ['`', '-', '=', '[', ']', '\\', "'"].includes(k))) {
                includeSpecialChars = true;
                includeSpecialCharsCheckbox.checked = true;
            }

            // Generate practice text
            updateSelectedKeysList();
            generatePracticeText();
            renderLessons();

            // Keep sidebar open (user may want to browse courses)
            // You can optionally close it automatically with:
            // const sidebar = document.getElementById('lessonsSidebar');
            // if (sidebar) sidebar.classList.remove('open');

            // Scroll to practice area
            setTimeout(() => {
                document.querySelector('.practice-area').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        }

        function updateCourseStats(wpm, accuracy) {
            if (!activeCourseId) return;

            // Update course stats
            if (!courseStats.courseData[activeCourseId]) {
                courseStats.courseData[activeCourseId] = {
                    bestWPM: 0,
                    bestAccuracy: 0,
                    sessions: 0
                };
            }

            const courseData = courseStats.courseData[activeCourseId];
            courseData.sessions++;
            if (wpm > courseData.bestWPM) courseData.bestWPM = wpm;
            if (accuracy > courseData.bestAccuracy) courseData.bestAccuracy = accuracy;

            saveCourseStats();
            renderLessons();
        }

        const keys = document.querySelectorAll('.key');
        const fingerBtns = document.querySelectorAll('.finger-btn');
        const selectedKeysList = document.getElementById('selectedKeysList');
        const generateBtn = document.getElementById('generateBtn');
        const restartBtn = document.getElementById('restartBtn');
        const saveSettingsBtn = document.getElementById('saveSettingsBtn');
        const targetText = document.getElementById('targetText');
        const typingInput = document.getElementById('typingInput');
        const accuracyEl = document.getElementById('accuracy');
        const progressEl = document.getElementById('progress');
        const errorsEl = document.getElementById('errors');
        const wpmEl = document.getElementById('wpm');
        const timeElapsedEl = document.getElementById('timeElapsed');
        const progressBar = document.getElementById('progressBar');
        const timerDisplay = document.getElementById('timerDisplay');
        const timeRemaining = document.getElementById('timeRemaining');

        // Settings elements
        const modeWords = document.getElementById('modeWords');
        const modeTimed = document.getElementById('modeTimed');
        const modeUnlimited = document.getElementById('modeUnlimited');
        const wordCountSetting = document.getElementById('wordCountSetting');
        const timeLimitSetting = document.getElementById('timeLimitSetting');
        const includeNumbersCheckbox = document.getElementById('includeNumbers');
        const wordSetGibberish = document.getElementById('wordSetGibberish');
        const wordSetReal = document.getElementById('wordSetReal');
        const includeCapitalsCheckbox = document.getElementById('includeCapitals');
        const includeSpecialCharsCheckbox = document.getElementById('includeSpecialChars');

        // Handle individual key selection
        keys.forEach(key => {
            key.addEventListener('click', () => {
                const keyValue = key.dataset.key;

                // Space is always available, don't allow manual selection
                if (keyValue === ' ') return;

                const numberKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
                const specialChars = ['`', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', '\\', '|', ';', ':', "'", '"', ',', '<', '.', '>', '/', '?'];

                if (selectedKeys.has(keyValue)) {
                    selectedKeys.delete(keyValue);
                    key.classList.remove('selected');
                } else {
                    selectedKeys.add(keyValue);
                    key.classList.add('selected');

                    // Auto-enable toggles when selecting numbers or special chars
                    if (numberKeys.includes(keyValue) && !includeNumbers) {
                        includeNumbers = true;
                        includeNumbersCheckbox.checked = true;
                    }
                    if (specialChars.includes(keyValue) && !includeSpecialChars) {
                        includeSpecialChars = true;
                        includeSpecialCharsCheckbox.checked = true;
                    }
                }

                updateSelectedKeysList();
                showSaveButton();
            });
        });

        // Handle finger button selection
        fingerBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const finger = btn.dataset.finger;
                const isActive = btn.classList.contains('active');

                if (isActive) {
                    // Deselect this finger's keys
                    btn.classList.remove('active');
                    fingerMap[finger].forEach(key => {
                        selectedKeys.delete(key);
                        const keyEl = document.querySelector(`.key[data-key="${key}"]`);
                        if (keyEl) keyEl.classList.remove('selected');
                    });
                } else {
                    // Select this finger's keys - respect toggle settings
                    btn.classList.add('active');
                    const numberKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
                    const specialChars = ['`', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', '\\', '|', ';', ':', "'", '"', ',', '<', '.', '>', '/', '?'];
                    const capitalKeys = ['caps', 'shift', 'shift-right'];

                    fingerMap[finger].forEach(key => {
                        // Skip space - it's always available
                        if (key === ' ') return;
                        // Skip numbers if disabled
                        if (!includeNumbers && numberKeys.includes(key)) return;
                        // Skip special chars if disabled
                        if (!includeSpecialChars && specialChars.includes(key)) return;
                        // Skip caps/shift if capitals are disabled
                        if (!useCapitals && capitalKeys.includes(key)) return;

                        selectedKeys.add(key);
                        const keyEl = document.querySelector(`.key[data-key="${key}"]`);
                        if (keyEl) keyEl.classList.add('selected');
                    });
                }

                updateSelectedKeysList();
                showSaveButton();
            });
        });

        // Settings event listeners
        modeWords.addEventListener('change', () => {
            isTimedMode = false;
            isUnlimitedMode = false;
            wordCountSetting.style.display = 'flex';
            timeLimitSetting.style.display = 'none';
            showSaveButton();
            if (selectedKeys.size > 0) generatePracticeText();
        });

        modeTimed.addEventListener('change', () => {
            isTimedMode = true;
            isUnlimitedMode = false;
            wordCountSetting.style.display = 'none';
            timeLimitSetting.style.display = 'flex';
            const selectedTime = document.querySelector('input[name="timeLimit"]:checked');
            timeLimit = parseInt(selectedTime.value);
            showSaveButton();
            if (selectedKeys.size > 0) generatePracticeText();
        });

        modeUnlimited.addEventListener('change', () => {
            isTimedMode = false;
            isUnlimitedMode = true;
            wordCountSetting.style.display = 'none';
            timeLimitSetting.style.display = 'none';
            showSaveButton();
            if (selectedKeys.size > 0) generatePracticeText();
        });

        document.querySelectorAll('input[name="timeLimit"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                timeLimit = parseInt(e.target.value);
                showSaveButton();
                if (isTimedMode && selectedKeys.size > 0) generatePracticeText();
            });
        });

        document.querySelectorAll('input[name="wordCount"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                wordCount = parseInt(e.target.value);
                showSaveButton();
                if (!isTimedMode && !isUnlimitedMode && selectedKeys.size > 0) generatePracticeText();
            });
        });

        includeNumbersCheckbox.addEventListener('change', (e) => {
            includeNumbers = e.target.checked;
            showSaveButton();
            const numberKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

            // Add or remove number keys based on toggle
            fingerBtns.forEach(btn => {
                if (btn.classList.contains('active')) {
                    const finger = btn.dataset.finger;
                    fingerMap[finger].forEach(key => {
                        if (numberKeys.includes(key)) {
                            const keyEl = document.querySelector(`.key[data-key="${key}"]`);
                            if (includeNumbers) {
                                selectedKeys.add(key);
                                if (keyEl) keyEl.classList.add('selected');
                            } else {
                                selectedKeys.delete(key);
                                if (keyEl) keyEl.classList.remove('selected');
                            }
                        }
                    });
                }
            });

            updateSelectedKeysList();
        });

        wordSetGibberish.addEventListener('change', () => {
            useRealWords = false;
            showSaveButton();
            if (selectedKeys.size > 0) generatePracticeText();
        });

        wordSetReal.addEventListener('change', () => {
            useRealWords = true;
            showSaveButton();
            if (selectedKeys.size > 0) generatePracticeText();
        });

        includeCapitalsCheckbox.addEventListener('change', (e) => {
            useCapitals = e.target.checked;
            showSaveButton();
            updateKeyboardVisuals();
            if (selectedKeys.size > 0) generatePracticeText();
        });

        includeSpecialCharsCheckbox.addEventListener('change', (e) => {
            includeSpecialChars = e.target.checked;
            showSaveButton();
            const specialChars = ['`', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', '\\', '|', ';', ':', "'", '"', ',', '<', '.', '>', '/', '?'];

            // Add or remove special char keys based on toggle
            fingerBtns.forEach(btn => {
                if (btn.classList.contains('active')) {
                    const finger = btn.dataset.finger;
                    fingerMap[finger].forEach(key => {
                        if (specialChars.includes(key)) {
                            const keyEl = document.querySelector(`.key[data-key="${key}"]`);
                            if (includeSpecialChars) {
                                selectedKeys.add(key);
                                if (keyEl) keyEl.classList.add('selected');
                            } else {
                                selectedKeys.delete(key);
                                if (keyEl) keyEl.classList.remove('selected');
                            }
                        }
                    });
                }
            });

            updateSelectedKeysList();
        });

        document.getElementById('includeSpaces').addEventListener('change', (e) => {
            includeSpaces = e.target.checked;
            showSaveButton();
            if (selectedKeys.size > 0) generatePracticeText();
        });

        // Error Mode listeners
        document.querySelectorAll('input[name="errorMode"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                errorMode = e.target.value;
                showSaveButton();
            });
        });

        // Word Bank listeners
        document.querySelectorAll('input[name="wordBank"]').forEach(radio => {
            radio.addEventListener('change', async (e) => {
                const size = e.target.value;
                showSaveButton();
                await loadWordBank(size);
                // Regenerate text with new word bank if already practicing
                if (selectedKeys.size > 0 && currentText) {
                    generatePracticeText();
                }
            });
        });

        // Font size change
        document.querySelectorAll('input[name="fontSize"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                fontSize = e.target.value;
                showSaveButton();
                // Remove all font size classes
                targetText.classList.remove('font-small', 'font-medium', 'font-large', 'font-xlarge');
                // Add the selected font size class
                targetText.classList.add(`font-${fontSize}`);
            });
        });

        function updateKeyboardVisuals() {
            // Update keyboard visual highlights based on settings
            const specialChars = ['`', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', '\\', '|', ';', ':', "'", '"', ',', '<', '.', '>', '/', '?'];
            const capitalKeys = ['caps', 'shift', 'shift-right'];
            const nonTypeableKeys = ['tab', 'enter', 'backspace'];
            const numberKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

            keys.forEach(key => {
                const keyValue = key.dataset.key;
                const isSpecialChar = specialChars.includes(keyValue);
                const isCapitalKey = capitalKeys.includes(keyValue);
                const isNonTypeable = nonTypeableKeys.includes(keyValue);
                const isNumberKey = numberKeys.includes(keyValue);

                let shouldDim = false;

                // Always dim non-typeable keys (tab, enter, backspace)
                if (isNonTypeable) {
                    shouldDim = true;
                }
                // Dim number keys if disabled
                else if (!includeNumbers && isNumberKey && selectedKeys.has(keyValue)) {
                    shouldDim = true;
                }
                // Dim special chars if disabled
                else if (!includeSpecialChars && isSpecialChar && selectedKeys.has(keyValue)) {
                    shouldDim = true;
                }
                // Dim caps/shift keys if capitals are disabled
                else if (!useCapitals && isCapitalKey && selectedKeys.has(keyValue)) {
                    shouldDim = true;
                }

                // Apply or reset visual state
                if (shouldDim) {
                    key.style.opacity = '0.3';
                    key.style.filter = 'grayscale(70%)';
                } else {
                    key.style.opacity = '';
                    key.style.filter = '';
                }
            });
        }

        function updateSelectedKeysList() {
            if (selectedKeys.size === 0) {
                selectedKeysList.textContent = 'None - Click keys above or use finger shortcuts';
                generateBtn.disabled = true;
                restartBtn.disabled = true;
                targetText.innerHTML = 'Select keys above to generate practice text';
                typingInput.disabled = true;
                typingInput.value = '';
            } else {
                const nonTypeableKeys = ['tab', 'caps', 'shift', 'shift-right', 'enter', 'backspace'];
                let typeableKeys = Array.from(selectedKeys).filter(k => !nonTypeableKeys.includes(k));

                // Filter out space from display (it's always available anyway)
                typeableKeys = typeableKeys.filter(k => k !== ' ');

                // Filter out numbers if setting is disabled
                const numberKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
                if (!includeNumbers) {
                    typeableKeys = typeableKeys.filter(k => !numberKeys.includes(k));
                }

                // Filter out special chars if setting is disabled
                const specialChars = ['`', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', '\\', '|', ';', ':', "'", '"', ',', '<', '.', '>', '/', '?'];
                if (!includeSpecialChars) {
                    typeableKeys = typeableKeys.filter(k => !specialChars.includes(k));
                }

                const keysArray = typeableKeys.map(k => k.toUpperCase());
                selectedKeysList.textContent = keysArray.length > 0 ? keysArray.join(', ') : 'Only disabled keys selected - enable Numbers/Special Chars to use them';
                generateBtn.disabled = typeableKeys.length === 0;
                restartBtn.disabled = typeableKeys.length === 0;

                // Auto-generate practice text when keys are selected
                if (typeableKeys.length > 0) {
                    generatePracticeText();
                }
            }

            // Update placeholder card keys display
            updatePlaceholderKeys();
        }

        function restartTest() {
            if (!currentText) return;

            // Save stats for the current session before restarting (especially important for infinite mode)
            if (startTime && currentPosition > 0) {
                const finalWPM = calculateWPM();
                const finalAccuracy = totalTyped === 0 ? 100 : Math.round(((totalTyped - errorCount) / totalTyped) * 100);
                saveSessionStats(finalWPM, finalAccuracy);
            }

            currentPosition = 0;
            errorCount = 0;
            totalTyped = 0;
            startTime = null;
            lastWpmUpdate = 0;
            errorPositions.clear();

            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
            }

            if (isTimedMode) {
                timeRemaining.textContent = timeLimit + 's';
                timerDisplay.classList.remove('warning', 'danger');
            }

            renderText();
            updateStats();

            typingInput.value = '';
            typingInput.disabled = false;
            showOverlay();
        }

        function startTimer() {
            if (!isTimedMode) return;

            const startTimeMs = Date.now();
            const timeLimitMs = timeLimit * 1000;

            // Update every 50ms for smooth progress bar
            timerInterval = setInterval(() => {
                const elapsedMs = Date.now() - startTimeMs;
                const remainingMs = Math.max(0, timeLimitMs - elapsedMs);
                const remainingSec = Math.ceil(remainingMs / 1000);

                timeRemaining.textContent = remainingSec + 's';

                // No color changes - keep it consistent

                if (remainingMs <= 0) {
                    clearInterval(timerInterval);
                    timerInterval = null;
                    endTest();
                }
            }, 50);
        }

        function endTest() {
            typingInput.disabled = true;
            const finalWPM = calculateWPM();
            const finalAccuracy = totalTyped === 0 ? 100 : Math.round(((totalTyped - errorCount) / totalTyped) * 100);

            // Save session stats
            saveSessionStats(finalWPM, finalAccuracy);

            setTimeout(() => {
                showCompletionTooltip(finalWPM, finalAccuracy, errorCount);
            }, 100);
        }

        function calculateWPM() {
            if (!startTime) return 0;
            const timeElapsed = (Date.now() - startTime) / 1000 / 60; // minutes
            const wordsTyped = currentPosition / 5; // standard: 5 characters = 1 word
            return Math.round(wordsTyped / timeElapsed) || 0;
        }

        function getFilteredKeys() {
            // Filter out non-typeable keys
            const nonTypeableKeys = ['tab', 'caps', 'shift', 'shift-right', 'enter', 'backspace'];
            let keysArray = Array.from(selectedKeys).filter(key => !nonTypeableKeys.includes(key));

            // Filter out numbers if setting is disabled
            if (!includeNumbers) {
                const numberKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
                keysArray = keysArray.filter(key => !numberKeys.includes(key));
            }

            // Filter out special characters if setting is disabled
            if (!includeSpecialChars) {
                const specialChars = ['`', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', '\\', '|', ';', ':', "'", '"', ',', '<', '.', '>', '/', '?'];
                keysArray = keysArray.filter(key => !specialChars.includes(key));
            }

            // Include space if enabled
            if (includeSpaces && !keysArray.includes(' ')) {
                keysArray.push(' ');
            }

            return keysArray;
        }

        function getFilteredRealWords(keysArray) {
            // Filter real words to only include words that can be typed with selected keys
            const keySet = new Set(keysArray);
            return realWords.filter(word => {
                // Check if all characters in the word are available in selected keys
                for (let char of word) {
                    if (!keySet.has(char.toLowerCase())) {
                        return false;
                    }
                }
                return true;
            });
        }

        function capitalizeWord(word) {
            if (word.length === 0) return word;
            return word.charAt(0).toUpperCase() + word.slice(1);
        }

        function applyCapitalization(text) {
            if (!useCapitals) return text;

            // Determine which shift keys are selected
            const hasLeftShift = selectedKeys.has('shift');
            const hasRightShift = selectedKeys.has('shift-right');

            // Define which letters belong to which hand
            const leftHandLetters = ['q', 'w', 'e', 'r', 't', 'a', 's', 'd', 'f', 'g', 'z', 'x', 'c', 'v', 'b', '1', '2', '3', '4', '5'];
            const rightHandLetters = ['y', 'u', 'i', 'o', 'p', 'h', 'j', 'k', 'l', 'n', 'm', '6', '7', '8', '9', '0'];

            const words = text.split(' ');
            let wordsSinceCapital = 0;

            for (let i = 0; i < words.length; i++) {
                // Capitalize first word, or randomly every 8-12 words (simulating sentences)
                if (i === 0 || (wordsSinceCapital >= 8 && Math.random() < 0.3)) {
                    // Capitalize word based on shift selection
                    if (hasLeftShift && hasRightShift) {
                        // Both shifts: capitalize all
                        words[i] = capitalizeWord(words[i]);
                    } else if (hasRightShift) {
                        // Right shift: capitalize left hand letters only
                        words[i] = capitalizeWordSelective(words[i], leftHandLetters);
                    } else if (hasLeftShift) {
                        // Left shift: capitalize right hand letters only
                        words[i] = capitalizeWordSelective(words[i], rightHandLetters);
                    } else {
                        // No shift selected, use regular capitalization
                        words[i] = capitalizeWord(words[i]);
                    }
                    wordsSinceCapital = 0;
                } else {
                    wordsSinceCapital++;
                }
            }

            return words.join(' ');
        }

        function capitalizeWordSelective(word, allowedLetters) {
            // Only capitalize letters that are in the allowed set
            return word.split('').map(char => {
                if (allowedLetters.includes(char.toLowerCase())) {
                    return char.toUpperCase();
                }
                return char;
            }).join('');
        }

        function generateGibberishText(keysArray, numWords) {
            // Separate letters, numbers, and special characters
            const specialChars = ['`', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', '\\', '|', ';', ':', "'", '"', ',', '<', '.', '>', '/', '?'];
            const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            const letters = keysArray.filter(key => !specialChars.includes(key) && !numbers.includes(key));
            const availableSpecials = keysArray.filter(key => specialChars.includes(key));
            const availableNumbers = keysArray.filter(key => numbers.includes(key));

            let text = '';
            for (let i = 0; i < numWords; i++) {
                const wordLength = Math.floor(Math.random() * 7) + 2; // Random length between 2-8 characters

                // Generate word primarily from letters
                const useLettersForWord = letters.length > 0;
                const sourceArray = useLettersForWord ? letters : keysArray;

                for (let j = 0; j < wordLength; j++) {
                    const randomKey = sourceArray[Math.floor(Math.random() * sourceArray.length)];
                    text += randomKey;
                }

                // Add numbers within or after words if selected
                if (includeNumbers && availableNumbers.length > 0 && Math.random() < 0.4) {
                    const numLength = Math.floor(Math.random() * 3) + 1; // 1-3 digits
                    for (let k = 0; k < numLength; k++) {
                        const randomNum = availableNumbers[Math.floor(Math.random() * availableNumbers.length)];
                        text += randomNum;
                    }
                }

                // Add special characters at word boundaries if enabled
                if (includeSpecialChars && availableSpecials.length > 0 && Math.random() < 0.3) {
                    const randomSpecial = availableSpecials[Math.floor(Math.random() * availableSpecials.length)];
                    text += randomSpecial;
                }

                if (i < numWords - 1 && includeSpaces) text += ' ';
            }
            return useCapitals ? applyCapitalization(text) : text;
        }

        function generateRealWordsText(keysArray, numWords) {
            const availableWords = getFilteredRealWords(keysArray);

            if (availableWords.length === 0) {
                // Fall back to gibberish if no real words available
                return generateGibberishText(keysArray, numWords);
            }

            // Get available special characters and numbers
            const specialChars = ['`', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', '\\', '|', ';', ':', "'", '"', ',', '<', '.', '>', '/', '?'];
            const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            const availableSpecials = keysArray.filter(key => specialChars.includes(key));
            const availableNumbers = keysArray.filter(key => numbers.includes(key));
            const punctuation = availableSpecials.filter(char => [',', '.', '!', '?', ';', ':'].includes(char));

            let text = '';
            for (let i = 0; i < numWords; i++) {
                let word = availableWords[Math.floor(Math.random() * availableWords.length)];

                // Force lowercase if capitals are disabled
                if (!useCapitals) {
                    word = word.toLowerCase();
                }

                text += word;

                // Add numbers after words if selected
                if (includeNumbers && availableNumbers.length > 0 && Math.random() < 0.3) {
                    const numLength = Math.floor(Math.random() * 3) + 1; // 1-3 digits
                    for (let k = 0; k < numLength; k++) {
                        const randomNum = availableNumbers[Math.floor(Math.random() * availableNumbers.length)];
                        text += randomNum;
                    }
                }

                // Add punctuation occasionally if special chars are enabled
                if (includeSpecialChars && punctuation.length > 0 && Math.random() < 0.2) {
                    const randomPunct = punctuation[Math.floor(Math.random() * punctuation.length)];
                    text += randomPunct;
                }

                // Add other special characters occasionally
                if (includeSpecialChars && availableSpecials.length > 0 && Math.random() < 0.15) {
                    const randomSpecial = availableSpecials[Math.floor(Math.random() * availableSpecials.length)];
                    text += randomSpecial;
                }

                if (i < numWords - 1 && includeSpaces) text += ' ';
            }
            return useCapitals ? applyCapitalization(text) : text;
        }

        function appendMoreText() {
            // Append more words to the current text for unlimited mode
            const keysArray = getFilteredKeys();
            if (keysArray.length === 0) return;

            const numWords = 50; // Add 50 more words at a time
            let newText = includeSpaces ? ' ' : ''; // Add space before new words if enabled

            if (useRealWords) {
                newText += generateRealWordsText(keysArray, numWords);
            } else {
                newText += generateGibberishText(keysArray, numWords);
            }

            // Remove any double spaces
            newText = newText.replace(/\s+/g, ' ');

            currentText += newText;
            renderText();
        }

        function generatePracticeText() {
            if (selectedKeys.size === 0) return;

            // Save stats for the current session before generating new exercise
            if (startTime && currentPosition > 0) {
                const finalWPM = calculateWPM();
                const finalAccuracy = totalTyped === 0 ? 100 : Math.round(((totalTyped - errorCount) / totalTyped) * 100);
                saveSessionStats(finalWPM, finalAccuracy);
            }

            // Clear any existing timer
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
            }

            const keysArray = getFilteredKeys();

            if (keysArray.length === 0) {
                showModal('Please select some typeable keys (letters, numbers, symbols)');
                return;
            }

            // Generate more words for timed/unlimited modes
            const numWords = isUnlimitedMode ? 200 : (isTimedMode ? 100 : wordCount);

            let text = '';
            if (useRealWords) {
                text = generateRealWordsText(keysArray, numWords);
            } else {
                text = generateGibberishText(keysArray, numWords);
            }

            // Remove any double spaces
            text = text.replace(/\s+/g, ' ').trim();

            currentText = text;
            currentPosition = 0;
            errorCount = 0;
            totalTyped = 0;
            startTime = null;
            lastWpmUpdate = 0;
            errorPositions.clear();

            // Setup timer display
            if (isTimedMode) {
                timerDisplay.style.display = 'block';
                timeRemaining.textContent = timeLimit + 's';
                timerDisplay.classList.remove('warning', 'danger');
            } else {
                timerDisplay.style.display = 'none';
            }

            renderText();
            updateStats();

            typingInput.value = '';
            typingInput.disabled = false;
            showOverlay();
        }

        function renderText() {
            let html = '';
            let i = 0;

            while (i < currentText.length) {
                // Start a word wrapper
                html += '<span class="word-wrapper">';

                // Collect all characters until we hit a space or end of text
                while (i < currentText.length && currentText[i] !== ' ') {
                    const char = currentText[i];
                    let className = '';
                    let displayChar = char;

                    if (i < currentPosition) {
                        if (errorPositions.has(i)) {
                            className = 'incorrect';
                            const typedChar = errorPositions.get(i);
                            displayChar = `<span class="error-typed">${typedChar}</span>${char}`;
                        } else {
                            className = 'correct';
                        }
                    } else if (i === currentPosition) {
                        className = 'current';
                    } else {
                        className = 'upcoming';
                    }

                    html += `<span class="${className}" data-index="${i}">${displayChar}</span>`;
                    i++;
                }

                html += '</span>';

                // Handle space if present
                if (i < currentText.length && currentText[i] === ' ') {
                    let className = '';
                    if (i < currentPosition) {
                        className = errorPositions.has(i) ? 'incorrect' : 'correct';
                    } else if (i === currentPosition) {
                        className = 'current';
                    } else {
                        className = 'upcoming';
                    }
                    className += ' space-char';

                    html += `<span class="${className}" data-index="${i}"> </span>`;
                    i++;
                }
            }

            targetText.innerHTML = html;

            // Auto-scroll to keep current character visible
            setTimeout(() => {
                const currentSpan = targetText.querySelector('.current');
                if (currentSpan) {
                    const container = targetText;
                    const spanTop = currentSpan.offsetTop;
                    const spanHeight = currentSpan.offsetHeight;
                    const containerHeight = container.clientHeight;
                    const scrollTop = container.scrollTop;

                    // In unlimited mode, keep current line in the top 1/3 of the visible area
                    // This ensures you can always see plenty of upcoming text
                    const targetScrollPosition = spanTop - containerHeight * 0.25;

                    // Scroll if current character is outside the comfortable viewing area
                    if (spanTop < scrollTop + spanHeight ||
                        spanTop > scrollTop + containerHeight * 0.6) {
                        container.scrollTop = Math.max(0, targetScrollPosition);
                    }
                }
            }, 0);
        }

        function updateStats() {
            const accuracy = totalTyped === 0 ? 100 : Math.round(((totalTyped - errorCount) / totalTyped) * 100);
            accuracyEl.textContent = accuracy + '%';
            progressEl.textContent = `${currentPosition}/${currentText.length}`;
            errorsEl.textContent = errorCount;

            // Update WPM only every 5 seconds
            const now = Date.now();
            if (now - lastWpmUpdate >= 5000) {
                const wpm = calculateWPM();
                wpmEl.textContent = wpm;
                lastWpmUpdate = now;
            }

            // Update time elapsed
            if (startTime) {
                const elapsed = Math.floor((Date.now() - startTime) / 1000);
                timeElapsedEl.textContent = elapsed + 's';
            } else {
                timeElapsedEl.textContent = '0s';
            }

            // Update progress bar
            let progressPercent = 0;
            if (isTimedMode && startTime) {
                // In timed mode, show time progress
                const elapsed = Math.floor((Date.now() - startTime) / 1000);
                progressPercent = Math.min((elapsed / timeLimit) * 100, 100);
            } else {
                // In word/unlimited mode, show typing progress
                progressPercent = currentText.length > 0 ? (currentPosition / currentText.length) * 100 : 0;
            }
            progressBar.style.width = progressPercent + '%';
        }

        typingInput.addEventListener('input', (e) => {
            const typedValue = e.target.value;
            const typedChar = typedValue[typedValue.length - 1];

            // Start timer on first keystroke
            if (!startTime && typedValue.length === 1) {
                startTime = Date.now();
                if (isTimedMode) {
                    startTimer();
                }
            }

            if (typedValue.length > currentPosition) {
                totalTyped++;

                if (typedChar === currentText[currentPosition]) {
                    // Correct character typed
                    playCorrectSound();
                    flashKey(typedChar, true);

                    // If this position was previously an error, remove it
                    if (errorPositions.has(currentPosition)) {
                        errorPositions.delete(currentPosition);
                    }
                    currentPosition++;

                    // In unlimited mode, append more text when getting close to the end
                    if (isUnlimitedMode && currentPosition > currentText.length - 100) {
                        appendMoreText();
                    }

                    if (currentPosition === currentText.length) {
                        // Completed!
                        if (timerInterval) {
                            clearInterval(timerInterval);
                            timerInterval = null;
                        }

                        if (isUnlimitedMode) {
                            // Unlimited mode - just append more text
                            appendMoreText();
                        } else if (!isTimedMode) {
                            // Word count mode - save stats and auto-generate new exercise
                            const finalWPM = calculateWPM();
                            const finalAccuracy = totalTyped === 0 ? 100 : Math.round(((totalTyped - errorCount) / totalTyped) * 100);
                            saveSessionStats(finalWPM, finalAccuracy);

                            setTimeout(() => {
                                generatePracticeText();
                            }, 500);
                        } else {
                            // Timed mode - show completion message
                            typingInput.disabled = true;
                            const finalWPM = calculateWPM();
                            const finalAccuracy = totalTyped === 0 ? 100 : Math.round(((totalTyped - errorCount) / totalTyped) * 100);

                            // Save session stats
                            saveSessionStats(finalWPM, finalAccuracy);

                            setTimeout(() => {
                                showCompletionTooltip(finalWPM, finalAccuracy, errorCount);
                            }, 100);
                        }
                    }
                } else {
                    errorCount++;

                    // Play error feedback
                    playErrorSound();
                    flashKey(currentText[currentPosition], false);

                    // Track which key had the error (exclude space)
                    const expectedKey = currentText[currentPosition].toLowerCase();
                    if (expectedKey !== ' ') {
                        if (!sessionKeyErrors[expectedKey]) {
                            sessionKeyErrors[expectedKey] = 0;
                        }
                        sessionKeyErrors[expectedKey]++;
                    }

                    // Handle different error modes
                    if (errorMode === 'block') {
                        // Block mode: Don't advance position, remove incorrect character
                        e.target.value = typedValue.slice(0, -1);
                    } else if (errorMode === 'backspace') {
                        // Backspace mode: Mark as error, allow backspace to correct
                        errorPositions.set(currentPosition, typedChar);
                        currentPosition++;
                    }
                }

                renderText();
                updateStats();
            }
        });

        // Handle backspace for backspace error mode
        typingInput.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && errorMode === 'backspace') {
                const typedValue = e.target.value;
                if (typedValue.length < currentPosition && currentPosition > 0) {
                    // Allow going back
                    currentPosition--;
                    // Remove from error positions if correcting
                    errorPositions.delete(currentPosition);
                    renderText();
                    updateStats();
                }
            }
        });

        generateBtn.addEventListener('click', generatePracticeText);
        restartBtn.addEventListener('click', restartTest);
        saveSettingsBtn.addEventListener('click', () => {
            saveSettings();
            hideSaveButton();
        });

        // Click on target text to focus input and start typing
        targetText.addEventListener('click', () => {
            if (!typingInput.disabled) {
                typingInput.focus();
            }
        });

        // Make the entire practice area focusable - click anywhere to start typing
        document.addEventListener('click', (e) => {
            // Only auto-focus if we have text and input is enabled
            if (currentText && !typingInput.disabled && !e.target.closest('button') && !e.target.closest('input') && !e.target.closest('.key') && !e.target.closest('.finger-btn')) {
                typingInput.focus();
            }
        });

        // Update stats continuously for real-time WPM and time display
        setInterval(() => {
            if (startTime && !typingInput.disabled) {
                updateStats();
            }
        }, 100);

        // Settings Dropdown
        const settingsBtn = document.getElementById('settingsBtn');
        const settingsMenu = document.getElementById('settingsMenu');

        settingsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            settingsMenu.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!settingsMenu.contains(e.target) && !settingsBtn.contains(e.target)) {
                settingsMenu.classList.remove('show');
            }
        });

        // Stats Modal
        const statsModal = document.getElementById('statsModal');
        const statsBtn = document.getElementById('statsBtn');
        const statsClose = document.getElementById('statsClose');
        const resetStatsBtn = document.getElementById('resetStatsBtn');

        statsBtn.addEventListener('click', () => {
            displayStats();
            statsModal.classList.add('show');
        });

        statsClose.addEventListener('click', () => {
            statsModal.classList.remove('show');
        });

        statsModal.addEventListener('click', (e) => {
            if (e.target === statsModal) {
                statsModal.classList.remove('show');
            }
        });

        resetStatsBtn.addEventListener('click', () => {
            resetStats();
        });

        // Lessons Sidebar
        const lessonsSidebar = document.getElementById('lessonsSidebar');
        const lessonsToggle = document.getElementById('lessonsToggle');
        const sidebarClose = document.getElementById('sidebarClose');

        function openLessonsSidebar() {
            lessonsSidebar.classList.add('open');
        }

        function closeLessonsSidebar() {
            lessonsSidebar.classList.remove('open');
        }

        function toggleLessonsSidebar() {
            lessonsSidebar.classList.toggle('open');

            // Toggle active course title visibility
            const activeCourseTitle = document.getElementById('activeCourseTitle');
            if (activeCourseTitle) {
                activeCourseTitle.classList.toggle('hidden');
            }
        }

        lessonsToggle.addEventListener('click', toggleLessonsSidebar);
        sidebarClose.addEventListener('click', closeLessonsSidebar);

        // Close sidebar on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lessonsSidebar.classList.contains('open')) {
                closeLessonsSidebar();
            }
        });

        // Focus Mode
        const focusToggle = document.getElementById('focusToggle');
        const focusHint = document.querySelector('.focus-hint');
        let isFocusMode = false;
        let focusHintTimeout = null;

        function toggleFocusMode() {
            isFocusMode = !isFocusMode;
            document.body.classList.toggle('focus-mode', isFocusMode);
            focusToggle.checked = isFocusMode;

            // Clear any existing timeout
            if (focusHintTimeout) {
                clearTimeout(focusHintTimeout);
                focusHintTimeout = null;
            }

            if (isFocusMode) {
                // Show the hint and hide it after 3 seconds
                focusHint.classList.remove('hidden');
                focusHintTimeout = setTimeout(() => {
                    focusHint.classList.add('hidden');
                }, 3000);
            } else {
                // Remove the hidden class when exiting focus mode
                focusHint.classList.remove('hidden');
            }
        }

        focusToggle.addEventListener('change', () => {
            toggleFocusMode();
        });

        // Reset Button
        const resetBtn = document.getElementById('resetBtn');
        resetBtn.addEventListener('click', () => {
            if (confirm('Reset all settings? This will clear your saved preferences and selected keys, then refresh the page.')) {
                localStorage.clear();
                location.reload();
            }
        });

        // Dark Mode
        const darkModeToggle = document.getElementById('darkModeToggle');
        // Default to dark mode if not set in localStorage
        let isDarkMode = localStorage.getItem('darkMode') !== null
            ? localStorage.getItem('darkMode') === 'true'
            : true;

        function toggleDarkMode() {
            isDarkMode = !isDarkMode;
            document.body.classList.toggle('dark-mode', isDarkMode);
            darkModeToggle.checked = isDarkMode;
            localStorage.setItem('darkMode', isDarkMode);
        }

        // Initialize dark mode
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            darkModeToggle.checked = true;
        }

        darkModeToggle.addEventListener('change', () => {
            toggleDarkMode();
        });

        // Sound Feedback Toggle
        const soundFeedbackToggle = document.getElementById('soundFeedbackToggle');
        soundFeedbackToggle.addEventListener('change', () => {
            soundFeedbackEnabled = soundFeedbackToggle.checked;
            showSaveButton();
        });

        // Sound Type Cycle Button
        const soundTypes = ['classic', 'mechanical', 'soft', 'minimal'];
        const soundTypeLabels = {
            'classic': 'Classic',
            'mechanical': 'Mechanical',
            'soft': 'Soft',
            'minimal': 'Minimal'
        };

        window.cycleSoundType = function() {
            const currentIndex = soundTypes.indexOf(soundType);
            const nextIndex = (currentIndex + 1) % soundTypes.length;
            soundType = soundTypes[nextIndex];

            const btn = document.getElementById('soundTypeCycle');
            if (btn) {
                btn.textContent = soundTypeLabels[soundType];
            }

            // Play a preview of the selected sound
            playCorrectSound();

            showSaveButton();
        };

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Escape - Toggle focus mode
            if (e.key === 'Escape') {
                e.preventDefault();
                if (isFocusMode) {
                    toggleFocusMode();
                }
            }

            // Tab+Enter or Shift+Enter - Restart test
            if ((e.shiftKey || e.key === 'Tab') && e.key === 'Enter') {
                e.preventDefault();
                if (!restartBtn.disabled) {
                    restartTest();
                }
            }

            // Enter after Tab - Restart test
            if (e.key === 'Enter' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                const activeEl = document.activeElement;
                // Check if Tab was pressed recently (within 500ms)
                if (window.lastTabPress && Date.now() - window.lastTabPress < 500) {
                    e.preventDefault();
                    if (!restartBtn.disabled) {
                        restartTest();
                    }
                }
            }

            // Track Tab key press
            if (e.key === 'Tab') {
                window.lastTabPress = Date.now();
            }

            // Cmd+N (Mac) or Alt+N (Windows) - Generate new exercise
            if ((e.metaKey || e.altKey) && e.key === 'n') {
                e.preventDefault();
                if (!generateBtn.disabled) {
                    generatePracticeText();
                }
            }

            // Cmd+K (Mac) or Alt+K (Windows) - Focus input and scroll to practice area
            if ((e.metaKey || e.altKey) && e.key === 'k') {
                e.preventDefault();
                if (!typingInput.disabled) {
                    // Scroll to practice area
                    const practiceArea = document.querySelector('.practice-area');
                    if (practiceArea) {
                        practiceArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                    // Focus input after a short delay to ensure scroll completes
                    setTimeout(() => {
                        typingInput.focus();
                    }, 100);
                }
            }
        });

        // Prevent backspace in typing input
        typingInput.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace') {
                e.preventDefault();
            }
        });

        // Typing Overlay
        const typingOverlay = document.getElementById('typingOverlay');

        function hideOverlay() {
            if (typingOverlay && !typingOverlay.classList.contains('hidden')) {
                typingOverlay.classList.add('hidden');
                if (!typingInput.disabled) {
                    typingInput.focus();
                }
            }
        }

        function showOverlay() {
            if (typingOverlay && currentText) {
                typingOverlay.classList.remove('hidden');
            }
        }

        // Hide overlay on click
        if (typingOverlay) {
            typingOverlay.addEventListener('click', hideOverlay);
        }

        // Hide overlay on any keypress
        document.addEventListener('keydown', (e) => {
            if (typingOverlay && !typingOverlay.classList.contains('hidden') && currentText) {
                // Don't hide for modifier keys only
                if (!['Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) {
                    hideOverlay();
                }
            }
        });

        // Custom Modal
        const customModal = document.getElementById('customModal');
        const modalBody = document.getElementById('modalBody');
        const modalBtn = document.getElementById('modalBtn');

        function showModal(message) {
            // Check if message contains HTML
            if (message.includes('<')) {
                modalBody.innerHTML = message;
            } else {
                modalBody.textContent = message;
            }
            customModal.classList.add('show');
        }

        function hideModal() {
            customModal.classList.remove('show');
        }

        function showCompletionTooltip(wpm, accuracy, errors) {
            // Removed completion modal - it was distracting
            // Stats are already visible in the UI, no need for a popup
            return;

            /* Disabled tooltip code
            const tooltip = document.getElementById('completionTooltip');
            if (!tooltip) return;

            // Create stats HTML with title
            tooltip.innerHTML = `
                <div style="font-size: 16px; font-weight: 600; margin-bottom: 12px; color: #e2b714;">
                    ✓ Session Complete
                </div>
                <div class="stats-line">
                    <span class="stat-label">WPM:</span>
                    <span class="stat-value">${wpm}</span>
                </div>
                <div class="stats-line">
                    <span class="stat-label">Accuracy:</span>
                    <span class="stat-value">${accuracy}%</span>
                </div>
                <div class="stats-line">
                    <span class="stat-label">Errors:</span>
                    <span class="stat-value">${errors}</span>
                </div>
                <div style="font-size: 11px; margin-top: 12px; opacity: 0.6; text-align: center;">
                    Press Shift+Enter to restart
                </div>
            `;

            // Position in center of viewport
            tooltip.style.left = '50%';
            tooltip.style.top = '40%';
            tooltip.style.transform = 'translateX(-50%) translateY(-50%) translateY(10px) scale(0.95)';

            // Show tooltip
            setTimeout(() => {
                tooltip.classList.add('show');
            }, 10);

            // Hide after 5 seconds
            setTimeout(() => {
                tooltip.classList.remove('show');
            }, 5000);
            */
        }

        // Close modal on button click
        if (modalBtn) {
            modalBtn.addEventListener('click', hideModal);
        }

        // Close modal on backdrop click
        if (customModal) {
            customModal.addEventListener('click', (e) => {
                if (e.target === customModal) {
                    hideModal();
                }
            });
        }

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && customModal.classList.contains('show')) {
                hideModal();
            }
        });

        // Close modal on Enter key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && customModal.classList.contains('show')) {
                hideModal();
            }
        });

        // Save button visibility
        function showSaveButton() {
            saveSettingsBtn.classList.add('visible');
        }

        function hideSaveButton() {
            saveSettingsBtn.classList.remove('visible');
        }

        // LocalStorage functions
        function saveSettings() {
            const settings = {
                mode: isTimedMode ? 'timed' : (isUnlimitedMode ? 'unlimited' : 'words'),
                wordCount: wordCount,
                timeLimit: timeLimit,
                includeNumbers: includeNumbers,
                useRealWords: useRealWords,
                includeCapitals: useCapitals,
                includeSpecialChars: includeSpecialChars,
                includeSpaces: includeSpaces,
                errorMode: errorMode,
                wordBankSize: wordBankSize,
                fontSize: fontSize,
                soundFeedbackEnabled: soundFeedbackEnabled,
                soundType: soundType,
                selectedKeys: Array.from(selectedKeys)
            };
            localStorage.setItem('typingPracticeSettings', JSON.stringify(settings));
        }

        function loadSettings() {
            const saved = localStorage.getItem('typingPracticeSettings');
            if (!saved) return;

            try {
                const settings = JSON.parse(saved);

                // Apply mode settings
                if (settings.mode === 'timed') {
                    isTimedMode = true;
                    isUnlimitedMode = false;
                    modeTimed.checked = true;
                } else if (settings.mode === 'unlimited') {
                    isTimedMode = false;
                    isUnlimitedMode = true;
                    modeUnlimited.checked = true;
                } else {
                    isTimedMode = false;
                    isUnlimitedMode = false;
                    modeWords.checked = true;
                }

                // Apply word count
                if (settings.wordCount !== undefined) {
                    wordCount = settings.wordCount;
                    const wordCountRadio = document.getElementById(`wordCount${settings.wordCount}`);
                    if (wordCountRadio) wordCountRadio.checked = true;
                }

                // Apply time limit
                if (settings.timeLimit !== undefined) {
                    timeLimit = settings.timeLimit;
                    const timeLimitRadio = document.getElementById(`time${settings.timeLimit}`);
                    if (timeLimitRadio) timeLimitRadio.checked = true;
                }

                // Apply toggles
                if (settings.includeNumbers !== undefined) {
                    includeNumbers = settings.includeNumbers;
                    includeNumbersCheckbox.checked = settings.includeNumbers;
                }

                if (settings.useRealWords !== undefined) {
                    useRealWords = settings.useRealWords;
                    if (settings.useRealWords) {
                        wordSetReal.checked = true;
                    } else {
                        wordSetGibberish.checked = true;
                    }
                }

                if (settings.includeCapitals !== undefined) {
                    includeCapitals = settings.includeCapitals;
                    includeCapitalsCheckbox.checked = settings.includeCapitals;
                }

                if (settings.includeSpecialChars !== undefined) {
                    includeSpecialChars = settings.includeSpecialChars;
                    includeSpecialCharsCheckbox.checked = settings.includeSpecialChars;
                }

                if (settings.includeSpaces !== undefined) {
                    includeSpaces = settings.includeSpaces;
                    document.getElementById('includeSpaces').checked = settings.includeSpaces;
                }

                // Apply error mode
                if (settings.errorMode !== undefined) {
                    errorMode = settings.errorMode;
                    if (settings.errorMode === 'backspace') {
                        errorModeBackspace.checked = true;
                    } else {
                        errorModeBlock.checked = true;
                    }
                }

                // Apply word bank size
                if (settings.wordBankSize !== undefined) {
                    wordBankSize = settings.wordBankSize;
                    const wordBankRadio = document.getElementById(`wordBank${settings.wordBankSize}`);
                    if (wordBankRadio) wordBankRadio.checked = true;
                }

                // Apply font size
                if (settings.fontSize !== undefined) {
                    fontSize = settings.fontSize;
                    const fontSizeRadio = document.getElementById(`fontSize${settings.fontSize.charAt(0).toUpperCase() + settings.fontSize.slice(1)}`);
                    if (fontSizeRadio) fontSizeRadio.checked = true;
                    // Remove all font size classes and add the selected one
                    targetText.classList.remove('font-small', 'font-medium', 'font-large', 'font-xlarge');
                    targetText.classList.add(`font-${fontSize}`);
                }

                // Apply sound feedback setting
                if (settings.soundFeedbackEnabled !== undefined) {
                    soundFeedbackEnabled = settings.soundFeedbackEnabled;
                    document.getElementById('soundFeedbackToggle').checked = settings.soundFeedbackEnabled;
                }

                // Apply sound type setting
                if (settings.soundType !== undefined) {
                    soundType = settings.soundType;
                    const btn = document.getElementById('soundTypeCycle');
                    if (btn) {
                        const labels = { 'classic': 'Classic', 'mechanical': 'Mechanical', 'soft': 'Soft', 'minimal': 'Minimal' };
                        btn.textContent = labels[settings.soundType] || 'Classic';
                    }
                }

                // Restore selected keys
                if (settings.selectedKeys && Array.isArray(settings.selectedKeys)) {
                    // Clear current selection
                    selectedKeys.clear();
                    document.querySelectorAll('.key.selected').forEach(key => {
                        key.classList.remove('selected');
                    });
                    document.querySelectorAll('.finger-btn.active').forEach(btn => {
                        btn.classList.remove('active');
                    });

                    // Restore selected keys
                    settings.selectedKeys.forEach(key => {
                        selectedKeys.add(key);
                        const keyEl = document.querySelector(`.key[data-key="${key}"]`);
                        if (keyEl) keyEl.classList.add('selected');
                    });

                    // Activate finger buttons based on selected keys
                    const fingerBtns = document.querySelectorAll('.finger-btn');
                    fingerBtns.forEach(btn => {
                        const finger = btn.dataset.finger;
                        const fingerKeys = fingerMap[finger];
                        // Check if any key from this finger is selected
                        const hasSelectedKeys = fingerKeys.some(key => selectedKeys.has(key));
                        if (hasSelectedKeys) {
                            btn.classList.add('active');
                        }
                    });

                    // Update the selected keys list display
                    updateSelectedKeysList();
                }
            } catch (error) {
                console.error('Error loading settings:', error);
            }
        }

        // Stats Functions
        function loadStats() {
            const saved = localStorage.getItem('typingStats');
            if (saved) {
                try {
                    typingStats = JSON.parse(saved);
                } catch (error) {
                    console.error('Error loading stats:', error);
                }
            }
        }

        function saveStats() {
            localStorage.setItem('typingStats', JSON.stringify(typingStats));
        }

        function getTodayDateString() {
            const today = new Date();
            return today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
        }

        function calculateCurrentStreak() {
            if (!typingStats.practiceDates || typingStats.practiceDates.length === 0) {
                return 0;
            }

            // Sort dates in descending order (newest first)
            const sortedDates = [...new Set(typingStats.practiceDates)].sort((a, b) =>
                new Date(b) - new Date(a)
            );

            const today = getTodayDateString();
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];

            // Check if user practiced today or yesterday
            const mostRecentDate = sortedDates[0];
            if (mostRecentDate !== today && mostRecentDate !== yesterdayStr) {
                return 0; // Streak broken
            }

            // Count consecutive days
            let streak = 0;
            let currentDate = new Date(mostRecentDate);

            for (const dateStr of sortedDates) {
                const expectedDateStr = currentDate.toISOString().split('T')[0];
                if (dateStr === expectedDateStr) {
                    streak++;
                    currentDate.setDate(currentDate.getDate() - 1);
                } else {
                    break;
                }
            }

            return streak;
        }

        function calculateLongestStreak() {
            if (!typingStats.practiceDates || typingStats.practiceDates.length === 0) {
                return 0;
            }

            // Get unique dates and sort ascending
            const sortedDates = [...new Set(typingStats.practiceDates)].sort((a, b) =>
                new Date(a) - new Date(b)
            );

            let longestStreak = 1;
            let currentStreak = 1;

            for (let i = 1; i < sortedDates.length; i++) {
                const prevDate = new Date(sortedDates[i - 1]);
                const currDate = new Date(sortedDates[i]);

                // Calculate day difference
                const diffTime = currDate - prevDate;
                const diffDays = diffTime / (1000 * 60 * 60 * 24);

                if (diffDays === 1) {
                    // Consecutive day
                    currentStreak++;
                    longestStreak = Math.max(longestStreak, currentStreak);
                } else {
                    // Streak broken
                    currentStreak = 1;
                }
            }

            return longestStreak;
        }

        function saveSessionStats(wpm, accuracy) {
            if (!startTime) return; // No session to save

            const timeElapsed = (Date.now() - startTime) / 1000; // seconds

            // Update totals
            typingStats.totalSessions++;
            typingStats.totalCharactersTyped += currentPosition;
            typingStats.totalErrors += errorCount;
            typingStats.totalTimeSeconds += timeElapsed;

            // Update bests
            if (wpm > typingStats.bestWPM) {
                typingStats.bestWPM = wpm;
            }
            if (accuracy > typingStats.bestAccuracy) {
                typingStats.bestAccuracy = accuracy;
            }

            // Merge session key errors into global key error counts
            for (const [key, count] of Object.entries(sessionKeyErrors)) {
                if (!typingStats.keyErrorCounts[key]) {
                    typingStats.keyErrorCounts[key] = 0;
                }
                typingStats.keyErrorCounts[key] += count;
            }

            // Add to session history (keep last 100 sessions)
            typingStats.sessionHistory.push({
                date: new Date().toISOString(),
                wpm: wpm,
                accuracy: accuracy,
                characters: currentPosition,
                errors: errorCount,
                timeSeconds: timeElapsed
            });

            // Keep only last 100 sessions
            if (typingStats.sessionHistory.length > 100) {
                typingStats.sessionHistory = typingStats.sessionHistory.slice(-100);
            }

            // Track practice date for streaks
            const today = getTodayDateString();
            if (!typingStats.practiceDates) {
                typingStats.practiceDates = [];
            }
            if (!typingStats.practiceDates.includes(today)) {
                typingStats.practiceDates.push(today);
            }

            // Update longest streak
            const newLongest = calculateLongestStreak();
            if (newLongest > typingStats.longestStreak) {
                typingStats.longestStreak = newLongest;
            }

            // Reset session tracking
            sessionKeyErrors = {};

            // Update course stats if in a course
            updateCourseStats(wpm, accuracy);

            // Save to localStorage
            saveStats();
        }

        function displayStats() {
            const statsGrid = document.getElementById('statsGrid');
            const insightsContainer = document.getElementById('insightsContainer');
            const errorKeysList = document.getElementById('errorKeysList');

            // Calculate average stats
            const avgWPM = typingStats.sessionHistory.length > 0
                ? Math.round(typingStats.sessionHistory.reduce((sum, s) => sum + s.wpm, 0) / typingStats.sessionHistory.length)
                : 0;
            const avgAccuracy = typingStats.sessionHistory.length > 0
                ? Math.round(typingStats.sessionHistory.reduce((sum, s) => sum + s.accuracy, 0) / typingStats.sessionHistory.length)
                : 0;
            const totalHours = Math.floor(typingStats.totalTimeSeconds / 3600);
            const totalMinutes = Math.floor((typingStats.totalTimeSeconds % 3600) / 60);
            const currentStreak = calculateCurrentStreak();

            // Display main stats
            statsGrid.innerHTML = `
                <div class="stat-card">
                    <div class="stat-value">${typingStats.totalSessions}</div>
                    <div class="stat-label">Total Sessions</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${typingStats.bestWPM}</div>
                    <div class="stat-label">Best WPM</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${typingStats.bestAccuracy}%</div>
                    <div class="stat-label">Best Accuracy</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${avgWPM}</div>
                    <div class="stat-label">Avg WPM</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${avgAccuracy}%</div>
                    <div class="stat-label">Avg Accuracy</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${typingStats.totalCharactersTyped.toLocaleString()}</div>
                    <div class="stat-label">Chars Typed</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${typingStats.totalErrors.toLocaleString()}</div>
                    <div class="stat-label">Total Errors</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${totalHours}h ${totalMinutes}m</div>
                    <div class="stat-label">Time Spent</div>
                </div>
            `;

            // Display streaks
            const streaksContainer = document.getElementById('streaksContainer');
            let streakMessage = '';

            if (currentStreak === 0) {
                streakMessage = 'Start your streak today!';
            } else if (currentStreak === 1) {
                streakMessage = 'Great start! Come back tomorrow!';
            } else if (currentStreak < 7) {
                streakMessage = 'Keep going strong!';
            } else if (currentStreak < 30) {
                streakMessage = 'You\'re on fire!';
            } else {
                streakMessage = 'Legendary dedication!';
            }

            streaksContainer.innerHTML = `
                <div class="streak-card">
                    <span class="streak-icon">🔥</span>
                    <div class="streak-value">${currentStreak}</div>
                    <div class="streak-label">Current Streak</div>
                    <div class="streak-message">${streakMessage}</div>
                </div>
                <div class="streak-card">
                    <span class="streak-icon">🏆</span>
                    <div class="streak-value">${typingStats.longestStreak}</div>
                    <div class="streak-label">Longest Streak</div>
                    <div class="streak-message">${currentStreak === typingStats.longestStreak && currentStreak > 0 ? 'New record!' : 'Your best!'}</div>
                </div>
            `;

            // Generate insights
            const insights = generateInsights();
            if (insights.length > 0) {
                insightsContainer.innerHTML = insights.map(insight =>
                    `<div class="insight-card"><p>${insight}</p></div>`
                ).join('');
                document.getElementById('insightsSection').style.display = 'block';
            } else {
                document.getElementById('insightsSection').style.display = 'none';
            }

            // Display most frequent error keys (exclude space)
            const errorKeys = Object.entries(typingStats.keyErrorCounts)
                .filter(([key]) => key !== ' ')
                .sort((a, b) => b[1] - a[1])
                .slice(0, 10);

            if (errorKeys.length > 0) {
                errorKeysList.innerHTML = errorKeys.map(([key, count]) => {
                    const displayKey = key === ' ' ? 'Space' : key.toUpperCase();
                    return `
                        <div class="error-key-item">
                            <span class="error-key-name">${displayKey}</span>
                            <span class="error-key-count">${count} errors</span>
                        </div>
                    `;
                }).join('');
                document.getElementById('errorsSection').style.display = 'block';
            } else {
                document.getElementById('errorsSection').style.display = 'none';
            }

            // Render keyboard heatmap
            renderKeyboardHeatmap();
        }

        function renderKeyboardHeatmap() {
            const heatmapKeys = document.querySelectorAll('.heatmap-key');
            const errorCounts = typingStats.keyErrorCounts;

            // If no errors yet, hide the heatmap section
            if (Object.keys(errorCounts).length === 0) {
                document.getElementById('heatmapSection').style.display = 'none';
                return;
            }

            document.getElementById('heatmapSection').style.display = 'block';

            // Find the max error count for scaling
            const maxErrors = Math.max(...Object.values(errorCounts), 1);

            // Color each key based on error frequency
            heatmapKeys.forEach(keyElement => {
                const key = keyElement.getAttribute('data-key');

                // Skip space key
                if (key === ' ') return;

                const errorCount = errorCounts[key] || 0;

                // Reset previous styling
                keyElement.removeAttribute('data-error-level');
                keyElement.removeAttribute('data-error-count');

                if (errorCount > 0) {
                    // Calculate error level (1-7) based on percentage of max
                    const percentage = errorCount / maxErrors;
                    let errorLevel;
                    if (percentage < 0.15) errorLevel = 1;
                    else if (percentage < 0.3) errorLevel = 2;
                    else if (percentage < 0.45) errorLevel = 3;
                    else if (percentage < 0.6) errorLevel = 4;
                    else if (percentage < 0.75) errorLevel = 5;
                    else if (percentage < 0.9) errorLevel = 6;
                    else errorLevel = 7;

                    keyElement.setAttribute('data-error-level', errorLevel);
                    keyElement.setAttribute('data-error-count', errorCount);
                }
            });
        }

        function generateInsights() {
            const insights = [];

            if (typingStats.totalSessions === 0) {
                insights.push("Complete your first session to see personalized insights!");
                return insights;
            }

            // Improvement insights
            if (typingStats.sessionHistory.length >= 5) {
                const recent5 = typingStats.sessionHistory.slice(-5);
                const older5 = typingStats.sessionHistory.slice(-10, -5);
                if (older5.length === 5) {
                    const recentAvgWPM = recent5.reduce((sum, s) => sum + s.wpm, 0) / 5;
                    const olderAvgWPM = older5.reduce((sum, s) => sum + s.wpm, 0) / 5;
                    const improvement = ((recentAvgWPM - olderAvgWPM) / olderAvgWPM * 100).toFixed(1);

                    if (improvement > 5) {
                        insights.push(`🚀 You're improving! Your WPM has increased by ${improvement}% in recent sessions.`);
                    } else if (improvement < -5) {
                        insights.push(`🎯 Your WPM has decreased by ${Math.abs(improvement)}% recently. Take a break or slow down to focus on accuracy.`);
                    } else {
                        insights.push(`📊 Your typing speed is consistent. Keep practicing to push past plateaus!`);
                    }
                }
            }

            // Accuracy insight
            const avgAccuracy = typingStats.sessionHistory.length > 0
                ? typingStats.sessionHistory.reduce((sum, s) => sum + s.accuracy, 0) / typingStats.sessionHistory.length
                : 0;

            if (avgAccuracy < 90) {
                insights.push(`⚠️ Your average accuracy is ${avgAccuracy.toFixed(1)}%. Slow down and focus on accuracy before speed!`);
            } else if (avgAccuracy >= 95) {
                insights.push(`✨ Excellent accuracy at ${avgAccuracy.toFixed(1)}%! You're a precision typist.`);
            }

            // Error patterns
            const topErrors = Object.entries(typingStats.keyErrorCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3);

            if (topErrors.length > 0) {
                const topKey = topErrors[0][0] === ' ' ? 'Space' : topErrors[0][0].toUpperCase();
                const errorRate = ((topErrors[0][1] / typingStats.totalCharactersTyped) * 100).toFixed(1);
                insights.push(`🎯 Your most problematic key is "${topKey}" with ${topErrors[0][1]} errors (${errorRate}% error rate). Practice words containing this key!`);
            }

            // Milestone celebrations
            if (typingStats.totalSessions === 10) {
                insights.push(`🎉 Milestone achieved! You've completed 10 sessions. Keep up the great work!`);
            } else if (typingStats.totalSessions === 50) {
                insights.push(`🏆 Amazing! 50 sessions completed. You're dedicated to improving your typing!`);
            } else if (typingStats.totalSessions === 100) {
                insights.push(`🌟 Century club! 100 sessions completed. You're a typing champion!`);
            }

            // WPM milestones
            if (typingStats.bestWPM >= 100) {
                insights.push(`⚡ You've reached ${typingStats.bestWPM} WPM! That's professional-level typing speed!`);
            } else if (typingStats.bestWPM >= 60) {
                insights.push(`💪 Your best speed is ${typingStats.bestWPM} WPM. You're above average! Push to 80+ for expert level.`);
            }

            // Streak insights
            const currentStreak = calculateCurrentStreak();
            const today = getTodayDateString();
            const practicedToday = typingStats.practiceDates && typingStats.practiceDates.includes(today);

            if (currentStreak >= 30) {
                insights.push(`🔥 Incredible! ${currentStreak}-day streak! You're a dedicated typing master!`);
            } else if (currentStreak >= 14) {
                insights.push(`🔥 Amazing! ${currentStreak}-day streak! Two weeks of consistent practice!`);
            } else if (currentStreak >= 7) {
                insights.push(`🔥 Great streak! ${currentStreak} days in a row! Keep the momentum going!`);
            } else if (currentStreak >= 3) {
                insights.push(`🔥 Nice! ${currentStreak}-day streak. You're building a habit!`);
            } else if (currentStreak === 0 && !practicedToday) {
                insights.push(`💡 Your streak ended. Start a new one today by practicing!`);
            }

            // Longest streak achievement
            if (typingStats.longestStreak >= 30) {
                insights.push(`👑 Your longest streak is ${typingStats.longestStreak} days! That's legendary consistency!`);
            } else if (typingStats.longestStreak >= 14) {
                insights.push(`🏅 Your longest streak is ${typingStats.longestStreak} days! Can you beat it?`);
            }

            // Streak motivation
            if (currentStreak > 0 && currentStreak === typingStats.longestStreak) {
                insights.push(`⭐ You're on your longest streak ever! Keep going!`);
            }

            return insights;
        }

        function resetStats() {
            if (confirm('Are you sure you want to reset all statistics? This cannot be undone.')) {
                typingStats = {
                    totalSessions: 0,
                    totalCharactersTyped: 0,
                    totalErrors: 0,
                    totalTimeSeconds: 0,
                    keyErrorCounts: {},
                    sessionHistory: [],
                    bestWPM: 0,
                    bestAccuracy: 0,
                    practiceDates: [],
                    longestStreak: 0
                };
                sessionKeyErrors = {};
                saveStats();
                displayStats();
            }
        }

        // Initialize settings display based on defaults
        function initializeSettingsDisplay() {
            // Set up display based on default mode (Infinited)
            if (isUnlimitedMode) {
                wordCountSetting.style.display = 'none';
                timeLimitSetting.style.display = 'none';
            } else if (isTimedMode) {
                wordCountSetting.style.display = 'none';
                timeLimitSetting.style.display = 'flex';
            } else {
                wordCountSetting.style.display = 'flex';
                timeLimitSetting.style.display = 'none';
            }
        }

        // Initialize: Auto-select all fingers on page load (only if no saved selection)
        window.addEventListener('DOMContentLoaded', () => {
            // Initialize default font size
            targetText.classList.add('font-medium');

            // Load saved settings and stats
            loadSettings();
            loadStats();
            loadCourseStats();
            loadCustomCourses();

            // Initialize settings display based on loaded settings
            initializeSettingsDisplay();

            // Render lessons
            renderLessons();

            // Only auto-select all fingers if there are no saved keys
            if (selectedKeys.size === 0) {
                const numberKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
                const specialChars = ['`', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', '\\', '|', ';', ':', "'", '"', ',', '<', '.', '>', '/', '?'];
                const capitalKeys = ['caps', 'shift', 'shift-right'];

                fingerBtns.forEach(btn => {
                    const finger = btn.dataset.finger;
                    btn.classList.add('active');
                    fingerMap[finger].forEach(key => {
                        // Skip space - it's always available
                        if (key === ' ') return;
                        // Skip numbers if disabled
                        if (!includeNumbers && numberKeys.includes(key)) return;
                        // Skip special chars if disabled
                        if (!includeSpecialChars && specialChars.includes(key)) return;
                        // Skip caps/shift if capitals are disabled
                        if (!useCapitals && capitalKeys.includes(key)) return;

                        selectedKeys.add(key);
                        const keyEl = document.querySelector(`.key[data-key="${key}"]`);
                        if (keyEl) keyEl.classList.add('selected');
                    });
                });
                updateSelectedKeysList();
            }
        });
