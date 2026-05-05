import { useEffect } from 'react';

/**
 * Hook qui bloque copier, coller, couper, clic droit et sélection de texte
 * sur le composant qui l'utilise.
 * 
 * Usage : useBlockCopy()   dans n'importe quel composant
 */
export function useBlockCopy() {
    useEffect(() => {
        const blockAction = (e) => {
            e.preventDefault();
            return false;
        };

        // Bloquer Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+A
        const blockKeyboard = (e) => {
            if (e.ctrlKey && ['c', 'v', 'x', 'a'].includes(e.key.toLowerCase())) {
                e.preventDefault();
                return false;
            }
        };

        // document.addEventListener('copy', blockAction);
        // // document.addEventListener('paste', blockAction);
        // document.addEventListener('cut', blockAction);
        // // document.addEventListener('contextmenu', blockAction); 
        // document.addEventListener('keydown', blockKeyboard);

        return () => {
            // document.removeEventListener('copy', blockAction);
            // // document.removeEventListener('paste', blockAction);
            // document.removeEventListener('cut', blockAction);
            // // document.removeEventListener('contextmenu', blockAction);
            // document.removeEventListener('keydown', blockKeyboard);
        };
    }, []);
}
