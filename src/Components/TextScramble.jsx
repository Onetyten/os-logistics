/* eslint-disable react-hooks/exhaustive-deps */
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState, useRef } from 'react';
const commonSymbols = '!@#$%^&*()-_=+[]{}|;:,.<>?/\\'.split('');
const unicodeSymbols = '♠♣♥♦★☆☯☠☢☣⚔⚙✦✧✩✪✫✬✭✮✯✰'.split('');
const mathSymbols = '∞∑∏∫√∆∇≈≠≤≥≡⊕⊗⊥∴∵∂'.split('');
const greekLetters = 'αβγδεζηθικλμνξοπρστυφχψω'.split('');
const gothicSymbols = '✝☥☦☪☮☯☸✡'.split('');
const boxChars = '░▒▓█▌▐▖▗▘▙▚▛▜▝▞▟'.split('');
const braille = '⠁⠂⠄⠈⠐⠠⡀⢀⣀⣈⣐⣠⣨⣰⣸⣿'.split('');
const symbols = [...commonSymbols, ...unicodeSymbols, ...mathSymbols, ...greekLetters, ...boxChars, ...gothicSymbols, ...braille];
// const symbols = '!<>-_\\/[]{}—=+*^?#'.split('');
const TextScramble = ({ texts, letterSpeed = 50, nextLetterSpeed = 100, pauseTime = 1500, className = '', }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState([]);
    const leftIndexesRef = useRef([]);
    const letterIntervalRef = useRef(null);
    const textIntervalRef = useRef(null);
    const currentText = texts[currentIndex];
    const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const defaultLeftIndexes = () => {
        leftIndexesRef.current = currentText.split('').map((_, i) => i);
    };
    const bakeLetter = () => {
        letterIntervalRef.current = setInterval(() => {
            const updatedText = currentText.split('').map((char, i) => {
                return leftIndexesRef.current.includes(i)
                    ? randomItem(symbols)
                    : char;
            });
            setDisplayedText(updatedText);
        }, letterSpeed);
    };
    const bakeText = () => {
        defaultLeftIndexes();
        bakeLetter();
        textIntervalRef.current = setInterval(() => {
            if (leftIndexesRef.current.length === 0) {
                clearInterval(letterIntervalRef.current);
                clearInterval(textIntervalRef.current);
                // Show final unscrambled text
                setDisplayedText(currentText.split(''));
                // Pause before next scramble
                setTimeout(() => {
                    const nextIndex = (currentIndex + 1) % texts.length;
                    setCurrentIndex(nextIndex);
                }, pauseTime);
            }
            else {
                leftIndexesRef.current.shift();
            }
        }, nextLetterSpeed);
    };
    useEffect(() => {
        bakeText();
        return () => {
            if (letterIntervalRef.current)
                clearInterval(letterIntervalRef.current);
            if (textIntervalRef.current)
                clearInterval(textIntervalRef.current);
        };
    }, [currentIndex]);
    return _jsx("div", { className: className, children: displayedText.join('') });
};
export default TextScramble;
