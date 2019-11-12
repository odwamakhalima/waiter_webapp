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

    async function add(waiters) {
        myNames = waiters
 
        await pool.query('insert into names (usernames) values ($1)', [myNames]);
        known = await pool.query('select distinct usernames from names ORDER BY usernames')
        checkingNames = await pool.query('select exists(select 1 from names where usernames=$1)',[myNames])
    
    }

    async function scanDays(days) {
        const myObj = {
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday
        }
        checkdays = days
        for(var i = 0;i<checkdays.length;i++){

            if (checkdays === 'Monday') {
                monday = 1
            }
            if (checkdays === 'Tuesday') {
                tuesday = 1
            }
            if(checkdays === 'Wednesday'){
                wednesday = 1
            }
            if (checkdays === 'Thursday') {
                thursday = 1
            }
            if (checkdays === 'Friday') {
                friday = 1
            }
            if(checkdays === 'Saturday'){
                saturday = 1
            }
            if(checkdays === 'Sunday'){
                sunday = 1
            }
           
        }
        for(var v =0;v<checkingNames.rows.length;v++){
            
            var secondCheck = checkingNames.rows[v].exists
        }
        var getId = await pool.query('select max(id) from names')
        for(var x=0;x<getId.rows.length;x++){
            theId = getId.rows[x].max
        }
        if(secondCheck === true){
              
                await pool.query('insert into mydays (thedays, names_id) values ($1,$2)',[checkdays, theId])
                userCheck = await pool.query('SELECT names.usernames, mydays.thedays FROM names INNER JOIN mydays ON names.id = mydays.names_id where names.id = $1',[theId])
               // console.log(userCheck.rows);
        }
        daysList.push(myObj)
            
    }

    function getDays(){
        return daysList
    }

    async function usersDays(){
        userCheck = await pool.query('SELECT names.usernames, mydays.thedays FROM names INNER JOIN mydays ON names.id = mydays.names_id where names.id = $1',[theId])
        console.log(userCheck.rows);
        
        return userCheck.rows
    }

    async function allwaiters(){
        
    }

    return {
        add,
        scanDays,
        getDays,
        usersDays,
        allwaiters
    }
}