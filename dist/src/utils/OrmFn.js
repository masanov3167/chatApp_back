"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customQuery = exports.insert = exports.update = exports.destroyer = exports.findCount = exports.findOne = exports.findAll = void 0;
const ormcongif_1 = require("../config/ormcongif");
/**
 *
 * @param model - qaysi entitydan izlash kerakligi entity class beriladi required
 * @param where - o'sha o'sha where condition required
 * @param relations - relation qilib qo'shimcha datalar olish optional
 * @returns qiymatlar bo'yicha topilgan datalarni yuboradi agar muammo chiqib catchga tushsa bo'sh array qabul qilasiz
 */
const findAll = (model, where, relations, order, select) => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield ormcongif_1.dataSource.connect().catch(() => null);
    try {
        if (!conn)
            return [];
        const value = yield conn.getRepository(model).find({
            where,
            relations,
            order,
            select,
        });
        return value;
    }
    catch (e) {
        console.log(e);
        return [];
    }
    finally {
        yield conn.close().catch(e => console.log("Error conn closed : ", e));
    }
});
exports.findAll = findAll;
/**
 * @param model - qaysi entitydan izlash kerakligi entity class beriladi required
 * @param where - o'sha o'sha where condition required
 * @param relations - relation qilib qo'shimcha datalar olish optional
 * @returns qiymatlar bo'yicha topilgan datani yuboradi agar muammo chiqib catchga tushsa null qaytariladi
 */
const findOne = (model, where, relations) => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield ormcongif_1.dataSource.connect().catch(() => null);
    try {
        if (!conn)
            return null;
        const value = yield conn
            .getRepository(model)
            .findOne({ where, relations });
        return value;
    }
    catch (e) {
        console.log(e);
        return null;
    }
    finally {
        yield conn.close().catch(e => console.log("Error conn closed : ", e));
    }
});
exports.findOne = findOne;
/**
 * @param model - qaysi entitydan izlash kerakligi entity class beriladi required
 * @param where - o'sha o'sha where condition required
 * @returns qiymatlar bo'yicha topilgan datalarni sonini (length) yuboradi agar muammo chiqib catchga tushsa 0 qabul qilasiz
 */
const findCount = (model, where) => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield ormcongif_1.dataSource.connect().catch(() => null);
    try {
        if (!conn)
            return 0;
        const [_, totalCount] = yield conn
            .getRepository(model)
            .findAndCount({ where });
        return totalCount;
    }
    catch (e) {
        return 0;
    }
    finally {
        yield conn.close().catch(e => console.log("Error conn closed : ", e));
    }
});
exports.findCount = findCount;
const destroyer = (model, where) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const result = { ok: false, data: {}, msg: "" };
    const conn = yield ormcongif_1.dataSource.connect().catch(() => null);
    try {
        if (!conn) {
            result.msg = "Connection error";
            return result;
        }
        const deleted = yield conn
            .createQueryBuilder()
            .delete()
            .from(model)
            .where(where)
            .returning("*")
            .execute();
        if (deleted.affected < 1) {
            result.ok = false;
            result.msg = "❌";
            return result;
        }
        result.ok = true;
        result.data = deleted.raw[0];
        result.msg = "ok";
        return result;
    }
    catch (e) {
        result.ok = false;
        if (String(e).includes("EntityPropertyNotFoundError")) {
            result.msg = `${((_b = (_a = model.toString()) === null || _a === void 0 ? void 0 : _a.split(" ")) === null || _b === void 0 ? void 0 : _b[1]) || ""} modelda ${Object.keys(where).join(",")} field yo'q, xatolikni sozlab to'gri query bilan ishlating`.substring(400);
        }
        else {
            result.msg = String(e).substring(400);
        }
        return result;
    }
    finally {
        yield conn.close().catch(e => console.log("Error conn closed : ", e));
    }
});
exports.destroyer = destroyer;
/**
 * @param model - qaysi entitydan yangilash kerakligi entity class beriladi required
 * @param where - o'sha o'sha where condition required
 * @returns - yangilangan data obj {ok:true, msg: "success", data: any} ko'rinishida beriladi yoki {ok:false, data:{}, msg:"errorMsg"}
 */
const update = (model, where, set) => __awaiter(void 0, void 0, void 0, function* () {
    const result = {
        ok: false,
        data: {},
        msg: "",
    };
    const conn = yield ormcongif_1.dataSource.connect().catch(() => null);
    try {
        if (!conn) {
            result.msg = "connection error";
            return result;
        }
        const updated = yield conn
            .createQueryBuilder()
            .update(model)
            .set(set)
            .where(where)
            .returning("*")
            .execute();
        if (updated.affected < 1) {
            result.ok = false;
            result.msg = "❌";
            return result;
        }
        result.ok = true;
        result.data = updated.raw[0];
        result.msg = "ok";
        return result;
    }
    catch (e) {
        console.log(e);
        result.ok = false;
        result.msg = String(e).substring(400);
        return result;
    }
    finally {
        yield conn.close().catch(e => console.log("Error conn closed : ", e));
    }
});
exports.update = update;
/**
 * @param model - qaysi entityga yozish kerakligi entity class beriladi required
 * @param value - yoziladigan data
 * @returns - yozilgan data obj {ok:true, msg: "success", data: any} ko'rinishida beriladi yoki {ok:false, data:{}, msg:"errorMsg"}
 */
const insert = (model, value) => __awaiter(void 0, void 0, void 0, function* () {
    const result = { ok: false, data: {}, msg: "" };
    const conn = yield ormcongif_1.dataSource.connect().catch(() => null);
    try {
        if (!conn) {
            result.msg = "connection error";
            return result;
        }
        const created = yield conn
            .getRepository(model)
            .createQueryBuilder()
            .insert()
            .into(model)
            .values(value)
            .returning("*")
            .execute();
        result.ok = true;
        result.msg = "ok";
        result.data = created.raw[0];
        return result;
    }
    catch (e) {
        result.ok = false;
        if (String(e).includes("повторяющееся значение ключа нарушает ограничение уникальности")) {
            result.msg = "not repeat";
        }
        else {
            result.msg = String(e).substring(0, 400);
        }
        result.data = null;
        return result;
    }
    finally {
        yield conn.close().catch(e => console.log("Error conn closed : ", e));
    }
});
exports.insert = insert;
const customQuery = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield ormcongif_1.dataSource.connect().catch(() => null);
    try {
        if (!conn)
            return [];
        const result = yield conn.query(query);
        return result;
    }
    catch (e) {
        console.log(JSON.stringify(e));
        return [];
    }
    finally {
        yield conn.close().catch(e => console.log("Error conn closed : ", e));
    }
});
exports.customQuery = customQuery;
