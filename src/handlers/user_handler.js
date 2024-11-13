import pool from '../db.js';

// Get all users
export const getUsers = async (request, h) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tbl_user');
        return h.response(rows).code(200);
    } catch (error) {
        console.error("Error fetching users:", error.message);
        return h.response({ error: 'Failed to retrieve users' }).code(500);
    }
};

// Add a new user
export const addUser = async (request, h) => {
    const { namaLengkap, fotoProfile, nomorHp, alamat, tokenFirebase } = request.payload;
    try {
        const [result] = await pool.query(
            'INSERT INTO tbl_user (namaLengkap, fotoProfile, nomorHp, alamat, tokenFirebase) VALUES (?, ?, ?, ?, ?)',
            [namaLengkap, fotoProfile, nomorHp, alamat, tokenFirebase]
        );
        return h.response({ id: result.insertId, namaLengkap, fotoProfile, nomorHp, alamat, tokenFirebase }).code(201);
    } catch (error) {
        console.error("Error adding user:", error.message);
        return h.response({ error: 'Failed to add user' }).code(500);
    }
};

// Update user by ID
export const updateUser = async (request, h) => {
    const { idUser } = request.params;
    const { namaLengkap, fotoProfile, nomorHp, alamat, tokenFirebase } = request.payload;
    try {
        await pool.query(
            'UPDATE tbl_user SET namaLengkap = ?, fotoProfile = ?, nomorHp = ?, alamat = ?, tokenFirebase = ? WHERE idUser = ?',
            [namaLengkap, fotoProfile, nomorHp, alamat, tokenFirebase, idUser]
        );
        return h.response({ message: 'User updated successfully' }).code(200);
    } catch (error) {
        console.error("Error updating user:", error.message);
        return h.response({ error: 'Failed to update user' }).code(500);
    }
};

// Delete user by ID
export const deleteUser = async (request, h) => {
    const { idUser } = request.params;
    try {
        await pool.query('DELETE FROM tbl_user WHERE idUser = ?', [idUser]);
        return h.response({ message: 'User deleted successfully' }).code(200);
    } catch (error) {
        console.error("Error deleting user:", error.message);
        return h.response({ error: 'Failed to delete user' }).code(500);
    }
};
