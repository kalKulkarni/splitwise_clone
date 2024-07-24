import { ReactNode, useEffect, useState } from 'react';
import Layout from '@/components/layout';
import Styles from '../../styles/groups.module.scss';
import axios from 'axios';
import Link from 'next/link';

interface Group {
    id: number
    name: string;
}

const GetGroup = () => {
    const [groups, setGroups] = useState<Group[]>([]);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get('http://localhost:3000/groups/get-group', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTcyMTgwMzE2OSwiZXhwIjoxNzIxODg5NTY5fQ.ZgDKPahmbUWBxoMv6g5eA4x_zdNEx0x5jF18yqhXjzY',
                    },
                });
                console.log(response.data, 'response data:::::::');
                setGroups(response.data);
                console.log(response.data, 'data data ::::::');

            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };

        fetchGroups();
    }, []);

    return (
        <Layout>
            <div className={Styles.container}>
                <Link href="/groups/add-group">
                    <span className={Styles.button}>Add Group</span>
                </Link>
                <h1 className={Styles.title}>Group List</h1>
                <ul className={Styles.groupList}>
                    <div>
                        {groups.map((group) => (
                            <div key={group.name}>
                                <h3>{group.name}</h3>
                                <div className={Styles.signup}>

                                </div>
                            </div>
                        ))}
                    </div>
                </ul>

            </div>
        </Layout>
    );
};

export default GetGroup;
