"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"

function TimeBooker() {

    const [date, setDate] = useState<Date | undefined>(new Date())

    return (
        <div className="flex flex-col items-center">
            <div className="flex justify-center items-stretch space-x-4">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                />
                <ScrollArea className="h-[350px] w-[350px] rounded-md border p-4 overflow-y-auto">
                    {Array.from({ length: 24 }, (_, index) => (
                        <Skeleton key={index} className="h-[40px] rounded-full my-4" />
                    ))}
                </ScrollArea>
            </div>

            <Button className="mt-4">Book Hour</Button>
        </div>
    )
}

export default TimeBooker