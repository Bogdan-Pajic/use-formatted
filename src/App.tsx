import { useEffect } from 'react';
import { useFormattedData } from './hooks/use-formatted-data';
import { UserCard } from './components/user-card/user-card';
import { UserList } from './components/user-list/user-list';
import users from './data/users.json';
import './App.css';

const App = () => {
    const { formatted, sortBy, filter, search } = useFormattedData(users);

    useEffect(() => {
        filter(({ zip }) => zip > 870);
        search('male');
        sortBy(({ id }, { id: id2 }) => id2 - id);
    }, [filter, search, sortBy]);

    return (
        <UserList title="User List">
            {formatted.map((user) => (
                <UserCard {...user} key={user.id} />
            ))}
            {!formatted.length && (
                <div className="user-alert">
                    <h2>No users found</h2>
                </div>
            )}
        </UserList>
    );
};

export default App;
