const expect = require('expect');

const{Users} = require('./users');

var users;

beforeEach(() => {
    users = new Users();
    users.users = [{
        id: '1',
        name: 'Ran',
        room: 'Node Course'

    }, {
        id: '2',
        name: 'Dan',
        room: 'React Course'

    }, {
        id: '3',
        name: 'Tal',
        room: 'Node Course'

    }]
})

describe('Users', () => {

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '1',
            name: 'ran',
            room: 'roomOne'
        }

        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('should return names for node course', ()=>{

        var userList = users.getUserList('Node Course')
        expect(userList).toEqual(['Ran', 'Tal'])
    })

    it('should return names for react course', ()=>{

        var userList = users.getUserList('React Course')
        expect(userList).toEqual(['Dan'])
    })

    it('should return specific user', () =>{
        var userId = '2';
        var user = users.getUser(userId);

        expect(user.id).toBe(userId);

    })

    it('should not return user', () => {
        var userId = '99';
        var user = users.getUser(userId);

        expect(user).toBeFalsy()
    })


    it('should remove user', () => {
        var userId = '2';
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);

    })


    it('should not remove user', () => {
        var userId = '99';
        var user = users.removeUser(userId);

        expect(user).toBeFalsy()
        expect(users.users.length).toBe(3);
    })
})