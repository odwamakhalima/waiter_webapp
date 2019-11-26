const assert = require('assert');
var waits = require('../waiter')
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost/waiterdb';

const pool = new Pool({
    connectionString
});

describe('The basic database web app', function () {
    beforeEach(async function () {
        await pool.query("delete from mynames;");
        await pool.query('insert into alldays (thedays) values ($1)',['Monday'])
        await pool.query('insert into alldays (thedays) values ($1)',['Tuesday'])
        await pool.query('insert into alldays (thedays) values ($1)',['Wednesday'])
        await pool.query('insert into alldays (thedays) values ($1)',['Thursday'])
        await pool.query('insert into alldays (thedays) values ($1)',['Friday'])
        await pool.query('insert into alldays (thedays) values ($1)',['Saturday'])
        await pool.query('insert into alldays (thedays) values ($1)',['Sunday'])
    });


    it('should add to the days that the user selected', async function () {
        var waiterFact = waits(pool)

        await waiterFact.add('odwa')
        await waiterFact.scanDays(['Monday','Tuesday','friday'])

        assert.deepEqual(waiterFact.getDays(),[  {
        friday: 0,
        monday: 1,
        saturday: 0,
        sunday: 0,
        thursday: 0,
        tuesday: 1,
        wednesday: 0
      }])



    });

    it('should return users that work only tuesday', async function () {
        var waiterFact = waits(pool)

        await waiterFact.add('odwa')
        await waiterFact.scanDays(['Monday','Tuesday','friday'])
        await waiterFact.filtering('Tuesday')

        assert.deepEqual(await waiterFact.usersDays(),[{thedays:'Tuesday', usernames:'ODWA'}])



    });

    after(function () {
        pool.end();
    })
});