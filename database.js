import mysql from "mysql2"
import dotenv from "dotenv"
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST, 
    user: process.env.MYSQL_USER, 
    password: process.env.MYSQL_PASSWORD, 
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getMoods () {
    const [rows] = await pool.query("SELECT * FROM moods")
    return rows;
}

//requesting a single mood
export async function getMood (id) {
    const [rows] = await pool.query(`SELECT * FROM moods WHERE id = ?`, [id])
    return rows[0];
}

export async function createMood (mood, rating) {
    const [result] = await pool.query(`
    INSERT INTO moods (mood, rating)
    VALUES (?, ?)`
    , [mood, rating])
    const id = result.insertId
    return getMood(id)
}

export async function deleteMood (id) {
    await pool.query(`DELETE FROM moods where id = ?`, [id])
    let moods = await getMoods()
    return moods
}

export async function updateMood (id, newMood, newRating) {
    await pool.query(`UPDATE moods SET mood=?, rating=? WHERE id=?`, [newMood, newRating, id])
    let moods = await getMoods()
    return moods
}