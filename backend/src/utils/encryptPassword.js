import bcrypt from 'bcryptjs';

export const encryptPassword = (password) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
};
