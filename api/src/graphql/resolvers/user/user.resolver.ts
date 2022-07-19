import { ApolloError } from 'apollo-server-express';
import { GraphQLObjectType } from 'graphql';
import {
    IUser,
    IRegisterUserInput,
    ILoginUserInput,
} from './user.resolver.spec';
import bcrypt from 'bcrypt';
import { ExpressContext } from 'apollo-server-express';
import { v4 as uuid } from 'uuid';
import { generateToken } from '../../../lib/helpers';

let users: Array<IUser> = [];

export default {
    Query: {
        listUsers: () => users,
        login: async (
            _: GraphQLObjectType,
            { loginUserInput }: ILoginUserInput,
            { res }: ExpressContext
        ) => {
            const { username, password } = loginUserInput;

            // check if user exist
            let user = users.find((u) => u.username === username);
            if (!user) {
                throw new ApolloError("Cet utilisateur n'existe pas");
            }

            // check if credentials are correct
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                throw new ApolloError('Vérifiez vos informations');
            }

            // generate the token of connection
            const { id, roles, permissions } = user;
            let token = generateToken({ username, id, roles, permissions });
            users = [...users, user];

            // create the cookies limit to 2 hours
            res.cookie('token', token, {
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true, // le httpOnly n'est pas accessible via du code JS, ça limite un peu les injection XSS
                maxAge: 1000 * 60 * 60 * 2,
            });

            return { ...user, success: match };
        },
        logout: async (
            _: GraphQLObjectType,
            __: object,
            { res }: ExpressContext
        ) => {
            res.clearCookie('token');
            return { success: true };
        },
    },
    Mutation: {
        register: async (
            _: GraphQLObjectType,
            { registerUserInput }: IRegisterUserInput,
            { res }: ExpressContext
        ) => {
            const { password, username, permission } = registerUserInput;

            // check that no user matches the submitted username
            if (users.some((e) => e.username === username)) {
                throw new ApolloError('Un utilisateur existe déjà');
            }

            // hash the password
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(password, salt);

            // other datas
            const id = uuid();
            const roles = ['user']; // rôle par défaut
            let permissions = ['read:any_account', 'read:own_account']; // permissions par défaut

            if (permission === 'write') {
                permissions = [...permissions, 'write:add_book'];
            }

            // new user datas with password hash
            let newUser: IUser = {
                id,
                username,
                password: hashed,
                roles,
                permissions,
            };

            // generate the token of connection
            let token = generateToken({ username, id, roles, permissions });
            users = [...users, newUser];

            // create the cookies limit to 2 hours
            res.cookie('token', token, {
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true, // le httpOnly n'est pas accessible via du code JS, ça limite un peu les injection XSS
                maxAge: 1000 * 60 * 60 * 2,
            });

            return { ...newUser, success: true };
        },
    },
};
