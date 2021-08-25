export const Level = [
  {
    lv: 'lv1',
    board: [[-10, -10, -10, 0, -10, -10, -10, -10], [-9, -9, -9, 9, -9, -9, -9, -9]],
    turn: 0,
    round: 0,
    stepLimit: 100,
    isAi: true,
    playerFirst: true
  },
  {
    lv: 'lv2',
    board: [[-10, -10, -10, 0, -10, -10, -10, -10], [-9, -9, -9, 9, -9, -9, -9, -9]],
    turn: 0,
    round: 0,
    stepLimit: 3,
    isAi: true,
    playerFirst: true
  },
  {
    lv: 'lv3',
    board: [[-10, -10, 0, -10, -10, 2, -10, -10], [-9, -9, 8, -9, -9, 9, -9, -9]],
    turn: 0,
    round: 0,
    stepLimit: 100,
    isAi: true,
    playerFirst: true
  },
  {
    lv: 'lv4',
    board: [[-10, -10, 0, -10, -10, 0, -10, -10], [-9, -9, 9, -9, -9, 8, -9, -9]],
    turn: 0,
    round: 0,
    stepLimit: 5,
    isAi: true,
    playerFirst: true
  },
  {
    lv: 'lv5',
    board: [[-10, 0, -10, 0, -10, 0, -10, -10], [-9, 9, -9, 7, -9, 8, -9, -9]],
    turn: 0,
    round: 0,
    stepLimit: 100,
    isAi: true,
    playerFirst: true
  },
  {
    lv: 'lv6',
    board: [[-10, 0, -10, 0, -10, 0, -10, -10], [-9, 7, -9, 9, -9, 8, -9, -9]],
    turn: 0,
    round: 0,
    stepLimit: 4,
    isAi: true,
    playerFirst: true
  },
  {
    lv: 'lv7',
    board: [[-10, 0, 2, 1, 0, 3, 0, 1], [-9, 7, 9, 9, 8, 8, 7, 9]],
    turn: 0,
    round: 0,
    stepLimit: 100,
    isAi: true,
    playerFirst: true
  },
  {
    lv: 'lv8',
    board: [[0, 1, 2, 3, 4, 3, 2, 1], [9, 8, 7, 6, 6, 7, 8, 9]],
    turn: 0,
    round: 0,
    stepLimit: 3,
    isAi: true,
    playerFirst: true
  },
  {
    lv: 'lv9',
    board: [[0, 1, 0, 2, 0, 1, 2, 0], [9, 7, 9, 8, 9, 8, 9, 7]],
    turn: 0,
    round: 0,
    stepLimit: 3,
    random: true,
    isAi: true,
    playerFirst: true
  }
]

export interface CoordinateProps {
  x: number,
  y: number
}

export interface GameStateProps {
  lv: string;
  board: number[][];
  random?: boolean;
  round: number;
  stepLimit: number;
  isAi: boolean;
  playerFirst: boolean;
  lastMove?: number[];
}

export interface RecordsProps {
  [lv: number]: number[]
}

export const AiColors = ['#E20613', '#824A02', '#A7A7AD', '#FEE101']
export const PlayerName = ['Black', 'White']
export const MisereLevelOffset = 1000
