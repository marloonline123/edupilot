"use client";
import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { Course } from "@/types/course";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import soundwaves from "@/constants/soundwaves.json";
import { storeSession } from "@/actions/course";

enum CallStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    FINISHED = "FINISHED",
}

export default function CourseMeeting({ course, userName, userImage }: { course: Course, userName: string, userImage: string }) {
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const lottieRef = useRef<LottieRefCurrentProps>(null)
    const [messages, setMessages] = useState<{role: string, content: string}[]>([]);

    useEffect(() => {
        if (lottieRef) {
            if (isSpeaking) {
                lottieRef.current?.play();
            } else {
                lottieRef.current?.pause();
            }
        }
    }, [isSpeaking, lottieRef]);

    useEffect(() => {
        const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
        const onCallEnd = () => {
            setCallStatus(CallStatus.FINISHED);
            storeSession(course.id);
        };
        const onMessage = (message: Message) => { 
            console.log('message', message);
            
            if (message.type === 'transcript' && message.transcriptType === 'final') {
                const newMsg = {role: message.role, content: message.transcript};
                setMessages((prev) => [...prev, newMsg]);
            }
         };
        const onSpeachStart = () => setIsSpeaking(true);
        const onSpeechEnd = () => setIsSpeaking(false);
        const onError = (error: Error) => console.log('error', error);

        vapi.on('call-start', onCallStart);
        vapi.on('call-end', onCallEnd);
        vapi.on('message', onMessage);
        vapi.on('speech-start', onSpeachStart);
        vapi.on('speech-end', onSpeechEnd);
        vapi.on('error', onError);

        return () => {
            vapi.off('call-start', onCallStart);
            vapi.off('call-end', onCallEnd);
            vapi.off('message', onMessage);
            vapi.off('speech-start', onSpeachStart);
            vapi.off('speech-end', onSpeechEnd);
            vapi.off('error', onError);
        }
    }, [])

    const toggleMute = () => {
        const muted = vapi.isMuted();
        vapi.setMuted(!muted);
        setIsMuted(!muted);
    }

    const handleCallEnd = () => {        
        vapi.stop();
        setCallStatus(CallStatus.FINISHED);
    }

    const handleCallStart = async () => {
        setCallStatus(CallStatus.CONNECTING);
        const assestantOverrides = {
            variableValues: {
                subject: course.subject,
                style: course.style,
                topic: course.topic,
            }
        }

        await vapi.start(configureAssistant(course.voice, course.style), assestantOverrides);
    }
    console.log('messages', messages);
    
    return (
        <section className="flex flex-col h-[70vh]">
            <div className="flex gap-4 max-md:flex-col">
                <div className="course-section">
                    <div className="course-avatar" style={{ backgroundColor: getSubjectColor(course.subject) }}>
                        <div className={cn('absolute transition-opacity duration-1000', callStatus === CallStatus.ACTIVE ? 'opacity-0' : 'opacity-100', callStatus === CallStatus.CONNECTING ? 'opacity-100 animate-pulse' : '')}>
                            <Image src={`/icons/${course.subject}.svg`} alt={course.subject} width={150} height={150} className="max-sm:w-fit" />
                        </div>
                        <div className={cn('absolute transition-opacity duration-1000', callStatus === CallStatus.ACTIVE ? 'opacity-100' : 'opacity-0')}>
                            <Lottie lottieRef={lottieRef} animationData={soundwaves} autoPlay={false} className="course-lottie" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-center">{course.name}</h3>
                </div>

                <div className="user-section">
                    <div className="user-avatar max-md:w-1/2">
                        <Image src={userImage} alt={userName} width={80} height={80} className="max-sm:w-fit rounded-lg" />
                        <h4 className="text-lg font-bold">{userName}</h4>
                    </div>

                    <div className="meeting-actions">
                        <button className="btn-mic" onClick={toggleMute} disabled={callStatus !== CallStatus.ACTIVE}>
                            <Image src={isMuted ? '/icons/mic-off.svg' : '/icons/mic-on.svg'} alt="mic" width={36} height={36} />
                            <p className="max-md:hidden">
                                {isMuted ? 'Turn on microphone' : 'Turn off microphone'}
                            </p>
                        </button>
                        <button disabled={callStatus === CallStatus.CONNECTING} className={cn('btn-mic', callStatus === CallStatus.ACTIVE ? 'bg-red-700' : 'bg-primary', callStatus === CallStatus.CONNECTING && 'animate-pulse')} onClick={callStatus === CallStatus.ACTIVE ? handleCallEnd : handleCallStart}>
                            {callStatus === CallStatus.ACTIVE ? <Image src="/icons/call-end.svg" alt="mic" width={36} height={36} /> : <Image src="/icons/call.svg" alt="mic" width={36} height={36} />}
                            <p className="text-white max-md:hidden">{callStatus === CallStatus.ACTIVE
                                ? "End Session"
                                : callStatus === CallStatus.CONNECTING
                                    ? 'Connecting'
                                    : 'Start Session'
                            }</p>
                        </button>
                    </div>
                </div>
            </div>

            <section className="transcript">
                <div className="transcript-message no-scrollbar">
                    {messages.map((message, index) => {
                        if (message.role === 'assistant') {
                            return (
                                <p key={index} className="max-sm:text-sm">
                                    {
                                        course.name
                                            .split(' ')[0]
                                            .replace('/[.,]/g, ', '')
                                    }: {message.content}
                                </p>
                            )
                        } else {
                            return <p key={index} className="text-primary max-sm:text-sm">
                                {userName}: {message.content}
                            </p>
                        }
                    })}
                </div>

                <div className="transcript-fade" />
            </section>
        </section>
    );
}