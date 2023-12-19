import { EntityTarget, FindOptionsSelect, FindOptionsSelectByString, FindOptionsWhere } from "typeorm";
import { dataSource } from "../config/ormcongif";

/**
 *
 * @param model - qaysi entitydan izlash kerakligi entity class beriladi required
 * @param where - o'sha o'sha where condition required
 * @param relations - relation qilib qo'shimcha datalar olish optional
 * @returns qiymatlar bo'yicha topilgan datalarni yuboradi agar muammo chiqib catchga tushsa bo'sh array qabul qilasiz
 */
const findAll = async <T>(
  model: EntityTarget<T>,
  where?: FindOptionsWhere<T>,
  relations?: string[],
  order?: any,
  select?: FindOptionsSelect<T> | FindOptionsSelectByString<T>
): Promise<T[]> => {
  try {
    await dataSource
      .connect()
      .catch((err) => `typeorm connect err: ${String(err)}`);
    const value = await dataSource.getRepository(model).find({
      where,
      relations,
      order,
      select 
    });
    return value;
  } catch (e) {
    console.log(e);
    
    return [];
  } finally {
    await dataSource
      .close()
      .catch((err) => `typeorm close err: ${String(err)}`);
  }
};

/**
 * @param model - qaysi entitydan izlash kerakligi entity class beriladi required
 * @param where - o'sha o'sha where condition required
 * @param relations - relation qilib qo'shimcha datalar olish optional
 * @returns qiymatlar bo'yicha topilgan datani yuboradi agar muammo chiqib catchga tushsa null qaytariladi
 */
const findOne = async <T>(
  model: EntityTarget<T>,
  where: FindOptionsWhere<T>,
  relations?: string[]
): Promise<T> => {
  try {
    await dataSource
      .connect()
      .catch((err) => `typeorm connect err: ${String(err)}`);
    const value = await dataSource
      .getRepository(model)
      .findOne({ where, relations });
    return value;
  } catch (e) {
    return null;
  } finally {
    await dataSource
      .close()
      .catch((err) => `typeorm close err: ${String(err)}`);
  }
};

/**
 * @param model - qaysi entitydan izlash kerakligi entity class beriladi required
 * @param where - o'sha o'sha where condition required
 * @returns qiymatlar bo'yicha topilgan datalarni sonini (length) yuboradi agar muammo chiqib catchga tushsa 0 qabul qilasiz
 */
const findCount = async <T>(
  model: EntityTarget<T>,
  where: FindOptionsWhere<T>
): Promise<number> => {
  try {
    await dataSource
      .connect()
      .catch((err) => `typeorm connect err: ${String(err)}`);
    const [_, totalCount] = await dataSource
      .getRepository(model)
      .findAndCount({ where });
    return totalCount;
  } catch (e) {
    return 0;
  } finally {
    await dataSource
      .close()
      .catch((err) => `typeorm close err: ${String(err)}`);
  }
};

/**
 * @param model - qaysi entitydan tozalash kerakligi entity class beriladi required
 * @param where - o'sha o'sha where condition required
 * @returns - o'chirilgan data obj {ok:true, msg: "success", data: any} ko'rinishida beriladi yoki {ok:false, data:{}, msg:"errorMsg"}
 */
type ormFunctionsReturnResultType = { ok: boolean; data: any; msg: string };
const destroyer = async <T>(
  model: EntityTarget<T>,
  where: FindOptionsWhere<T>
) => {
  const result: ormFunctionsReturnResultType = { ok: false, data: {}, msg: "" };
  try {
    await dataSource
      .connect()
      .catch((err) => `typeorm connect err: ${String(err)}`);
    const deleted = await dataSource
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
  } catch (e) {
    result.ok = false;
    if (String(e).includes("EntityPropertyNotFoundError")) {
      result.msg = `${
        model.toString()?.split(" ")?.[1] || ""
      } modelda ${Object.keys(where).join(
        ","
      )} field yo'q, xatolikni sozlab to'gri query bilan ishlating`.substring(
        400
      );
    } else {
      result.msg = String(e).substring(400);
    }
    return result;
  } finally {
    await dataSource
      .close()
      .catch((err) => `typeorm close err: ${String(err)}`);
  }
};

/**
 * @param model - qaysi entitydan yangilash kerakligi entity class beriladi required
 * @param where - o'sha o'sha where condition required
 * @returns - yangilangan data obj {ok:true, msg: "success", data: any} ko'rinishida beriladi yoki {ok:false, data:{}, msg:"errorMsg"}
 */
const update = async <T>(
  model: EntityTarget<T>,
  where: FindOptionsWhere<T>,
  set: any
) => {
  const result: ormFunctionsReturnResultType = {
    ok: false,
    data: {},
    msg: "",
  };
  try {
    await dataSource
      .connect()
      .catch((err) => `typeorm connect err: ${String(err)}`);
    const updated = await dataSource
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
  } catch (e) {
    console.log(e);
    result.ok = false;
    result.msg = String(e).substring(400);
    return result;
  } finally {
    await dataSource
      .close()
      .catch((err) => `typeorm close err: ${String(err)}`);
  }
};

/**
 * @param model - qaysi entityga yozish kerakligi entity class beriladi required
 * @param value - yoziladigan data
 * @returns - yozilgan data obj {ok:true, msg: "success", data: any} ko'rinishida beriladi yoki {ok:false, data:{}, msg:"errorMsg"}
 */
const insert = async <T>(model: EntityTarget<T>, value: any) => {
  const result: ormFunctionsReturnResultType = { ok: false, data: {}, msg: "" };
  try {
    await dataSource
      .connect()
      .catch((err) => `typeorm connect err: ${String(err)}`);
    const created = await dataSource
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
  } catch (e) {
    result.ok = false;
    if (
      String(e).includes(
        "повторяющееся значение ключа нарушает ограничение уникальности"
      )
    ) {
      result.msg = "not repeat"
    } else {
      result.msg = String(e).substring(0, 400);
    }
    result.data = null;
    return result;
  } finally {
    await dataSource
      .close()
      .catch((err) => `typeorm close err: ${String(err)}`);
  }
};

export { findAll, findOne, findCount, destroyer, update, insert };
