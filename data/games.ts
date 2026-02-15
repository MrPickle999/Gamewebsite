
import { Game } from '../types';

export const GAMES_DATA: Game[] = [
  {
    id: '2048',
    title: '2048 Original',
    description: 'Join the numbers and get to the 2048 tile!',
    thumbnail: 'https://picsum.photos/seed/2048/400/300',
    iframeUrl: 'https://play2048.co/',
    category: 'Puzzle',
    rating: 4.8,
    isHot: true
  },
  {
    id: 'hextris',
    title: 'Hextris',
    description: 'A fast-paced puzzle game inspired by Tetris.',
    thumbnail: 'https://picsum.photos/seed/hextris/400/300',
    iframeUrl: 'https://hextris.io/',
    category: 'Arcade',
    rating: 4.5
  },
  {
    id: 'paperio2',
    title: 'Paper.io 2',
    description: 'Capture as much territory as possible and beat the competition.',
    thumbnail: 'https://picsum.photos/seed/paperio/400/300',
    iframeUrl: 'https://paper-io.com/',
    category: 'Action',
    isHot: true,
    rating: 4.9
  },
  {
    id: 'flappy2048',
    title: 'Flappy 2048',
    description: 'Flappy Bird mechanics mixed with 2048 matching.',
    thumbnail: 'https://picsum.photos/seed/flappy/400/300',
    iframeUrl: 'https://hczhcz.github.io/Flappy-2048/',
    category: 'Arcade',
    rating: 4.2
  },
  {
    id: 'drift-hunters',
    title: 'Drift Hunters',
    description: 'The ultimate drifting simulator for car enthusiasts.',
    thumbnail: 'https://picsum.photos/seed/drift/400/300',
    iframeUrl: 'https://v6p9d9t4.ssl.hwcdn.net/html/1453982/index.html',
    category: 'Driving',
    rating: 4.7,
    isHot: true
  },
  {
    id: 'slope',
    title: 'Slope',
    description: 'Drive a ball in the 3D running game in Slope Game.',
    thumbnail: 'https://picsum.photos/seed/slope/400/300',
    iframeUrl: 'https://kbhgames.com/game/slope',
    category: 'Action',
    rating: 4.6
  },
  {
    id: 'retro-bowl',
    title: 'Retro Bowl',
    description: 'The perfect game for the armchair quarterback to finally prove a point.',
    thumbnail: 'https://picsum.photos/seed/retrobowl/400/300',
    iframeUrl: 'https://game316009.konggames.com/gamez/0031/6009/live/index.html',
    category: 'Sports',
    rating: 4.9,
    isHot: true
  },
  {
    id: 'tower-master',
    title: 'Tower Master',
    description: 'Build the tallest tower in the world!',
    thumbnail: 'https://picsum.photos/seed/tower/400/300',
    iframeUrl: 'https://poki.com/en/g/tower-master',
    category: 'Strategy',
    rating: 4.1
  }
];
