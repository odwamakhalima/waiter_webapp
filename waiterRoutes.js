module.exports = function waiterRoute(waiterFact) {


    var daychecked;
    var week;
    var alldays;
    var check;
    function main(req, res) {

        week = waiterFact.getDays()

        if (week.length < 3 || week.length > 3) {
            req.flash('error', 'Please Select 3 days')
        }
        else {
            for (var i = 0; i < week.length; i++) {
                alldays = week[i]

            }
            var mon = alldays.monday
            var tue = alldays.tuesday
            var wed = alldays.wednesday
            var thu = alldays.thursday
            var fri = alldays.friday
            var sat = alldays.saturday
            var sun = alldays.sunday
            //  console.log(alldays);

        }
        res.render('index', {
            mondays: mon,
            tuesdays: tue,
            wednesdays: wed,
            thursdays: thu,
            fridays: fri,
            saturdays: sat,
            sundays: sun,
          


        })
    }

    async function postData(req, res) {




        check = req.body.days
        console.log(check);

        for (var j = 0; j < check.length; j++) {
            daychecked = check[j]
            await waiterFact.scanDays(daychecked)

        }
        res.redirect('/')
    }

    async function logIn(req, res) {
        var users = req.body.user
        await waiterFact.add(users)
        if (users === '') {
            req.flash('error', 'Please Enter Your Name')
        }
        res.redirect('/')
    }

    async function availableWaiters(req,res){
        res.render('waiter',{
            userday: await waiterFact.usersDays()
        })
    }

    return {
        main,
        postData,
        logIn,
        availableWaiters
    }
}