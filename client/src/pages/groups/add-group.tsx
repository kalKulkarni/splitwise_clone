import React, { ReactNode, useEffect, useState} from 'react';
import Layout from '@/components/layout';
import Styles from '../../styles/groups.module.scss';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';



const CreateGroup = () => {
    const[name,setName] =useState<string>('')
    const router = useRouter()
   const SubmitForm = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const group={
        name,
    }
    try {
        await axios.post('http://localhost:3000/groups/submit-group', group, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYwLCJpYXQiOjE3MjE5NzMxNjgsImV4cCI6MTcyMjA1OTU2OH0.orBYlqBfgxwPknhTOJBP0SVKAlMv5a0W6gG3vj4vb6s"
          }
        });
        router.push('/groups/get-groups'); // redirect to expenses page after successful submission
      } catch (error) {
        console.error('Error submitting expense:', error);
      }
   }

    return (
        <Layout>
            <div className={Styles.container}>
                <h1 className={Styles.title}>Create Group</h1>
               <form onSubmit={SubmitForm}>
               <label>
            Name of the Group:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <button type="submit">Create Group</button>
               </form>

            </div>
        </Layout>
    );
};

export default CreateGroup;
