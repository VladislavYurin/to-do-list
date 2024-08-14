import { useEffect } from 'react';

const useCloseOnOutsideClick = (setIsOpen) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.closest('.popup') === null) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setIsOpen]);
};

export default useCloseOnOutsideClick;