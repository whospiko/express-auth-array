
export interface SimpleRepo {
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any | null>;
}