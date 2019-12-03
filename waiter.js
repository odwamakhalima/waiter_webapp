module.exports = function waiter(pool) {

    var final = []
    var daysList = []
    var myObj = {}
    var mynames;
    var checkbox;
    var store;
    var stored;
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
        mynames = waiters.toUpperCase()
    }



    async function scanDays(days) {
        checkdays = days
        known = await pool.query('select * from mynamezz')
        store = await pool.query('select * from mynamezz WHERE usernames = $1', [mynames])

        if (store.rows.length === 0) {
            for (var i = 0; i < checkdays.length; i++) {

                stored = await pool.query('select * from alldayzz')

                if (checkdays[i] === 'Monday') {
                    await pool.query('insert into mynamezz (usernames,alldayzz_id) values ($1,$2)', [mynames, 8]);
                    monCheck = await pool.query('SELECT alldayzz.thedays, mynamezz.usernames FROM alldayzz INNER JOIN mynamezz ON alldayzz.id = mynamezz.alldayzz_id where alldayzz.id = 8')
                    monday++
                    final = monCheck.rows
                    await pool.query('UPDATE alldayzz thedays SET counters = counters + 1 WHERE thedays = $1', ['monday'])
                

                }
                if (checkdays[i] === 'Tuesday') {
                    await pool.query('insert into mynamezz (usernames,alldayzz_id) values ($1,$2)', [mynames, 9]);
                    tueCheck = await pool.query('SELECT alldayzz.thedays, mynamezz.usernames FROM alldayzz INNER JOIN mynamezz ON alldayzz.id = mynamezz.alldayzz_id where alldayzz.id = 9')
                    tuesday++
                    final = tueCheck.rows
                    await pool.query('UPDATE alldayzz thedays SET counters = counters + 1 WHERE thedays = $1', ['tuesday'])
                    

                }
                if (checkdays[i] === 'Wednesday') {
                    await pool.query('insert into mynamezz (usernames,alldayzz_id) values ($1,$2)', [mynames, 10]);
                    wedCheck = await pool.query('SELECT alldayzz.thedays, mynamezz.usernames FROM alldayzz INNER JOIN mynamezz ON alldayzz.id = mynamezz.alldayzz_id where alldayzz.id = 10')
                    final = wedCheck.rows
                    wednesday++
                    checkbox = 'checked'
                    await pool.query('select * from alldayzz WHERE thedays =$1', ['wednesday'])
                    await pool.query('UPDATE alldayzz thedays SET counters = counters + 1 WHERE thedays = $1', ['wednesday'])

                }
                if (checkdays[i] === 'Thursday') {
                    await pool.query('insert into mynamezz (usernames,alldayzz_id) values ($1,$2)', [mynames, 11]);
                    thuCheck = await pool.query('SELECT alldayzz.thedays, mynamezz.usernames FROM alldayzz INNER JOIN mynamezz ON alldayzz.id = mynamezz.alldayzz_id where alldayzz.id = 11')
                    final = thuCheck.rows
                    thursday++
                    checkbox = 'checked'
                    await pool.query('select * from alldayzz WHERE thedays =$1', ['thursday'])
                    await pool.query('UPDATE alldayzz thedays SET counters = counters + 1 WHERE thedays = $1', ['thursday'])

                }
                if (checkdays[i] === 'Friday') {
                    await pool.query('insert into mynamezz (usernames,alldayzz_id) values ($1,$2)', [mynames, 12]);
                    friCheck = await pool.query('SELECT alldayzz.thedays, mynamezz.usernames FROM alldayzz INNER JOIN mynamezz ON alldayzz.id = mynamezz.alldayzz_id where alldayzz.id = 12')
                    final = friCheck.rows
                    friday++
                    checkbox = 'checked'
                    await pool.query('select * from alldayzz WHERE thedays =$1', ['friday'])
                    await pool.query('UPDATE alldayzz thedays SET counters = counters + 1 WHERE thedays = $1', ['friday'])


                }
                if (checkdays[i] === 'Saturday') {
                    await pool.query('insert into mynamezz (usernames,alldayzz_id) values ($1,$2)', [mynames, 13]);
                    satCheck = await pool.query('SELECT alldayzz.thedays, mynamezz.usernames FROM alldayzz INNER JOIN mynamezz ON alldayzz.id = mynamezz.alldayzz_id where alldayzz.id = 13')
                    final = satCheck.rows
                    saturday++
                    checkbox = 'checked'
                    await pool.query('select * from alldayzz WHERE thedays =$1', ['saturday'])
                    await pool.query('UPDATE alldayzz thedays SET counters = counters + 1 WHERE thedays = $1', ['saturday'])


                }
                if (checkdays[i] === 'Sunday') {
                    await pool.query('insert into mynamezz (usernames,alldayzz_id) values ($1,$2)', [mynames, 14]);
                    sunCheck = await pool.query('SELECT alldayzz.thedays, mynamezz.usernames FROM alldayzz INNER JOIN mynamezz ON alldayzz.id = mynamezz.alldayzz_id where alldayzz.id = 14')
                    final = sunCheck.rows
                    sunday++
                    checkbox = 'checked'
                    await pool.query('select * from alldayzz WHERE thedays =$1', ['sunday'])
                    await pool.query('UPDATE alldayzz thedays SET counters = counters + 1 WHERE thedays = $1', ['sunday'])

                }

            }
        }

    }



    async function duplicates() {
        store = await pool.query('select * from mynamezz WHERE usernames = $1', [mynames])
        return store.rowCount
    }

    async function usersDays() {
        console.log(final);
        
        return final
    }

    async function usersDays2() {
        stored = await pool.query('select * from alldayzz')
        return stored.rows
    }

    async function filtering(wait) {

        if (wait === 'monday') {
            monCheck = await pool.query('SELECT alldayzz.thedays, mynamezz.usernames FROM alldayzz INNER JOIN mynamezz ON alldayzz.id = mynamezz.alldayzz_id where alldayzz.id = 8')
            final = monCheck.rows
        }

        if (wait === 'tuesday') {
            tueCheck = await pool.query('SELECT alldayzz.thedays, mynamezz.usernames FROM alldayzz INNER JOIN mynamezz ON alldayzz.id = mynamezz.alldayzz_id where alldayzz.id = 9')
            final = tueCheck.rows
        }

        if (wait === 'wednesday') {
            wedCheck = await pool.query('SELECT alldayzz.thedays, mynamezz.usernames FROM alldayzz INNER JOIN mynamezz ON alldayzz.id = mynamezz.alldayzz_id where alldayzz.id = 10')
            final = wedCheck.rows

        }
        if (wait === 'thursday') {
            thuCheck = await pool.query('SELECT alldayzz.thedays, mynamezz.usernames FROM alldayzz INNER JOIN mynamezz ON alldayzz.id = mynamezz.alldayzz_id where alldayzz.id = 11')
            final = thuCheck.rows
        }

        if (wait === 'friday') {
            friCheck = await pool.query('SELECT alldayzz.thedays, mynamezz.usernames FROM alldayzz INNER JOIN mynamezz ON alldayzz.id = mynamezz.alldayzz_id where alldayzz.id = 12')
            final = friCheck.rows
        }

        if (wait === 'saturday') {
            satCheck = await pool.query('SELECT alldayzz.thedays, mynamezz.usernames FROM alldayzz INNER JOIN mynamezz ON alldayzz.id = mynamezz.alldayzz_id where alldayzz.id = 13')
            final = satCheck.rows

        }
        if (wait === 'sunday') {
            sunCheck = await pool.query('SELECT alldayzz.thedays, mynamezz.usernames FROM alldayzz INNER JOIN mynamezz ON alldayzz.id = mynamezz.alldayzz_id where alldayzz.id = 14')
            final = sunCheck.rows
            console.log(final);
            
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
        await pool.query('UPDATE alldayzz SET counters =0')
        await pool.query('delete from mynamezz')


    }

    return {
        add,
        scanDays,
        usersDays,
        usersDays2,
        reachWarn,
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