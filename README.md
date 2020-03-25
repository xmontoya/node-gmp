## Node GMP Project

NodeJS Global Mentoring Program

### START

1. Execute npm install
2. Go to node/config
3. Create a new file development.json based on default.json
4. Set you db credentials and auth key
5. Execute npm run dev

### COMMANDS
Run unit tests
```
npm run test
```

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

### DB Models

User
```
{
    id: integer,
    login: string,
    password: string,
    age: integer,
    isDeleted: boolean,
    createdAt: timestamp,
    updatedAt: timestamp
},
```

Group
```
{
    id: integer,
    name: string,
    permissions: array(string),
    createdAt: timestamp,
    updatedAt: timestamp
},
```

UserGroup
```
{
    UserId: integer,
    GroupId: integer,
    createdAt: timestamp,
    updatedAt: timestamp
},
```

### Endpoints

## Login Endpoints

`POST` [/login](#post-login) <br/>

## User Endpoints

`POST` [/user](#post-user) <br/>
`PUT` [/user/:id](#put-userid) <br/>
`GET` [/users](#get-users) <br/>
`GET` [/user/:id](#get-userid) <br/>
`DELETE` [/user/:id](#delete-userid) <br/>

## Group Endpoints

`POST` [/group](#post-group) <br/>
`PUT` [/group/:id](#put-groupid) <br/>
`GET` [/groups](#get-groups) <br/>
`GET` [/group/:id](#get-groupid) <br/>
`DELETE` [/group/:id](#delete-groupid) <br/>

## UserGroup Endpoints

`POST` [/user-group](#post-user-group) <br/>
`DELETE` [/user-group/:user_id/:group_id](#delete-user-group) <br/>

#### POST /login

This endpoint use for login users via jwt.

| Name       | Required |  Type   | Location 
| ----------:|:--------:|:--------|:------
| `login`    | required | string  | body                              
| `password` | required | string  | body                              

**Response**

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6N..."
}
```
___

#### POST /user

This endpoint use for create user.

**Parameters**

| Name            | Required |  Type   | Location 
| ---------------:|:--------:|:--------|:------
| `Authorization` | required | token   | header  
| `login`         | required | string  | body                              
| `password`      | required | string  | body                              
| `age`           | required | integer | body

**Response**

```
{
    id: integer,
    login: string,
    password: string,
    age: integer,
    updatedAt: timestamp,
    createdAt: timestamp
}
```
___

#### PUT /user/:id

This endpoint use for change appropriate user.

**Parameters**

| Name            | Required |  Type   | Location
| ---------------:|:--------:|:--------|:------
| `Authorization` | required | token   | header  
| `id`            | required | integer | url                                    
| `age`           | required | integer | body       

**Response**

```
Status code: 204
```
___

#### GET /users

This endpoint use for getting available users, filtered by login.

**Parameters**

| Name             | Required     | Type    | Location               
| ----------------:|:--------:|:--------|:------
| `Authorization`  | required | token   | header  
| `loginSubstring` | non-required | string  | query
| `limit`          | non-required | string  | query          

**Response**

```
[
    {
        id: integer,
        login: string,
        password: string,
        age: integer,
        updatedAt: timestamp,
        createdAt: timestamp
    },
    {
        id: integer,
        login: string,
        password: string,
        age: integer,
        updatedAt: timestamp,
        createdAt: timestamp
    },
]
```
___

#### GET /user/:id

This endpoint use for getting user by id.

**Parameters**

| Name            | Required |  Type   | Location
| ---------------:|:--------:|:--------|:------
| `Authorization` | required | token   | header  
| `id`            | required | integer | url            

**Response**

```
{
    id: integer,
    login: string,
    password: string,
    age: integer,
    updatedAt: timestamp,
    createdAt: timestamp
}
```
___

#### DELETE /user/:id

This endpoint use for deleting user.

**Parameters**

| Name            | Required |  Type   | Location
| ---------------:|:--------:|:--------|:------
| `Authorization` | required | token   | header  
| `id`            | required | integer | url            

**Response**

```
status: 204
```
___

#### POST /group

This endpoint use for create a group.

**Parameters**

| Name            | Required |  Type   | Location 
| ---------------:|:--------:|:--------|:------
| `Authorization` | required | token   | header  
| `name`          | required | string  | body                              
| `permissions`   | required | array   | body                              

**Response**

```
{
    name: string,
    permissions: array,
    updatedAt: timestamp,
    createdAt: timestamp
}
```
___

#### PUT /user/:id

This endpoint use for change appropriate user.

**Parameters**

| Name            | Required |  Type   | Location
| ---------------:|:--------:|:--------|:------
| `Authorization` | required | token   | header  
| `id`            | required | integer | url                                    
| `name`          | required | string  | body
| `permissions`   | required | array   | body       

**Response**

```
Status code: 204
```
___

#### GET /groups

This endpoint use for getting available groups.

**Parameters**

| Name            | Required |  Type   | Location
| ---------------:|:--------:|:--------|:------
| `Authorization` | required | token   | header  

**Response**

```
[
    {
        id: integer,
        name: string,
        permissions: array,
        updatedAt: timestamp,
        createdAt: timestamp
    }
]
```
___

#### GET /group/:id

This endpoint use for getting a group by id.

**Parameters**

| Name            | Required |  Type   | Location
| ---------------:|:--------:|:--------|:------
| `Authorization` | required | token   | header  
| `id`            | required | integer | url            

**Response**

```
{
    id: integer,
    name: string,
    permissions: array,
    updatedAt: timestamp,
    createdAt: timestamp
}
```
___

#### DELETE /group/:id

This endpoint use for deleting a group.

**Parameters**

| Name            | Required |  Type   | Location
| ---------------:|:--------:|:--------|:------
| `Authorization` | required | token   | header  
| `id`            | required | integer | url            

**Response**

```
status: 204
```
___

#### POST /user-group

This endpoint use for assign a user to a group.

**Parameters**

| Name            | Required |  Type   | Location
| ---------------:|:--------:|:--------|:------
| `Authorization` | required | token   | header  
| `group_id`      | required | integer | body
| `users`         | required | array   | body            

**Response**

```
{
    UserId: integer,
    GroupId: integer,
    updatedAt: timestamp,
    createdAt: timestamp
}
```
___

#### DELETE /user-group/:user_id/:group_id

This endpoint use for remove users to groups.

**Parameters**

| Name            | Required |  Type   | Location
| ---------------:|:--------:|:--------|:------
| `Authorization` | required | token   | header  
| `user_id`       | required | integer | url
| `group_id`      | required | integer | url            

**Response**

```
status: 204
```
___