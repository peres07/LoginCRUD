import bcrypt from 'bcryptjs';

export const decryptPassword = (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash);
};
