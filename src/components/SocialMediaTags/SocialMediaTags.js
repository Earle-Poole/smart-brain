import React from 'react';
import './SocialMediaTags.css'

const SocialMediaTags = () => {
    return (
        <div className="pv4 ph5-ns tc Footer">
            <a className="link dim gray dib h2 w2 br-100 ma3 pa2" rel="noopener noreferrer" target="_blank" href='https://www.facebook.com/earle.s.poole' title="">
                <svg 
                    data-icon="facebook"
                    width="48"
                    height="48"
                    viewBox="0 0 50 50" 
                    className="moon-gray"
                >
                <title>Facebook</title>
                <path fill="#cccccc" d="M8 12 L13 12 L13 8 C13 2 17 1 24 2 L24 7 C20 7 19 7 19 10 L19 12 L24 12 L23 18 L19 18 L19 30 L13 30 L13 18 L8 18 z"></path>
                </svg>
            </a>
            <a className="link dim gray dib h2 w2 br-100 ma3 pa2" rel="noopener noreferrer" target="_blank" href='https://www.linkedin.com/in/earle-poole/' title="">
                <svg 
                    data-icon="linkedin"
                    width="48"
                    height="48"
                    viewBox="0 0 39 39" 
                >
                <title>LinkedIn</title>
                <path fill="#cccccc" d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"></path>
                </svg>
            </a>
            <a className="link dim gray dib h2 w2 br-100 ma3 pa2" rel="noopener noreferrer" target="_blank" href='https://github.com/Earle-Poole' title="">
                <svg 
                    data-icon="github"
                    width="48"
                    height="44"
                    viewBox="0 0 50 50" 
                >
                <title>GitHub</title>
                <path fill="#cccccc" d="M0 18 C0 12 3 10 3 9 C2.5 7 2.5 4 3 3 C6 3 9 5 10 6 C12 5 14 5 16 5 C18 5 20 5 22 6 C23 5 26 3 29 3 C29.5 4 29.5 7 29 9 C29 10 32 12 32 18 C32 25 30 30 16 30 C2 30 0 25 0 18 M3 20 C3 24 4 28 16 28 C28 28 29 24 29 20 C29 16 28 14 16 14 C4 14 3 16 3 20 M8 21 A1.5 2.5 0 0 0 13 21 A1.5 2.5 0 0 0 8 21 M24 21 A1.5 2.5 0 0 0 19 21 A1.5 2.5 0 0 0 24 21 z"></path>
                </svg>
            </a>
        </div>
    )
}

export default SocialMediaTags;