import { Role } from "src/enum/role.enum";

export type UserType = {
    id: number;
    First_name: string;
    Last_Name: string;
    Username: string;
    Password: string;
    Salt: string;
    Email_address: string;
    Is_Youtuber: boolean;
    Is_Pro: boolean;
    Role: Role;
    createdAt: Date;
    updatedAt: Date;
}
