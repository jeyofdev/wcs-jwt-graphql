import { useMutation } from '@apollo/client';
import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ADD_BOOKS } from '../graphql/books';

const AddBook = () => {
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [formDatas, setFormDatas] = useState({
        title: '',
        author: '',
    });

    console.log(JSON.parse(localStorage.getItem('userLogged') as string));

    const [addBook, { loading }] = useMutation(ADD_BOOKS, {
        onError: (error) => {
            setError(error.message);
        },
        onCompleted(data) {
            // console.log('c ok', data);

            // // save the user's datas in local storage
            // const { success, ...user } = data.register;
            // localStorage.setItem('userLogged', JSON.stringify(user));
            // // redirect to home with user's datas
            navigate('/');
        },
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormDatas((formDatas) => ({
            ...formDatas,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = () => {
        addBook({ variables: { addBookInput: formDatas } });
    };

    if (
        !JSON.parse(
            localStorage.getItem('userLogged') as string
        )?.permissions.includes('write:add_book')
    ) {
        setTimeout(() => {
            navigate('/');
        }, 3000);

        return (
            <div>
                vous n'êtes pas autorisé à ajouter un livre, Vous allez être
                redirigés dans 3 secondes
            </div>
        );
    }

    return (
        <div>
            <h1>Ajouter un livre</h1>

            {error && <span className="danger">{error}</span>}

            <input
                name="title"
                value={formDatas.title}
                onChange={handleChange}
            />

            <input
                name="author"
                value={formDatas.author}
                onChange={handleChange}
            />

            <button onClick={handleSubmit}>Ajouter</button>
        </div>
    );
};

export default AddBook;
