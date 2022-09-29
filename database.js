import mysql from "mysql2"
import dotenv from "dotenv"
dotenv.config()

const pool = mysql.createPool({
    host: "containers-us-west-77.railway.app", 
    user: "root", 
    password: "74ulhU85blzfJESAXy61", 
    database: "railway", 
    port: "7090"
}).promise()

export async function getMoods () {
    const [moods] = await pool.query("SELECT * FROM moods")
    return moods;
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

export async function updateMood (id, newMood, newRating, newDate) {
    await pool.query(`UPDATE moods SET mood=?, rating=?, date=? WHERE id=?`, [newMood, newRating, newDate, id])
    let moods = await getMoods()
    return moods
}