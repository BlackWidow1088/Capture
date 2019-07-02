export const findUserName = (name) => {
    let names = name.split(' ');
    return names.join('');
}

export const getFotoDetails = (foto) => {
    // 28.976081 77.764565 May 11 2019 15:10:00 Screenshot (1).png
    let each = foto.split(' ');
    return {
        lat: each[0],
        lng: each[1],
        date: `${each[2]} ${each[3]} ${each[4]} ${each[5]}`,
        foto: each.slice(6, each.length).join(' ')
    }
}


export function eqSet(as, bs) {
    return as.size === bs.size && all(isIn(bs), as);
}

export function all(pred, as) {
    for (var a of as) if (!pred(a)) return false;
    return true;
}

export function isIn(as) {
    return function (a) {
        return as.has(a);
    };
}