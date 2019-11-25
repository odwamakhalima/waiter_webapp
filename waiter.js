module.exports = function waiter(pool) {

    var final = []
    var daysList = []
    var myNames;
    var known;
    var checkbox;
    var store;
    var checkdays = [];
    var monday = 0;
    var tuesday = 0
    var wednesday = 0
    var thursday = 0
    var friday = 0
    var saturday = 0
    var sunday = 0
    var monCheck;
    var tueCheck;
    var wedCheck;
    var thuCheck;
    var friCheck;
    var satCheck;
    var sunCheck;


    async function add(waiters) {
        myNames = waiters.toUpperCase()
    }

    async function scanDays(days) {
        checkdays = days
        known = await pool.query('select * from mynames')
        store = await pool.query('select * from mynames WHERE usernames = $1', [myNames])

        if (store.rows.length === 0) {
            for (var i = 0; i < checkdays.length; i++) {

                if (checkdays[i] === 'Monday') {

                    await pool.query('insert into mynames (usernames,alldays_id) values ($1,$2)', [myNames, 1]);
                    monCheck = await pool.query('SELECT alldays.thedays, mynames.usernames FROM alldays INNER JOIN mynames ON alldays.id = mynames.alldays_id where alldays.id = 1')
                    final = monCheck.rows
                    monday += 1
                    checkbox = 'checked'
                    
                }
                if (checkdays[i] === 'Tuesday') {
                    await pool.query('insert into mynames (usernames,alldays_id) values ($1,$2)', [myNames, 2]);
                    tueCheck = await pool.query('SELECT alldays.thedays, mynames.usernames FROM alldays INNER JOIN mynames ON alldays.id = mynames.alldays_id where alldays.id = 2')
                    final = tueCheck.rows
                    tuesday++
                    checkbox = 'checked'


                }
                if (checkdays[i] === 'Wednesday') {
                    await pool.query('insert into mynames (usernames,alldays_id) values ($1,$2)', [myNames, 3]);
                    wedCheck = await pool.query('SELECT alldays.thedays, mynames.usernames FROM alldays INNER JOIN mynames ON alldays.id = mynames.alldays_id where alldays.id = 3')
                    final = wedCheck.rows
                    wednesday++
                    checkbox = 'checked'

                }
                if (checkdays[i] === 'Thursday') {
                    await pool.query('insert into mynames (usernames,alldays_id) values ($1,$2)', [myNames, 4]);
                    thuCheck = await pool.query('SELECT alldays.thedays, mynames.usernames FROM alldays INNER JOIN mynames ON alldays.id = mynames.alldays_id where alldays.id = 4')
                    final = thuCheck.rows
                    thursday++
                    checkbox = 'checked'

                }
                if (checkdays[i] === 'Friday') {
                    await pool.query('insert into mynames (usernames,alldays_id) values ($1,$2)', [myNames, 5]);
                    friCheck = await pool.query('SELECT alldays.thedays, mynames.usernames FROM alldays INNER JOIN mynames ON alldays.id = mynames.alldays_id where alldays.id = 5')
                    final = friCheck.rows
                    friday++
                    checkbox = 'checked'

                }
                if (checkdays[i] === 'Saturday') {
                    await pool.query('insert into mynames (usernames,alldays_id) values ($1,$2)', [myNames, 6]);
                    satCheck = await pool.query('SELECT alldays.thedays, mynames.usernames FROM alldays INNER JOIN mynames ON alldays.id = mynames.alldays_id where alldays.id = 6')
                    final = satCheck.rows
                    saturday++
                    checkbox = 'checked'
                }
                if (checkdays[i] === 'Sunday') {
                    await pool.query('insert into mynames (usernames,alldays_id) values ($1,$2)', [myNames, 7]);
                    sunCheck = await pool.query('SELECT alldays.thedays, mynames.usernames FROM alldays INNER JOIN mynames ON alldays.id = mynames.alldays_id where alldays.id = 7')
                    final = sunCheck.rows
                    sunday++
                    checkbox = 'checked'
                }

            }
            // console.log(final)
            const myObj = {
                monday,
                tuesday,
                wednesday,
                thursday,
                friday,
                saturday,
                sunday
            }

            daysList.push(myObj)
        }

    }

    function getDays() {
        return daysList
    }

    
    async function duplicates() {
        store = await pool.query('select * from mynames WHERE usernames = $1', [myNames])
        return store.rowCount
    }

    async function usersDays() {
          
        return final
    }

    function checkedbox(){
        console.log(checkbox);
        return checkbox
    }

    async function filtering(wait) {

        if (wait === 'monday') {
            monCheck = await pool.query('SELECT alldays.thedays, mynames.usernames FROM alldays INNER JOIN mynames ON alldays.id = mynames.alldays_id where alldays.id = 1')
            final = monCheck.rows
        }

        if (wait === 'tuesday') {
            tueCheck = await pool.query('SELECT alldays.thedays, mynames.usernames FROM alldays INNER JOIN mynames ON alldays.id = mynames.alldays_id where alldays.id = 2')
            final = tueCheck.rows
        }

        if (wait === 'wednesday') {
            wedCheck = await pool.query('SELECT alldays.thedays, mynames.usernames FROM alldays INNER JOIN mynames ON alldays.id = mynames.alldays_id where alldays.id = 3')
            final = wedCheck.rows

        }
        if (wait === 'thursday') {
            thuCheck = await pool.query('SELECT alldays.thedays, mynames.usernames FROM alldays INNER JOIN mynames ON alldays.id = mynames.alldays_id where alldays.id = 5')
            final = thuCheck.rows
        }

        if (wait === 'friday') {
            friCheck = await pool.query('SELECT alldays.thedays, mynames.usernames FROM alldays INNER JOIN mynames ON alldays.id = mynames.alldays_id where alldays.id = 2')
            final = friCheck.rows
        }

        if (wait === 'saturday') {
            satCheck = await pool.query('SELECT alldays.thedays, mynames.usernames FROM alldays INNER JOIN mynames ON alldays.id = mynames.alldays_id where alldays.id = 6')
            final = satCheck.rows

        }
        if (wait === 'sunday') {
            sunCheck = await pool.query('SELECT alldays.thedays, mynames.usernames FROM alldays INNER JOIN mynames ON alldays.id = mynames.alldays_id where alldays.id = 7')
            final = sunCheck.rows
        }
    }

    function reachWarn() {
        if (monday >= 3) {
            return 'warning'
        }
    }

    function reachWarn2() {

        if (tuesday >= 3) {
            return 'warning'
        }
    }

    function reachWarn3() {

        if (wednesday >= 3) {
            return 'warning'
        }
    }

    function reachWarn4() {

        if (thursday >= 3) {
            return 'warning'
        }
    }
    function reachWarn5() {

        if (friday >= 3) {
            return 'warning'
        }
    }

    function reachWarn6() {

        if (saturday >= 3) {
            return 'warning'
        }
    }

    function reachWarn7() {

        if (sunday >= 3) {
            return 'warning'
        }
    }

    async function deleteDb() {
        final = []
        await pool.query('delete from mynames')


    }

    return {
        add,
        scanDays,
        getDays,
        usersDays,
        reachWarn,
        checkedbox,
        filtering,
        duplicates,
        reachWarn2,
        reachWarn3,
        reachWarn4,
        reachWarn5,
        reachWarn6,
        reachWarn7,
        deleteDb
    }
}