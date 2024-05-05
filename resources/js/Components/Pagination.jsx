import { Link } from '@inertiajs/react';
import React from 'react';

export default function Pagination({ links }) {

    function getClassName(active) {
        if (active) {
            return "bg-gray-600 text-white text-xs font-semibold rounded-md px-3 py-2";
        } else {
            return "bg-gradient-to-tr from-gray-900 to-gray-800 text-white text-xs font-semibold rounded-md px-3 py-2";
        }
    }

    return (
        links.length > 3 && (
            <div className="mb-4">
                <div className="flex flex-wrap mt-8 justify-end px-4 gap-1">
                    {links.map((link, index) => (
                        link.url === null ? (
                            <div key={index} className="bg-gray-600 text-white text-xs font-semibold rounded-md px-3 py-2">
                                <span dangerouslySetInnerHTML={{ __html: link.label }} />
                            </div>
                        ) : (
                            <Link
                                key={index}
                                className={getClassName(link.active)}
                                href={link.url}
                            >
                                <span dangerouslySetInnerHTML={{ __html: link.label }} />
                            </Link>
                        )
                    ))}
                </div>
            </div>
        )
    );
}
