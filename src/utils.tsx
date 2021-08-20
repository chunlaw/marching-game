export const vibrate = (duration: number) => {
  if ( "vibrate" in navigator ) {
    navigator.vibrate(duration)
  }
}