export enum ECATEOGRY {
  WORKOUT = 'Workout',
  STUDY = 'Study',
  BREAK = 'Break',
  OTHERS = 'Others',
}

export enum EACTION {
  START = 'start',
  PAUSE = 'pause',
  RESET = 'reset',
}

export interface ITimer {
  id: string,
  name: string,
  timeLeft: number,
  category: string,
  isRunning: boolean,
  duration: number,
  createdAt: string
}

export enum EBOTTOMSCREENICON {
  HOME = 'home',
  HISTORY = 'manage-history'
}

export enum ESCREEN {
  HOME_SCREEN = 'Home',
  HISTORY_SCREEN = 'History',
}

export interface IMenuItem {
  label: string;
  onSelect: () => void;
  icon: string;
}

export enum EMODE {
  DARK = 'dark',
  LIGHT = 'light'
}
