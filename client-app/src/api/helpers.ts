export const ParseValueRating = (value: string): IValueRating => {
    if (value.indexOf('/') !== -1) {
        let mas = value.split('/');
        return { value: Number.parseFloat(mas[0]), maxValue: Number.parseFloat(mas[1]) };
    } else if (value.indexOf('%') !== -1) {
        let mas = value.split('%');
        return { value: Number.parseFloat(mas[0]), maxValue: 100 };
    }
    return { value: -1, maxValue: 0 };
}

interface IValueRating {
    value: number;
    maxValue: number;
}
