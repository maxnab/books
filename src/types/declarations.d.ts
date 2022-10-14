declare global {
    namespace Express {
        interface User {
            id: string;
            username: string;
            password: string;
            favorite?: string;
        }
    }
}