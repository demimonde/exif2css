// exif2css('not-an-exif-orientation')
{}

// exif2css(1)
{}

// exif2css(2)
{
    transform: 'rotateY(180deg)',

    transforms: {
        rotateY: 180,
    },
}

// exif2css(3)
{
    transform: 'rotate(180deg)',

    transforms: {
        rotate: 180,
    },
}

// exif2css(4)
{
    transform: 'rotate(180deg) rotateY(180deg)',

    transforms: {
        rotate: 180,
        rotateY: 180,
    },
}

// exif2css(5)
{
    transform: 'rotate(270deg) rotateY(180deg)',
    'transform-origin': 'top left',

    transforms: {
        rotate: 270,
        rotateY: 180,
    },
}

// exif2css(6)
{
    transform: 'translateY(-100%) rotate(90deg)',
    'transform-origin': 'bottom left',

    transforms: {
        translateY: -1,
        rotate: 90,
    },
}

// exif2css(7)
{
    transform: 'translateY(-100%) translateX(-100%) rotate(90deg) rotateY(180deg)',
    'transform-origin': 'bottom right',

    transforms: {
        translateY: -1,
        translateX: -1,
        rotate: 90,
        rotateY: 180,
    },
}

// exif2css(8)
{
    transform: 'translateX(-100%) rotate(270deg)',
    'transform-origin': 'top right',

    transforms: {
        translateX: -1,
        rotate: 270,
    },
}