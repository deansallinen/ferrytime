const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('ferrytracker.db');

const test = {
    vessel: 'Queen of New Westminster',
    scheduled_departure: '8:00 AM',
    actual_departure: '8:00 AM',
    eta: '9:27 AM',
    sailing_status: 'On Time',
    route_name: 'Tsawwassen to Swartz Bay',
    average_sailing: '1 hour 35 minutes',
    sailing_date: '2018-05-07'
};

const test2 = {
    vessel: 'Queen of New Westminster',
    scheduled_departure: '8:00 AM',
    actual_departure: '8:00 AM',
    eta: '10:30 AM',
    sailing_status: 'Late',
    route_name: 'Tsawwassen to Swartz Bay',
    average_sailing: '1 hour 35 minutes',
    sailing_date: '2018-05-07'
};

// function createTable() {
//     db.serialize(function() {
//         db.run('CREATE TABLE sailings (\
//                 route_name TEXT, \
//                 average_sailing TEXT, \
//                 sailing_date TEXT, \
//                 vessel TEXT, \
//                 scheduled_departure TEXT, \
//                 actual_departure TEXT, \
//                 eta TEXT, \
//                 sailing_status TEXT \
//                 )');
//     });
// }
// createTable();

function insert(sailing) {
    const keys = Object.keys(sailing).join(', ');
    const placeholders = Object.keys(sailing).fill('?').join(', ');
    db.run('INSERT INTO sailings (' + keys + ') \
        VALUES (' + placeholders + ');',
            Object.values(sailing)),
        (err) => { throw err };
}

// insert(test);

function getUpdateString(sailing) {
    const updateArray = [];
    for (const key in sailing) {
        updateArray.push(`${key} = "${sailing[key]}"`);
    }
    const updateString = updateArray.join(', ');
    // console.log(updateString);
    return updateString;
}

function update(sailing) {
    let allValues = getUpdateString(sailing);
    db.run(`UPDATE sailings \
        SET ${allValues} \
        WHERE sailing_date LIKE "${sailing.sailing_date}" \
        AND route_name LIKE "${sailing.route_name}" \
        AND scheduled_departure LIKE "${sailing.scheduled_departure}"
        AND vessel LIKE "${sailing.vessel}";`),
        (err) => { throw err };
}

update(test2);
