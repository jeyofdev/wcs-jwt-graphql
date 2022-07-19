import { useQuery } from '@apollo/client';
import { LIST_BOOKS } from '../graphql/books';

interface IBook {
    title: string;
    author: string;
}

const Home = () => {
    const { data, loading, error } = useQuery(LIST_BOOKS);

    if (loading) {
        return <div>Chargement en cours</div>;
    }

    if (error) {
        return <div>Une erreur s'est produite</div>;
    }

    return (
        <div>
            <ul>
                {data.listBooks.map((book: IBook) => (
                    <li key={book.title}>
                        {book.title} | {book.author}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
