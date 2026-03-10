import "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            role: string;
            isMitra: boolean;
            mitraStatus: string;
        };
    }

    interface User {
        role?: string;
        isMitra?: boolean;
        mitraStatus?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role?: string;
        isMitra?: boolean;
        mitraStatus?: string;
    }
}
