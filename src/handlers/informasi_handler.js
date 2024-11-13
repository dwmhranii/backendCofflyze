import pool from '../db.js';

// Get all information
export const getInformasi = async (request, h) => {
    const result = await pool.query('SELECT * FROM tbl_informasi');
    return h.response(result.rows).code(200);
};

// Add new information
export const addInformasi = async (request, h) => {
    const { namaPenyakit, deskripsi, solusi, artikel } = request.payload;
    const result = await pool.query(
        'INSERT INTO tbl_informasi (namaPenyakit, deskripsi, solusi, artikel) VALUES ($1, $2, $3, $4) RETURNING *',
        [namaPenyakit, deskripsi, solusi, artikel]
    );
    return h.response(result.rows[0]).code(201);
};

// Update information by ID
export const updateInformasi = async (request, h) => {
    const { idInformasi } = request.params;
    const { namaPenyakit, deskripsi, solusi, artikel } = request.payload;
    await pool.query(
        'UPDATE tbl_informasi SET namaPenyakit = $1, deskripsi = $2, solusi = $3, artikel = $4 WHERE idInformasi = $5',
        [namaPenyakit, deskripsi, solusi, artikel, idInformasi]
    );
    return h.response({ message: 'Information updated successfully' }).code(200);
};

// Delete information by ID
export const deleteInformasi = async (request, h) => {
    const { idInformasi } = request.params;
    await pool.query('DELETE FROM tbl_informasi WHERE idInformasi = $1', [idInformasi]);
    return h.response({ message: 'Information deleted successfully' }).code(200);
};
