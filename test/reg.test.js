const assert = require('assert');
var registration = require('../regFact')
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost/register';

const pool = new Pool({
    connectionString
});

describe('The basic database web app', function () {
    beforeEach(async function () {
        await pool.query("delete from myregnumbers;");
        await pool.query('insert into mytowns (description) values ($1)', ['CA'])
        await pool.query('insert into mytowns (description) values ($1)', ['CY'])
        await pool.query('insert into mytowns (description) values ($1)', ['CL'])
    });

    it('should filter each location and store values in different list', async function () {



        const factoryReg = registration(pool)
        await factoryReg.stored('CA 8734')
        await factoryReg.stored('CY 868734')
        await factoryReg.stored('CL 127534')

        await factoryReg.stellenbosch()
        assert.deepEqual(await factoryReg.finalResults(), [{ description: 'CL 127534' }])

        await factoryReg.capeTown()
        assert.deepEqual(await factoryReg.finalResults(), [{ description: 'CA 8734' }])

        await factoryReg.bellVille()
        assert.deepEqual(await factoryReg.finalResults(), [{ description: 'CY 868734' }])

    });

    it('each location must have its own own list', async function () {



        const factoryReg = registration(pool)
        await factoryReg.stored('CA 8734')
        await factoryReg.stored('CY 868734')
        await factoryReg.stored('CL 127534')

        await factoryReg.stored('CA 45876')
        await factoryReg.stored('CY 2568')
        await factoryReg.stored('CL 9865')

        await factoryReg.stellenbosch()

        assert.deepEqual(await factoryReg.finalResults(), [{ description: 'CL 127534' }, { description: 'CL 9865' }])

        await factoryReg.capeTown()
        assert.deepEqual(await factoryReg.finalResults(), [{ description: 'CA 8734' }, { description: 'CA 45876' }])

        await factoryReg.bellVille()
        assert.deepEqual(await factoryReg.finalResults(), [{ description: 'CY 868734' }, { description: 'CY 2568' }])

    });

    it('should not store registrations with more than 10 numbers', async function () {



        const factoryReg = registration(pool)
        await factoryReg.stored('CA 45876')
        await factoryReg.stored('CY 2568')
        await factoryReg.stored('CL 9865')

        await factoryReg.stored('CA 873449575468')
        await factoryReg.stored('CY 86873456476')
        await factoryReg.stored('CL 127534346576')

        await factoryReg.stellenbosch()
        assert.deepEqual(await factoryReg.finalResults(), [{ description: 'CL 9865' }])

        await factoryReg.capeTown()
        assert.deepEqual(await factoryReg.finalResults(), [{ description: 'CA 45876' }])

        await factoryReg.bellVille()
        assert.deepEqual(await factoryReg.finalResults(), [{ description: 'CY 2568' }])

    });

    it('should filter and not store special characters on the database', async function () {



        const factoryReg = registration(pool)
        await factoryReg.stored('CA 8734')
        await factoryReg.stored('CY 868734')
        await factoryReg.stored('CL 127534')
        await factoryReg.stored('CA 87(*&')
        await factoryReg.stored('CY 86&%%#')
        await factoryReg.stored('CL 12%%$')

        await factoryReg.stellenbosch()
        assert.deepEqual(await factoryReg.finalResults(), [{ description: 'CL 127534' }])

        await factoryReg.capeTown()
        assert.deepEqual(await factoryReg.finalResults(), [{ description: 'CA 8734' }])

        await factoryReg.bellVille()
        assert.deepEqual(await factoryReg.finalResults(), [{ description: 'CY 868734' }])

    });

    after(function () {
        pool.end();
    })
});