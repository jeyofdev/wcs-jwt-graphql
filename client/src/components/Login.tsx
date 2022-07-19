import { useLazyQuery } from '@apollo/client';
import { LOGIN } from '../graphql/auth';
import { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const [formDatas, setFormDatas] = useState({
        username: '',
        password: '',
    });

    const [error, setError] = useState('');

    const [login] = useLazyQuery(LOGIN, {
        onCompleted(data) {
            // check if user is login
            if (data.login.success) {
                document.cookie = 'signedin=true';
                const { success, ...user } = data.login;

                localStorage.setItem('userLogged', JSON.stringify(user));

                //on transmet le user loggé pour la première navigation, pour pouvoir récupérer le username au niveau du App
                navigate('/', { replace: true, state: { ...user } });
            }
        },
        onError(error) {
            setError(error.message);
        },
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormDatas((formDatas) => ({
            ...formDatas,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = () => {
        login({
            variables: {
                loginUserInput: formDatas,
            },
        });
    };

    return (
        <div>
            <h1>Login</h1>

            {error && <span className="danger">{error}</span>}

            <input
                name="username"
                value={formDatas.username}
                onChange={handleChange}
            />

            <input
                name="password"
                value={formDatas.password}
                onChange={handleChange}
            />

            <button onClick={handleSubmit}>Se Connecter</button>
            <Link to="/auth/register">S'inscrire</Link>
        </div>
    );
};

export default Login;
