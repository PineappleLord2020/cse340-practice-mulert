import dbPromise from '../database/index.js';
 
const addNewGame = async (name, description, classification_id, image_path = '') => {
    const db = await dbPromise;
    const sql = `
        INSERT INTO game (game_name, game_description, classification_id, image_path)
        VALUES (?, ?, ?, ?)
    `;
    return await db.run(sql, [name, description, classification_id, image_path]);
};

const getClassifications = async () => {
    const db = await dbPromise;
    return await db.all('SELECT * FROM classification');
};
 
const getGamesByClassification = async (classificationId) => {
    const db = await dbPromise;
    const query = `
        SELECT game.*, classification.classification_name 
        FROM game 
        JOIN classification ON game.classification_id = classification.classification_id
        WHERE game.classification_id = ?;`
        ;
        return await db.all(query, [classificationId]);
};

const getGameById = async (gameId) => {
    const db = await dbPromise;
    const query = `
        SELECT game.*, classification.classification_name 
        FROM game 
        JOIN classification ON game.classification_id = classification.classification_id
        WHERE game.game_id = ?;
    `;
    return await db.get(query, [gameId]);
};
 
async function updateGame(gameId, name, description, classificationId, imagePath = '') {
    const db = await dbPromise;
 
    // If no image was uploaded, update basic game info
    if (imagePath === '') {
        const sql = `
            UPDATE game 
            SET game_name = ?, 
                game_description = ?, 
                classification_id = ?
            WHERE game_id = ?
        `;
        return await db.run(sql, [name, description, classificationId, gameId]);
    }
 
    // If image was uploaded, update all info including image
    const sql = `
        UPDATE game 
        SET game_name = ?, 
            game_description = ?, 
            classification_id = ?,
            image_path = ?
        WHERE game_id = ?
    `;
    return await db.run(sql, [name, description, classificationId, imagePath, gameId]);
}

async function deleteGame(gameId) {
    const db = await dbPromise;
 
    const sql = `
        DELETE game 
            WHERE game_id = ?
        `;
        return await db.run(sql, [gameId]);
}
 
export { getClassifications, getGamesByClassification, addNewGame, getGameById, updateGame, deleteGame };