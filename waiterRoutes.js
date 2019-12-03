module.exports = function waiterRoute(waiterFact) {

    var week;
    var alldays;
    var check;
    var mon;
    var tue;
    var wed;
    var thu;
    var fri;
    var sat;
    var sun;
    var users;

    function main(req, res) {

        res.render('index', {


        })
    }

    async function postData(req, res) {

        check = req.body.days

        var dup = await waiterFact.duplicates()

        if (dup >= 1) {
            req.flash('error', 'You Already Selected Days')
        }
        else {
            await waiterFact.scanDays(check)
            

            var mydays = await waiterFact.usersDays2()


            if (mon === 3 || tue === 3 || wed === 3 || thu === 3 || fri === 3 || sat === 3 || sun === 3) {
                req.flash('error', 'Day Is Full')
            }
            else {
                for (var x = 0; x < mydays.length; x++) {
                    var count = mydays[x]


                    if (count.thedays === 'monday') {
                        mon = count.counters
                    }

                    if (count.thedays === 'tuesday') {
                        tue = count.counters
                    }

                    if (count.thedays === 'wednesday') {
                        wed = count.counters
                    }

                    if (count.thedays === 'thursday') {
                        thu = count.counters
                    }

                    if (count.thedays === 'friday') {
                        fri = count.counters
                    }

                    if (count.thedays === 'saturday') {
                        sat = count.counters
                    }

                    if (count.thedays === 'saturday') {
                        sat = count.counters
                    }

                    if (count.thedays === 'sunday') {
                        sun = count.counters

                    }
                }
            }
        }
        //await waiterFact.usersDays()
        res.redirect('/')
    }

    async function logIn(req, res) {

        users = req.body.user

        if (users === '') {
            req.flash('error', 'Please Enter Your Name')
            res.redirect('/')
        }
        else {
            await waiterFact.add(users)
            res.redirect('/waiters/:username')
        }
    }

    async function showWaiter(req, res) {
        res.render('waiter', {
            userz: users
        })
    }

    async function availableWaiters(req, res) {
        res.render('days', {
            mondays: mon,
            tuesdays: tue,
            wednesdays: wed,
            thursdays: thu,
            fridays: fri,
            saturdays: sat,
            sundays: sun,

            level: waiterFact.reachWarn(),
            level2: waiterFact.reachWarn2(),
            level3: waiterFact.reachWarn3(),
            level4: waiterFact.reachWarn4(),
            level5: waiterFact.reachWarn5(),
            level6: waiterFact.reachWarn6(),
            level7: waiterFact.reachWarn7(),
            showfil: await waiterFact.usersDays()

        })
    }

    async function actionDay(req, res) {

        await waiterFact.filtering(req.body.mydrop)
        res.redirect('/days')
    }

    async function resetz(req, res) {
        await waiterFact.deleteDb()

        res.redirect('/')
    }


    return {
        main,
        postData,
        logIn,
        availableWaiters,
        actionDay,
        resetz,
        showWaiter,
    }
}