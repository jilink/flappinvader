export const computeX = (x:number, windowWidth:number, canvaWidth:number) => {
  return x * (windowWidth / canvaWidth)
}

export const computeY = (y:number, windowHeight:number, canvaHeight:number) => {
  return y * (windowHeight / canvaHeight)
}