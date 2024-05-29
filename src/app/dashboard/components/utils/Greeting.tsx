import React, { useMemo } from 'react';

const greetings = {
    morning: ["Good morning,", "Morning,", "Rise and shine,", "Welcome back,"],
    afternoon: ["Good afternoon,", "Hello,", "Hi there,", "Welcome back,"],
    evening: ["Good evening,", "Evening,", "Hello,", "Welcome back,"]
};

type TimeOfDay = 'morning' | 'afternoon' | 'evening';

const getRandomGreeting = (timeOfDay: TimeOfDay) => {
    const messages = greetings[timeOfDay];
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
};

const getTimeOfDay = (): TimeOfDay => {
    const hour = new Date().getHours();
    if (hour < 12) {
        return 'morning';
    } else if (hour < 18) {
        return 'afternoon';
    } else {
        return 'evening';
    }
};

const Greeting: React.FC = () => {
    const timeOfDay = getTimeOfDay();
    // const timeOfDay = `morning`

    const greeting = useMemo(() => getRandomGreeting(timeOfDay), [timeOfDay]);

    return (
        <span>{greeting}</span>
    );
};

export default Greeting;
