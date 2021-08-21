import { Level } from './constants'

export const vibrate = (duration: number) => {
  if ( "vibrate" in navigator ) {
    navigator.vibrate(duration)
  }
}

export const validLv = (lvId:string|undefined):number => {
  const lv = parseInt(lvId || '1', 10) - 1
  if ( lv < 0 )
    return 0
  if ( lv >= Level.length )
    return Level.length - 1
  return lv
}