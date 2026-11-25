import React, { useState, useEffect } from 'react';

export const TypewriterEffect = ({ 
  text, 
  speed = 300, 
  deleteSpeed = 150, 
  delay = 1500,
  className = ''
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(speed);

  useEffect(() => {
    let timer;
    const handleTyping = () => {
      const fullText = Array.isArray(text) ? text[loopNum % text.length] : text;
      
      setDisplayText(prev => isDeleting 
        ? fullText.substring(0, prev.length - 1) 
        : fullText.substring(0, prev.length + 1)
      );

      setTypingSpeed(isDeleting ? deleteSpeed : speed);

      if (!isDeleting && displayText === fullText) {
        setTypingSpeed(delay);
        setIsDeleting(true);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500);
      }
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, typingSpeed, text, speed, deleteSpeed, delay]);

  return (
    <span className={className}>
      {displayText}
      <span className="cursor-blink">|</span>
      <style jsx>{`
        .cursor-blink {
          animation: blink 1s step-end infinite;
          margin-left: 2px;
          color: inherit;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </span>
  );
};
