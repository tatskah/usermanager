/* eslint-disable import/no-anonymous-default-export */
import http from '../http-common';

class UsersService
{

    getUsers()
    {
        return http.get('users');
    }

    getByName(name)
    {
        return http.get(`/users?name=${name}`);
    }

    getById(id)
    {
        return http.get(`/users/${id}`);
    }

    deleteById(id)
    {
        return http.delete(`/users/${id}`);
    }

    updateUser(id, data)
    {
        const headers = {
            'Content-Type': 'application/json'
        }
        return http.put(`/users/${id}`, data, { headers });
    }

    saveUser(data)
    {
        const headers = {
            'Content-Type': 'application/json'
            // "Content-Type": "application/x-www-form-urlencoded"
        }
        return http.post("/users", data, { headers });
    }
}

export default new UsersService();