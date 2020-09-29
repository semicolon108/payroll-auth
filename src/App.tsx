import React from 'react';
import {LOGIN} from "./graphql/auth";
import {useMutation} from '@apollo/react-hooks'
import {Formik} from 'formik'
import * as yup from 'yup'
import Bear from "./components/Bear";

const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).max(192).required()
})

const isProd = process.env.NODE_ENV === 'production' ? true : false
const baseURL = isProd ? 'https://paytoday.netlify.app' : 'http://localhost:8080'


function App() {
    const [login, {loading, error}] = useMutation(LOGIN, {
        onCompleted({login}) {
            window.location.href = `${baseURL}/?accessToken=${login}`
        }
    })

    const checkIsError = (fieldName: string) => {
        const msg = error?.graphQLErrors[0].message
        switch (fieldName) {
            case 'email': {
                if (msg === 'Incorrect email') return msg
                return null
            }
            case 'password': {
                if (msg === 'Incorrect password') return msg
                return null
            }
            case 'admin': {
                if(msg === 'You are not the administrator') return msg
            }
        }
    }

    return (
        <div className="flex h-full justify-center items-center">
            <div className="w-full max-w-md">
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => login({variables: values})}
                >
                    {({handleSubmit, handleChange, values, errors}) => (
                        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                            <Bear/>
                            <p className="text-center text-red-600 text-xl font-bold">{checkIsError('admin')}</p>
                            <h1 className=" text-4xl font-bold text-gray-700 mb-3">Login</h1>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    onChange={handleChange}
                                    value={values.email}
                                    name="email"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="text"
                                    placeholder="email"/>
                                <p className="text-red-600 mt-1">{errors.email}</p>
                                <p className="text-red-600 mb-1">{!errors.email && checkIsError('email')}</p>
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    onChange={handleChange}
                                    value={values.password}
                                    name="password"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="******************"
                                />
                                <p className="text-red-600 mt-1">{errors.password}</p>
                                <p className="text-red-600 mt-1">{!errors.password && checkIsError('password')}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                {
                                    loading ?
                                        <button
                                            className="w-full bg-gray-500 py-2 px-4 rounded">
                                            Loading...</button>
                                        :
                                        <button
                                            type="submit"
                                            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                            Submit
                                        </button>
                                }
                            </div>
                        </form>
                    )}
                </Formik>
                <p className="text-center text-gray-500 text-xs">
                    &copy;2020 PAYTODAY. All rights reserved.
                </p>
            </div>
        </div>
    );
}

export default App;
