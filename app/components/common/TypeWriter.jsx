"use client"
import { useState, useEffect } from 'react';

const TypeWriter = ({ texts, typingSpeed = 100, delayBetweenTexts = 2000 }) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        if (!texts || texts.length === 0) return;

        if (displayedText.length < texts[currentTextIndex].length) {
            const timeoutId = setTimeout(() => {
                setDisplayedText(texts[currentTextIndex].slice(0, displayedText.length + 1));
            }, typingSpeed);
            return () => clearTimeout(timeoutId);
        } else {
            const timeoutId = setTimeout(() => {
                setDisplayedText('');
                setCurrentTextIndex((prev) => (prev + 1) % texts.length);
            }, delayBetweenTexts);
            return () => clearTimeout(timeoutId);
        }

    }, [texts, currentTextIndex, displayedText, typingSpeed, delayBetweenTexts]);

    return <span className="typewriter">{displayedText}</span>;
};

export default TypeWriter;
