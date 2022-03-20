/**
 * Routes:
 *      - src/routers/PrivateRouter
 */
import React from 'react'
import AuthorizeTable from '../components/AuthorizeTable'

console.log(localStorage.getItem("loginId"));
export default function () {
    return (
        <div>
            <AuthorizeTable />
        </div>
    )
}