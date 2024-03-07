import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Button } from './ui/button';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Skeleton } from './ui/skeleton';

interface BookedHourProps {
    id: string;
    fromTime: Date;
    toTime: Date;
    description: string;
}

function BookedHour({ id, fromTime, toTime, description }: BookedHourProps) {

    const formattedFromTime = fromTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedToTime = toTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <Popover>
            <PopoverTrigger>
                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle>{`${formattedFromTime}-${formattedToTime}`}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </CardHeader>
                </Card>
            </PopoverTrigger>

            <PopoverContent>
                <Card>
                    <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>Card Description</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-[20px] rounded-full mb-2" />
                        <Skeleton className="h-[20px] rounded-full mb-2" />
                        <Skeleton className="h-[20px] rounded-full mb-2" />
                    </CardContent>
                    <CardFooter className="justify-center">
                        <Button>Join</Button>
                    </CardFooter>
                </Card>
            </PopoverContent>
        </Popover>
    )
}

export default BookedHour