module.exports = function waiter(pool) {

    var daysList = []
    var myNames;
    var known;
    var checkdays = [];
    var monday = 0;
    var tuesday = 0
    var wednesday = 0
    var thursday = 0
    var friday = 0
    var saturday = 0
    var sunday = 0
    var checkingNames;
    var theId;

    var store;


    async function add(waiters) {
        myNames = waiters
        await pool.query('insert into names (usernames) values ($1)', [myNames]);
        known = await pool.query('select distinct usernames from names ORDER BY usernames')
        
        store =  await pool.query('select * from names WHERE usernames = $1', [myNames])
        
        checkingNames = await pool.query('select exists(select 1 from names where usernames=$1)', [myNames])
       
        

    }

    async function scanDays(days) {
       
        store =  await pool.query('select * from names WHERE usernames = $1', [myNames])
        checkdays = days
        console.log(store.rows.length);
       
        
        for (var i = 0; i < checkdays.length; i++) {

            if (checkdays[i] === 'Monday') {
                monday += 1
            }
            if (checkdays[i] === 'Tuesday') {
                tuesday ++
            }
            if (checkdays[i] === 'Wednesday') {
                wednesday ++
            }
            if (checkdays[i] === 'Thursday') {
                thursday ++
            }
            if (checkdays[i] === 'Friday') {
                friday ++
            }
            if (checkdays[i] === 'Saturday') {
                saturday ++
            }
            if (checkdays[i] === 'Sunday') {
                sunday ++
            }
        }
        const myObj = {
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday
        }

        for (var v = 0; v < checkingNames.rows.length; v++) {
            var secondCheck = checkingNames.rows[v].exists
        }
        var getId = await pool.query('select max(id) from names')

        for (var x = 0; x < getId.rows.length; x++) {
            theId = getId.rows[x].max
        }
       
        if (secondCheck === true) {
            await pool.query('insert into mydays (thedays, names_id) values ($1,$2)', [checkdays.toString(), theId])
            userCheck = await pool.query('SELECT names.usernames, mydays.thedays FROM names INNER JOIN mydays ON names.id = mydays.names_id where names.id = $1', [theId])
        }

        daysList.push(myObj)
       
        
    }

    function getDays() {
        return daysList
    }

    async function usersDays() {
        userCheck = await pool.query('SELECT names.usernames, mydays.thedays FROM names INNER JOIN mydays ON names.id = mydays.names_id where names.id = $1', [theId])
    
        return userCheck.rows
    }

    function reachWarn() {
        if(monday >= 3 ){
            return 'warning'
        }
    }

    function reachWarn2() {
        
        if(tuesday >= 3 ){
            return 'warning'
        }
    }

    function reachWarn3() {
        
        if(wednesday >= 3 ){
            return 'warning'
        }
    }

    function reachWarn4() {
        
        if(thursday >= 3 ){
            return 'warning'
        }
    }
    function reachWarn5() {
        
        if(friday >= 3 ){
            return 'warning'
        }
    }

    function reachWarn6() {
        
        if(saturday >= 3 ){
            return 'warning'
        }
    }

    function reachWarn7() {
        
        if(sunday >= 3 ){
            return 'warning'
        }
    }

    return {
        add,
        scanDays,
        getDays,
        usersDays,
        reachWarn,
        reachWarn2,
        reachWarn3,
        reachWarn4,
        reachWarn5,
        reachWarn6,
        reachWarn7
    }
}