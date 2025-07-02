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

export async function getAllCourses({ limit = 10, page = 1, subject, topic }: GetAllCourses) {
    const supabase = createSupabaseClient();
    const query = supabase.from("courses").select();

    if (subject && topic) {
        query.ilike("subject", `%${subject}%`).or(`topic.ilike.'%${topic}%, name.ilike.%${topic}%`);
    } else if (subject) {
        query.ilike("subject", `%${subject}%`);
    } else if (topic) {
        query.or(`topic.ilike.'%${topic}%, name.ilike.%${topic}%`);
    }

    const { data: courses, error } = await query.range((page - 1) * limit, page * limit - 1);

    if (error) throw new Error(error?.message ?? "Failed to fetch courses");

    return courses;
}

export async function getCourse(id: string) {
    const supabase = createSupabaseClient();
    const query = supabase.from("courses").select().eq("id", id).single();

    const { data: course, error } = await query;

    if (error) throw new Error(error?.message ?? "Failed to fetch course");

    return course;
}