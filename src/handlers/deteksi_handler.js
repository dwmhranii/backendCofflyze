import pool from '../db.js';

// Get all detections
export const getDeteksi = async (request, h) => {
    const result = await pool.query('SELECT * FROM tbl_deteksi');
    return h.response(result.rows).code(200);
};

// Add a new detection
export const addDeteksi = async (request, h) => {
    const { gambar, akurasi, tanggal, idPohon, idInformasi, idUser } = request.payload;
    const result = await pool.query(
        'INSERT INTO tbl_deteksi (gambar, akurasi, tanggal, idPohon, idInformasi, idUser) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [gambar, akurasi, tanggal, idPohon, idInformasi, idUser]
    );
    return h.response(result.rows[0]).code(201);
};

// Update detection by ID
export const updateDeteksi = async (request, h) => {
    const { idDeteksi } = request.params;
    const { gambar, akurasi, tanggal, idPohon, idInformasi, idUser } = request.payload;
    await pool.query(
        'UPDATE tbl_deteksi SET gambar = $1, akurasi = $2, tanggal = $3, idPohon = $4, idInformasi = $5, idUser = $6 WHERE idDeteksi = $7',
        [gambar, akurasi, tanggal, idPohon, idInformasi, idUser, idDeteksi]
    );
    return h.response({ message: 'Detection updated successfully' }).code(200);
};

// Delete detection by ID
export const deleteDeteksi = async (request, h) => {
    const { idDeteksi } = request.params;
    await pool.query('DELETE FROM tbl_deteksi WHERE idDeteksi = $1', [idDeteksi]);
    return h.response({ message: 'Detection deleted successfully' }).code(200);
};
