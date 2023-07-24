export interface RegisterBody {
    username: string;
    email: string;
    password: string;
}

export interface ChangeEmailBody {
    new_email: string;
}

export interface ChangePasswordBody {
    new_password: string;
}

export interface ChangeUsernameBody {
    new_username: string;
}

export interface CodeBody {
    code: string;
}
