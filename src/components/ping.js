import React from 'react';
import { UserContext } from "../App";

export async function Ping(db) {
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const timer = 10000;
    const timeOut = 9000;
    let data = { _id: 'ping', text: 'Ok!', date: new Date().toISOString() };

    while(true) {
        await sleep(timer);
        data.date = new Date().toISOString();
        fetch('http://localhost:8080/health/status', {timeout: timeOut})
            .then(response => response.text())
            .then(text => {
                data.text = text;
                db.updateItem(data);
                if (text === 'Ok!') {
                    SyncData(db);
                }
            })
            .catch(err => {
                data.text = err.message;
                db.updateItem(data);
            });
    }
};

export async function SyncData(db) {
    const headers = {
        'Content-Type': 'application/json'
    }

    db.getUnsync().then(items => {
        items.forEach(item => {
            item.sync = true;
            let body = JSON.stringify(item);
            fetch('http://localhost:8080/products', {method: 'POST', headers: headers, body: body})
                .then(response => {
                    if (response.ok) {
                        db.updateItem(item);
                    }
                });
        });
    });
}

export function getStatus(db) {
    return db.getItem('ping').then(doc => {
        return true ? doc.text === 'Ok!' : false;
    });
}

export function UpdateStatus(db) {
    const { setStatus } = React.useContext(UserContext);
    getStatus(db).then((data) => {
        setStatus(data);
    });
}