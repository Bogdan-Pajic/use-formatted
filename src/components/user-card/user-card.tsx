import './user-card.css';

type Props = {
    id: number;
    firstName: string;
    lastName: string;
    birthdate: string;
    zip: number;
    email: string;
};

export const UserCard = ({
    id,
    firstName,
    lastName,
    birthdate,
    zip,
    email,
}: Props) => {
    return (
        <div className="user-card">
            <div className="user-name">
                <span className="user-id">{id}</span>
                {firstName} {lastName}
            </div>
            <div className="user-birthday">{birthdate}</div>
            <div className="user-info-wrap">
                <span className="user-zip">zip code: {zip}</span>
                <span className="user-email">@ {email}</span>
            </div>
        </div>
    );
};
