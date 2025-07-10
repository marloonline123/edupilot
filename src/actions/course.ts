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

    const { data: courses, error } = await query.order("created_at", { ascending: false }).range((page - 1) * limit, page * limit - 1);

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

export async function storeSession(courseId: string|number) {
    const { userId } = await auth();
    const supabase = createSupabaseClient();
    const query = supabase.from("sessions").insert({ course_id: courseId, user_id: userId });
    const { data, error } = await query;

    if (error) throw new Error(error?.message ?? "Failed to store session");

    return data;
}

export async function getSessions(limit = 10) {
    const supabase = createSupabaseClient();
    const query = supabase.from("sessions")
        .select('courses:course_id (*)')
        .order("created_at", { ascending: false })
        .limit(limit);

    const { data, error } = await query;

    if (error) throw new Error(error?.message ?? "Failed to fetch sessions");

    return data.map(({courses}) => courses);
}

export async function getUserSessions(userId: string, limit = 10) {
    const supabase = createSupabaseClient();
    const query = supabase.from("sessions")
        .select('courses:course_id (*)')
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(limit);

    const { data, error } = await query;

    if (error) throw new Error(error?.message ?? "Failed to fetch sessions");

    return data.map(({courses}) => courses);
}

export async function getUserCourses(userId: string) {
    const supabase = createSupabaseClient();
    const query = supabase.from("courses")
        .select()
        .eq("author", userId)
        .order("created_at", { ascending: false });

    const { data, error } = await query;

    if (error) throw new Error(error?.message ?? "Failed to fetch sessions");

    return data;
}

export async function canCreateCourse() {
    const { has, userId } = await auth();
    const supabase = createSupabaseClient();
    
    if (has({plan: 'gold'})) return true;

    let limit = 0;

    if (has({ feature: '3_active_courses'})) {
        limit = 3;
    }
    if (has({ feature: '10_active_courses'})) {
        limit = 10;
    }

    const {data, error } = await supabase.from('courses')
        .select('id', {count : 'exact'})
        .eq('author', userId)

    if (error) throw new Error(error?.message ?? "Failed to fetch courses");

    return data?.length >= limit ? false : true;
}