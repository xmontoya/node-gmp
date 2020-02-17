## Node GMP Project

NodeJS Global Mentoring Program

## START

1. npm install
2. npm run start

## COMMANDS
Run eslint
```
npm run eslint
```

Run db migrations
```
./node_modules/.bin/sequelize  db:migrate
```

Run db seeders
```
./node_modules/.bin/sequelize  db:seed:all
```

### User model

```
{
    id: integer,
    login: string,
    password: string,
    age: integer,
    isDeleted: boolean
},
```
## User Endpoints

`POST` [/user](#post-user) <br/>
`PUT` [/user/:id](#put-userid) <br/>
`GET` [/users](#get-users) <br/>
`GET` [/user/:id](#get-userid) <br/>
`DELETE` [/user/:id](#delete-userid) <br/>

#### POST /user

This endpoint use for create user.

| Name       | Required |  Type   | Location 
| ----------:|:--------:|:--------|:------
| `login`    | required | string  | body                              
| `password` | required | string  | body                              
| `age`      | required | integer | body

**Response**

```
{
    id: integer,
    login: string,
    password: string,
    age: integer
}
```
___

#### PUT /user/:id

This endpoint use for change appropriate user.

| Name  | Required |  Type   | Location
| ----: |:--------:|:--------|:------
| `id`  | required | integer | url                                    
| `age` | required | integer | body       

**Response**

```
Status code: 204
```
___

#### GET /users

This endpoint use for getting available users, filtered by login.

**Parameters**

| Name             | Required     | Type    | Location               
| ----------------:|:------------:|:-------:|:-------- 
| `loginSubstring` | non-required | string  | query
| `limit`          | non-required | string  | query          

**Response**

```
[
    {
        id: integer,
        login: string,
        password: string,
        age: integer
    },
    {
        id: integer,
        login: string,
        password: string,
        age: integer
    },
]
```
___

#### GET /user/:id

This endpoint use for getting user by id.

| Name  | Required |  Type   | Location
| ----: |:--------:|:--------|:------
| `id`  | required | integer | url            

**Response**

```
{
    id: integer,
    login: string,
    password: string,
    age: integer
}
```
___

#### DELETE /user/:id

This endpoint use for deleting user.

| Name  | Required |  Type   | Location
| ----: |:--------:|:--------|:------
| `id`  | required | integer | url            

**Response**

```
user deleted.
```
___
