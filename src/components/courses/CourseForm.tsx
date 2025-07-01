"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { subjects } from "@/constants"
import { Textarea } from "../ui/textarea"
import createCourse from "@/actions/course"
import { redirect } from "next/navigation"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name is Required.",
    }),
    subject: z.string().min(2, {
        message: "Subject is Required.",
    }),
    topic: z.string().min(2, {
        message: "Topic is Required.",
    }),
    voice: z.string().min(2, {
        message: "Voice is Required.",
    }),
    style: z.string().min(2, {
        message: "Style is Required.",
    }),
    duration: z.coerce.number().min(2, {
        message: "Duration is Required.",
    })
})
export default function CourseForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            subject: "",
            topic: "",
            voice: "",
            style: "",
            duration: 0
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const course = await createCourse(values);

        if (course) {
            redirect(`/courses/${course.id}`)
        } else {
            throw new Error("Failed to create course");
        }
    }

    return (
        <Form {...form }>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="give your course a name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="w-full capitalize">
                                    <SelectValue placeholder="Pick a subject" />
                                </SelectTrigger>
                                <SelectContent>
                                    {subjects.map((subject) => (
                                        <SelectItem key={subject} value={subject}>
                                            {subject}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>What should the course help you learn?</FormLabel>
                            <FormControl>
                                <Textarea className="" placeholder="Ex. How to build a React app" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="voice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Voice</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="w-full capitalize">
                                    <SelectValue placeholder="choose a voice" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="style"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Style</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="w-full capitalize">
                                    <SelectValue placeholder="choose a style" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="formal">
                                        Formal
                                    </SelectItem>
                                    <SelectItem value="casual">
                                        Casual
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Duration</FormLabel>
                            <FormControl>
                                <Input type="number" min={2} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <button className="btn-orange w-full justify-center disabled:opacity-70 duration-150" type="submit" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? "Building course..." : "Build Your Course"}</button>
            </form>
      </Form>
    );
}