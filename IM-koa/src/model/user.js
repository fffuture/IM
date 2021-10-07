//数据层
const { query } = require('../utils/DB-access')

let tableName = 'user';

async function hasUser (userId, password) {
    console.log("--hasUser param:", arguments);
    let sql = `SELECT * FROM ${tableName} where userId = '${userId}' and password = '${password}'`;
    console.log("--hasUser sql:　", sql);
    let result = await query( sql );
    console.log( "查询结果: ", result);
    return result && result.length > 0;
}

async function addUser(userId, password) {
    console.log("--registerUser param:", arguments);
    //表结构 weChatId weChatName imgURL password 
    try {
        let sql = `insert into ${tableName} values ('${userId}', '${password}', '', '',  Null) `;
        let result = await query( sql );
        console.log( "新增用户结果: ", JSON.stringify(result));
        if(result.affectedRows === 1) {
            return {ok: true, status:200, msg:"注册成功"};
        }
        return {ok: false, status:200, msg: result.message};
    } catch (error) {
        console.log("err:", error.sqlMessage);
        if(error.errno === 1062) { // sqlMessage: "Duplicate entry 'qqq' for key 'PRIMARY'"
            return {ok: false, status:200, err: "该用户名已存在"};
        }
        return {ok: false, status:200, err: error.message};
    }
    
}

/**
 * @description 查询指定用户的个人信息
 * @params {string} userId 
 * @return {Array[Object]} {
                                avatar: string,
                                gender: string,
                                name: string,
                                userId: string,
                            }
 */
async function getProfile(userId) {
    try {
        const sql = `select * from user where userId = '${userId}'`;
        const result = await query( sql );
        console.log("model getProfile: ", result);
        return result;
    } catch (error) {
        console.log("---error: ", error);
        // return {ok: false, status:200, err: error.message};
        throw error;
    }
}


module.exports = {
    hasUser,
    addUser,
    getProfile
}