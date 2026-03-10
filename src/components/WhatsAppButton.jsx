import React from 'react';

const WhatsAppButton = () => {
    return (
        <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-float reveal"
            style={{ animationDelay: '1s' }}
        >
            <div className="whatsapp-icon">
                <svg viewBox="0 0 24 24" width="32" height="32">
                    <path fill="currentColor" d="M12.031 6.172c-2.311 0-4.191 1.88-4.191 4.191 0 .584.12 1.15.352 1.666L7.747 14.8l2.84-.741c.475.253 1.01.386 1.444.386 2.31 0 4.191-1.88 4.191-4.191 0-2.311-1.88-4.191-4.191-4.191zm2.396 6.002c-.104.296-.604.542-.833.573-.23.03-.45.045-.71.045-.259 0-.613-.015-1.04-.21a3.52 3.52 0 0 1-1.464-.99 3.86 3.86 0 0 1-.806-1.55c-.093-.307-.01-.584.104-.848.093-.21.21-.444.312-.568.104-.124.145-.21.21-.352.062-.144.03-.275-.02-.375-.045-.1-.416-1-.572-1.375-.15-.365-.303-.314-.416-.32-.104-.005-.224-.005-.344-.005-.12 0-.312.045-.475.224-.163.18-.624.613-.624 1.494 0 .882.634 1.734.723 1.855.09.12 1.25 1.91 3.03 2.68.42.183.75.293 1.01.373.42.13.79.11 1.09.07a1.69 1.69 0 0 0 1.11-.78c.36-.72.36-1.34.25-1.464-.1-.124-.374-.21-.786-.416zM12 2C6.48 2 2 6.48 2 12c0 2.17.7 4.19 1.94 5.89L2.6 21.4l3.7-.96c1.62.94 3.5 1.48 5.7 1.48 5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.85 0-3.58-.58-5.01-1.57l-.36-.25-2.18.57.58-2.14-.28-.44A7.95 7.95 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z" />
                </svg>
            </div>
            <span className="tooltip">Chat with us!</span>

            <style>{`
        .whatsapp-float {
          position: fixed;
          bottom: 40px;
          right: 40px;
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .whatsapp-icon {
          width: 65px;
          height: 65px;
          background: #25d366;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 25px rgba(37, 211, 102, 0.4);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .whatsapp-icon:hover {
          transform: scale(1.1) rotate(10deg);
          box-shadow: 0 15px 35px rgba(37, 211, 102, 0.5);
        }
        .tooltip {
          background: white;
          color: #333;
          padding: 8px 15px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 0.9rem;
          box-shadow: var(--shadow-md);
          opacity: 0;
          transform: translateX(20px);
          transition: all 0.3s ease;
          pointer-events: none;
          white-space: nowrap;
        }
        .whatsapp-float:hover .tooltip {
          opacity: 1;
          transform: translateX(0);
        }
        @media (max-width: 768px) {
          .whatsapp-float {
            bottom: 20px;
            right: 20px;
          }
          .whatsapp-icon {
            width: 55px;
            height: 55px;
          }
        }
      `}</style>
        </a>
    );
};

export default WhatsAppButton;
