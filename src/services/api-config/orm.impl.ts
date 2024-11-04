import type SupabaseORM from "./orm";
import supabase from "./setup";

class SupabaseORMImpl implements SupabaseORM {
    table: string;

    constructor(table: string) {
        this.table = table;
    }

    select = async (query?: any) => {
        const stringQuery: [string, any][] = Object.entries(query);

        return supabase.from(this.table).select("*").eq(
        )
    }

    insert = async (data: any) => {
        supabase.from(this.table).insert(data);
    }

    update = async (data: any) => {
        supabase.from(this.table).update(data);
    }

    delete = async (id: any) => {
        supabase.from(this.table).delete(id);
    }
}

export default SupabaseORMImpl;