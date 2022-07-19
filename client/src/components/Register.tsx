import { useMutation } from '@apollo/client';
import { REGISTER } from '../graphql/auth';
import { ChangeEvent, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [formDatas, setFormData] = useState({
        username: '',
        password: '',
        permission: '',
    });

    const [register, { loading }] = useMutation(REGISTER, {
        onError: (error) => {
            setError(error.message);
        },
        onCompleted(data) {
            // create the cookie of login
            if (data.register.success) {
                document.cookie = 'signedin=true;path=/';
            }

            // save the user's datas in local storage
            const { success, ...user } = data.register;
            localStorage.setItem('userLogged', JSON.stringify(user));

            // redirect to home with user's datas
            navigate('/', { replace: true, state: { ...user } });
        },
    });

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData((formDatas) => ({
            ...formDatas,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = () => {
        register({
            variables: {
                registerUserInput: formDatas,
            },
        });
    };

    console.log(formDatas);

    return (
        <div>
            <h1>Register</h1>

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

            <select
                name="permission"
                onChange={handleChange}
                value={formDatas.permission}
            >
                <option value="read">Lecture</option>
                <option value="write">Ecriture</option>
            </select>

            <button disabled={loading} onClick={handleSubmit}>
                S'inscrire
            </button>

            <Link to="/auth/login">Déjà inscrit(e)?</Link>
        </div>
    );
};

export default Register;
