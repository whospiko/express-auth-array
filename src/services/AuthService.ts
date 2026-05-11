export interface AuthService {
    login(username: string, password: string): Promise<string>;
}