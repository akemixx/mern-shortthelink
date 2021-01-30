import React from 'react';
import {Link} from 'react-router-dom';

export const LinksList = ({ links }) => {
    console.log(links);
    if(!links.length){
        return (
            <p className='center'>There are no links.</p>
        );
    }

    return (
        <table className='stripped'>
            <thead>
            <tr>
                <th>Original link</th>
                <th>Shorted link</th>
                <th>Date</th>
                <th>Clicks</th>
                <th>Open</th>
            </tr>
            </thead>

            <tbody>
            {links.map(link => {
                return (
                    <tr key={ link._id }>
                        <td>{ link.from }</td>
                        <td>{ link.to }</td>
                        <td>{ link.date }</td>
                        <td>{ link.clicks }</td>
                        <td>
                            <Link to={`/details/${ link._id }`}>Open</Link>
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
};