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
        // console.log(waiterFact.reachWarn());

        res.render('index', {
            mondays: mon,
            tuesdays: tue,
            wednesdays: wed,
            thursdays: thu,
            fridays: fri,
            saturdays: sat,
            sundays: sun,
            userz: users,
            level: waiterFact.reachWarn(),
            level2: waiterFact.reachWarn2(),
            level3: waiterFact.reachWarn3(),
            level4: waiterFact.reachWarn4(),
            level5: waiterFact.reachWarn5(),
            level6: waiterFact.reachWarn6(),
            level7: waiterFact.reachWarn7(),

        })
    }

    async function postData(req, res) {

        check = req.body.days

        if (check.length < 3 || check.length > 3) {
            req.flash('error', 'Please Select 3 days')
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

        res.redirect('/')
    }

    async function logIn(req, res) {
        users = req.body.user
        const myLog = req.params.myLog
        if (users === '') {
            req.flash('error', 'Please Enter Your Name')
        }
        else {
            await waiterFact.add(users)
        }
        res.redirect('/')
    }

    async function availableWaiters(req, res) {
        res.render('waiter', {
            userday: await waiterFact.usersDays()
        })
    }

    async function actionDay(req, res) {
        // var eachday = req.params.perday
        res.render('action', {
            perday: await waiterFact.usersDays()
        })
    }
    return {
        main,
        postData,
        logIn,
        availableWaiters,
        actionDay
    }
}