import supabase from "./setup";

export default interface SupabaseORM {
    table: string;
    select: (query?: any) => Promise<any>;
    insert: (data: any) => Promise<any>;
    update: (data: any) => Promise<any>;
    delete: (id: any) => Promise<any>;
}