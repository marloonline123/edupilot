"use server";

import createSupabaseClient from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";

export default async function createCourse(formData: CreateCourse) {
    const { userId: author } = await auth();
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.from("courses").insert({
        author,
        ...formData
    })
    
    console.log('data', data);
    console.log('error', error);
    
    if (error || !data) throw new Error(error?.message ?? "Failed to create course");

    return data[0];
}