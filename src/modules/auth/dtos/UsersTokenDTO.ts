interface UsersTokenDTO {
    id?: string;
    id_pessoa: string;
    refresh_token: string;
    expires_date: Date;
}

export { UsersTokenDTO };
