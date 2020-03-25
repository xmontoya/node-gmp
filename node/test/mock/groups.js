module.exports = {
    groupList: [
        {
            id: 1,
            name: 'super',
            permissions: [
                'READ',
                'WRITE',
                'DELETE',
                'SHARE',
                'UPLOAD_FILES'
            ],
            createdAt: '2020-02-23T05:57:06.761Z',
            updatedAt: '2020-02-23T05:57:06.761Z'
        },
        {
            id: 2,
            name: 'human',
            permissions: [
                'READ',
                'SHARE'
            ],
            createdAt: '2020-02-23T05:57:06.761Z',
            updatedAt: '2020-02-23T05:57:06.761Z'
        },
        {
            id: 3,
            name: 'my secret group',
            permissions: [
                'READ',
                'WRITE'
            ],
            createdAt: '2020-03-23T20:47:34.508Z',
            updatedAt: '2020-03-23T20:47:34.508Z'
        }
    ],
    singleGroup: [
        {
            id: 3,
            name: 'my secret group',
            permissions: [
                'READ',
                'WRITE'
            ],
            createdAt: '2020-03-23T20:47:34.508Z',
            updatedAt: '2020-03-23T20:47:34.508Z'
        }
    ],
    emptyGroups: []
};
