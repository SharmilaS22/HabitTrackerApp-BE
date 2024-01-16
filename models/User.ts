import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

import { v4 as uuidv4 } from 'uuid';

class User extends Model {
    public id!: number;
    public name!: string;
    // username!: string;
    // password!: string;
    // email!: string;

    public getID(): number {
        return this.id;
    }
    public setID(id: number): void {
        this.id = id;
    }
    public getName(): string {
        return this.name;
    }
    public setName(name: string): void {
        this.name = name;
    }
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            // autoIncrement: true,
            primaryKey: true,
            defaultValue: uuidv4(),
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // username: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // },
        // password: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // },
        // email: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     unique: true,
        // },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        modelName: 'User',
    }
);

export { User };
