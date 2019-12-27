## Node GMP Project

NodeJS Global Mentoring Program

## START

1. npm install
2. npm run start

## COMMANDS
1. npm run eslint

### User model

```
{
    id: uuid/v1,
    login: string,
    password: string,
    age: number,
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

| Name       | Required |  Type  | Location 
| ----------:|:--------:|:-------|:------
| `login`    | required | string | body                              
| `password` | required | string | body                              
| `age`      | required | number | body

**Response**

```
{
    id: uuid,
    login: string,
    password: string,
    age: number
}
```
___

#### PUT /user/:id

This endpoint use for change appropriate user.

| Name  | Required |  Type  | Location
| ----: |:--------:|:-------|:------
| `id`  | required | uuid   | url                                    
| `age` | required | number | body       

**Response**

```
{
    id: uuid,
    login: string,
    password: string,
    age: number
}
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
        id: uuid,
        login: string,
        password: string,
        length: number
    },
    {
        id: uuid,
        login: string,
        password: string,
        length: number
    },
]
```
___

#### GET /user/:id

This endpoint use for getting user by id.

| Name  | Required |  Type  | Location
| ----: |:--------:|:-------|:------
| `id`  | required | uuid   | url            

**Response**

```
{
    id: uuid,
    login: string,
    password: string,
    age: number
}
```
___

#### DELETE /user/:id

This endpoint use for deleting user.

| Name  | Required |  Type  | Location
| ----: |:--------:|:-------|:------
| `id`  | required | uuid   | url            

**Response**

```
user deleted.
```
___
