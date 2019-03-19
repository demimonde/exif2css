## 1
1

/* expected */
{}
/**/

## 2
2

/* expected */
{
  "transform": "rotateY(180deg)",
  "transforms": {
    "rotateY":180
  },
  "transformStrings": {
    "rotateY": "rotateY(180deg)"
  }
}
/**/

## 3
3

/* expected */
{
  "transform": "rotate(180deg)",
  "transforms": {
    "rotate": 180
  },
  "transformStrings": {
    "rotate": "rotate(180deg)"
  }
}
/**/

## 4
4

/* expected */
{
  "transform": "rotate(180deg) rotateY(180deg)",
  "transforms": {
    "rotate": 180,
    "rotateY": 180
  },
  "transformStrings": {
    "rotate": "rotate(180deg)",
    "rotateY": "rotateY(180deg)"
  }
}
/**/

## 5
5

/* expected */
{
  "transform": "rotate(270deg) rotateY(180deg)",
  "transform-origin": "top left",
  "transforms": {
    "rotate": 270,
    "rotateY": 180
  },
  "transformStrings": {
    "rotate": "rotate(270deg)",
    "rotateY": "rotateY(180deg)"
  }
}
/**/

## 6
6

/* expected */
{
  "transform": "translateY(-100%) rotate(90deg)",
  "transform-origin": "bottom left",
  "transforms": {
    "translateY": -1,
    "rotate": 90
  },
  "transformStrings": {
    "translateY": "translateY(-100%)",
    "rotate": "rotate(90deg)"
  }
}
/**/

## 7
7

/* expected */
{
  "transform": "translateY(-100%) translateX(-100%) rotate(90deg) rotateY(180deg)",
  "transform-origin": "bottom right",
  "transforms": {
    "translateY": -1,
    "translateX": -1,
    "rotate": 90,
    "rotateY": 180
  },
  "transformStrings": {
    "translateY": "translateY(-100%)",
    "translateX": "translateX(-100%)",
    "rotate": "rotate(90deg)",
    "rotateY": "rotateY(180deg)"
  }
}
/**/

## 8
8

/* expected */
{
  "transform": "translateX(-100%) rotate(270deg)",
  "transform-origin": "top right",
  "transforms": {
    "translateX": -1,
    "rotate": 270
  },
  "transformStrings": {
    "translateX": "translateX(-100%)",
    "rotate": "rotate(270deg)"
  }
}
/**/