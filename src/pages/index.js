import React from "react";
import { UpdateStatus } from '../components/ping';

export default function Index( { db } ) {
    UpdateStatus(db);
    return (
        <div>
            <h1>ATP Client</h1>
        </div>
    );
}