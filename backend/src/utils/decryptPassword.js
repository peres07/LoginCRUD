import bcrypt from 'bcryptjs';

export const decryptPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
};