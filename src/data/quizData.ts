export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  timeLimit: number;
  points: number;
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  questionCount: number;
  estimatedTime: string;
  gradient: string;
  questions: QuizQuestion[];
}

export const quizzes: Quiz[] = [
  {
    id: "tech-titans",
    title: "Tech Titans",
    description: "Test your knowledge of technology and innovation",
    icon: "💻",
    category: "Technology",
    difficulty: "Medium",
    questionCount: 6,
    estimatedTime: "3 min",
    gradient: "primary",
    questions: [
      {
        id: 1,
        question: "Which company created the first commercially successful smartphone?",
        options: ["Nokia", "Apple", "BlackBerry", "Samsung"],
        correctAnswer: 1,
        timeLimit: 15,
        points: 100,
        explanation: "Apple launched the iPhone in 2007, revolutionizing smartphones."
      },
      {
        id: 2,
        question: "What does 'HTML' stand for?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
        correctAnswer: 0,
        timeLimit: 12,
        points: 100,
        explanation: "HTML stands for HyperText Markup Language."
      },
      {
        id: 3,
        question: "Who co-founded Microsoft alongside Bill Gates?",
        options: ["Steve Wozniak", "Paul Allen", "Steve Jobs", "Larry Page"],
        correctAnswer: 1,
        timeLimit: 12,
        points: 150,
        explanation: "Paul Allen co-founded Microsoft with Bill Gates in 1975."
      },
      {
        id: 4,
        question: "What year was the World Wide Web invented?",
        options: ["1985", "1989", "1993", "1995"],
        correctAnswer: 1,
        timeLimit: 15,
        points: 150,
        explanation: "Tim Berners-Lee invented the World Wide Web in 1989."
      },
      {
        id: 5,
        question: "Which programming language is known as the 'language of the web'?",
        options: ["Python", "Java", "JavaScript", "C++"],
        correctAnswer: 2,
        timeLimit: 10,
        points: 100,
        explanation: "JavaScript is the primary language for web development."
      },
      {
        id: 6,
        question: "What does 'AI' stand for?",
        options: ["Automated Intelligence", "Artificial Intelligence", "Advanced Integration", "Algorithmic Interface"],
        correctAnswer: 1,
        timeLimit: 10,
        points: 100,
        explanation: "AI stands for Artificial Intelligence."
      },
    ],
  },
  {
    id: "science-explorer",
    title: "Science Explorer",
    description: "Journey through the wonders of science",
    icon: "🔬",
    category: "Science",
    difficulty: "Hard",
    questionCount: 6,
    estimatedTime: "4 min",
    gradient: "secondary",
    questions: [
      {
        id: 1,
        question: "What is the chemical symbol for Gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correctAnswer: 2,
        timeLimit: 10,
        points: 100,
        explanation: "Au comes from the Latin word 'Aurum'."
      },
      {
        id: 2,
        question: "How many planets are in our solar system?",
        options: ["7", "8", "9", "10"],
        correctAnswer: 1,
        timeLimit: 10,
        points: 100,
        explanation: "There are 8 planets after Pluto was reclassified."
      },
      {
        id: 3,
        question: "What is the speed of light in km/s approximately?",
        options: ["200,000", "300,000", "400,000", "150,000"],
        correctAnswer: 1,
        timeLimit: 15,
        points: 150,
        explanation: "Light travels at approximately 300,000 km/s."
      },
      {
        id: 4,
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi body"],
        correctAnswer: 2,
        timeLimit: 10,
        points: 100,
        explanation: "Mitochondria generate most of the cell's ATP energy."
      },
      {
        id: 5,
        question: "Which element has the atomic number 1?",
        options: ["Helium", "Hydrogen", "Lithium", "Carbon"],
        correctAnswer: 1,
        timeLimit: 10,
        points: 100,
        explanation: "Hydrogen is the lightest and most abundant element."
      },
      {
        id: 6,
        question: "What force keeps planets in orbit around the Sun?",
        options: ["Electromagnetic", "Nuclear", "Gravity", "Friction"],
        correctAnswer: 2,
        timeLimit: 12,
        points: 150,
        explanation: "Gravity is the force that governs planetary orbits."
      },
    ],
  },
  {
    id: "pop-culture",
    title: "Pop Culture Buzz",
    description: "How well do you know movies, music & trends?",
    icon: "🎬",
    category: "Entertainment",
    difficulty: "Easy",
    questionCount: 6,
    estimatedTime: "3 min",
    gradient: "accent",
    questions: [
      {
        id: 1,
        question: "Which movie franchise features a character named 'Iron Man'?",
        options: ["DC Universe", "Marvel Cinematic Universe", "Star Wars", "Transformers"],
        correctAnswer: 1,
        timeLimit: 10,
        points: 100,
        explanation: "Iron Man is a core Marvel Cinematic Universe character."
      },
      {
        id: 2,
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: 2,
        timeLimit: 12,
        points: 100,
        explanation: "Leonardo da Vinci painted the Mona Lisa around 1503-1519."
      },
      {
        id: 3,
        question: "What is the best-selling video game of all time?",
        options: ["Tetris", "Minecraft", "GTA V", "Wii Sports"],
        correctAnswer: 1,
        timeLimit: 15,
        points: 150,
        explanation: "Minecraft has sold over 300 million copies worldwide."
      },
      {
        id: 4,
        question: "Which band performed 'Bohemian Rhapsody'?",
        options: ["The Beatles", "Led Zeppelin", "Queen", "Pink Floyd"],
        correctAnswer: 2,
        timeLimit: 10,
        points: 100,
        explanation: "Queen released Bohemian Rhapsody in 1975."
      },
      {
        id: 5,
        question: "What streaming platform produced 'Stranger Things'?",
        options: ["Hulu", "Amazon Prime", "Netflix", "Disney+"],
        correctAnswer: 2,
        timeLimit: 10,
        points: 100,
        explanation: "Stranger Things is a Netflix original series."
      },
      {
        id: 6,
        question: "Which social media platform is known for short-form videos?",
        options: ["Facebook", "Twitter", "TikTok", "LinkedIn"],
        correctAnswer: 2,
        timeLimit: 10,
        points: 100,
        explanation: "TikTok popularized the short-form video format."
      },
    ],
  },
  {
    id: "world-geography",
    title: "Globe Trotter",
    description: "Navigate the world with geography trivia",
    icon: "🌍",
    category: "Geography",
    difficulty: "Medium",
    questionCount: 6,
    estimatedTime: "3 min",
    gradient: "primary",
    questions: [
      {
        id: 1,
        question: "What is the largest continent by area?",
        options: ["Africa", "North America", "Asia", "Europe"],
        correctAnswer: 2,
        timeLimit: 10,
        points: 100,
        explanation: "Asia is the largest continent at 44.58 million km²."
      },
      {
        id: 2,
        question: "Which river is the longest in the world?",
        options: ["Amazon", "Nile", "Mississippi", "Yangtze"],
        correctAnswer: 1,
        timeLimit: 12,
        points: 100,
        explanation: "The Nile stretches approximately 6,650 km."
      },
      {
        id: 3,
        question: "What is the capital of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        correctAnswer: 2,
        timeLimit: 12,
        points: 150,
        explanation: "Canberra is Australia's capital, not Sydney."
      },
      {
        id: 4,
        question: "Which country has the most natural lakes?",
        options: ["USA", "Russia", "Canada", "Brazil"],
        correctAnswer: 2,
        timeLimit: 15,
        points: 150,
        explanation: "Canada has over 2 million lakes."
      },
      {
        id: 5,
        question: "Mount Everest is located on the border of which two countries?",
        options: ["India & China", "Nepal & China", "Nepal & India", "Tibet & India"],
        correctAnswer: 1,
        timeLimit: 12,
        points: 100,
        explanation: "Everest sits on the Nepal-China border."
      },
      {
        id: 6,
        question: "What is the smallest country in the world?",
        options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
        correctAnswer: 1,
        timeLimit: 10,
        points: 100,
        explanation: "Vatican City is just 0.44 km²."
      },
    ],
  },
];
