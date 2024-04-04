import './user-list.css';

type Props = {
    title: string;
    children: React.ReactNode;
};

export const UserList = ({ title, children }: Props) => {
    return (
        <div className="user-list-wrap">
            <h1 className="user-list-title">{title}</h1>
            <ul className="user-list">{children}</ul>
        </div>
    );
};
