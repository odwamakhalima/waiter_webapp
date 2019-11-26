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

            week = waiterFact.getDays()

            for (var i = 0; i < week.length; i++) {
                alldays = week[i]
            }
            if (mon === 3) {
                req.flash('error', 'Monday Is Full')
            }
            else {
                mon = alldays.monday
            }
            if (tue === 3) {
                req.flash('error', 'Tuesday Is Full')
            }
            else {
                tue = alldays.tuesday
            }
            if (wed === 3) {
                req.flash('error', 'Wednesday Is Full')
            }
            else {
                wed = alldays.wednesday
            }
            if (thu === 3) {
                req.flash('error', 'Thursday Is Full')
            }
            else {
                thu = alldays.thursday
            }
            if (fri === 3) {
                req.flash('error', 'Friday Is Full')
            }
            else {
                fri = alldays.friday
            }
            if (sat === 3) {
                req.flash('error', 'Saturday Is Full')
            }
            else {
                sat = alldays.saturday
            }
            if (sun === 3) {
                req.flash('error', 'Sunday Is Full')
            }
            else {
                sun = alldays.sunday
            }
        }

        await waiterFact.usersDays()
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
            userz: users,
            che: await waiterFact.checkedbox()
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
        var fj = await waiterFact.usersDays()
        console.log(fj.length);
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
        showWaiter
    }
}