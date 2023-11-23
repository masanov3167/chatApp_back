"use strict";
//joining error tiplarini ushlab olib o'zining qo'l bola xato habarlarini yuboruvchi funksiya
//label - ixtiyoriy parametr
// label bu nima? - phone fieldi xato ketsa userga phone xato deb chiqadi shuni telefon raqam deyishlik uchun parametrga kerakli keyni o'zbekcha bersak kifoya
Object.defineProperty(exports, "__esModule", { value: true });
const joiCustomErrorMessages = (label) => {
    const res = {
        "string.base": `Iltimos, to'g'ri ${label || "{#label}"}ni kiriting.`,
        "string.empty": `${label || "{#label}"} maydoni bo'sh bo'lishi mumkin emas.`,
        "string.max": `${label || "{#label}"} uchun kiritish chegarasi {#limit} belgidan oshmasligi kerak.`,
        "number.base": `Iltimos, to'g'ri ${label || "{#label}"}ni kiriting.`,
        "number.integer": `Iltimos, ${label || "{#label}"}ga butun son kiriting.`,
        "any.required": `${label || "{#label}"} maydoni to'ldirilishi shart.`,
        "array.base": `Iltimos, ${label || "{#label}"}ga to'plam(array) kiriting.`,
        "object.base": `Iltimos, ${label || "{#label}"}ga obyekt kiriting.`,
        "any.unknown": `${label || "{#label}"} maydonining turi noto'g'ri.`,
        "string.regex.base": `${label || "{#label}"}ning formati noto'g'ri.`,
        "any.only": `${label || "{#label}"} faqat quyidagi qiymatlardan biri bo'lishi mumkin: {#valids}.`,
        "boolean.base": `${label || "{#label}"} boolean tipda true yoki false bo'lishi kerak.`,
    };
    return res;
};
exports.default = joiCustomErrorMessages;
