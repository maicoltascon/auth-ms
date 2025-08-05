export class Login {
    email: string;
    password: string;
}

export class Register {
    name: string;
    lastName: string;
    email: string;
    password: string;
}

export class ChangePassword {
    oldPassword: string;
    newPassword: string;
}

export class RecoveryPassword {
    email: string;
}