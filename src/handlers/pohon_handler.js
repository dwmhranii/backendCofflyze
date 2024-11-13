import pool from '../db.js';

// Get all trees
export const getPohon = async (request, h) => {
    const result = await pool.query('SELECT * FROM tbl_pohon');
    return h.response(result.rows).code(200);
};

// Add a new tree
export const addPohon = async (request, h) => {
    const { labelPohon } = request.payload;
    const result = await pool.query(
        'INSERT INTO tbl_pohon (labelPohon) VALUES ($1) RETURNING *',
        [labelPohon]
    );
    return h.response(result.rows[0]).code(201);
};

// Update tree by ID
export const updatePohon = async (request, h) => {
    const { idPohon } = request.params;
    const { labelPohon } = request.payload;
    await pool.query(
        'UPDATE tbl_pohon SET labelPohon = $1 WHERE idPohon = $2',
        [labelPohon, idPohon]
    );
    return h.response({ message: 'Tree updated successfully' }).code(200);
};

// Delete tree by ID
export const deletePohon = async (request, h) => {
    const { idPohon } = request.params;
    await pool.query('DELETE FROM tbl_pohon WHERE idPohon = $1', [idPohon]);
    return h.response({ message: 'Tree deleted successfully' }).code(200);
};
