import { useCallback, useState } from 'react';

export const useFormattedData = <T extends Record<string, unknown>>(
    items: Array<T>
) => {
    const [formatted, setFormatted] = useState(items);

    const sortStrings = (currentValue: string, nextValue: string) => {
        return currentValue.localeCompare(nextValue);
    };

    const sortNumbers = (currentValue: number, nextValue: number) => {
        return currentValue - nextValue;
    };

    const sortByPropertyName = useCallback(
        (propertyName: keyof T, users: Array<T>) => {
            return users.sort((a, b) => {
                const aProperty = a[propertyName];
                const bProperty = b[propertyName];

                if (
                    typeof aProperty === 'string' &&
                    typeof bProperty === 'string'
                ) {
                    return sortStrings(aProperty, bProperty);
                }

                return sortNumbers(
                    aProperty as number,
                    b[propertyName] as number
                );
            });
        },
        []
    );

    const search = useCallback((term: string) => {
        setFormatted((prevValue) => {
            const foundItems = prevValue.filter((user) => {
                const hasTerm = Object.values(user).some((value) => {
                    if (!value) {
                        return false;
                    }

                    return (
                        value.toString().toLowerCase() === term.toLowerCase()
                    );
                });
                return hasTerm ? user : null;
            });
            return foundItems;
        });
    }, []);

    const sortBy = useCallback(
        (action: keyof T | ((a: T, b: T) => number)) => {
            setFormatted((prevValue) => {
                if (typeof action !== 'function') {
                    return sortByPropertyName(action, prevValue);
                }
                return prevValue.sort(action);
            });
        },
        [sortByPropertyName]
    );

    const filter = useCallback((fn: (user: T) => boolean) => {
        setFormatted((prevValue) => {
            if (!prevValue.length) return prevValue;
            const filteredItems = prevValue.filter(fn);
            return filteredItems;
        });
    }, []);

    return { formatted, search, sortBy, filter };
};
